export default defineEventHandler((event) => {
    setResponseHeaders(event, {
        'X-Frame-Options': 'DENY',
        'X-Content-Type-Options': 'nosniff',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        'Permissions-Policy': 'geolocation=(), camera=(), microphone=()',
        'Content-Security-Policy': [
            "default-src 'self'",
            "script-src 'self' 'unsafe-inline'",
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
            "font-src 'self' https://fonts.gstatic.com",
            "img-src 'self' data: blob: https://api.iconify.design",
            "connect-src 'self' https://api.iconify.design",
            "frame-ancestors 'none'",
        ].join('; '),
    })
})
