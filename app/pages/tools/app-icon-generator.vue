<template>
  <div class="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-[var(--color-bg)]">
    <div class="max-w-7xl mx-auto">
      <!-- Breadcrumbs -->
      <NuxtLink to="/tools" class="inline-flex items-center text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] mb-8 transition-colors">
        <Icon name="lucide:arrow-left" class="w-4 h-4 mr-2" />
        Back to Tools
      </NuxtLink>

      <!-- Header -->
      <div class="mb-12">
        <h1 class="text-4xl font-bold text-[var(--color-text-primary)] mb-4 flex items-center gap-3">
          <Icon name="lucide:layout-grid" class="text-[var(--color-accent)]" />
          App Icon Generator
        </h1>
        <p class="text-lg text-[var(--color-text-secondary)]">
          Create professional app icons for iOS, Android, and Web instantly. Inspired by icon.kitchen.
        </p>
      </div>

      <!-- Main Interface -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <!-- Configuration Panel -->
        <div class="lg:col-span-4 space-y-6">
          <div class="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-3xl overflow-hidden shadow-xl">
            <div class="px-6 py-4 border-b border-[var(--color-border)] bg-[var(--color-bg)]/50 flex items-center gap-2">
              <Icon name="lucide:settings-2" class="text-[var(--color-accent)]" />
              <span class="font-bold text-sm uppercase tracking-widest text-[var(--color-text-primary)]">Settings</span>
            </div>
            
            <div class="p-8 space-y-8">
              <!-- Icon Upload -->
              <div class="space-y-4">
                <label class="text-sm font-bold text-[var(--color-text-primary)]">Foreground Icon</label>
                <div 
                  class="border-2 border-dashed border-[var(--color-border)] rounded-2xl p-6 text-center hover:border-[var(--color-accent)]/50 transition-all cursor-pointer group relative"
                  @click="triggerFileInput"
                >
                  <input type="file" ref="fileInput" class="hidden" accept="image/*" @change="handleFileChange">
                  <div v-if="!fgImage" class="space-y-2">
                    <Icon name="lucide:upload-cloud" class="w-8 h-8 text-[var(--color-text-secondary)] mx-auto group-hover:text-[var(--color-accent)] transition-colors" />
                    <p class="text-xs text-[var(--color-text-secondary)]">SVG or PNG (Best if transparent)</p>
                  </div>
                  <div v-else class="flex items-center justify-center">
                    <img :src="fgUrl" class="w-16 h-16 object-contain rounded-lg shadow-sm" />
                    <button 
                      class="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      @click.stop="fgImage = null; fgUrl = ''; renderAll()"
                    >
                      <Icon name="lucide:x" class="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>

              <!-- Background Color -->
              <div class="space-y-4">
                <label class="text-sm font-bold text-[var(--color-text-primary)]">Background Color</label>
                <div class="flex items-center gap-4">
                  <input 
                    type="color" 
                    v-model="bgColor" 
                    class="w-12 h-12 rounded-xl border-none cursor-pointer bg-transparent"
                    @input="renderAll"
                  />
                  <div class="flex-grow flex gap-2 overflow-auto pb-1">
                    <button 
                      v-for="color in presetColors" 
                      :key="color"
                      class="w-6 h-6 rounded-full border border-[var(--color-border)] flex-shrink-0"
                      :style="{ backgroundColor: color }"
                      @click="bgColor = color; renderAll()"
                    ></button>
                  </div>
                </div>
              </div>

              <!-- Scaling -->
              <div class="space-y-4">
                <div class="flex justify-between">
                  <label class="text-sm font-bold text-[var(--color-text-primary)]">Icon Scale</label>
                  <span class="text-xs font-mono text-[var(--color-accent)] font-bold">{{ scale }}%</span>
                </div>
                <input 
                  type="range" 
                  v-model="scale" 
                  min="10" 
                  max="100" 
                  class="w-full h-2 bg-[var(--color-bg)] rounded-lg appearance-none cursor-pointer accent-[var(--color-accent)]"
                  @input="renderAll"
                />
              </div>

              <!-- Offset X/Y -->
              <div class="grid grid-cols-2 gap-4">
                <div class="space-y-2">
                  <label class="text-xs font-bold text-[var(--color-text-secondary)]">Offset X</label>
                  <input 
                    type="number" 
                    v-model="offsetX" 
                    class="w-full p-2 rounded-lg bg-[var(--color-bg)] border border-[var(--color-border)] text-sm outline-none focus:ring-1 focus:ring-[var(--color-accent)]"
                    @input="renderAll"
                  />
                </div>
                <div class="space-y-2">
                  <label class="text-xs font-bold text-[var(--color-text-secondary)]">Offset Y</label>
                  <input 
                    type="number" 
                    v-model="offsetY" 
                    class="w-full p-2 rounded-lg bg-[var(--color-bg)] border border-[var(--color-border)] text-sm outline-none focus:ring-1 focus:ring-[var(--color-accent)]"
                    @input="renderAll"
                  />
                </div>
              </div>
            </div>

            <div class="px-8 py-6 bg-[var(--color-bg)]/50 border-t border-[var(--color-border)]">
              <UButton
                color="primary"
                size="xl"
                class="w-full rounded-2xl font-bold shadow-lg shadow-[var(--color-accent)]/20"
                icon="i-lucide-download"
                @click="downloadAll"
              >
                Download Icons (ZIP)
              </UButton>
            </div>
          </div>
        </div>

        <!-- Preview Panel -->
        <div class="lg:col-span-8 space-y-8">
          <!-- Main Preview -->
          <div class="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-3xl overflow-hidden shadow-xl">
            <div class="px-6 py-4 border-b border-[var(--color-border)] bg-[var(--color-bg)]/50 flex items-center justify-between">
              <div class="flex items-center gap-2">
                <Icon name="lucide:eye" class="text-[var(--color-accent)]" />
                <span class="font-bold text-sm uppercase tracking-widest text-[var(--color-text-primary)]">Preview</span>
              </div>
              <div class="flex bg-[var(--color-bg)] rounded-xl p-1 border border-[var(--color-border)]">
                <button 
                  v-for="p in platforms" 
                  :key="p.id"
                  class="px-4 py-1.5 rounded-lg text-xs font-bold transition-all"
                  :class="activePlatform === p.id ? 'bg-[var(--color-surface)] text-[var(--color-accent)] shadow-sm' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'"
                  @click="activePlatform = p.id"
                >
                  {{ p.name }}
                </button>
              </div>
            </div>

            <div class="p-12 md:p-20 flex items-center justify-center bg-checkered min-h-[500px]">
              <div class="relative group">
                <canvas 
                  ref="previewCanvas" 
                  width="1024" 
                  height="1024"
                  class="w-[300px] h-[300px] md:w-[400px] md:h-[400px] transition-all duration-300 shadow-2xl"
                  :style="{ 
                    ...previewStyle,
                    boxShadow: '0 20px 50px -12px rgba(0,0,0,0.5)'
                  }"
                ></canvas>
                <!-- Badge Simulation -->
                <div v-if="activePlatform === 'ios'" class="absolute -top-4 -right-4 w-12 h-12 bg-red-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center text-white font-bold text-xl">1</div>
              </div>
            </div>
          </div>

          <!-- Platform Grid -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div v-for="size in currentSizes" :key="size" class="p-4 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl space-y-3">
              <div class="aspect-square bg-checkered rounded-xl overflow-hidden flex items-center justify-center p-2">
                <img :src="renderedIcon" class="max-w-full max-h-full object-contain" :style="previewStyle" />
              </div>
              <p class="text-[10px] font-mono font-bold text-[var(--color-text-secondary)]">{{ size }}x{{ size }}px</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import JSZip from 'jszip'

