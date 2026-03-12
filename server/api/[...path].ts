export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const path = getRouterParam(event, 'path') ?? ''

    return proxyRequest(event, `${config.apiBaseUrl}/api/${path}`)
})
