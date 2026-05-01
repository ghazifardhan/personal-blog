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
          <Icon name="lucide:file-down" class="text-[var(--color-accent)]" />
          Image Compressor
        </h1>
        <p class="text-lg text-[var(--color-text-secondary)]">
          Reduce image file size without losing quality. Process multiple formats locally and privately.
        </p>
      </div>

      <!-- Main Container -->
      <div class="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-3xl overflow-hidden shadow-xl">
        <div class="p-8 md:p-12">
          <!-- Drop Zone -->
          <div 
            v-if="!originalFile"
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
                accept="image/*" 
                @change="handleFileSelect"
              >
              <div class="w-20 h-20 bg-[var(--color-accent)]/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Icon name="lucide:image-plus" class="w-10 h-10 text-[var(--color-accent)]" />
              </div>
              <h3 class="text-xl font-bold text-[var(--color-text-primary)] mb-2">Click or drag image here</h3>
              <p class="text-[var(--color-text-secondary)]">Supports PNG, JPG, WebP, and more</p>
            </div>
          </div>

          <!-- Processing Area -->
          <div v-else class="space-y-8">
            <!-- Settings Card -->
            <div class="p-6 bg-[var(--color-bg)]/50 border border-[var(--color-border)] rounded-2xl flex flex-wrap items-center gap-6">
              <div class="flex-grow min-w-[200px] space-y-2">
                <div class="flex justify-between">
                  <label class="text-sm font-bold text-[var(--color-text-primary)]">Target Max Size (MB)</label>
                  <span class="text-xs font-mono text-[var(--color-accent)] font-bold">{{ maxSizeMB }} MB</span>
                </div>
                <input 
                  type="range" 
                  v-model="maxSizeMB" 
                  min="0.1" 
                  max="5" 
                  step="0.1"
                  class="w-full h-2 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg appearance-none cursor-pointer accent-[var(--color-accent)]"
                />
              </div>
              <UButton
                color="primary"
                size="xl"
                class="rounded-xl font-bold px-8"
                :loading="isCompressing"
                @click="compressImage"
              >
                {{ isCompressing ? 'Compressing...' : 'Compress Now' }}
              </UButton>
            </div>

            <!-- Comparison Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <!-- Original -->
              <div class="space-y-3">
                <div class="flex justify-between items-end">
                  <p class="text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-widest">Original</p>
                  <span class="text-sm font-mono font-bold">{{ (originalFile.size / 1024 / 1024).toFixed(2) }} MB</span>
                </div>
                <div class="relative aspect-video rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] overflow-hidden flex items-center justify-center">
                  <img :src="originalUrl" class="max-w-full max-h-full object-contain" />
                </div>
              </div>

              <!-- Compressed -->
              <div class="space-y-3">
                <div class="flex justify-between items-end">
                  <p class="text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-widest">Compressed</p>
                  <span v-if="compressedFile" class="text-sm font-mono font-bold text-green-500">
                    {{ (compressedFile.size / 1024 / 1024).toFixed(2) }} MB 
                    <span class="text-xs ml-1">({{ Math.round((1 - compressedFile.size / originalFile.size) * 100) }}% reduction)</span>
                  </span>
                  <span v-else class="text-sm font-mono text-[var(--color-text-secondary)] italic">Ready to compress</span>
                </div>
                <div class="relative aspect-video rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] overflow-hidden flex items-center justify-center">
                  <img v-if="compressedUrl" :src="compressedUrl" class="max-w-full max-h-full object-contain" />
                  <div v-else class="text-[var(--color-text-secondary)] text-sm italic">Result will appear here</div>
                  <div v-if="isCompressing" class="absolute inset-0 bg-[var(--color-surface)]/80 backdrop-blur-sm flex items-center justify-center">
                    <Icon name="lucide:loader-2" class="w-8 h-8 animate-spin text-[var(--color-accent)]" />
                  </div>
                </div>
              </div>
            </div>

            <!-- Bottom Actions -->
            <div class="flex flex-col sm:flex-row gap-4 pt-4 border-t border-[var(--color-border)]">
              <UButton
                v-if="compressedFile"
                color="primary"
                size="xl"
                class="flex-1 rounded-2xl font-bold"
                icon="i-lucide-download"
                @click="downloadCompressed"
              >
                Download Compressed
              </UButton>
              <UButton
                color="neutral"
                variant="outline"
                size="xl"
                class="flex-1 rounded-2xl font-bold"
                icon="i-lucide-refresh-ccw"
                @click="reset"
              >
                Choose Different Image
              </UButton>
            </div>
          </div>
        </div>
      </div>

      <!-- Features Info -->
      <div class="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
        <div class="space-y-2">
          <div class="w-12 h-12 bg-green-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Icon name="lucide:shield-check" class="w-6 h-6 text-green-500" />
          </div>
          <h4 class="font-bold text-[var(--color-text-primary)]">100% Private</h4>
          <p class="text-sm text-[var(--color-text-secondary)]">Your images are processed locally. They never leave your browser.</p>
        </div>
        <div class="space-y-2">
          <div class="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Icon name="lucide:cpu" class="w-6 h-6 text-blue-500" />
          </div>
          <h4 class="font-bold text-[var(--color-text-primary)]">Smart Compression</h4>
          <p class="text-sm text-[var(--color-text-secondary)]">Optimizes metadata and image data for maximum size reduction.</p>
        </div>
        <div class="space-y-2">
          <div class="w-12 h-12 bg-yellow-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Icon name="lucide:zap" class="w-6 h-6 text-yellow-500" />
          </div>
          <h4 class="font-bold text-[var(--color-text-primary)]">Fast Export</h4>
          <p class="text-sm text-[var(--color-text-secondary)]">Immediate download of the optimized result once compression is done.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import imageCompression from 'browser-image-compression'

