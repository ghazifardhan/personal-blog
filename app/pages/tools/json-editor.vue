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
          <Icon name="lucide:braces" class="text-[var(--color-accent)]" />
          JSON Online Editor
        </h1>
        <p class="text-lg text-[var(--color-text-secondary)]">
          Format, minify, and validate your JSON data instantly.
        </p>
      </div>

      <!-- Editor Container -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[600px]">
        <!-- Input Section -->
        <div class="flex flex-col bg-[var(--color-surface)] border border-[var(--color-border)] rounded-3xl overflow-hidden shadow-xl">
          <div class="flex items-center justify-between px-6 py-4 border-b border-[var(--color-border)] bg-[var(--color-bg)]/50">
            <div class="flex items-center gap-2">
              <Icon name="lucide:file-json" class="text-[var(--color-accent)]" />
              <span class="font-bold text-sm uppercase tracking-widest text-[var(--color-text-primary)]">Input JSON</span>
            </div>
            <div class="flex gap-2">
              <UButton
                size="xs"
                color="neutral"
                variant="ghost"
                icon="i-lucide-trash-2"
                @click="clearJson"
              >
                Clear
              </UButton>
            </div>
          </div>
          <div class="flex-grow relative">
            <textarea
              v-model="jsonInput"
              class="absolute inset-0 w-full h-full p-6 font-mono text-sm bg-transparent text-[var(--color-text-primary)] resize-none outline-none focus:ring-1 focus:ring-[var(--color-accent)]/30 transition-all"
              placeholder='{ "example": "Paste your JSON here" }'
              @input="validateJson"
            ></textarea>
          </div>
          <div v-if="error" class="px-6 py-3 bg-red-500/10 border-t border-red-500/20 text-red-500 text-xs font-mono">
            {{ error }}
          </div>
        </div>

        <!-- Output Section -->
        <div class="flex flex-col bg-[var(--color-surface)] border border-[var(--color-border)] rounded-3xl overflow-hidden shadow-xl">
          <div class="flex items-center justify-between px-6 py-4 border-b border-[var(--color-border)] bg-[var(--color-bg)]/50">
            <div class="flex items-center gap-4">
              <div class="flex items-center gap-2">
                <Icon name="lucide:sparkles" class="text-yellow-500" />
                <span class="font-bold text-sm uppercase tracking-widest text-[var(--color-text-primary)]">Output</span>
              </div>
              <!-- View Toggle -->
              <div class="flex bg-[var(--color-bg)] rounded-lg p-1 border border-[var(--color-border)]">
                <button 
                  @click="viewMode = 'text'"
                  class="px-3 py-1 text-xs font-bold rounded-md transition-all"
                  :class="viewMode === 'text' ? 'bg-[var(--color-accent)] text-white shadow-sm' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'"
                >
                  Text
                </button>
                <button 
                  @click="viewMode = 'tree'"
                  class="px-3 py-1 text-xs font-bold rounded-md transition-all"
                  :class="viewMode === 'tree' ? 'bg-[var(--color-accent)] text-white shadow-sm' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'"
                >
                  Tree
                </button>
              </div>
            </div>
            <div class="flex gap-2">
              <UButton
                size="xs"
                color="neutral"
                variant="ghost"
                icon="i-lucide-copy"
                @click="copyOutput"
              >
                Copy
              </UButton>
              <UButton
                size="xs"
                color="neutral"
                variant="ghost"
                icon="i-lucide-download"
                @click="downloadJson"
              >
                Download
              </UButton>
            </div>
          </div>
          <div class="flex-grow relative bg-[var(--color-bg)]/30 overflow-auto scrollbar-thin">
            <div v-if="viewMode === 'text'" class="p-6">
              <pre class="font-mono text-sm text-[var(--color-text-primary)]"><code>{{ formattedOutput || 'No output yet...' }}</code></pre>
            </div>
            <div v-else class="p-6">
              <div v-if="parsedJson" class="space-y-1">
                <JsonTreeView :data="parsedJson" :depth="0" />
              </div>
              <div v-else class="text-[var(--color-text-secondary)] text-sm italic">
                Invalid JSON or empty input to display tree view.
              </div>
            </div>
          </div>
          <div class="px-6 py-4 bg-[var(--color-bg)]/50 border-t border-[var(--color-border)] flex gap-4">
            <UButton
              color="primary"
              variant="solid"
              icon="i-lucide-align-left"
              class="flex-1 rounded-xl font-bold"
              @click="formatJson"
            >
              Prettify
            </UButton>
            <UButton
              color="neutral"
              variant="outline"
              icon="i-lucide-minimize-2"
              class="flex-1 rounded-xl font-bold"
              @click="minifyJson"
            >
              Minify
            </UButton>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
        <button 
          v-for="action in quickActions" 
          :key="action.name"
          @click="action.handler"
          class="p-6 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl text-left hover:border-[var(--color-accent)] hover:shadow-lg transition-all group"
        >
          <div class="flex items-center gap-3 mb-3">
            <div class="p-2 bg-[var(--color-accent)]/10 rounded-lg group-hover:bg-[var(--color-accent)] group-hover:text-white transition-colors">
              <Icon :name="action.icon" class="w-5 h-5" />
            </div>
            <span class="font-bold text-[var(--color-text-primary)]">{{ action.name }}</span>
          </div>
          <p class="text-sm text-[var(--color-text-secondary)]">{{ action.desc }}</p>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const jsonInput = ref('')
