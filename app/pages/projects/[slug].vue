<template>
  <div v-if="project" class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12 md:py-20">
    <header class="mb-12 text-center">
      <div class="mb-6 flex justify-center">
        <span class="px-3 py-1 text-sm font-medium rounded-full capitalize" :class="{
          'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400': project.status === 'completed',
          'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400': project.status === 'in-progress',
          'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400': project.status === 'archived'
        }">
          {{ project.status?.replace('-', ' ') }}
        </span>
      </div>
      <h1 class="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 text-[var(--color-text-primary)]">{{ project.title }}</h1>
      <p class="text-xl text-[var(--color-text-secondary)] mb-8 max-w-3xl mx-auto">{{ project.description }}</p>
      
      <div class="flex flex-wrap items-center justify-center gap-4">
        <UButton v-if="project.live" :to="project.live" target="_blank" color="primary" size="lg">
          Visit Project <Icon name="lucide:external-link" class="ml-2 w-4 h-4" />
        </UButton>
        <UButton v-if="project.github" :to="project.github" target="_blank" color="neutral" variant="solid" size="lg">
          Source Code <Icon name="lucide:github" class="ml-2 w-4 h-4" />
        </UButton>
      </div>
    </header>

    <div v-if="project.cover" class="mb-16 aspect-[21/9] w-full rounded-2xl overflow-hidden bg-[var(--color-surface-raised)] border border-[var(--color-border)] shadow-xl">
      <img :src="project.cover" :alt="project.title" class="w-full h-full object-cover" />
    </div>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-12">
      <div class="md:col-span-1 space-y-8">
        <div>
          <h3 class="text-sm font-bold uppercase tracking-wider text-[var(--color-text-primary)] mb-3">Tech Stack</h3>
          <div class="flex flex-wrap gap-2">
            <span v-for="tech in project.stack" :key="tech" class="px-2 py-1 text-xs font-medium rounded-md bg-[var(--color-surface-raised)] text-[var(--color-text-primary)] border border-[var(--color-border)]">
              {{ tech }}
            </span>
          </div>
        </div>
        
        <div>
          <h3 class="text-sm font-bold uppercase tracking-wider text-[var(--color-text-primary)] mb-3">Tags</h3>
          <div class="flex flex-wrap gap-2">
            <span v-for="tag in project.tags" :key="tag" class="text-sm text-[var(--color-accent)]">
              #{{ tag }}
            </span>
          </div>
        </div>
      </div>

      <article class="md:col-span-3 prose prose-zinc dark:prose-invert max-w-none prose-pre:bg-[var(--color-code-bg)] prose-pre:border prose-pre:border-[var(--color-border)] prose-headings:text-[var(--color-text-primary)] prose-a:text-[var(--color-accent)]">
        <ContentRenderer :value="project" />
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

const { data: project } = await useAsyncData(`project-${route.params.slug}`, () => 
  queryCollection('projects').path(route.path).first()
)

if (!project.value) {
  throw createError({ statusCode: 404, statusMessage: 'Project not found', fatal: true })
}

useSeoMeta({
  title: project.value?.title + ' | Projects | Ghazi Fadil',
  description: project.value?.description,
  ogTitle: project.value?.title,
  ogDescription: project.value?.description,
  ogImage: project.value?.cover,
  twitterCard: 'summary_large_image'
})

useSchemaOrg([
  defineWebPage({
    name: project.value?.title,
    description: project.value?.description,
    image: project.value?.cover
  })
])
</script>