const isDragging = ref(false)
const isCompressing = ref(false)
const originalFile = ref<File | null>(null)
const originalUrl = ref<string | undefined>(undefined)
const compressedFile = ref<File | null>(null)
const compressedUrl = ref<string | undefined>(undefined)
const maxSizeMB = ref(1.0)
const fileInput = ref<HTMLInputElement | null>(null)
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
  if (!file.type.startsWith('image/')) {
    toast.add({ title: 'Invalid format', description: 'Please select an image file.', color: 'error' })
    return
  }
  originalFile.value = file
  originalUrl.value = URL.createObjectURL(file)
  compressedFile.value = null
  compressedUrl.value = undefined
}

const compressImage = async () => {
  if (!originalFile.value) return
  
  isCompressing.value = true
  const options = {
    maxSizeMB: maxSizeMB.value,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  }

  try {
    const compressed = await imageCompression(originalFile.value, options)
    compressedFile.value = compressed
    compressedUrl.value = URL.createObjectURL(compressed)
    toast.add({ title: 'Success!', description: 'Your image has been compressed.', color: 'success' })
  } catch (error) {
    console.error(error)
    toast.add({ title: 'Error', description: 'Failed to compress image.', color: 'error' })
  } finally {
    isCompressing.value = false
  }
}

const downloadCompressed = () => {
  if (!compressedUrl.value || !compressedFile.value) return
  const link = document.createElement('a')
  link.href = compressedUrl.value
  link.download = `compressed_${originalFile.value?.name || 'image.jpg'}`
  link.click()
}

const reset = () => {
  originalFile.value = null
  originalUrl.value = undefined
  compressedFile.value = null
  compressedUrl.value = undefined
}

useSeoMeta({
  title: 'Image Compressor - GhaziFadil Tools',
  description: 'A free, private online image compressor. Reduce file size without losing quality locally in your browser.',
})
</script>

<style scoped>
input[type="range"] {
  scrollbar-width: thin;
}
</style>
