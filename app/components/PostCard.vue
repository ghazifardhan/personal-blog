<template>
  <NuxtLink :to="to" class="group block h-full bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl overflow-hidden transition-all duration-200 ease-out hover:-translate-y-[2px] hover:shadow-md">
    <div v-if="post.cover" class="aspect-[16/9] w-full overflow-hidden bg-[var(--color-surface-raised)] border-b border-[var(--color-border)]">
      <img :src="post.cover" :alt="post.title" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
    </div>
    <div class="p-6">
      <div class="flex items-center gap-2 mb-3">
        <span v-for="tag in post.tags?.slice(0, 1)" :key="tag" class="px-2 py-1 text-xs font-medium rounded-md bg-[var(--color-tag)] text-[var(--color-accent)]">
          {{ tag }}
        </span>
        <span class="text-xs text-[var(--color-text-secondary)]">{{ new Date(post.publishedAt).toLocaleDateString() }} &middot; {{ post.readTime }} min read</span>
      </div>
      <h3 class="text-xl font-bold mb-2 text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors">{{ post.title }}</h3>
      <p class="text-[var(--color-text-secondary)] text-sm line-clamp-2">{{ post.description }}</p>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{
  post: any,
  to: string
}>()
</script>
