<template>
  <footer class="mt-auto border-t border-[var(--color-border)] py-8">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
      <p class="text-sm text-[var(--color-text-secondary)]">
        &copy; {{ new Date().getFullYear() }} Ghazi Fadil. All rights reserved.
      </p>
      <div class="flex items-center gap-4">
        <UButton variant="ghost" color="neutral" to="https://github.com/ghazifardhan" target="_blank" aria-label="GitHub">
          <Icon name="lucide:github" class="w-5 h-5" />
        </UButton>
        <UButton variant="ghost" color="neutral" to="https://www.linkedin.com/in/ghazifardhan" target="_blank" aria-label="LinkedIn">
          <Icon name="lucide:linkedin" class="w-5 h-5" />
        </UButton>
        <UButton variant="ghost" color="neutral" to="https://x.com/ghazifardhan" target="_blank" aria-label="X">
          <Icon name="simple-icons:x" class="w-5 h-5" />
        </UButton>
      </div>
    </div>
  </footer>
</template>
