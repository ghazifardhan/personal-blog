<template>
  <NuxtLink :to="to" class="group block h-full bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl overflow-hidden transition-all duration-200 ease-out hover:-translate-y-[2px] hover:shadow-md">
    <div v-if="normalizedPost.cover" class="aspect-[16/9] w-full overflow-hidden bg-[var(--color-surface-raised)] border-b border-[var(--color-border)]">
      <img :src="normalizedPost.cover" :alt="normalizedPost.title" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
    </div>
    <div class="p-6">
      <div class="flex items-center gap-2 mb-3">
        <span v-for="tag in normalizedPost.tags.slice(0, 1)" :key="tag" class="px-2 py-1 text-xs font-medium rounded-md bg-[var(--color-tag)] text-[var(--color-accent)]">
          {{ tag }}
        </span>
        <span class="text-xs text-[var(--color-text-secondary)]">
          {{ normalizedPost.dateLabel }}<template v-if="normalizedPost.dateLabel && normalizedPost.readTime"> &middot; </template>{{ normalizedPost.readTime }} min read
        </span>
      </div>
      <h3 class="text-xl font-bold mb-2 text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors">{{ normalizedPost.title }}</h3>
      <p class="text-[var(--color-text-secondary)] text-sm line-clamp-2">{{ normalizedPost.description }}</p>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
const props = defineProps<{
  post: any,
  to: string
}>()

const firstString = (value: any): string => {
  if (typeof value === 'string') return value
  if (typeof value === 'number') return String(value)
  if (!value || typeof value !== 'object') return ''

  for (const key of ['title', 'description', 'value', 'text', 'label', 'name']) {
    const normalized = firstString(value[key])
    if (normalized) return normalized
  }

  return ''
}

const normalizeTags = (tags: any): string[] => {
  if (Array.isArray(tags)) return tags.map(firstString).filter(Boolean)
  if (typeof tags === 'string') {
    try {
      const parsed = JSON.parse(tags)
      if (Array.isArray(parsed)) return parsed.map(firstString).filter(Boolean)
    } catch {
      return tags.split(',').map(tag => tag.trim()).filter(Boolean)
    }
  }
  return []
}

const formatDate = (value: any): string => {
  const raw = firstString(value)
  if (!raw) return ''

  const date = new Date(raw)
  if (Number.isNaN(date.getTime())) return raw

  return date.toLocaleDateString()
}

const normalizedPost = computed(() => {
  const title = firstString(props.post?.title) || firstString(props.post?.navigation?.title) || 'Untitled'

  return {
    title,
    description: firstString(props.post?.description) || firstString(props.post?.navigation?.description),
    cover: firstString(props.post?.cover),
    tags: normalizeTags(props.post?.tags),
    readTime: Number(props.post?.readTime) || 5,
    dateLabel: formatDate(props.post?.publishedAt)
  }
})
</script>
