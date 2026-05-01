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
          <Icon name="lucide:image-minus" class="text-[var(--color-accent)]" />
          Background Remover
        </h1>
        <p class="text-lg text-[var(--color-text-secondary)]">
          Remove image backgrounds instantly in your browser. 100% private & local.
        </p>
      </div>

      <!-- Main Container -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Upload / Original Section -->
        <div class="space-y-6">
          <div 
            class="relative aspect-square rounded-3xl border-2 border-dashed border-[var(--color-border)] bg-[var(--color-surface)] flex flex-col items-center justify-center overflow-hidden group transition-all"
            :class="{ 'border-[var(--color-accent)] bg-[var(--color-accent)]/5': isDragging }"
            @dragover.prevent="isDragging = true"
            @dragleave.prevent="isDragging = false"
            @drop.prevent="handleDrop"
          >
            <template v-if="!originalImage">
              <Icon name="lucide:upload-cloud" class="w-16 h-16 text-[var(--color-text-secondary)] mb-4 group-hover:text-[var(--color-accent)] transition-colors" />
              <p class="text-[var(--color-text-primary)] font-bold mb-2">Drag and drop your image</p>
              <p class="text-xs text-[var(--color-text-secondary)]">PNG, JPG up to 10MB</p>
              <input type="file" class="absolute inset-0 opacity-0 cursor-pointer" @change="handleFileSelect" accept="image/*" />
            </template>
            <template v-else>
              <img :src="originalImage" class="w-full h-full object-contain" alt="Original" />
              <button 
                @click="clearImages" 
                class="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                aria-label="Clear Image"
              >
                <Icon name="lucide:x" class="w-5 h-5" />
              </button>
            </template>
          </div>
          
          <UButton
            v-if="originalImage && !isProcessing && !resultImage"
            block
            size="xl"
            class="bg-[var(--color-accent)] hover:bg-[var(--color-accent)]/90 text-white font-bold rounded-2xl py-4"
            icon="i-lucide-wand-2"
            @click="removeBackgroundAction"
          >
            Remove Background
          </UButton>
        </div>

        <!-- Result Section -->
        <div class="space-y-6">
          <div class="relative aspect-square rounded-3xl border-2 border-[var(--color-border)] bg-[var(--color-surface)] bg-checkerboard flex flex-col items-center justify-center overflow-hidden transition-all shadow-inner">
            <template v-if="isProcessing">
              <div class="text-center p-8">
                <div class="relative w-24 h-24 mx-auto mb-6">
                  <div class="absolute inset-0 border-4 border-[var(--color-accent)]/20 rounded-full"></div>
                  <div class="absolute inset-0 border-4 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin"></div>
                </div>
                <p class="text-[var(--color-text-primary)] font-bold mb-2">Processing...</p>
                <p class="text-xs text-[var(--color-text-secondary)] px-4">This might take a few seconds as we process the image locally.</p>
              </div>
            </template>
            <template v-else-if="resultImage">
              <img :src="resultImage" class="w-full h-full object-contain" alt="Result" />
              <div class="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
                <UButton
                  color="neutral"
                  variant="solid"
                  icon="i-lucide-download"
                  @click="downloadResult"
                  class="rounded-xl font-bold"
                >
                  Download PNG
                </UButton>
              </div>
            </template>
            <template v-else>
              <div class="text-center text-[var(--color-text-secondary)] opacity-50">
                <Icon name="lucide:image" class="w-16 h-16 mb-4 mx-auto" />
                <p class="font-medium">Your result will appear here</p>
              </div>
            </template>
          </div>

          <div v-if="resultImage" class="flex gap-4">
            <UButton
              block
              variant="outline"
              color="neutral"
              icon="i-lucide-refresh-cw"
              @click="clearImages"
              class="rounded-2xl py-4"
            >
              Start Over
            </UButton>
          </div>
        </div>
      </div>

      <!-- Info Footer -->
      <div class="mt-16 p-8 bg-[var(--color-surface-raised)] rounded-3xl border border-[var(--color-border)]">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <Icon name="lucide:shield-check" class="w-10 h-10 text-[var(--color-accent)] mb-4 mx-auto" />
            <h4 class="font-bold text-[var(--color-text-primary)] mb-2">Private</h4>
            <p class="text-sm text-[var(--color-text-secondary)]">Your images never leave your device. All processing is done locally in your browser.</p>
          </div>
          <div>
            <Icon name="lucide:zap" class="w-10 h-10 text-[var(--color-accent)] mb-4 mx-auto" />
            <h4 class="font-bold text-[var(--color-text-primary)] mb-2">Quality</h4>
            <p class="text-sm text-[var(--color-text-secondary)]">High-resolution output with professional-grade edge detection.</p>
          </div>
          <div>
            <Icon name="lucide:credit-card" class="w-10 h-10 text-[var(--color-accent)] mb-4 mx-auto" />
            <h4 class="font-bold text-[var(--color-text-primary)] mb-2">Free</h4>
            <p class="text-sm text-[var(--color-text-secondary)]">No limits, no credits, no subscriptions. Just a simple tool for you to use.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const originalImage = ref<string | null>(null)
const resultImage = ref<string | null>(null)
const isDragging = ref(false)
const isProcessing = ref(false)
const toast = useToast()

let removeBackground: any = null

onMounted(async () => {
  try {
    // Dynamic import to ensure it only runs on the client
    const module = await import('@imgly/background-removal')
    removeBackground = module.removeBackground
  } catch (error) {
    console.error('Failed to load background removal module:', error)
  }
})

const handleFileSelect = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    loadFile(input.files[0])
  }
}

const handleDrop = (event: DragEvent) => {
  isDragging.value = false
  if (event.dataTransfer?.files && event.dataTransfer.files[0]) {
    loadFile(event.dataTransfer.files[0])
  }
}

const loadFile = (file: File) => {
  if (!file.type.startsWith('image/')) {
    toast.add({ title: 'Invalid file', description: 'Please select an image file.', color: 'error' })
    return
  }
  
  const reader = new FileReader()
  reader.onload = (e) => {
    originalImage.value = e.target?.result as string
    resultImage.value = null
  }
  reader.readAsDataURL(file)
}

const clearImages = () => {
  originalImage.value = null
  resultImage.value = null
}

const removeBackgroundAction = async () => {
  if (!originalImage.value || !removeBackground) return
  
  isProcessing.value = true
  try {
    const blob = await removeBackground(originalImage.value, {
      progress: (key: string, current: number, total: number) => {
        console.log(`Downloading ${key}: ${current}/${total}`)
      }
    })
    resultImage.value = URL.createObjectURL(blob)
    toast.add({ title: 'Success!', description: 'Background removed successfully.', color: 'success' })
  } catch (error) {
    console.error('Background removal failed:', error)
    toast.add({ title: 'Error', description: 'Failed to remove background. Please try a different image.', color: 'error' })
  } finally {
    isProcessing.value = false
  }
}

const downloadResult = () => {
  if (!resultImage.value) return
  const link = document.createElement('a')
  link.href = resultImage.value
  link.download = 'removed-background.png'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

useSeoMeta({
  title: 'Background Image Remover - GhaziFadil Tools',
  description: 'Remove image backgrounds instantly and locally in your browser. No data leaves your device.',
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
