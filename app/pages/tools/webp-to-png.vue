<template>
  <div class="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-[var(--color-bg)]">
    <div class="max-w-4xl mx-auto">
      <!-- Breadcrumbs -->
      <NuxtLink to="/tools" class="inline-flex items-center text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] mb-8 transition-colors">
        <Icon name="lucide:arrow-left" class="w-4 h-4 mr-2" />
        Back to Tools
      </NuxtLink>

      <!-- Header -->
      <div class="mb-12">
        <h1 class="text-4xl font-bold text-[var(--color-text-primary)] mb-4 flex items-center gap-3">
          <Icon name="lucide:image" class="text-[var(--color-accent)]" />
          WebP to PNG Converter
        </h1>
        <p class="text-lg text-[var(--color-text-secondary)]">
          Convert your WebP images to PNG format instantly and privately in your browser.
        </p>
      </div>

      <!-- Main Container -->
      <div class="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-3xl overflow-hidden shadow-xl">
        <div class="p-8 md:p-12">
          <!-- Drop Zone -->
          <div 
            v-if="!originalImage"
            @dragover.prevent="isDragging = true"
            @dragleave.prevent="isDragging = false"
            @drop.prevent="handleDrop"
            class="relative group"
          >
            <div 
              class="border-2 border-dashed rounded-3xl p-12 text-center transition-all cursor-pointer"
              :class="isDragging ? 'border-[var(--color-accent)] bg-[var(--color-accent)]/5' : 'border-[var(--color-border)] hover:border-[var(--color-accent)]/50'"
              @click="triggerFileInput"
            >
              <input 
                type="file" 
                ref="fileInput" 
                class="hidden" 
                accept="image/webp" 
                @change="handleFileSelect"
              >
              <div class="w-20 h-20 bg-[var(--color-accent)]/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Icon name="lucide:upload-cloud" class="w-10 h-10 text-[var(--color-accent)]" />
              </div>
              <h3 class="text-xl font-bold text-[var(--color-text-primary)] mb-2">Click or drag WebP here</h3>
              <p class="text-[var(--color-text-secondary)]">Supports single WebP image conversion</p>
            </div>
          </div>

          <!-- Conversion Area -->
          <div v-else class="space-y-8">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <!-- Original -->
              <div class="space-y-3">
                <p class="text-sm font-bold text-[var(--color-text-secondary)] uppercase tracking-widest">Original (WebP)</p>
                <div class="relative aspect-square rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] overflow-hidden flex items-center justify-center">
                  <img :src="originalImage" class="max-w-full max-h-full object-contain" />
                  <div class="absolute bottom-4 left-4 px-3 py-1 bg-black/50 backdrop-blur-md rounded-full text-[10px] text-white font-mono">
                    {{ (originalSize / 1024).toFixed(1) }} KB
                  </div>
                </div>
              </div>

              <!-- Preview -->
              <div class="space-y-3">
                <p class="text-sm font-bold text-[var(--color-text-secondary)] uppercase tracking-widest">Preview (PNG)</p>
                <div class="relative aspect-square rounded-2xl border border-[var(--color-border)] bg-checkerboard overflow-hidden flex items-center justify-center">
                  <canvas ref="canvasRef" class="max-w-full max-h-full object-contain"></canvas>
                  <div v-if="isConverting" class="absolute inset-0 bg-[var(--color-surface)]/80 backdrop-blur-sm flex items-center justify-center">
                    <Icon name="lucide:loader-2" class="w-8 h-8 animate-spin text-[var(--color-accent)]" />
                  </div>
                </div>
              </div>
            </div>

            <!-- Actions -->
            <div class="flex flex-col sm:flex-row gap-4 pt-4 border-t border-[var(--color-border)]">
              <UButton
                color="primary"
                size="xl"
                class="flex-1 rounded-2xl font-bold"
                icon="i-lucide-download"
                @click="downloadPng"
              >
                Download PNG
              </UButton>
              <UButton
                color="neutral"
                variant="outline"
                size="xl"
                class="flex-1 rounded-2xl font-bold"
                icon="i-lucide-refresh-ccw"
                @click="reset"
              >
                Convert Another
              </UButton>
            </div>
          </div>
        </div>
      </div>

      <!-- Info Cards -->
      <div class="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div class="p-6 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl">
          <Icon name="lucide:lock" class="w-6 h-6 text-[var(--color-accent)] mb-4" />
          <h4 class="font-bold text-[var(--color-text-primary)] mb-2">Private</h4>
          <p class="text-sm text-[var(--color-text-secondary)]">Processing happens in your browser. No images are uploaded to any server.</p>
        </div>
        <div class="p-6 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl">
          <Icon name="lucide:zap" class="w-6 h-6 text-yellow-500 mb-4" />
          <h4 class="font-bold text-[var(--color-text-primary)] mb-2">Instant</h4>
          <p class="text-sm text-[var(--color-text-secondary)]">Powered by native browser Canvas API for lightning-fast conversion.</p>
        </div>
        <div class="p-6 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl">
          <Icon name="lucide:check-circle" class="w-6 h-6 text-green-500 mb-4" />
          <h4 class="font-bold text-[var(--color-text-primary)] mb-2">Quality</h4>
          <p class="text-sm text-[var(--color-text-secondary)]">Maintains original dimensions and color accuracy during conversion.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isDragging = ref(false)
const originalImage = ref<string | null>(null)
const originalSize = ref(0)
const fileInput = ref<HTMLInputElement | null>(null)
const canvasRef = ref<HTMLCanvasElement | null>(null)
const isConverting = ref(false)
const toast = useToast()

const triggerFileInput = () => fileInput.value?.click()

const handleFileSelect = (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (file) processFile(file)
}

const handleDrop = (e: DragEvent) => {
  isDragging.value = false
  const file = e.dataTransfer?.files[0]
  if (file) processFile(file)
}

const processFile = (file: File) => {
  if (file.type !== 'image/webp') {
    toast.add({ title: 'Invalid format', description: 'Please select a WebP image.', color: 'error' })
    return
  }

  originalSize.value = file.size
  const reader = new FileReader()
  reader.onload = (e) => {
    originalImage.value = e.target?.result as string
    convertToPng()
  }
  reader.readAsDataURL(file)
}

const convertToPng = () => {
  isConverting.value = true
  const img = new Image()
  img.onload = () => {
    if (!canvasRef.value) return
    const canvas = canvasRef.value
    canvas.width = img.width
    canvas.height = img.height
    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.drawImage(img, 0, 0)
      isConverting.value = false
    }
  }
  img.src = originalImage.value || ''
}

const downloadPng = () => {
  if (!canvasRef.value) return
  const url = canvasRef.value.toDataURL('image/png')
  const a = document.createElement('a')
  a.href = url
  a.download = 'converted.png'
  a.click()
  toast.add({ title: 'Downloaded!', color: 'success' })
}

const reset = () => {
  originalImage.value = null
  originalSize.value = 0
}

useSeoMeta({
  title: 'WebP to PNG Converter - GhaziFadil Tools',
  description: 'A free, private online WebP to PNG converter. Process your images safely in your browser.',
})
</script>

<style scoped>
.bg-checkerboard {
  background-image: 
    linear-gradient(45deg, var(--color-bg) 25%, transparent 25%), 
    linear-gradient(-45deg, var(--color-bg) 25%, transparent 25%), 
    linear-gradient(45deg, transparent 75%, var(--color-bg) 75%), 
    linear-gradient(-45deg, transparent 75%, var(--color-bg) 75%);
  background-size: 16px 16px;
  background-position: 0 0, 0 8px, 8px -8px, -8px 0px;
}
</style>
