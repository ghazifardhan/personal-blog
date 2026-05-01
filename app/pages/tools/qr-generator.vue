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
          <Icon name="lucide:qr-code" class="text-[var(--color-accent)]" />
          QRCode Generator
        </h1>
        <p class="text-lg text-[var(--color-text-secondary)]">
          Generate custom, high-quality QR codes for URLs, text, or contact info instantly.
        </p>
      </div>

      <!-- Main Container -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Settings Section -->
        <div class="flex flex-col bg-[var(--color-surface)] border border-[var(--color-border)] rounded-3xl overflow-hidden shadow-xl">
          <div class="px-6 py-4 border-b border-[var(--color-border)] bg-[var(--color-bg)]/50 flex items-center gap-2">
            <Icon name="lucide:settings-2" class="text-[var(--color-accent)]" />
            <span class="font-bold text-sm uppercase tracking-widest text-[var(--color-text-primary)]">Customization</span>
          </div>
          
          <div class="p-8 space-y-8">
            <!-- Content -->
            <div class="space-y-3">
              <label class="text-sm font-bold text-[var(--color-text-primary)]">Content (URL or Text)</label>
              <textarea
                v-model="qrContent"
                class="w-full p-4 rounded-2xl bg-[var(--color-bg)] border border-[var(--color-border)] text-sm text-[var(--color-text-primary)] outline-none focus:ring-2 focus:ring-[var(--color-accent)]/30 min-h-[120px] resize-none"
                placeholder="Enter URL or text to encode..."
                @input="generateQr"
              ></textarea>
            </div>

            <!-- Size Slider -->
            <div class="space-y-4">
              <div class="flex justify-between items-center">
                <label class="text-sm font-bold text-[var(--color-text-primary)]">Dimension</label>
                <span class="text-xs font-mono text-[var(--color-accent)] font-bold">{{ qrSize }}x{{ qrSize }}px</span>
              </div>
              <input 
                type="range" 
                v-model="qrSize" 
                min="128" 
                max="1024" 
                step="64"
                class="w-full h-2 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-lg appearance-none cursor-pointer accent-[var(--color-accent)]"
                @input="generateQr"
              />
            </div>

            <!-- Margin Slider -->
            <div class="space-y-4">
              <div class="flex justify-between items-center">
                <label class="text-sm font-bold text-[var(--color-text-primary)]">Quiet Zone (Margin)</label>
                <span class="text-xs font-mono text-[var(--color-accent)] font-bold">{{ qrMargin }}</span>
              </div>
              <input 
                type="range" 
                v-model="qrMargin" 
                min="1" 
                max="10" 
                step="1"
                class="w-full h-2 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-lg appearance-none cursor-pointer accent-[var(--color-accent)]"
                @input="generateQr"
              />
            </div>

            <!-- Colors -->
            <div class="grid grid-cols-2 gap-6">
              <div class="space-y-3">
                <label class="text-sm font-bold text-[var(--color-text-primary)]">Foreground</label>
                <div class="flex items-center gap-3">
                  <input 
                    type="color" 
                    v-model="qrColor" 
                    class="w-10 h-10 border-none rounded-lg cursor-pointer bg-transparent"
                    @input="generateQr"
                  />
                  <span class="text-xs font-mono uppercase">{{ qrColor }}</span>
                </div>
              </div>
              <div class="space-y-3">
                <label class="text-sm font-bold text-[var(--color-text-primary)]">Background</label>
                <div class="flex items-center gap-3">
                  <input 
                    type="color" 
                    v-model="qrBgColor" 
                    class="w-10 h-10 border-none rounded-lg cursor-pointer bg-transparent"
                    @input="generateQr"
                  />
                  <span class="text-xs font-mono uppercase">{{ qrBgColor }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Preview Section -->
        <div class="flex flex-col gap-8">
          <div class="flex flex-col bg-[var(--color-surface)] border border-[var(--color-border)] rounded-3xl overflow-hidden shadow-xl">
            <div class="px-6 py-4 border-b border-[var(--color-border)] bg-[var(--color-bg)]/50 flex items-center gap-2">
              <Icon name="lucide:eye" class="text-[var(--color-accent)]" />
              <span class="font-bold text-sm uppercase tracking-widest text-[var(--color-text-primary)]">Preview</span>
            </div>
            
            <div class="p-12 flex flex-col items-center justify-center min-h-[400px]">
              <div class="relative group">
                <canvas 
                  ref="canvasRef" 
                  class="rounded-2xl shadow-2xl border border-[var(--color-border)] max-w-full h-auto transition-transform group-hover:scale-105"
                ></canvas>
              </div>
            </div>

            <div class="px-8 py-6 bg-[var(--color-bg)]/50 border-t border-[var(--color-border)]">
              <UButton
                color="primary"
                size="xl"
                class="w-full rounded-2xl font-bold"
                icon="i-lucide-download"
                @click="downloadQr"
              >
                Download PNG
              </UButton>
            </div>
          </div>

          <!-- Quick Presets -->
          <div class="p-6 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl flex items-center justify-between">
            <div class="flex items-center gap-4">
              <div class="p-2 bg-[var(--color-accent)]/10 rounded-lg">
                <Icon name="lucide:palette" class="w-5 h-5 text-[var(--color-accent)]" />
              </div>
              <span class="text-sm font-bold text-[var(--color-text-primary)]">Theme Presets</span>
            </div>
            <div class="flex gap-2">
              <button 
                v-for="preset in presets" 
                :key="preset.name"
                class="w-8 h-8 rounded-full border border-[var(--color-border)] hover:scale-110 transition-transform shadow-sm"
                :style="{ background: preset.fg }"
                :title="preset.name"
                @click="applyPreset(preset)"
              ></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import QRCode from 'qrcode'

const qrContent = ref('https://ghazifadil.com')
const qrSize = ref(256)
const qrMargin = ref(2)
const qrColor = ref('#000000')
const qrBgColor = ref('#ffffff')
const canvasRef = ref<HTMLCanvasElement | null>(null)
const toast = useToast()

const presets = [
  { name: 'Classic', fg: '#000000', bg: '#ffffff' },
  { name: 'Ocean', fg: '#0ea5e9', bg: '#ffffff' },
  { name: 'Royal', fg: '#6366f1', bg: '#ffffff' },
  { name: 'Emerald', fg: '#10b981', bg: '#ffffff' },
  { name: 'Night', fg: '#ffffff', bg: '#0f172a' }
]

const generateQr = async () => {
  if (!canvasRef.value || !qrContent.value) return
  
  try {
    await QRCode.toCanvas(canvasRef.value, qrContent.value, {
      width: qrSize.value,
      margin: qrMargin.value,
      color: {
        dark: qrColor.value,
        light: qrBgColor.value
      },
      errorCorrectionLevel: 'H'
    })
  } catch (err) {
    console.error(err)
    toast.add({ title: 'Error', description: 'Failed to generate QR code.', color: 'error' })
  }
}

const applyPreset = (preset: typeof presets[0]) => {
  qrColor.value = preset.fg
  qrBgColor.value = preset.bg
  generateQr()
}

const downloadQr = () => {
  if (!canvasRef.value) return
  const url = canvasRef.value.toDataURL('image/png')
  const a = document.createElement('a')
  a.href = url
  a.download = 'qrcode.png'
  a.click()
  toast.add({ title: 'Downloaded!', color: 'success' })
}

onMounted(() => {
  generateQr()
})

useSeoMeta({
  title: 'QRCode Generator - GhaziFadil Tools',
  description: 'Generate custom, high-quality QR codes instantly. Customize colors, size, and margins with our free online tool.',
})
</script>

<style scoped>
input[type="range"] {
  scrollbar-width: thin;
}
</style>
