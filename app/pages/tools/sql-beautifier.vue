<template>
  <div class="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-[var(--color-bg)]">
    <div class="max-w-6xl mx-auto">
      <!-- Breadcrumbs -->
      <NuxtLink to="/tools" class="inline-flex items-center text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] mb-8 transition-colors">
        <Icon name="lucide:arrow-left" class="w-4 h-4 mr-2" />
        Back to Tools
      </NuxtLink>

      <!-- Header -->
      <div class="mb-12">
        <h1 class="text-4xl font-bold text-[var(--color-text-primary)] mb-4 flex items-center gap-3">
          <Icon name="lucide:database" class="text-[var(--color-accent)]" />
          SQL Online Beautifier
        </h1>
        <p class="text-lg text-[var(--color-text-secondary)]">
          Format and prettify your SQL queries for better readability.
        </p>
      </div>

      <!-- Editor Container -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[600px]">
        <!-- Input Section -->
        <div class="flex flex-col bg-[var(--color-surface)] border border-[var(--color-border)] rounded-3xl overflow-hidden shadow-xl">
          <div class="flex items-center justify-between px-6 py-4 border-b border-[var(--color-border)] bg-[var(--color-bg)]/50">
            <div class="flex items-center gap-2">
              <Icon name="lucide:terminal" class="text-[var(--color-accent)]" />
              <span class="font-bold text-sm uppercase tracking-widest text-[var(--color-text-primary)]">Raw SQL</span>
            </div>
            <div class="flex gap-2">
              <UButton
                size="xs"
                color="neutral"
                variant="ghost"
                icon="i-lucide-trash-2"
                @click="clearSql"
              >
                Clear
              </UButton>
            </div>
          </div>
          <div class="flex-grow relative">
            <textarea
              v-model="sqlInput"
              class="absolute inset-0 w-full h-full p-6 font-mono text-sm bg-transparent text-[var(--color-text-primary)] resize-none outline-none focus:ring-1 focus:ring-[var(--color-accent)]/30 transition-all"
              placeholder="SELECT * FROM users WHERE active = 1 ORDER BY created_at DESC;"
            ></textarea>
          </div>
        </div>

        <!-- Output Section -->
        <div class="flex flex-col bg-[var(--color-surface)] border border-[var(--color-border)] rounded-3xl overflow-hidden shadow-xl">
          <div class="flex items-center justify-between px-6 py-4 border-b border-[var(--color-border)] bg-[var(--color-bg)]/50">
            <div class="flex items-center gap-2">
              <Icon name="lucide:sparkles" class="text-yellow-500" />
              <span class="font-bold text-sm uppercase tracking-widest text-[var(--color-text-primary)]">Beautified SQL</span>
            </div>
            <div class="flex gap-2">
              <UButton
                size="xs"
                color="neutral"
                variant="ghost"
                icon="i-lucide-copy"
                @click="copyOutput"
              >
                Copy
              </UButton>
              <UButton
                size="xs"
                color="neutral"
                variant="ghost"
                icon="i-lucide-download"
                @click="downloadSql"
              >
                Download
              </UButton>
            </div>
          </div>
          <div class="flex-grow relative bg-[var(--color-bg)]/30 overflow-auto scrollbar-thin p-6">
            <pre class="font-mono text-sm text-[var(--color-text-primary)] whitespace-pre"><code>{{ formattedOutput || '-- Result will appear here' }}</code></pre>
          </div>
          <div class="px-6 py-4 bg-[var(--color-bg)]/50 border-t border-[var(--color-border)] flex flex-col gap-4">
            <div class="flex items-center gap-4">
              <span class="text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-wider">Dialect:</span>
              <select 
                v-model="dialect"
                class="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg px-3 py-1.5 text-sm text-[var(--color-text-primary)] outline-none focus:ring-1 focus:ring-[var(--color-accent)]/30"
              >
                <option v-for="d in dialects" :key="d.id" :value="d.id">{{ d.name }}</option>
              </select>
            </div>
            <UButton
              color="primary"
              variant="solid"
              icon="i-lucide-wand-2"
              class="w-full rounded-xl font-bold py-2.5"
              @click="beautifySql"
            >
              Beautify SQL
            </UButton>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="mt-12">
        <h3 class="text-xl font-bold text-[var(--color-text-primary)] mb-6">Quick Templates</h3>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <button 
            v-for="template in templates" 
            :key="template.name"
            @click="loadTemplate(template.code)"
            class="p-6 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl text-left hover:border-[var(--color-accent)] hover:shadow-lg transition-all group"
          >
            <div class="flex items-center gap-3 mb-3">
              <div class="p-2 bg-[var(--color-accent)]/10 rounded-lg group-hover:bg-[var(--color-accent)] group-hover:text-white transition-colors">
                <Icon :name="template.icon" class="w-5 h-5" />
              </div>
              <span class="font-bold text-[var(--color-text-primary)]">{{ template.name }}</span>
            </div>
            <p class="text-sm text-[var(--color-text-secondary)]">{{ template.desc }}</p>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { format } from 'sql-formatter'

