import { ref, watch, toValue } from 'vue'
import { fetchByUrl } from '@/api/client'

/** Fetches a resource by its full PokeAPI URL — used to follow cross-links embedded in responses. */
export function useResourceByUrl(url) {
  const data = ref(null)
  const loading = ref(false)
  const error = ref(null)

  async function load() {
    const target = toValue(url)
    if (!target) {
      data.value = null
      return
    }
    loading.value = true
    error.value = null
    try {
      data.value = await fetchByUrl(target)
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to load resource'
      data.value = null
    } finally {
      loading.value = false
    }
  }

  watch(() => toValue(url), load, { immediate: true })

  return { data, loading, error, reload: load }
}
