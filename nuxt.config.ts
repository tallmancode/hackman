// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-04-03',
    css: ["@/assets/app.css"],
    devtools: {enabled: true},
    modules: ["@nuxt/ui", '@pinia/nuxt', '@nuxt/image'],
    ssr: false,
    fonts: {
        families: [
            // only resolve this font with the `google` provider
            {name: "Roboto", provider: "google"},
            {name: "Share Tech Mono", provider: "google"},
        ],
    },
    app: {
        rootAttrs: {
            id: "root",
        },
        buildAssetsDir: "/cdn/",
        head: {
            charset: "utf-8",
            viewport: "width=device-width, initial-scale=1",
            link: [
                {rel: 'icon', type: 'image/png', href: '/fav-icon/favicon-96x96.png', sizes: '96x96'},
                {rel: 'icon', type: 'image/svg+xml', href: '/fav-icon/favicon.svg'},
                {rel: 'shortcut icon', href: '/fav-icon/favicon.ico'},
                {rel: 'apple-touch-icon', sizes: '180x180', href: '/fav-icon/apple-touch-icon.png'},
                {rel: 'manifest', href: '/fav-icon/site.webmanifest'}
            ],
            title: "Hackman - Operation Firewall: Crack the Code",
            meta: [
                {
                    name: "title",
                    content:
                        "Hackman - Operation Firewall: Crack the Code",
                },
                {name: "apple-mobile-web-app-title", content: "Hackman"},
            ],
        },
        pageTransition: {name: 'page', mode: 'out-in'},
        layoutTransition: {name: 'page', mode: 'out-in'},
    },
    runtimeConfig: {
        public: {
            baseUrl: process.env.BASE_URL || 'https://hackman-server.tallmancode.co.za',
            finished: false,
            endtime: '2025/05/30, 07:35'
        }
    },
    vite: {
        build: {
            target: ["es2018"]
        }
    }
})