const fgImage = ref<HTMLImageElement | null>(null)
const fgUrl = ref('')
const bgColor = ref('#6366f1')
const scale = ref(60)
const offsetX = ref(0)
const offsetY = ref(0)
const activePlatform = ref('ios')
const renderedIcon = ref('')
const previewCanvas = ref<HTMLCanvasElement | null>(null)
const fileInput = ref<HTMLInputElement | null>(null)
const toast = useToast()

const presetColors = ['#000000', '#ffffff', '#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899']

const platforms = [
  { id: 'ios', name: 'iOS' },
  { id: 'android', name: 'Android' },
  { id: 'web', name: 'Web/PWA' }
]

const previewStyle = computed(() => {
  if (activePlatform.value === 'ios') {
    return {
      borderRadius: '22.5%',
      overflow: 'hidden'
    }
  }
  if (activePlatform.value === 'android') {
    return { borderRadius: '50%', overflow: 'hidden' }
  }
  return { borderRadius: '0%', overflow: 'hidden' }
})

const currentSizes = computed(() => {
  if (activePlatform.value === 'ios') return [1024, 180, 167, 120]
  if (activePlatform.value === 'android') return [512, 192, 144, 96]
  return [512, 192, 144, 32]
})

const triggerFileInput = () => fileInput.value?.click()

