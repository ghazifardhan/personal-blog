<template>
  <div class="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 md:py-20">
    <h1 class="text-4xl md:text-5xl font-extrabold tracking-tight mb-8 text-[var(--color-text-primary)]">About Me</h1>
    
    <div class="prose prose-zinc dark:prose-invert max-w-none mb-16 prose-p:text-lg prose-p:leading-relaxed text-justify">
      <p>
        Hello I'm Ghazi Fadil, a results-driven Technical Lead and Software Engineer with over 10 years of experience in designing, developing, and scaling cross-platform applications (Backend, Frontend, and Mobile). Proven track record of leading engineering teams, managing the full software development lifecycle, and optimizing operational efficiency. Possesses deep technical expertise in modern tech stacks (Golang, ReactJS, Flutter), CI/CD integration, server infrastructure management, and leveraging AI companions to accelerate the delivery of robust, scalable, and high-impact software solutions.
      </p>
    </div>

    <div class="space-y-12 mb-16">
      <div v-for="group in skills" :key="group.category">
        <h3 class="text-sm font-bold uppercase tracking-wider text-[var(--color-text-secondary)] mb-6">{{ group.category }}</h3>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          <div v-for="skill in group.items" :key="skill.name" class="flex items-center gap-3 p-3 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg hover:border-[var(--color-accent)] transition-colors">
            <Icon :name="skill.icon" class="w-6 h-6 text-[var(--color-text-primary)]" />
            <span class="text-sm font-medium text-[var(--color-text-primary)]">{{ skill.name }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-col sm:flex-row justify-center gap-4">
      <UButton to="mailto:ghazi@ghazifadil.com" size="xl" color="primary">
        Get in touch <Icon name="lucide:mail" class="ml-2 w-5 h-5" />
      </UButton>
      <UButton to="/cv.pdf" target="_blank" size="xl" color="neutral" variant="outline">
        Download CV <Icon name="lucide:download" class="ml-2 w-5 h-5" />
      </UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'About | Ghazi Fadil',
  description: 'Learn about Ghazi Fadil\'s 10+ years of experience leading engineering teams and building scalable cross-platform solutions.',
  ogTitle: 'About Ghazi Fadil',
  ogDescription: 'Technical Lead & Head of Software Engineering profile.'
})

useSchemaOrg([
  definePerson({
    name: 'Ghazi Fadil',
    description: 'Results-driven Technical Lead and Software Engineer with over 10 years of experience.'
  })
])

const skills = [
  {
    category: 'Backend',
    items: [
      { name: 'Golang', icon: 'simple-icons:go' },
      { name: 'NodeJS', icon: 'simple-icons:nodedotjs' },
      { name: 'Laravel', icon: 'simple-icons:laravel' },
      { name: 'Supabase', icon: 'simple-icons:supabase' },
      { name: 'Pocketbase', icon: 'simple-icons:pocketbase' },
      { name: 'Rust', icon: 'simple-icons:rust' }
    ]
  },
  {
    category: 'Frontend',
    items: [
      { name: 'ReactJS', icon: 'simple-icons:react' },
      { name: 'NextJS', icon: 'simple-icons:nextdotjs' },
      { name: 'Svelte', icon: 'simple-icons:svelte' },
      { name: 'VueJS', icon: 'simple-icons:vuedotjs' },
      { name: 'Nuxt', icon: 'simple-icons:nuxt' }
    ]
  },
  {
    category: 'Mobile',
    items: [
      { name: 'Flutter', icon: 'simple-icons:flutter' },
      { name: 'React Native', icon: 'simple-icons:react' },
      { name: 'Kotlin', icon: 'simple-icons:kotlin' }
    ]
  },
  {
    category: 'Database & Cache',
    items: [
      { name: 'PostgreSQL', icon: 'simple-icons:postgresql' },
      { name: 'MySQL', icon: 'simple-icons:mysql' },
      { name: 'SQLite', icon: 'simple-icons:sqlite' },
      { name: 'Redis', icon: 'simple-icons:redis' }
    ]
  },
  {
    category: 'AI Companion',
    items: [
      { name: 'Antigravity', icon: 'lucide:sparkles' },
      { name: 'Claude', icon: 'simple-icons:anthropic' },
      { name: 'Gemini', icon: 'simple-icons:googlegemini' }
    ]
  },
  {
    category: 'Leadership & DevOps',
    items: [
      { name: 'Team Lead', icon: 'lucide:users' },
      { name: 'Agile', icon: 'lucide:clipboard-list' },
      { name: 'CI/CD', icon: 'simple-icons:githubactions' },
      { name: 'Git', icon: 'simple-icons:git' }
    ]
  },
  {
    category: 'Server',
    items: [
      { name: 'Cloud', icon: 'lucide:cloud' },
      { name: 'On-Premises', icon: 'lucide:server' }
    ]
  }
]
</script>
