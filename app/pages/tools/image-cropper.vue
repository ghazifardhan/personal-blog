<template>
  <div class="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-[var(--color-bg)]">
    <div class="max-w-5xl mx-auto">
      <!-- Breadcrumbs -->
      <NuxtLink to="/tools" class="inline-flex items-center text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] mb-8 transition-colors">
        <Icon name="lucide:arrow-left" class="w-4 h-4 mr-2" />
        Back to Tools
      </NuxtLink>

      <!-- Header -->
      <div class="mb-12">
        <h1 class="text-4xl font-bold text-[var(--color-text-primary)] mb-4 flex items-center gap-3">
          <Icon name="lucide:crop" class="text-[var(--color-accent)]" />
          Image Cropper
        </h1>
        <p class="text-lg text-[var(--color-text-secondary)]">
          Crop and rotate your images with precision. Choose from presets or free-form selection locally in your browser.
        </p>
      </div>

      <!-- Main Container -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Editor Section -->
        <div class="lg:col-span-2 space-y-6">
          <div class="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-3xl overflow-hidden shadow-xl min-h-[500px] flex flex-col">
            <!-- Drop Zone / Cropper -->
            <div v-if="!imgUrl" class="flex-grow flex items-center justify-center p-12">
              <div 
                class="w-full border-2 border-dashed border-[var(--color-border)] rounded-3xl p-12 text-center hover:border-[var(--color-accent)]/50 transition-all cursor-pointer group"
                @click="triggerFileInput"
                @dragover.prevent
                @drop.prevent="handleDrop"
              >
                <input type="file" ref="fileInput" class="hidden" accept="image/*" @change="handleFileChange">
                <div class="w-20 h-20 bg-[var(--color-accent)]/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Icon name="lucide:image-plus" class="w-10 h-10 text-[var(--color-accent)]" />
                </div>
                <h3 class="text-xl font-bold text-[var(--color-text-primary)] mb-2">Upload image to crop</h3>
                <p class="text-[var(--color-text-secondary)]">Drag and drop or click to select</p>
              </div>
            </div>

            <div v-else class="flex-grow relative bg-[#000]">
              <Cropper
                ref="cropperRef"
                class="h-full w-full"
                :src="imgUrl"
                :stencil-props="{
                  aspectRatio: aspectRatio
                }"
              />
            </div>

            <!-- Toolbar -->
            <div v-if="imgUrl" class="px-6 py-4 border-t border-[var(--color-border)] bg-[var(--color-bg)]/50 flex flex-wrap items-center justify-center gap-4">
              <div class="flex items-center gap-2 border-r border-[var(--color-border)] pr-4">
                <UButton size="sm" color="neutral" variant="ghost" icon="i-lucide-rotate-ccw" @click="rotate(-90)" />
                <UButton size="sm" color="neutral" variant="ghost" icon="i-lucide-rotate-cw" @click="rotate(90)" />
              </div>
              <div class="flex items-center gap-2">
                <UButton size="sm" color="neutral" variant="ghost" icon="i-lucide-flip-horizontal" @click="flip(true, false)" />
                <UButton size="sm" color="neutral" variant="ghost" icon="i-lucide-flip-vertical" @click="flip(false, true)" />
              </div>
              <div class="ml-auto">
                <UButton size="sm" color="error" variant="ghost" icon="i-lucide-trash-2" @click="reset">
                  Remove
                </UButton>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar Settings -->
        <div class="space-y-8">
          <div class="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-3xl overflow-hidden shadow-xl">
            <div class="px-6 py-4 border-b border-[var(--color-border)] bg-[var(--color-bg)]/50">
              <span class="font-bold text-sm uppercase tracking-widest text-[var(--color-text-primary)]">Settings</span>
            </div>
            <div class="p-8 space-y-8">
              <!-- Aspect Ratio -->
              <div class="space-y-4">
                <label class="text-sm font-bold text-[var(--color-text-primary)]">Aspect Ratio</label>
                <div class="grid grid-cols-2 gap-2">
                  <UButton
                    v-for="ratio in ratios"
                    :key="ratio.value"
                    size="md"
                    :color="selectedRatio === ratio.value ? 'primary' : 'neutral'"
                    :variant="selectedRatio === ratio.value ? 'solid' : 'outline'"
                    class="rounded-xl font-bold"
                    @click="selectedRatio = ratio.value"
                  >
                    {{ ratio.label }}
                  </UButton>
                </div>
              </div>

              <!-- Export Button -->
              <UButton
                color="primary"
                size="xl"
                class="w-full rounded-2xl font-bold py-4 shadow-lg shadow-[var(--color-accent)]/20"
                icon="i-lucide-download"
                :disabled="!imgUrl"
                @click="downloadCrop"
              >
                Download Result
              </UButton>
            </div>
          </div>

          <!-- Info Box -->
          <div class="p-6 bg-blue-500/5 border border-blue-500/10 rounded-3xl flex gap-4">
            <Icon name="lucide:shield-check" class="w-6 h-6 text-blue-500 flex-shrink-0" />
            <p class="text-sm text-[var(--color-text-secondary)] leading-relaxed">
              <strong>Privacy First:</strong> Your image processing happens entirely in your browser. No files are uploaded to any server.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css'

const imgUrl = ref<string | null>(null)
const selectedRatio = ref('free')
const aspectRatio = computed(() => {
  if (selectedRatio.value === 'free') return undefined
  const parts = selectedRatio.value.split('/').map(Number)
  const width = parts[0]
  const height = parts[1]
  if (width === undefined || height === undefined || height === 0) return undefined
  return width / height
})
const fileInput = ref<HTMLInputElement | null>(null)
const cropperRef = ref<any>(null)
const toast = useToast()

const ratios = [
  { label: 'Free', value: 'free' },
  { label: '1:1 Square', value: '1/1' },
  { label: '16:9 Wide', value: '16/9' },
  { label: '4:3 Standard', value: '4/3' },
  { label: '3:2 Photo', value: '3/2' },
  { label: '9:16 Story', value: '9/16' }
]

const triggerFileInput = () => fileInput.value?.click()

const handleFileChange = (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (file) processFile(file)
}

const handleDrop = (e: DragEvent) => {
  const file = e.dataTransfer?.files[0]
  if (file) processFile(file)
}

const processFile = (file: File) => {
  if (!file.type.startsWith('image/')) {
    toast.add({ title: 'Invalid file', description: 'Please upload an image.', color: 'error' })
    return
  }
  imgUrl.value = URL.createObjectURL(file)
}

const rotate = (angle: number) => {
  if (cropperRef.value) cropperRef.value.rotate(angle)
}

const flip = (horizontally: boolean, vertically: boolean) => {
  if (cropperRef.value) cropperRef.value.flip(horizontally, vertically)
}

const downloadCrop = () => {
  if (!cropperRef.value) return
  
  const { canvas } = cropperRef.value.getResult()
  if (canvas) {
    const link = document.createElement('a')
    link.download = 'cropped-image.png'
    link.href = canvas.toDataURL()
    link.click()
    toast.add({ title: 'Downloaded!', color: 'success' })
  }
}

const reset = () => {
  imgUrl.value = null
  if (fileInput.value) fileInput.value.value = ''
}

useSeoMeta({
  title: 'Image Cropper - GhaziFadil Tools',
  description: 'Crop, rotate, and flip your images with precision. A free, private, and powerful online image cropper.',
})
</script>

<style scoped>
.vue-advanced-cropper {
  background: #000;
}
</style>
