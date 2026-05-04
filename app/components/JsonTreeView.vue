<template>
  <div class="font-mono text-sm leading-relaxed">
    <div v-if="isExpandable">
      <div 
        @click="isOpen = !isOpen" 
        class="flex items-center gap-1 cursor-pointer hover:bg-[var(--color-accent)]/5 rounded px-1 transition-colors group"
      >
        <Icon 
          :name="isOpen ? 'lucide:chevron-down' : 'lucide:chevron-right'" 
          class="w-3.5 h-3.5 text-[var(--color-text-secondary)] group-hover:text-[var(--color-accent)]" 
        />
        <span v-if="name" class="text-blue-500 font-bold">{{ name }}:</span>
        <span class="text-[var(--color-text-secondary)]">{{ isArray ? '[' : '{' }}</span>
        <span v-if="!isOpen" class="text-[var(--color-text-secondary)] text-xs italic ml-1">
          ... {{ itemsCount }} {{ itemsCount === 1 ? 'item' : 'items' }} {{ isArray ? ']' : '}' }}
        </span>
      </div>
      
      <div v-if="isOpen" class="pl-5 border-l border-[var(--color-border)] ml-1.5 mt-1 space-y-0.5">
        <JsonTreeView 
          v-for="(val, key) in data" 
          :key="key" 
          :name="isArray ? undefined : String(key)" 
          :data="val" 
          :depth="depth + 1"
        />
      </div>
      
      <div v-if="isOpen" class="pl-4 text-[var(--color-text-secondary)] mt-0.5">
        {{ isArray ? ']' : '}' }}
      </div>
    </div>
    
    <div v-else class="flex items-start gap-2 pl-5 group">
      <span v-if="name" class="text-blue-500 font-bold whitespace-nowrap">{{ name }}:</span>
      <span :class="valueClass" class="break-all">{{ formattedValue }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const props = withDefaults(defineProps<{
  data: any
  name?: string
  depth?: number
}>(), {
  depth: 0
})

const isOpen = ref(props.depth ? props.depth < 2 : true)

const isObject = (val: any) => val !== null && typeof val === 'object' && !Array.isArray(val)
const isArray = computed(() => Array.isArray(props.data))
const isExpandable = computed(() => props.data !== null && typeof props.data === 'object' && Object.keys(props.data).length > 0)

const itemsCount = computed(() => {
  if (isArray.value) return props.data.length
  if (isObject(props.data)) return Object.keys(props.data).length
  return 0
})

const valueClass = computed(() => {
  if (props.data === null) return 'text-gray-400 italic'
  const type = typeof props.data
  if (type === 'string') return 'text-green-500'
  if (type === 'number') return 'text-orange-500'
  if (type === 'boolean') return 'text-purple-500 font-bold'
  return 'text-[var(--color-text-primary)]'
})

const formattedValue = computed(() => {
  if (props.data === null) return 'null'
  if (typeof props.data === 'string') return `"${props.data}"`
  return String(props.data)
})
</script>
