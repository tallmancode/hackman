interface RateLimitRecord {
    count: number
    resetAt: number
}

const store = new Map<string, RateLimitRecord>()

// Tighter limits for authentication endpoints
const AUTH_PATHS = ['/api/login', '/api/register']
const AUTH_LIMIT = 5
const AUTH_WINDOW_MS = 60_000

// Broader limit for all other proxied requests
const GLOBAL_LIMIT = 120
const GLOBAL_WINDOW_MS = 60_000

function check(key: string, limit: number, windowMs: number): { allowed: boolean; retryAfter: number } {
    const now = Date.now()
    const record = store.get(key)

    if (!record || now > record.resetAt) {
        store.set(key, { count: 1, resetAt: now + windowMs })
        return { allowed: true, retryAfter: 0 }
    }

    record.count++

    if (record.count > limit) {
        return { allowed: false, retryAfter: Math.ceil((record.resetAt - now) / 1000) }
    }

    return { allowed: true, retryAfter: 0 }
}

export default defineEventHandler((event) => {
    const path = getRequestURL(event).pathname

    // Only rate-limit proxied API requests
    if (!path.startsWith('/api/')) return

    const ip = getRequestIP(event, { xForwardedFor: true }) ?? 'unknown'

    const isAuthPath = AUTH_PATHS.some(p => path.startsWith(p))

    if (isAuthPath) {
        const result = check(`auth:${ip}:${path}`, AUTH_LIMIT, AUTH_WINDOW_MS)
        if (!result.allowed) {
            setResponseHeaders(event, { 'Retry-After': String(result.retryAfter) })
            throw createError({ statusCode: 429, message: 'Too many requests. Please try again later.' })
        }
    } else {
        const result = check(`global:${ip}`, GLOBAL_LIMIT, GLOBAL_WINDOW_MS)
        if (!result.allowed) {
            setResponseHeaders(event, { 'Retry-After': String(result.retryAfter) })
            throw createError({ statusCode: 429, message: 'Too many requests. Please try again later.' })
        }
    }
})
