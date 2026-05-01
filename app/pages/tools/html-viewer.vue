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
          <Icon name="lucide:code-2" class="text-[var(--color-accent)]" />
          HTML Online Viewer
        </h1>
        <p class="text-lg text-[var(--color-text-secondary)]">
          Write, edit, and preview your HTML, CSS, and JS in real-time.
        </p>
      </div>

      <!-- Editor & Preview Container -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[700px]">
        <!-- Editor Section -->
        <div class="flex flex-col bg-[var(--color-surface)] border border-[var(--color-border)] rounded-3xl overflow-hidden shadow-xl">
          <div class="flex items-center justify-between px-6 py-4 border-b border-[var(--color-border)] bg-[var(--color-bg)]/50">
            <div class="flex items-center gap-2">
              <Icon name="lucide:code" class="text-[var(--color-accent)]" />
              <span class="font-bold text-sm uppercase tracking-widest text-[var(--color-text-primary)]">Source Code</span>
            </div>
            <div class="flex gap-2">
              <UButton
                size="xs"
                color="neutral"
                variant="ghost"
                icon="i-lucide-trash-2"
                @click="clearCode"
              >
                Clear
              </UButton>
              <UButton
                size="xs"
                color="neutral"
                variant="ghost"
                icon="i-lucide-copy"
                @click="copyCode"
              >
                Copy
              </UButton>
            </div>
          </div>
          <div class="flex-grow relative">
            <textarea
              v-model="htmlCode"
              class="absolute inset-0 w-full h-full p-6 font-mono text-sm bg-transparent text-[var(--color-text-primary)] resize-none outline-none focus:ring-1 focus:ring-[var(--color-accent)]/30 transition-all"
              placeholder="<!-- Write your HTML here -->
<div class='card'>
  <h1>Hello World</h1>
</div>

<style>
  .card {
    padding: 2rem;
    background: #f0f0f0;
    border-radius: 1rem;
    text-align: center;
  }
</style>"
            ></textarea>
          </div>
        </div>

        <!-- Preview Section -->
        <div class="flex flex-col bg-[var(--color-surface)] border border-[var(--color-border)] rounded-3xl overflow-hidden shadow-xl">
          <div class="flex items-center justify-between px-6 py-4 border-b border-[var(--color-border)] bg-[var(--color-bg)]/50">
            <div class="flex items-center gap-2">
              <Icon name="lucide:eye" class="text-blue-500" />
              <span class="font-bold text-sm uppercase tracking-widest text-[var(--color-text-primary)]">Live Preview</span>
            </div>
            <div class="flex gap-2">
              <UButton
                size="xs"
                color="neutral"
                variant="ghost"
                icon="i-lucide-external-link"
                @click="openInNewWindow"
              >
                Popout
              </UButton>
              <UButton
                size="xs"
                color="neutral"
                variant="ghost"
                icon="i-lucide-download"
                @click="downloadCode"
              >
                Download
              </UButton>
            </div>
          </div>
          <div class="flex-grow bg-white">
            <iframe
              :srcdoc="htmlCode"
              class="w-full h-full border-none"
              sandbox="allow-scripts"
            ></iframe>
          </div>
        </div>
      </div>

      <!-- Quick Templates -->
      <div class="mt-12">
        <h3 class="text-xl font-bold text-[var(--color-text-primary)] mb-6">Quick Start Templates</h3>
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
import { ref, watch, onMounted } from 'vue'

const htmlCode = ref('')
const toast = useToast()

const clearCode = () => {
  htmlCode.value = ''
}

const copyCode = () => {
  navigator.clipboard.writeText(htmlCode.value)
  toast.add({ title: 'Copied!', description: 'Code copied to clipboard.', color: 'success' })
}

const openInNewWindow = () => {
  const blob = new Blob([htmlCode.value], { type: 'text/html' })
  const url = URL.createObjectURL(blob)
  window.open(url, '_blank')
}

