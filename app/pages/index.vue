<template>
  <div>
    <!-- Hero Section -->
    <section class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-32">
      <div class="max-w-3xl">
        <h1 class="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-[var(--color-text-primary)]">
          Hi, I'm <span class="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-violet-500">{{ displayText }}</span><span v-if="showCursor" class="text-indigo-500 animate-pulse ml-1">|</span>.
        </h1>
        <p class="text-xl md:text-2xl text-[var(--color-text-secondary)] mb-10 leading-relaxed">
          Just a dev who loves open-source and building for the web. Welcome to my brain dump where I share my thoughts on all of it.
        </p>
        <div class="flex flex-wrap items-center gap-4">
          <UButton to="/projects" color="primary" size="lg">
            View Projects
          </UButton>
          <UButton to="/blog" color="neutral" variant="subtle" size="lg">
            Read the Blog
          </UButton>
          
          <div class="flex items-center gap-2 md:ml-2">
            <UButton
              to="https://github.com/ghazifardhan"
              target="_blank"
              icon="i-simple-icons:github"
              color="neutral"
              variant="ghost"
              aria-label="GitHub"
            />
            <UButton
              to="https://linkedin.com/in/ghazifardhan"
              target="_blank"
              icon="i-simple-icons:linkedin"
              color="neutral"
              variant="ghost"
              aria-label="LinkedIn"
            />
            <UButton
              to="mailto:ghazi@ghazifadil.com"
              icon="i-heroicons:envelope"
              color="neutral"
              variant="ghost"
            >
              Contact Me
            </UButton>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Projects -->
    <section class="bg-[var(--color-surface)] py-20 border-y border-[var(--color-border)]">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between mb-12">
          <h2 class="text-3xl font-bold text-[var(--color-text-primary)]">Selected Projects</h2>
          <UButton to="/projects" variant="ghost" color="neutral">
            View all <Icon name="lucide:arrow-right" class="ml-1 w-4 h-4" />
          </UButton>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ProjectCard v-for="project in featuredProjects" :key="project.id" :project="project" :to="project.path" />
        </div>
      </div>
    </section>

    <!-- Featured Articles -->
    <section class="py-20">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between mb-12">
          <h2 class="text-3xl font-bold text-[var(--color-text-primary)]">Latest Writing</h2>
          <UButton to="/blog" variant="ghost" color="neutral">
            View all <Icon name="lucide:arrow-right" class="ml-1 w-4 h-4" />
          </UButton>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <PostCard v-for="post in featuredPosts" :key="post.id" :post="post" :to="post.path" />
        </div>
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
const fullText = "Ghazi Fadil"
const displayText = ref("")
const showCursor = ref(true)
const isDeleting = ref(false)

const typeText = () => {
  const currentLength = displayText.value.length
  
  if (!isDeleting.value) {
    // Typing
    displayText.value = fullText.substring(0, currentLength + 1)
    if (displayText.value === fullText) {
      setTimeout(() => { isDeleting.value = true }, 2000)
    }
  } else {
    // Deleting
    displayText.value = fullText.substring(0, currentLength - 1)
    if (displayText.value === "") {
      isDeleting.value = false
    }
  }

  const speed = isDeleting.value ? 50 : 150
  const timeout = isDeleting.value && displayText.value === "" ? 1000 : (displayText.value === fullText ? 2000 : speed)
  
  setTimeout(typeText, timeout)
}

onMounted(() => {
  typeText()
})

const [{ data: featuredProjects }, { data: featuredPosts }] = await Promise.all([
  useAsyncData('featured-projects', () => queryCollection('projects').where('featured', '=', true).limit(3).order('order', 'ASC').all()),
  useAsyncData('featured-posts', () => queryCollection('blog').where('featured', '=', true).limit(3).order('publishedAt', 'DESC').all())
])

useSeoMeta({
  title: 'Ghazi Fadil | Head of Software Engineering & Technical Lead',
  description: 'Portfolio and blog of Ghazi Fadil, a Technical Lead and Head of Software Engineering with 10+ years of experience in Golang, React, and Flutter.',
  ogTitle: 'Ghazi Fadil | Head of Software Engineering',
  ogDescription: 'Explore the projects and technical insights of Ghazi Fadil.',
  ogType: 'website',
  twitterCard: 'summary_large_image',
})

useSchemaOrg([
  definePerson({
    name: 'Ghazi Fadil',
    jobTitle: 'Head of Software Engineering',
    url: 'https://ghazifadil.com',
    sameAs: [
      'https://github.com/ghazifardhan',
      'https://www.linkedin.com/in/ghazifardhan',
      'https://x.com/ghazifardhan'
    ]
  }),
  defineWebSite({
    name: 'Ghazi Fadil',
    description: 'Personal portfolio and technical blog'
  })
])
</script>
