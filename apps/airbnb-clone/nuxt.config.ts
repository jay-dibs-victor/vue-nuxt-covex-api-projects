export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  devServer: {
    port: 3002
  },
  runtimeConfig: {
    public: {
      convexUrl: process.env.NUXT_PUBLIC_AIRBNB_CONVEX_URL || process.env.CONVEX_URL
    }
  }
})

