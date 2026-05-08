// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-05-01',
  devtools: { enabled: true },

  typescript: {
    tsConfig: {
      compilerOptions: {
        module: 'esnext'
      }
    }
  },

  modules: [
    '@nuxt/ui',
    '@nuxt/content',
    '@nuxt/icon',
    '@nuxt/fonts',
    '@nuxtjs/seo',
    '@nuxtjs/color-mode',
    'nuxt-studio',
    'nuxt-gtag'
  ],

  gtag: {
    id: undefined // Managed via NUXT_PUBLIC_GTAG_ID env var
  },

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
  },

  sourcemap: {
    server: false,
    client: false
  },

  vite: {
    optimizeDeps: {
      exclude: ['@imgly/background-removal', 'onnxruntime-web']
    }
  }
})