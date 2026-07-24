<script setup>
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'
import { useUiStore } from '@/stores/ui'
import { useSearch } from '@/composables/useSearch'
import { resolveResourceRoute } from '@/registry'
import { humanize } from '@/composables/useLocalized'

const ui = useUiStore()
const router = useRouter()
const { query, loading, results, hasResults, open } = useSearch()
const inputRef = ref(null)

watch(
  () => ui.searchOpen,
  async (isOpen) => {
    if (!isOpen) return
    query.value = ''
    await open()
    await nextTick()
    inputRef.value?.focus()
  },
)

function goTo(entryKey, name) {
  router.push(resolveResourceRoute(entryKey, name))
  ui.closeSearch()
}

function onKeydown(event) {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault()
    ui.searchOpen ? ui.closeSearch() : ui.openSearch()
  }
  if (event.key === 'Escape' && ui.searchOpen) {
    ui.closeSearch()
  }
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="ui.searchOpen" class="fixed inset-0 z-50 flex items-start justify-center bg-slate-900/50 px-4 pt-24 backdrop-blur-sm" @click.self="ui.closeSearch()">
        <div class="w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-surface-dark-raised">
          <div class="flex items-center gap-3 border-b border-slate-200 px-4 py-3 dark:border-slate-700">
            <Icon icon="mdi:magnify" class="h-5 w-5 text-slate-400" />
            <input
              ref="inputRef"
              v-model="query"
              type="text"
              placeholder="Search Pokémon, moves, items, abilities…"
              class="flex-1 bg-transparent text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none dark:text-white"
            />
            <kbd class="rounded border border-slate-300 px-1.5 py-0.5 text-[10px] text-slate-400 dark:border-slate-600">Esc</kbd>
          </div>

          <div class="max-h-96 overflow-y-auto p-2">
            <p v-if="loading" class="px-3 py-6 text-center text-sm text-slate-400">Loading search index…</p>
            <p v-else-if="query && !hasResults" class="px-3 py-6 text-center text-sm text-slate-400">No matches for "{{ query }}"</p>
            <p v-else-if="!query" class="px-3 py-6 text-center text-sm text-slate-400">Start typing to search across the entire PokeArchive.</p>

            <div v-for="group in results" :key="group.entry.key" class="mb-2">
              <p class="px-3 pb-1 pt-2 text-xs font-semibold uppercase tracking-wide text-slate-400">{{ group.entry.pluralLabel }}</p>
              <button
                v-for="item in group.items"
                :key="item.name"
                type="button"
                class="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm capitalize text-slate-700 hover:bg-poke-red/10 hover:text-poke-red dark:text-slate-200"
                @click="goTo(group.entry.key, item.name)"
              >
                <Icon :icon="group.entry.icon" class="h-4 w-4 shrink-0 text-slate-400" />
                {{ humanize(item.name) }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
