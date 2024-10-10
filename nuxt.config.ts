// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  css: ["@/assets/style.css"],
  devtools: { enabled: true },
  modules: ["@nuxt/ui"],
  ssr: false,
  app: {
    pageTransition: {name: 'page', mode: 'out-in'},
    layoutTransition: {name: 'page', mode: 'out-in'},
  }
})