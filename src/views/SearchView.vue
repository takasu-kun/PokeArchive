<script setup>
import { onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import { useRoute, useRouter } from 'vue-router'
import { useSearch } from '@/composables/useSearch'
import { resolveResourceRoute } from '@/registry'
import { humanize } from '@/composables/useLocalized'

const route = useRoute()
const router = useRouter()
const { query, loading, results, hasResults, open } = useSearch()

onMounted(async () => {
  await open()
  const initial = route.query.q
  if (typeof initial === 'string') query.value = initial
})

function goTo(entryKey, name) {
  router.push(resolveResourceRoute(entryKey, name))
}
</script>

<template>
  <section class="mx-auto max-w-3xl px-4 py-10 sm:px-6">
    <h1 class="font-display text-2xl font-bold text-slate-800 dark:text-white">Search the PokeArchive</h1>
    <div class="mt-4 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm dark:border-slate-700 dark:bg-surface-dark-raised">
      <Icon icon="mdi:magnify" class="h-5 w-5 text-slate-400" />
      <input
        v-model="query"
        type="text"
        placeholder="Search Pokémon, moves, items, abilities, locations…"
        class="flex-1 bg-transparent text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none dark:text-white"
      />
    </div>

    <p v-if="loading" class="mt-8 text-center text-sm text-slate-400">Loading search index…</p>
    <p v-else-if="query && !hasResults" class="mt-8 text-center text-sm text-slate-400">No matches for "{{ query }}"</p>

    <div v-for="group in results" :key="group.entry.key" class="mt-6">
      <p class="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">{{ group.entry.pluralLabel }}</p>
      <div class="grid grid-cols-1 gap-2 sm:grid-cols-2">
        <button
          v-for="item in group.items"
          :key="item.name"
          type="button"
          class="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-left text-sm capitalize text-slate-700 shadow-sm transition hover:border-poke-red/40 hover:text-poke-red dark:border-slate-700 dark:bg-surface-dark-raised dark:text-slate-200"
          @click="goTo(group.entry.key, item.name)"
        >
          <Icon :icon="group.entry.icon" class="h-4 w-4 shrink-0 text-slate-400" />
          {{ humanize(item.name) }}
        </button>
      </div>
    </div>
  </section>
</template>
