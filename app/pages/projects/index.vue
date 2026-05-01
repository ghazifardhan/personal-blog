<template>
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-20">
    <div class="mb-12">
      <h1 class="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-[var(--color-text-primary)]">Projects</h1>
      <p class="text-lg text-[var(--color-text-secondary)] max-w-2xl mb-8">A collection of open-source work, personal projects, and experiments.</p>
      
      <div class="flex flex-wrap gap-2">
        <UButton
          v-for="tag in allTags"
          :key="tag"
          :variant="activeTag === tag ? 'solid' : 'ghost'"
          :color="activeTag === tag ? 'primary' : 'neutral'"
          size="sm"
          class="rounded-full"
          @click="activeTag = activeTag === tag ? null : tag"
        >
          {{ tag }}
        </UButton>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <ProjectCard v-for="project in filteredProjects" :key="project.id" :project="project" :to="project.path" />
    </div>

    <div v-if="!filteredProjects?.length" class="text-center py-20">
      <p class="text-[var(--color-text-secondary)] text-lg">No projects found for this tag.</p>
      <UButton variant="link" color="primary" @click="activeTag = null">Clear filter</UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
const { data: projects } = await useAsyncData('projects-list', () => queryCollection('projects').order('order', 'ASC').all())

const activeTag = ref<string | null>(null)

const allTags = computed(() => {
  const tags = new Set<string>()
  projects.value?.forEach(p => {
    p.tags?.forEach(tag => tags.add(tag))
  })
  return Array.from(tags)
})

const filteredProjects = computed(() => {
  if (!activeTag.value) return projects.value
  return projects.value?.filter(p => p.tags?.includes(activeTag.value!))
})
</script>
