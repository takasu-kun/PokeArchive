import { ref, watch, toValue } from 'vue'
import { fetchResource } from '@/api/client'

/** Fetches a single named/id resource and stays reactive to changes in endpoint or idOrName. */
export function useResource(endpoint, idOrName) {
  const data = ref(null)
  const loading = ref(false)
  const error = ref(null)

  async function load() {
    const key = toValue(idOrName)
    if (key === null || key === undefined || key === '') {
      data.value = null
      return
    }
    loading.value = true
    error.value = null
    try {
      data.value = await fetchResource(toValue(endpoint), key)
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to load resource'
      data.value = null
    } finally {
      loading.value = false
    }
  }

  watch([() => toValue(endpoint), () => toValue(idOrName)], load, { immediate: true })

  return { data, loading, error, reload: load }
}
