// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-05-01',
  devtools: { enabled: true },

  modules: [
    '@nuxt/ui',
    '@nuxt/content',
    '@nuxt/icon',
    '@nuxt/fonts',
    '@nuxtjs/seo',
    '@nuxtjs/color-mode',
    'nuxt-studio'
  ],

  studio: {
    enabled: true,
    route: '/_studio',
    repository: {
      provider: 'github',
      owner: 'ghazifardhan',
      repo: 'personal-blog',
      branch: 'main',
    },
  },

  $production: { studio: false },

  colorMode: {
    preference: 'dark',
    fallback: 'dark'
  },

  css: ['~/assets/css/main.css'],

  site: {
    url: 'https://ghazifadil.com',
    name: 'Ghazi Fadil',
    description: 'The personal website and blog of Ghazi Fadil.',
    defaultLocale: 'en'
  },

  robots: {
    disallow: ['/studio']
  }
})