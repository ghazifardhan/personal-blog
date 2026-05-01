<template>
  <div class="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-[var(--color-bg)]">
    <div class="max-w-6xl mx-auto">
      <!-- Breadcrumbs -->
      <NuxtLink to="/tools" class="inline-flex items-center text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] mb-8 transition-colors">
        <Icon name="lucide:arrow-left" class="w-4 h-4 mr-2" />
        Back to Tools
      </NuxtLink>

      <!-- Header -->
      <div class="mb-12">
        <h1 class="text-4xl font-bold text-[var(--color-text-primary)] mb-4 flex items-center gap-3">
          <Icon name="lucide:file-edit" class="text-[var(--color-accent)]" />
          Markdown Online Editor
        </h1>
        <p class="text-lg text-[var(--color-text-secondary)]">
          Write and preview Markdown with real-time rendering and beautiful typography.
        </p>
      </div>

      <!-- Toolbar -->
      <div class="mb-6 flex flex-wrap gap-2 p-3 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl shadow-sm">
        <UButton
          v-for="tool in toolbarTools"
          :key="tool.name"
          size="xs"
          color="neutral"
          variant="ghost"
          :icon="tool.icon"
          @click="tool.handler"
          class="hover:bg-[var(--color-accent)]/10"
        >
          {{ tool.name }}
        </UButton>
      </div>

      <!-- Editor Container -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[600px]">
        <!-- Input Section -->
        <div class="flex flex-col bg-[var(--color-surface)] border border-[var(--color-border)] rounded-3xl overflow-hidden shadow-xl">
          <div class="flex items-center justify-between px-6 py-4 border-b border-[var(--color-border)] bg-[var(--color-bg)]/50">
            <div class="flex items-center gap-2">
              <Icon name="lucide:code" class="text-[var(--color-accent)]" />
              <span class="font-bold text-sm uppercase tracking-widest text-[var(--color-text-primary)]">Markdown Source</span>
            </div>
            <div class="flex gap-2">
              <UButton
                size="xs"
                color="neutral"
                variant="ghost"
                icon="i-lucide-trash-2"
                @click="clearMarkdown"
              >
                Clear
              </UButton>
            </div>
          </div>
          <div class="flex-grow relative">
            <textarea
              ref="editorRef"
              v-model="markdownInput"
              class="absolute inset-0 w-full h-full p-6 font-mono text-sm bg-transparent text-[var(--color-text-primary)] resize-none outline-none focus:ring-1 focus:ring-[var(--color-accent)]/30 transition-all"
              placeholder="# Hello World\n\nStart writing your markdown here..."
            ></textarea>
          </div>
        </div>

        <!-- Preview Section -->
        <div class="flex flex-col bg-[var(--color-surface)] border border-[var(--color-border)] rounded-3xl overflow-hidden shadow-xl">
          <div class="flex items-center justify-between px-6 py-4 border-b border-[var(--color-border)] bg-[var(--color-bg)]/50">
            <div class="flex items-center gap-2">
              <Icon name="lucide:eye" class="text-blue-500" />
              <span class="font-bold text-sm uppercase tracking-widest text-[var(--color-text-primary)]">Rendered Preview</span>
            </div>
            <div class="flex gap-2">
              <UButton
                size="xs"
                color="neutral"
                variant="ghost"
                icon="i-lucide-copy"
                @click="copyHtml"
              >
                Copy HTML
              </UButton>
              <UButton
                size="xs"
                color="neutral"
                variant="ghost"
                icon="i-lucide-download"
                @click="downloadMarkdown"
              >
                Download
              </UButton>
            </div>
          </div>
          <div class="flex-grow bg-[var(--color-bg)]/30 overflow-auto scrollbar-thin p-8">
            <div class="prose prose-sm md:prose-base dark:prose-invert max-w-none" v-html="renderedHtml"></div>
          </div>
        </div>
      </div>

      <!-- Quick Templates -->
      <div class="mt-12">
        <h3 class="text-xl font-bold text-[var(--color-text-primary)] mb-6">Quick Templates</h3>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <button 
            v-for="template in templates" 
            :key="template.name"
            @click="loadTemplate(template.code)"
            class="p-6 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl text-left hover:border-[var(--color-accent)] hover:shadow-lg transition-all group"
          >
            <div class="flex items-center gap-3 mb-3">
              <div class="p-2 bg-[var(--color-accent)]/10 rounded-lg group-hover:bg-[var(--color-accent)] group-hover:text-white transition-colors">
                <Icon :name="template.icon" class="w-5 h-5" />
              </div>
              <span class="font-bold text-[var(--color-text-primary)]">{{ template.name }}</span>
            </div>
            <p class="text-sm text-[var(--color-text-secondary)]">{{ template.desc }}</p>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { marked } from 'marked'

