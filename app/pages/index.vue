<template>
  <div>
    <!-- Hero Section -->
    <section class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-32">
      <div class="max-w-3xl">
        <h1 class="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-[var(--color-text-primary)]">
          Hi, I'm <span class="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-violet-500">Ghazi Fadil</span>.
        </h1>
        <p class="text-xl md:text-2xl text-[var(--color-text-secondary)] mb-10 leading-relaxed">
          I build fast, accessible, and beautiful web experiences. Passionate about modern tooling, open-source, and excellent user interfaces.
        </p>
        <div class="flex flex-wrap items-center gap-4">
          <UButton to="/projects" color="primary" size="lg">
            View Projects
          </UButton>
          <UButton to="/blog" color="neutral" variant="solid" size="lg">
            Read the Blog
          </UButton>
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
