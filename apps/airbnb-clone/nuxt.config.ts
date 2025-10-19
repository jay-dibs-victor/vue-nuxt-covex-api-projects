export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/icon'
  ],
  devServer: {
    port: 3002
  },
  runtimeConfig: {
    public: {
      convexUrl: process.env.NUXT_PUBLIC_CONVEX_URL || "https://brave-fennec-549.convex.cloud"
    }
  }
})
