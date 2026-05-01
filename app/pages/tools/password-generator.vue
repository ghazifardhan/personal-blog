<template>
  <div class="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-[var(--color-bg)]">
    <div class="max-w-3xl mx-auto">
      <!-- Breadcrumbs -->
      <NuxtLink to="/tools" class="inline-flex items-center text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] mb-8 transition-colors">
        <Icon name="lucide:arrow-left" class="w-4 h-4 mr-2" />
        Back to Tools
      </NuxtLink>

      <!-- Header Section -->
      <div class="mb-12">
        <h1 class="text-4xl font-bold text-[var(--color-text-primary)] mb-4 flex items-center gap-3">
          <Icon name="lucide:shield-check" class="text-[var(--color-accent)]" />
          Password Generator
        </h1>
        <p class="text-lg text-[var(--color-text-secondary)]">
          Generate secure, random passwords to keep your online accounts safe.
        </p>
      </div>

      <!-- Generator Card -->
      <div class="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-3xl p-8 shadow-xl">
        <!-- Result Field -->
        <div class="relative mb-10">
          <div class="w-full bg-[var(--color-bg)] border-2 border-[var(--color-border)] rounded-2xl p-6 pr-16 text-2xl md:text-3xl font-mono text-[var(--color-text-primary)] break-all min-h-[100px] flex items-center justify-center text-center">
            {{ password }}
          </div>
          <div class="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2">
             <UButton
              icon="i-lucide-refresh-cw"
              size="lg"
              color="neutral"
              variant="ghost"
              class="hover:text-[var(--color-accent)]"
              @click="generatePassword"
              aria-label="Regenerate"
            />
            <UButton
              icon="i-lucide-copy"
              size="lg"
              color="neutral"
              variant="ghost"
              class="hover:text-[var(--color-accent)]"
              @click="copyPassword"
              aria-label="Copy Password"
            />
          </div>
        </div>

        <!-- Strength Indicator -->
        <div class="mb-10">
          <div class="flex justify-between items-center mb-3">
            <span class="text-sm font-medium text-[var(--color-text-secondary)]">Strength:</span>
            <span class="text-sm font-bold uppercase tracking-wider" :class="strengthClass">
              {{ strengthLabel }}
            </span>
          </div>
          <div class="h-2 w-full bg-[var(--color-border)] rounded-full overflow-hidden flex gap-1">
            <div 
              v-for="n in 4" :key="n"
              class="h-full flex-1 transition-all duration-500"
              :class="n <= strengthScore ? strengthColor : 'bg-transparent'"
            ></div>
          </div>
        </div>

        <!-- Settings -->
        <div class="space-y-10">
          <!-- Length Slider -->
          <div>
            <div class="flex justify-between items-center mb-6">
              <label class="text-sm font-bold text-[var(--color-text-primary)] uppercase tracking-wider">Password Length</label>
              <span class="text-3xl font-extrabold text-[var(--color-accent)]">{{ length }}</span>
            </div>
            <div class="relative flex items-center group">
              <input
                type="range"
                v-model.number="length"
                :min="4"
                :max="50"
                step="1"
                class="w-full h-3 bg-[var(--color-border)] rounded-full appearance-none cursor-pointer accent-[var(--color-accent)] hover:bg-[var(--color-border)]/80 transition-all"
                @input="generatePassword"
              />
            </div>
            <div class="flex justify-between mt-3 px-1 text-[10px] font-bold text-[var(--color-text-secondary)] uppercase tracking-tighter">
              <span>Min: 4</span>
              <span>Max: 50</span>
            </div>
          </div>

          <!-- Options Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div v-for="option in options" :key="option.id" class="flex items-center justify-between p-5 bg-[var(--color-bg)] rounded-2xl border border-[var(--color-border)] hover:border-[var(--color-accent)]/30 transition-colors">
              <div class="flex flex-col">
                <span class="font-bold text-[var(--color-text-primary)]">{{ option.label }}</span>
                <span class="text-xs text-[var(--color-text-secondary)]">{{ option.desc }}</span>
              </div>
              <USwitch 
                v-model="option.value" 
                color="primary"
                @update:model-value="generatePassword"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Security Note -->
      <div class="mt-12 p-6 bg-[var(--color-accent)]/5 rounded-2xl border border-[var(--color-accent)]/10 text-center">
        <p class="text-[var(--color-text-secondary)] text-sm italic">
          Security Note: All passwords are generated locally in your browser. We never see or store your generated data.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const length = ref(16)
const password = ref('')
const toast = useToast()

const options = ref([
  { id: 'uppercase', label: 'Uppercase', desc: 'A-Z', value: true },
  { id: 'lowercase', label: 'Lowercase', desc: 'a-z', value: true },
  { id: 'numbers', label: 'Numbers', desc: '0-9', value: true },
  { id: 'symbols', label: 'Symbols', desc: '!@#$%^&*', value: true }
])

const generatePassword = () => {
  const charSets = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
  }

  let chars = ''
  options.value.forEach(opt => {
    if (opt.value) chars += charSets[opt.id as keyof typeof charSets]
  })

  if (chars === '') {
    password.value = 'Select an option'
    return
  }

  let generated = ''
  for (let i = 0; i < length.value; i++) {
    generated += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  password.value = generated
}

const copyPassword = () => {
  if (password.value === 'Select an option') return
  navigator.clipboard.writeText(password.value)
  toast.add({
    title: 'Copied!',
    description: 'Password copied to clipboard.',
    icon: 'i-lucide-check-circle',
    color: 'success'
  })
}

const strengthScore = computed(() => {
  if (password.value === 'Select an option' || !password.value) return 0
  let score = 0
  if (length.value >= 8) score++
  if (length.value >= 12) score++
  
  const hasUpper = /[A-Z]/.test(password.value)
  const hasLower = /[a-z]/.test(password.value)
  const hasNumber = /[0-9]/.test(password.value)
  const hasSymbol = /[^A-Za-z0-9]/.test(password.value)
  
  const varietyCount = [hasUpper, hasLower, hasNumber, hasSymbol].filter(Boolean).length
  
  if (varietyCount >= 3) score++
  if (varietyCount === 4 && length.value >= 14) score++
  
  return Math.min(score, 4)
})

const strengthLabel = computed(() => {
  const labels = ['Weak', 'Weak', 'Fair', 'Good', 'Strong']
  return labels[strengthScore.value]
})

const strengthClass = computed(() => {
  const classes = ['text-red-500', 'text-red-400', 'text-yellow-500', 'text-blue-500', 'text-green-500']
  return classes[strengthScore.value]
})

const strengthColor = computed(() => {
  const colors = ['bg-red-500', 'bg-red-400', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500']
  return colors[strengthScore.value]
})

onMounted(() => {
  generatePassword()
})

useSeoMeta({
  title: 'Password Generator - GhaziFadil Tools',
  description: 'Generate secure, random passwords locally in your browser.',
})
</script>
