<template>
  <div class="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <!-- Header Section -->
      <div class="mb-16 text-center">
        <h1 class="text-4xl md:text-5xl font-bold text-[var(--color-text-primary)] mb-4">
          Tools & Resources
        </h1>
        <p class="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto">
          A curated collection of tools and resources that I use daily or find helpful for development and productivity.
        </p>
      </div>

      <!-- Interactive Tools Section -->
      <div class="mb-12">
        <h2 class="text-2xl font-bold text-[var(--color-text-primary)] mb-8 flex items-center gap-2">
          <Icon name="lucide:wrench" class="text-[var(--color-accent)]" />
          Interactive Tools
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="tool in interactiveTools" :key="tool.name" 
               class="group relative bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-6 hover:border-[var(--color-accent)] transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div class="flex items-center gap-4 mb-4">
              <div class="p-3 bg-[var(--color-accent)]/10 rounded-xl group-hover:bg-[var(--color-accent)]/20 transition-colors">
                <Icon :name="tool.icon" class="w-6 h-6 text-[var(--color-accent)]" />
              </div>
              <h3 class="text-xl font-semibold text-[var(--color-text-primary)]">{{ tool.name }}</h3>
            </div>
            <p class="text-[var(--color-text-secondary)] mb-6 leading-relaxed">
              {{ tool.description }}
            </p>
            <div class="flex items-center justify-between">
              <span class="text-xs font-medium px-2.5 py-0.5 rounded-full bg-[var(--color-border)] text-[var(--color-text-secondary)] uppercase tracking-wider">
                {{ tool.category }}
              </span>
              <UButton
                :to="tool.url"
                variant="ghost"
                color="neutral"
                trailing-icon="i-lucide-arrow-right"
                class="group-hover:text-[var(--color-accent)]"
              >
                Open
              </UButton>
            </div>
          </div>
        </div>
      </div>

      <!-- External Resources Section -->
      <!-- <div>
        <h2 class="text-2xl font-bold text-[var(--color-text-primary)] mb-8 flex items-center gap-2">
          <Icon name="lucide:library" class="text-[var(--color-accent)]" />
          External Resources
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="tool in externalResources" :key="tool.name" 
               class="group relative bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-6 hover:border-[var(--color-accent)] transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div class="flex items-center gap-4 mb-4">
              <div class="p-3 bg-[var(--color-accent)]/10 rounded-xl group-hover:bg-[var(--color-accent)]/20 transition-colors">
                <Icon :name="tool.icon" class="w-6 h-6 text-[var(--color-accent)]" />
              </div>
              <h3 class="text-xl font-semibold text-[var(--color-text-primary)]">{{ tool.name }}</h3>
            </div>
            <p class="text-[var(--color-text-secondary)] mb-6 leading-relaxed">
              {{ tool.description }}
            </p>
            <div class="flex items-center justify-between">
              <span class="text-xs font-medium px-2.5 py-0.5 rounded-full bg-[var(--color-border)] text-[var(--color-text-secondary)] uppercase tracking-wider">
                {{ tool.category }}
              </span>
              <UButton
                :to="tool.url"
                target="_blank"
                variant="ghost"
                color="neutral"
                trailing-icon="i-lucide-external-link"
                class="group-hover:text-[var(--color-accent)]"
              >
                Visit
              </UButton>
            </div>
          </div>
        </div>
      </div> -->

      <!-- Call to Action -->
      <div class="mt-20 p-8 md:p-12 bg-gradient-to-br from-[var(--color-accent)]/5 to-transparent border border-[var(--color-border)] rounded-3xl text-center">
        <h2 class="text-2xl md:text-3xl font-bold text-[var(--color-text-primary)] mb-4">
          Have a suggestion?
        </h2>
        <p class="text-[var(--color-text-secondary)] mb-8 max-w-xl mx-auto">
          If you have a tool or resource that you think should be featured here, feel free to reach out!
        </p>
        <UButton
          to="https://x.com/ghazifardhan"
          target="_blank"
          size="lg"
          class="bg-[var(--color-accent)] hover:bg-[var(--color-accent)]/90 text-white font-semibold rounded-full px-8"
        >
          Suggest a Tool
        </UButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const interactiveTools = [
  {
    name: 'Password Generator',
    description: 'Generate secure, random passwords locally in your browser with customizable parameters.',
    icon: 'lucide:shield-check',
    category: 'Security',
    url: '/tools/password-generator'
  },
  {
    name: 'QRCode Generator',
    description: 'Generate custom, high-quality QR codes for URLs, text, or contact info instantly.',
    icon: 'lucide:qr-code',
    category: 'Utility',
    url: '/tools/qr-generator'
  },
  {
    name: 'Background Remover',
    description: 'Remove image backgrounds instantly and locally in your browser. 100% private.',
    icon: 'lucide:image-minus',
    category: 'Images',
    url: '/tools/background-remover'
  },
  {
    name: 'WebP to PNG',
    description: 'Convert WebP images to PNG format instantly and privately in your browser.',
    icon: 'lucide:image',
    category: 'Images',
    url: '/tools/webp-to-png'
  },
  {
    name: 'Image Compressor',
    description: 'Reduce image file size without losing quality locally and privately.',
    icon: 'lucide:file-down',
    category: 'Images',
    url: '/tools/image-compressor'
  },
  {
    name: 'HTML Online Viewer',
    description: 'A real-time HTML, CSS, and JavaScript editor and previewer for quick prototyping.',
    icon: 'lucide:code-2',
    category: 'Development',
    url: '/tools/html-viewer'
  },
  {
    name: 'JSON Online Editor',
    description: 'Format, minify, and validate your JSON data instantly with local processing.',
    icon: 'lucide:braces',
    category: 'Development',
    url: '/tools/json-editor'
  },
  {
    name: 'SQL Online Beautifier',
    description: 'Format and prettify your SQL queries for better readability across multiple dialects.',
    icon: 'lucide:database',
    category: 'Development',
    url: '/tools/sql-beautifier'
  },
  {
    name: 'Markdown Editor',
    description: 'Write and preview Markdown with real-time rendering and professional typography.',
    icon: 'lucide:file-edit',
    category: 'Development',
    url: '/tools/markdown-editor'
  }
]