const handleFileChange = (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = (event) => {
    const img = new Image()
    img.onload = () => {
      fgImage.value = img
      fgUrl.value = event.target?.result as string
      renderAll()
    }
    img.src = event.target?.result as string
  }
  reader.readAsDataURL(file)
}

const renderAll = () => {
  if (!previewCanvas.value) return
  const ctx = previewCanvas.value.getContext('2d')
  if (!ctx) return

  const size = 1024
  
  // Background
  ctx.fillStyle = bgColor.value
  ctx.fillRect(0, 0, size, size)

  // Foreground
  if (fgImage.value) {
    const s = scale.value / 100
    const w = fgImage.value.width
    const h = fgImage.value.height
    const aspect = w / h
    
    let drawW, drawH
    if (aspect > 1) {
      drawW = size * s
      drawH = drawW / aspect
    } else {
      drawH = size * s
      drawW = drawH * aspect
    }

    const x = (size - drawW) / 2 + Number(offsetX.value)
    const y = (size - drawH) / 2 + Number(offsetY.value)

    ctx.drawImage(fgImage.value, x, y, drawW, drawH)
  }

  renderedIcon.value = previewCanvas.value.toDataURL()
}

const downloadAll = async () => {
  if (!previewCanvas.value) return
  
  const zip = new JSZip()
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  toast.add({ title: 'Generating professional asset pack...', color: 'neutral' })

  // Helper to get blob from canvas
  const getBlob = (c: HTMLCanvasElement): Promise<Blob | null> => 
    new Promise(resolve => c.toBlob(resolve, 'image/png'))

  // 1. Android Export
  const androidFolder = zip.folder("android")
  const resFolder = androidFolder?.folder("res")
  
  // Android Full Sizes
  const androidConfigs = [
    { name: 'mdpi', size: 48 },
    { name: 'hdpi', size: 72 },
    { name: 'xhdpi', size: 96 },
    { name: 'xxhdpi', size: 144 },
    { name: 'xxxhdpi', size: 192 }
  ]

  // Play Store Icon
  canvas.width = 512
  canvas.height = 512
  ctx.drawImage(previewCanvas.value, 0, 0, 512, 512)
  androidFolder?.file("play_store_512.png", await getBlob(canvas) as Blob)

  for (const config of androidConfigs) {
    const folder = resFolder?.folder(`mipmap-${config.name}`)
    
    // Composite Icon
    canvas.width = config.size
    canvas.height = config.size
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(previewCanvas.value, 0, 0, config.size, config.size)
    folder?.file("ic_launcher.png", await getBlob(canvas) as Blob)

    // Foreground Only
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    if (fgImage.value) {
      const s = scale.value / 100
      const w = fgImage.value.width
      const h = fgImage.value.height
      const aspect = w / h
      let drawW, drawH
      if (aspect > 1) {
        drawW = config.size * s
        drawH = drawW / aspect
      } else {
        drawH = config.size * s
        drawW = drawH * aspect
      }
      const x = (config.size - drawW) / 2 + (Number(offsetX.value) * (config.size / 1024))
      const y = (config.size - drawH) / 2 + (Number(offsetY.value) * (config.size / 1024))
      ctx.drawImage(fgImage.value, x, y, drawW, drawH)
    }
    folder?.file("ic_launcher_foreground.png", await getBlob(canvas) as Blob)

    // Background Only
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = bgColor.value
    ctx.fillRect(0, 0, config.size, config.size)
    folder?.file("ic_launcher_background.png", await getBlob(canvas) as Blob)
  }

  // 2. iOS Export
  const iosFolder = zip.folder("ios")
  const iosSizes = [
    { name: 'AppIcon-20@2x.png', size: 40 },
    { name: 'AppIcon-20@3x.png', size: 60 },
    { name: 'AppIcon-29@2x.png', size: 58 },
    { name: 'AppIcon-29@3x.png', size: 87 },
    { name: 'AppIcon-40@2x.png', size: 80 },
    { name: 'AppIcon-40@3x.png', size: 120 },
    { name: 'AppIcon-60@2x.png', size: 120 },
    { name: 'AppIcon-60@3x.png', size: 180 },
    { name: 'AppIcon-76@2x.png', size: 152 },
    { name: 'AppIcon-83.5@2x.png', size: 167 },
    { name: 'AppIcon~ios-marketing.png', size: 1024 }
  ]

  for (const ios of iosSizes) {
    canvas.width = ios.size
    canvas.height = ios.size
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(previewCanvas.value, 0, 0, ios.size, ios.size)
    iosFolder?.file(ios.name, await getBlob(canvas) as Blob)
  }

  // Contents.json (Simplified)
  const contentsJson = {
    images: iosSizes.map(i => ({ size: `${i.size/2}x${i.size/2}`, idiom: "iphone", filename: i.name, scale: "2x" })),
    info: { version: 1, author: "ghazifadil-tools" }
  }
  iosFolder?.file("Contents.json", JSON.stringify(contentsJson, null, 2))

  // 3. Web Export
  const webFolder = zip.folder("web")
  const webSizes = [
    { name: 'icon-192.png', size: 192 },
    { name: 'icon-512.png', size: 512 },
    { name: 'apple-touch-icon.png', size: 180 },
    { name: 'favicon-32.png', size: 32 }
  ]

  for (const web of webSizes) {
    canvas.width = web.size
    canvas.height = web.size
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(previewCanvas.value, 0, 0, web.size, web.size)
    webFolder?.file(web.name, await getBlob(canvas) as Blob)
  }

  const content = await zip.generateAsync({ type: "blob" })
  const url = URL.createObjectURL(content)
  const link = document.createElement('a')
  link.href = url
  link.download = "app-icon-generator-output.zip"
  link.click()
  
  toast.add({ title: 'Professional pack downloaded!', color: 'success' })
}

onMounted(() => {
  renderAll()
})

watch([bgColor, scale, offsetX, offsetY, fgImage, activePlatform], renderAll)

useSeoMeta({
  title: 'App Icon Generator - GhaziFadil Tools',
  description: 'Create professional app icons for iOS, Android, and Web instantly. Customize background, scaling, and export all required sizes in one ZIP.',
})
</script>

<style scoped>
.bg-checkered {
  background-image: 
    linear-gradient(45deg, var(--color-bg) 25%, transparent 25%), 
    linear-gradient(-45deg, var(--color-bg) 25%, transparent 25%), 
    linear-gradient(45deg, transparent 75%, var(--color-bg) 75%), 
    linear-gradient(-45deg, transparent 75%, var(--color-bg) 75%);
  background-size: 20px 20px;
  background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
  background-color: var(--color-surface);
}

input[type="range"] {
  scrollbar-width: thin;
}

/* iOS Squircle path is complex, using a simplified version or border-radius fallback */
canvas {
  image-rendering: -webkit-optimize-contrast;
}
</style>
