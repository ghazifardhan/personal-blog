<template>
  <div v-if="post">
    <!-- Reading Progress -->
    <div class="fixed top-0 left-0 h-[2px] bg-[var(--color-accent)] z-50 transition-all duration-150" :style="{ width: readingProgress + '%' }"></div>
    
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-20 flex flex-col lg:flex-row gap-12">
      <!-- Main Content -->
      <article class="flex-1 max-w-3xl">
        <header class="mb-12">
          <div class="flex items-center gap-3 mb-6">
            <span v-for="tag in post.tags" :key="tag" class="px-3 py-1 text-sm font-medium rounded-full bg-[var(--color-tag)] text-[var(--color-accent)]">
              {{ tag }}
            </span>
          </div>
          <h1 class="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 text-[var(--color-text-primary)]">{{ post.title }}</h1>
          <div class="flex items-center text-[var(--color-text-secondary)]">
            <time :datetime="post.publishedAt">{{ new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) }}</time>
            <span class="mx-2">&middot;</span>
            <span>{{ post.readTime }} min read</span>
          </div>
        </header>

        <div v-if="post.cover" class="mb-12 aspect-[16/9] w-full rounded-2xl overflow-hidden bg-[var(--color-surface-raised)] border border-[var(--color-border)]">
          <img :src="post.cover" :alt="post.title" class="w-full h-full object-cover" />
        </div>

        <div class="prose prose-zinc dark:prose-invert max-w-none prose-pre:bg-[var(--color-code-bg)] prose-pre:border prose-pre:border-[var(--color-border)] prose-headings:text-[var(--color-text-primary)] prose-a:text-[var(--color-accent)]">
          <ContentRenderer v-if="post" :value="post" />
        </div>

        <!-- Comments Section -->
        <BlogComments />
      </article>

      <!-- Sidebar (TOC) -->
      <aside class="hidden lg:block w-64 shrink-0">
        <div class="sticky top-24">
          <h3 class="text-sm font-bold uppercase tracking-wider text-[var(--color-text-primary)] mb-4">Table of Contents</h3>
          <nav v-if="post.body?.toc?.links?.length" class="space-y-2">
            <a 
              v-for="link in post.body.toc.links" 
              :key="link.id" 
              :href="`#${link.id}`"
              class="block text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors"
              :class="{ 'ml-4': link.depth > 2 }"
            >
              {{ link.text }}
            </a>
          </nav>
        </div>

        <div class="mt-8 pt-8 border-t border-[var(--color-border)] sticky top-[calc(24px+200px)]">
          <h3 class="text-sm font-bold uppercase tracking-wider text-[var(--color-text-primary)] mb-4">Share Article</h3>
          <div class="flex gap-2">
            <UButton
              icon="i-simple-icons:x"
              color="neutral"
              variant="ghost"
              @click="handleShare('twitter')"
              aria-label="Share on X"
              :class="{ 'animate-click': animatingBtn === 'twitter' }"
            />
            <UButton
              icon="i-simple-icons:linkedin"
              color="neutral"
              variant="ghost"
              @click="handleShare('linkedin')"
              aria-label="Share on LinkedIn"
              :class="{ 'animate-click': animatingBtn === 'linkedin' }"
            />
            <UButton
              icon="i-heroicons:link"
              color="neutral"
              variant="ghost"
              @click="handleShare('copy')"
              aria-label="Copy Link"
              :class="{ 'animate-click': animatingBtn === 'copy' }"
            />
          </div>
        </div>
      </aside>
    </div>

    <!-- Related Posts -->
    <section v-if="relatedPosts?.length" class="bg-[var(--color-surface-raised)] py-20 mt-20 border-t border-[var(--color-border)]">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold mb-12 text-[var(--color-text-primary)]">Related Articles</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <PostCard v-for="related in relatedPosts" :key="related.id" :post="related" :to="related.path" />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

const { data: post } = await useAsyncData(`blog-${route.params.slug}`, () => 
  queryCollection('blog').path(route.path).first()
)

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Post not found', fatal: true })
}

const { data: relatedPosts } = await useAsyncData(`blog-${route.params.slug}-related`, () => 
  queryCollection('blog')
    .where('path', '<>', route.path)
    .limit(3)
    .all()
)

useSeoMeta({
  title: post.value?.title + ' | Ghazi Fadil Blog',
  description: post.value?.description,
  ogTitle: post.value?.title,
  ogDescription: post.value?.description,
  ogImage: post.value?.cover,
  ogType: 'article',
  articlePublishedTime: post.value?.publishedAt,
  articleAuthor: ['Ghazi Fadil'],
  twitterCard: 'summary_large_image'
})

useSchemaOrg([
  defineArticle({
    headline: post.value?.title,
    description: post.value?.description,
    datePublished: post.value?.publishedAt,
    image: post.value?.cover,
    author: [
      { name: 'Ghazi Fadil', url: 'https://ghazifadil.com' }
    ]
  })
])

const toast = useToast()
const url = useRequestURL()
const animatingBtn = ref<string | null>(null)

const handleShare = (platform: string) => {
  animatingBtn.value = platform
  setTimeout(() => { animatingBtn.value = null }, 400)

  if (platform === 'twitter') shareOnTwitter()
  else if (platform === 'linkedin') shareOnLinkedIn()
  else if (platform === 'copy') copyLink()
}

const shareOnTwitter = () => {
  window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.value?.title || '')}&url=${encodeURIComponent(url.href)}`, '_blank')
}

const shareOnLinkedIn = () => {
  window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url.href)}`, '_blank')
}

const copyLink = () => {
  navigator.clipboard.writeText(url.href)
  toast.add({
    title: 'Link copied!',
    description: 'The article link has been copied to your clipboard.',
    icon: 'i-heroicons:check-circle',
    color: 'success'
  })
}

const readingProgress = ref(0)

const updateProgress = () => {
  const scrollTop = window.scrollY
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  readingProgress.value = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
}

onMounted(() => {
  window.addEventListener('scroll', updateProgress)
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateProgress)
})
</script>
