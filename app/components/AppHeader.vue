<template>
  <header class="sticky top-0 z-50 w-full backdrop-blur-md bg-[var(--color-bg)]/80 border-b border-[var(--color-border)]">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
      <div class="flex items-center gap-4">
        <NuxtLink to="/" class="text-xl font-bold font-sans text-[var(--color-text-primary)]">
          GhaziFadil.
        </NuxtLink>
      </div>
      
      <nav class="hidden md:flex items-center gap-6">
        <NuxtLink to="/blog" class="text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">Blog</NuxtLink>
        <NuxtLink to="/projects" class="text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">Projects</NuxtLink>
        <NuxtLink to="/about" class="text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">About</NuxtLink>
      </nav>

      <div class="flex items-center gap-2">
        <ClientOnly>
          <UButton
            color="neutral"
            variant="ghost"
            aria-label="Toggle Theme"
            @click="toggleColorMode"
          >
            <Icon :name="isDark ? 'lucide:moon' : 'lucide:sun'" class="w-5 h-5" />
          </UButton>
        </ClientOnly>
        
        <UButton color="neutral" variant="ghost" class="md:hidden" aria-label="Menu" @click="isMobileMenuOpen = true">
          <Icon name="lucide:menu" class="w-5 h-5" />
        </UButton>
      </div>
    </div>

    <!-- Mobile Menu Overlay -->
    <Teleport to="body">
      <div v-if="isMobileMenuOpen" class="fixed inset-0 z-[100] md:hidden flex justify-end">
        <!-- Backdrop -->
        <div class="fixed inset-0 bg-black/60 backdrop-blur-sm" @click="isMobileMenuOpen = false"></div>
        
        <!-- Menu Panel -->
        <div class="relative w-80 h-full bg-[var(--color-surface)] shadow-2xl flex flex-col border-l border-[var(--color-border)] animate-in slide-in-from-right duration-300">
          <div class="flex items-center justify-between p-6 border-b border-[var(--color-border)]">
            <span class="text-xl font-bold font-sans text-[var(--color-text-primary)]">Menu</span>
            <UButton color="neutral" variant="ghost" aria-label="Close Menu" icon="i-lucide-x" @click="isMobileMenuOpen = false" />
          </div>
          
          <nav class="flex-1 overflow-y-auto p-8 flex flex-col gap-8">
            <NuxtLink to="/blog" class="text-2xl font-semibold text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors" @click="isMobileMenuOpen = false">Blog</NuxtLink>
            <NuxtLink to="/projects" class="text-2xl font-semibold text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors" @click="isMobileMenuOpen = false">Projects</NuxtLink>
            <NuxtLink to="/about" class="text-2xl font-semibold text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors" @click="isMobileMenuOpen = false">About</NuxtLink>
          </nav>

          <div class="p-8 border-t border-[var(--color-border)]">
             <div class="flex items-center gap-4">
              <UButton variant="ghost" color="neutral" to="https://github.com/ghazifardhan" target="_blank" icon="i-simple-icons-github" />
              <UButton variant="ghost" color="neutral" to="https://www.linkedin.com/in/ghazifardhan" target="_blank" icon="i-simple-icons-linkedin" />
              <UButton variant="ghost" color="neutral" to="https://x.com/ghazifardhan" target="_blank" icon="i-simple-icons-x" />
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')
const isMobileMenuOpen = ref(false)

function toggleColorMode() {
  colorMode.preference = isDark.value ? 'light' : 'dark'
}
</script>
