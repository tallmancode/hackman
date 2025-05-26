// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  css: ["@/assets/app.css"],
  devtools: { enabled: true },
  modules: ["@nuxt/ui", '@pinia/nuxt'],
  ssr: false,
  app: {
    pageTransition: {name: 'page', mode: 'out-in'},
    layoutTransition: {name: 'page', mode: 'out-in'},
  },
  fonts: {
    families: [
      // only resolve this font with the `google` provider
      { name: "Roboto", provider: "google" },
      { name: "Inter", provider: "google" },
    ],
  },
  runtimeConfig: {
    public: {
      baseUrl: 'https://hackman-server.tallmancode.co.za',
      finished: false
    }
  },
  vite: {
    build: {
      target: ["es2018"]
    }
  }
})