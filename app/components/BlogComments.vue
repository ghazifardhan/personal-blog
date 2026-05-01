<template>
  <div class="mt-16 pt-12 border-t border-[var(--color-border)]">
    <Giscus
      repo="ghazifardhan/personal-blog"
      repo-id="R_kgDOSRY-Nw"
      category="General"
      category-id="DIC_kwDOSRY-N84C8HKd"
      mapping="pathname"
      strict="0"
      reactions-enabled="1"
      emit-metadata="0"
      input-position="bottom"
      :theme="giscusTheme"
      lang="en"
      loading="lazy"
    />
  </div>
</template>

<script setup lang="ts">
import Giscus from '@giscus/vue'

const colorMode = useColorMode()

// Automatically switch Giscus theme based on Nuxt color mode
const giscusTheme = computed(() => 
  colorMode.value === 'dark' ? 'dark' : 'light'
)
</script>