const error = ref<string | null>(null)
const formattedOutput = ref('')
const viewMode = ref<'text' | 'tree'>('text')
const toast = useToast()

const parsedJson = computed(() => {
  if (!jsonInput.value.trim()) return null
  try {
    return JSON.parse(jsonInput.value)
  } catch {
    return null
  }
})

const validateJson = () => {
  if (!jsonInput.value.trim()) {
    error.value = null
    formattedOutput.value = ''
    return
  }
  try {
    JSON.parse(jsonInput.value)
    error.value = null
  } catch (e: any) {
    error.value = e.message
  }
}

const formatJson = () => {
  try {
    const obj = JSON.parse(jsonInput.value)
    formattedOutput.value = JSON.stringify(obj, null, 2)
    error.value = null
    toast.add({ title: 'Formatted!', color: 'success' })
  } catch (e: any) {
    error.value = e.message
    toast.add({ title: 'Invalid JSON', description: 'Please check your input syntax.', color: 'error' })
  }
}

const minifyJson = () => {
  try {
    const obj = JSON.parse(jsonInput.value)
    formattedOutput.value = JSON.stringify(obj)
    error.value = null
    toast.add({ title: 'Minified!', color: 'success' })
  } catch (e: any) {
    error.value = e.message
    toast.add({ title: 'Invalid JSON', description: 'Please check your input syntax.', color: 'error' })
  }
}

const clearJson = () => {
  jsonInput.value = ''
  formattedOutput.value = ''
  error.value = null
}

const copyOutput = () => {
  if (!formattedOutput.value) return
  navigator.clipboard.writeText(formattedOutput.value)
  toast.add({ title: 'Copied!', description: 'JSON copied to clipboard.', color: 'success' })
}

const downloadJson = () => {
  if (!formattedOutput.value) return
  const blob = new Blob([formattedOutput.value], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'data.json'
  a.click()
  URL.revokeObjectURL(url)
}

const loadSample = () => {
  const sample = {
    project: "GhaziFadil Blog",
    author: "Ghazi Fadil",
    features: ["Blog", "Projects", "Tools"],
    stats: {
      uptime: "99.9%",
      coffee_consumed: 9001
    },
    active: true
  }
  jsonInput.value = JSON.stringify(sample, null, 2)
  validateJson()
  formatJson()
}

const quickActions = [
  {
    name: 'Load Sample',
    icon: 'lucide:database',
    desc: 'Load a complex JSON object to test the features.',
    handler: loadSample
  },
  {
    name: 'Repair JSON',
    icon: 'lucide:wrench',
    desc: 'Fix common errors like single quotes or missing braces.',
    handler: () => {
      // Basic repair logic (very simple for now)
      let repaired = jsonInput.value.replace(/'/g, '"')
      jsonInput.value = repaired
      validateJson()
      toast.add({ title: 'Basic Repair Applied', description: 'Converted single quotes to double quotes.', color: 'neutral' })
    }
  },
  {
    name: 'Clean Whitespace',
    icon: 'lucide:eraser',
    desc: 'Remove unnecessary spaces and newlines from input.',
    handler: () => {
      jsonInput.value = jsonInput.value.trim()
      toast.add({ title: 'Cleaned!', color: 'neutral' })
    }
  }
]

useSeoMeta({
  title: 'JSON Online Editor - GhaziFadil Tools',
  description: 'A free, fast online JSON formatter, validator, and minifier. Work with your data locally and securely.',
})
</script>

<style scoped>
pre, textarea {
  scrollbar-width: thin;
  scrollbar-color: var(--color-border) transparent;
}
pre::-webkit-scrollbar, textarea::-webkit-scrollbar {
  width: 6px;
}
pre::-webkit-scrollbar-thumb, textarea::-webkit-scrollbar-thumb {
  background-color: var(--color-border);
  border-radius: 10px;
}
code {
  white-space: pre-wrap;
  word-break: break-all;
}
</style>