const sqlInput = ref('')
const formattedOutput = ref('')
const dialect = ref('sql')
const toast = useToast()

const dialects = [
  { id: 'sql', name: 'Standard SQL' },
  { id: 'mysql', name: 'MySQL' },
  { id: 'postgresql', name: 'PostgreSQL' },
  { id: 'sqlite', name: 'SQLite' },
  { id: 'mariadb', name: 'MariaDB' },
  { id: 'plsql', name: 'Oracle PL/SQL' }
]

const beautifySql = () => {
  if (!sqlInput.value.trim()) return
  try {
    formattedOutput.value = format(sqlInput.value, {
      language: dialect.value as any,
      keywordCase: 'upper',
      indentStyle: 'tabularLeft'
    })
    toast.add({ title: 'SQL Beautified!', color: 'success' })
  } catch (e: any) {
    toast.add({ title: 'Formatting Error', description: 'Please check your SQL syntax.', color: 'error' })
  }
}

const clearSql = () => {
  sqlInput.value = ''
  formattedOutput.value = ''
}

const copyOutput = () => {
  if (!formattedOutput.value) return
  navigator.clipboard.writeText(formattedOutput.value)
  toast.add({ title: 'Copied!', description: 'SQL copied to clipboard.', color: 'success' })
}

const downloadSql = () => {
  if (!formattedOutput.value) return
  const blob = new Blob([formattedOutput.value], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'query.sql'
  a.click()
  URL.revokeObjectURL(url)
}

const templates = [
  {
    name: 'Complex Join',
    icon: 'lucide:git-merge',
    desc: 'A sample query with multiple joins and filters.',
    code: 'select u.name, o.order_date, p.product_name from users u join orders o on u.id = o.user_id join order_items oi on o.id = oi.order_id join products p on oi.product_id = p.id where o.status = "completed" and p.price > 100 order by o.order_date desc limit 10;'
  },
  {
    name: 'CTE Example',
    icon: 'lucide:layers',
    desc: 'Standard Common Table Expression syntax.',
    code: 'with user_stats as (select user_id, count(*) as order_count from orders group by user_id) select u.name, s.order_count from users u join user_stats s on u.id = s.user_id where s.order_count > 5;'
  },
  {
    name: 'Subquery',
    icon: 'lucide:box',
    desc: 'Query using a subquery in the WHERE clause.',
    code: 'select name, email from users where id in (select user_id from orders where total_amount > (select avg(total_amount) from orders));'
  }
]

const loadTemplate = (code: string) => {
  sqlInput.value = code
  beautifySql()
}

useSeoMeta({
  title: 'SQL Online Beautifier - GhaziFadil Tools',
  description: 'A free online SQL formatter and beautifier. Support for MySQL, PostgreSQL, SQLite, and more.',
})
</script>

<style scoped>
textarea {
  scrollbar-width: thin;
  scrollbar-color: var(--color-border) transparent;
}
textarea::-webkit-scrollbar {
  width: 6px;
}
textarea::-webkit-scrollbar-thumb {
  background-color: var(--color-border);
  border-radius: 10px;
}
</style>
