<template>
  <NuxtLink :to="to" class="group block h-full bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl overflow-hidden transition-all duration-200 ease-out hover:-translate-y-[2px] hover:shadow-md flex flex-col">
    <div class="aspect-[16/9] w-full overflow-hidden bg-[var(--color-surface-raised)] border-b border-[var(--color-border)] shrink-0 flex items-center justify-center">
      <img v-if="project.cover" :src="project.cover" :alt="project.title" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
      <div v-else class="flex flex-col items-center justify-center text-[var(--color-text-secondary)] opacity-50">
        <Icon name="lucide:code-2" class="w-12 h-12 mb-2" />
        <span class="text-xs font-medium uppercase tracking-wider">Project Preview</span>
      </div>
    </div>
    <div class="p-6 flex flex-col flex-grow">
      <div class="flex items-center justify-between mb-3">
        <span class="px-2 py-1 text-xs font-medium rounded-md capitalize" :class="{
          'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400': project.status === 'completed',
          'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400': project.status === 'in-progress',
          'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400': project.status === 'archived'
        }">
          {{ project.status?.replace('-', ' ') }}
        </span>
        <div class="flex items-center gap-2" @click.prevent>
          <a v-if="project.github" :href="project.github" target="_blank" class="text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors">
            <Icon name="lucide:github" class="w-5 h-5" />
          </a>
          <a v-if="project.live" :href="project.live" target="_blank" class="text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors">
            <Icon name="lucide:external-link" class="w-5 h-5" />
          </a>
        </div>
      </div>
      <h3 class="text-xl font-bold mb-2 text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors">{{ project.title }}</h3>
      <p class="text-[var(--color-text-secondary)] text-sm line-clamp-2 mb-4">{{ project.description }}</p>
      
      <div class="flex flex-wrap gap-2 mt-auto pt-4 border-t border-[var(--color-border)]/50">
        <span v-for="tech in project.stack.slice(0, 3)" :key="tech" class="px-2 py-1 text-xs font-medium rounded-md bg-[var(--color-surface-raised)] text-[var(--color-text-primary)] border border-[var(--color-border)]">
          {{ tech }}
        </span>
        <span v-if="project.stack.length > 3" class="px-2 py-1 text-xs font-medium rounded-md bg-[var(--color-surface-raised)] text-[var(--color-text-secondary)] border border-[var(--color-border)]">
          +{{ project.stack.length - 3 }}
        </span>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{
  project: any,
  to: string
}>()
</script>