const externalResources = [
  {
    name: 'Nuxt',
    description: 'The Intuitive Vue Framework. My go-to for building high-performance web applications.',
    icon: 'simple-icons:nuxtdotjs',
    category: 'Framework',
    url: 'https://nuxt.com'
  },
  {
    name: 'Tailwind CSS',
    description: 'A utility-first CSS framework for rapidly building custom user interfaces.',
    icon: 'simple-icons:tailwindcss',
    category: 'Styling',
    url: 'https://tailwindcss.com'
  },
  {
    name: 'Visual Studio Code',
    description: 'My primary code editor with a vast ecosystem of extensions and powerful features.',
    icon: 'simple-icons:visualstudiocode',
    category: 'Editor',
    url: 'https://code.visualstudio.com'
  },
  {
    name: 'Raycast',
    description: 'A supercharged productivity tool for Mac. Replaces Spotlight and so much more.',
    icon: 'simple-icons:raycast',
    category: 'Productivity',
    url: 'https://raycast.com'
  },
  {
    name: 'Vercel',
    description: 'Excellent platform for hosting frontend applications with seamless Nuxt integration.',
    icon: 'simple-icons:vercel',
    category: 'Hosting',
    url: 'https://vercel.com'
  },
  {
    name: 'GitHub',
    description: 'Where I host my code, collaborate on projects, and manage my open-source work.',
    icon: 'simple-icons:github',
    category: 'Version Control',
    url: 'https://github.com'
  }
]

useSeoMeta({
  title: 'Tools - GhaziFadil',
  description: 'A curated collection of tools and resources that I use daily or find helpful for development and productivity.',
  ogTitle: 'Tools - GhaziFadil',
  ogDescription: 'A curated collection of tools and resources that I use daily or find helpful for development and productivity.',
})
</script>