const downloadCode = () => {
  const blob = new Blob([htmlCode.value], { type: 'text/html' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'index.html'
  a.click()
  URL.revokeObjectURL(url)
}

const templates = [
  {
    name: 'Basic Landing',
    icon: 'lucide:layout',
    desc: 'A simple hero section with a call to action.',
    code: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: system-ui, sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; background: #f8fafc; }
    .hero { text-align: center; padding: 4rem; background: white; border-radius: 2rem; shadow: 0 10px 25px -5px rgba(0,0,0,0.1); }
    h1 { color: #1e293b; font-size: 3rem; margin: 0; }
    p { color: #64748b; font-size: 1.25rem; margin: 1.5rem 0; }
    button { background: #3b82f6; color: white; border: none; padding: 1rem 2rem; border-radius: 0.75rem; font-weight: 600; cursor: pointer; transition: 0.2s; }
    button:hover { background: #2563eb; transform: scale(1.05); }
  </style>
</head>
<body>
  <div class="hero">
    <h1>Supercharge Your Workflow</h1>
    <p>Build beautiful components in record time with our live HTML viewer.</p>
    <button>Get Started Free</button>
  </div>
</body>
</html>`
  },
  {
    name: 'Interactive Button',
    icon: 'lucide:mouse-pointer-2',
    desc: 'An animated button with hover effects and JS.',
    code: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; background: #0f172a; }
    .btn { 
      background: linear-gradient(135deg, #6366f1, #a855f7); 
      color: white; border: none; padding: 1.5rem 3rem; 
      border-radius: 1rem; font-size: 1.5rem; font-weight: bold; 
      cursor: pointer; transition: all 0.3s;
      box-shadow: 0 0 20px rgba(99, 102, 241, 0.4);
    }
    .btn:hover { transform: translateY(-5px); box-shadow: 0 10px 30px rgba(99, 102, 241, 0.6); }
    .btn:active { transform: scale(0.95); }
  </style>
</head>
<body>
  <button class="btn" onclick="celebrate()">Click Me!</button>
  <script>
    function celebrate() {
      const btn = document.querySelector('.btn');
      btn.textContent = 'Awesome! ✨';
      setTimeout(() => btn.textContent = 'Click Me!', 2000);
    }
  <\/script>
</body>
</html>`
  },
  {
    name: 'Modern Form',
    icon: 'lucide:form-input',
    desc: 'A clean contact form layout with CSS styling.',
    code: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: system-ui, sans-serif; background: #f3f4f6; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; }
    form { background: white; padding: 2.5rem; border-radius: 1.5rem; width: 100%; max-width: 400px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); }
    h2 { margin-top: 0; color: #111827; }
    .field { margin-bottom: 1.5rem; }
    label { display: block; font-size: 0.875rem; font-weight: 500; color: #374151; margin-bottom: 0.5rem; }
    input { width: 100%; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 0.5rem; box-sizing: border-box; }
    button { width: 100%; background: #111827; color: white; border: none; padding: 0.75rem; border-radius: 0.5rem; font-weight: 600; cursor: pointer; }
    button:hover { background: #1f2937; }
  </style>
</head>
<body>
  <form onsubmit="event.preventDefault(); alert('Sent!');">
    <h2>Contact Us</h2>
    <div class="field">
      <label>Email Address</label>
      <input type="email" placeholder="you@example.com" required>
    </div>
    <div class="field">
      <label>Message</label>
      <input type="text" placeholder="How can we help?">
    </div>
    <button type="submit">Send Message</button>
  </form>
</body>
</html>`
  }
]

const loadTemplate = (code: string) => {
  htmlCode.value = code
  toast.add({ title: 'Template Loaded', description: 'The editor has been updated with the template.', color: 'success' })
}

onMounted(() => {
  if (templates.length > 0) {
    loadTemplate(templates?.at(0)?.code as string)
  }
})

useSeoMeta({
  title: 'HTML Online Viewer - GhaziFadil Tools',
  description: 'A real-time HTML, CSS, and JavaScript viewer and editor. Write code and see the preview instantly.',
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
