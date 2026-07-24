import { computed, ref, watch, toValue } from 'vue'
import { fetchResourceList } from '@/api/client'

export function useResourceList(endpoint, pageSize = 20) {
  const items = ref([])
  const count = ref(0)
  const offset = ref(0)
  const loading = ref(false)
  const error = ref(null)

  const page = computed(() => Math.floor(offset.value / pageSize) + 1)
  const pageCount = computed(() => Math.max(1, Math.ceil(count.value / pageSize)))
  const hasNext = computed(() => offset.value + pageSize < count.value)
  const hasPrev = computed(() => offset.value > 0)

  async function load() {
    loading.value = true
    error.value = null
    try {
      const res = await fetchResourceList(toValue(endpoint), pageSize, offset.value)
      items.value = res.results
      count.value = res.count
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to load list'
      items.value = []
    } finally {
      loading.value = false
    }
  }

  function loadPage(pageNumber) {
    const clamped = Math.min(Math.max(1, pageNumber), pageCount.value)
    offset.value = (clamped - 1) * pageSize
  }

  function next() {
    if (hasNext.value) offset.value += pageSize
  }

  function prev() {
    if (hasPrev.value) offset.value = Math.max(0, offset.value - pageSize)
  }

  watch(
    () => toValue(endpoint),
    () => {
      offset.value = 0
      load()
    },
    { immediate: true },
  )
  watch(offset, load)

  return { items, count, page, pageCount, hasNext, hasPrev, loading, error, next, prev, loadPage }
}
