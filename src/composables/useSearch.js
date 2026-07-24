import { ref, computed } from 'vue'
import { getSearchableEntries } from '@/registry'
import { loadNameIndex } from './useNameIndex'

const indexMap = ref({})
let indexesLoaded = false
let loadPromise = null

async function ensureIndexes() {
  if (indexesLoaded) return
  if (loadPromise) return loadPromise
  const entries = getSearchableEntries()
  loadPromise = Promise.all(
    entries.map(async (entry) => {
      indexMap.value[entry.key] = await loadNameIndex(entry.endpoint)
    }),
  ).then(() => {
    indexesLoaded = true
  })
  return loadPromise
}

export function useSearch() {
  const query = ref('')
  const loading = ref(false)

  async function open() {
    loading.value = true
    try {
      await ensureIndexes()
    } finally {
      loading.value = false
    }
  }

  const results = computed(() => {
    const q = query.value.trim().toLowerCase()
    if (!q) return []
    const groups = []
    for (const entry of getSearchableEntries()) {
      const idx = indexMap.value[entry.key] ?? []
      const items = idx.filter((i) => i.name.toLowerCase().includes(q)).slice(0, 6)
      if (items.length) groups.push({ entry, items })
    }
    return groups
  })

  const hasResults = computed(() => results.value.length > 0)

  return { query, loading, results, hasResults, open }
}
