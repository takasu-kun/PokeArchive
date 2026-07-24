<script setup>
import { computed, ref } from 'vue'
import { Icon } from '@iconify/vue'
import { getRegistryEntry } from '@/registry'
import { useResourceList } from '@/composables/useResourceList'
import { useResource } from '@/composables/useResource'
import { useNameIndex } from '@/composables/useNameIndex'
import CategoryHeader from '@/components/common/CategoryHeader.vue'
import ResourceCard from '@/components/common/ResourceCard.vue'
import Pagination from '@/components/common/Pagination.vue'
import LoadingSkeleton from '@/components/common/LoadingSkeleton.vue'

const entry = getRegistryEntry('pokemon')

const searchQuery = ref('')
const selectedType = ref('')

const { items: nameIndex } = useNameIndex('pokemon')
const { items: typeNames } = useNameIndex('type')

const { data: typeDetail, loading: typeLoading } = useResource(
  'type',
  () => selectedType.value || undefined,
)

const paginated = useResourceList('pokemon')

const mode = computed(() => {
  if (selectedType.value) return 'type'
  if (searchQuery.value.trim()) return 'search'
  return 'browse'
})

const searchResults = computed(() =>
  searchQuery.value.trim()
    ? nameIndex.value.filter((p) => p.name.includes(searchQuery.value.trim().toLowerCase())).slice(0, 60)
    : [],
)

const typeResults = computed(() => typeDetail.value?.pokemon.map((p) => p.pokemon) ?? [])

const displayedItems = computed(() => {
  if (mode.value === 'type') return typeResults.value
  if (mode.value === 'search') return searchResults.value
  return paginated.items.value
})

const loading = computed(() => (mode.value === 'type' ? typeLoading.value : mode.value === 'browse' ? paginated.loading.value : false))
</script>

<template>
  <section class="mx-auto max-w-6xl px-4 py-10 sm:px-6">
    <CategoryHeader :icon="entry.icon" :color="entry.color" :title="entry.pluralLabel" :description="entry.description" />

    <div class="mb-6 flex flex-col gap-3 sm:flex-row">
      <div class="flex flex-1 items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 dark:border-slate-700 dark:bg-surface-dark-raised">
        <Icon icon="mdi:magnify" class="h-4 w-4 text-slate-400" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search by name…"
          class="flex-1 bg-transparent text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none dark:text-white"
        />
      </div>
      <select
        v-model="selectedType"
        class="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm capitalize text-slate-700 dark:border-slate-700 dark:bg-surface-dark-raised dark:text-slate-200"
      >
        <option value="">All Types</option>
        <option v-for="t in typeNames" :key="t.name" :value="t.name">{{ t.name }}</option>
      </select>
    </div>

    <LoadingSkeleton v-if="loading" />
    <template v-else>
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <ResourceCard v-for="item in displayedItems" :key="item.name" :entry="entry" :item="item" />
      </div>
      <p v-if="!displayedItems.length" class="py-16 text-center text-sm text-slate-400">No Pokémon found.</p>
      <Pagination
        v-if="mode === 'browse'"
        :page="paginated.page.value"
        :page-count="paginated.pageCount.value"
        :has-next="paginated.hasNext.value"
        :has-prev="paginated.hasPrev.value"
        @next="paginated.next"
        @prev="paginated.prev"
      />
    </template>
  </section>
</template>