const markdownInput = ref('')
const editorRef = ref<HTMLTextAreaElement | null>(null)
const toast = useToast()

const renderedHtml = computed(() => {
  return marked.parse(markdownInput.value || '')
})

const insertText = (prefix: string, suffix: string = '') => {
  if (!editorRef.value) return
  const textarea = editorRef.value
  const start = textarea.selectionStart
  const end = textarea.selectionEnd
  const text = markdownInput.value
  const before = text.substring(0, start)
  const after = text.substring(end)
  const selection = text.substring(start, end) || 'text'
  
  markdownInput.value = before + prefix + selection + suffix + after
  
  // Set focus back to textarea
  setTimeout(() => {
    textarea.focus()
    textarea.setSelectionRange(start + prefix.length, start + prefix.length + selection.length)
  }, 0)
}

const toolbarTools = [
  { name: 'Bold', icon: 'i-lucide-bold', handler: () => insertText('**', '**') },
  { name: 'Italic', icon: 'i-lucide-italic', handler: () => insertText('*', '*') },
  { name: 'Heading', icon: 'i-lucide-heading', handler: () => insertText('# ', '') },
  { name: 'Link', icon: 'i-lucide-link', handler: () => insertText('[', '](https://)') },
  { name: 'Image', icon: 'i-lucide-image', handler: () => insertText('![alt](', ')') },
  { name: 'Quote', icon: 'i-lucide-quote', handler: () => insertText('> ', '') },
  { name: 'Code', icon: 'i-lucide-code', handler: () => insertText('`', '`') },
  { name: 'List', icon: 'i-lucide-list', handler: () => insertText('- ', '') }
]

const clearMarkdown = () => {
  markdownInput.value = ''
}

const copyHtml = () => {
  if (!renderedHtml.value) return
  navigator.clipboard.writeText(renderedHtml.value as string)
  toast.add({ title: 'HTML Copied!', description: 'The rendered HTML has been copied to your clipboard.', color: 'success' })
}

const downloadMarkdown = () => {
  if (!markdownInput.value) return
  const blob = new Blob([markdownInput.value], { type: 'text/markdown' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'document.md'
  a.click()
  URL.revokeObjectURL(url)
}

const templates = [
  {
    name: 'Blog Post',
    icon: 'lucide:pen-tool',
    desc: 'A standard blog post layout with headings and lists.',
    code: '# My Awesome Blog Post\n\n## Introduction\nWelcome to my first blog post! Today we are exploring the power of **Markdown**.\n\n### Features\n- Real-time preview\n- Clean typography\n- Export to HTML\n\n> "Markdown is a text-to-HTML conversion tool for web writers." - John Gruber'
  },
  {
    name: 'Readme File',
    icon: 'lucide:file-text',
    desc: 'Classic README.md structure for your projects.',
    code: '# Project Name\n\nShort description of what your project does.\n\n## Installation\n```bash\nnpm install my-project\n```\n\n## Usage\nExplain how to use your tool here.\n\n## License\nMIT'
  },
  {
    name: 'Todo List',
    icon: 'lucide:check-square',
    desc: 'A simple task list with checkboxes.',
    code: '# Weekly Goals\n\n- [x] Complete the Tools section\n- [ ] Optimize image loading\n- [ ] Write a new blog post\n- [x] Fix dependency errors'
  }
]

const loadTemplate = (code: string) => {
  markdownInput.value = code
}

// Initial template
onMounted(() => {
  loadTemplate(templates.at(0)?.code || '')
})

useSeoMeta({
  title: 'Markdown Online Editor - GhaziFadil Tools',
  description: 'A professional online Markdown editor with real-time rendering, beautiful typography, and helpful writing tools.',
})
</script>

<style scoped>
textarea {
  scrollbar-width: thin;
  scrollbar-color: var(--color-border) transparent;
}
textarea::-webkit-scrollbar {
  width: 6px;
}
textarea::-webkit-scrollbar-thumb {
  background-color: var(--color-border);
  border-radius: 10px;
}
</style>
