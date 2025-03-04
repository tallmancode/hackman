// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  css: ["@/assets/style.css"],
  devtools: { enabled: true },
  modules: ["@nuxt/ui", '@pinia/nuxt'],
  ssr: false,
  app: {
    pageTransition: {name: 'page', mode: 'out-in'},
    layoutTransition: {name: 'page', mode: 'out-in'},
  },
  runtimeConfig: {
    public: {
      baseUrl: process.env.BASE_URL || 'http://127.0.0.1:8000',
      finished: false
    }
  },
  vite: {
    build: {
      target: ["es2018"]
    }
  }
})