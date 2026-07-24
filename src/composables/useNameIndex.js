import { ref } from 'vue'
import { fetchFullIndex } from '@/api/client'

const indexes = new Map()
const inFlight = new Map()

/** Fetches (once, then caches indefinitely) the full {name,url} list for a resource type. */
export async function loadNameIndex(endpoint) {
  const cached = indexes.get(endpoint)
  if (cached) return cached

  const existing = inFlight.get(endpoint)
  if (existing) return existing

  const promise = fetchFullIndex(endpoint).then((res) => {
    indexes.set(endpoint, res.results)
    return res.results
  })
  inFlight.set(endpoint, promise)
  try {
    return await promise
  } finally {
    inFlight.delete(endpoint)
  }
}

export function useNameIndex(endpoint) {
  const items = ref([])
  const loading = ref(false)

  async function load() {
    loading.value = true
    try {
      items.value = await loadNameIndex(endpoint)
    } finally {
      loading.value = false
    }
  }
  load()

  return { items, loading }
}
