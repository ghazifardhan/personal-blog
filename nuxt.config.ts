// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/ui',
    '@nuxt/content',
    '@nuxthq/studio',
    '@nuxt/icon',
    '@nuxt/fonts',
    '@nuxtjs/seo',
    '@nuxtjs/color-mode'
  ],

  colorMode: {
    preference: 'dark',
    fallback: 'dark'
  },

  css: ['~/assets/css/main.css'],

  site: {
    url: 'https://example.com',
    name: 'Ghazi Fadil Website',
    description: 'A minimalist personal branding website and blog.',
    defaultLocale: 'en'
  },

  studio: {
    enabled: true
  },

  robots: {
    disallow: ['/studio']
  }
})
