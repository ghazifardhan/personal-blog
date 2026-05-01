// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/ui',
    '@nuxt/content',
    process.env.NODE_ENV !== 'production' && '@nuxthq/studio',
    '@nuxt/icon',
    '@nuxt/fonts',
    '@nuxtjs/seo',
    '@nuxtjs/color-mode'
  ].filter(Boolean) as string[],

  studio: {
    // Studio admin route (default: '/_studio')
    route: '/_studio',

    // Git repository configuration (owner and repo are required)
    repository: {
      provider: 'github', // 'github' or 'gitlab'
      owner: 'ghazifardhan', // your GitHub/GitLab username or organization
      repo: 'personal-blog', // your repository name
      branch: 'main', // the branch to commit to (default: main)
    },

    enabled: true
  },

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

  robots: {
    disallow: ['/studio']
  }
})