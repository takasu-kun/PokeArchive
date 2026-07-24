<script setup>
import { computed } from 'vue'
import { getRegistryEntry } from '@/registry'
import { useResourceList } from '@/composables/useResourceList'
import CategoryHeader from '@/components/common/CategoryHeader.vue'
import ResourceCard from '@/components/common/ResourceCard.vue'
import Pagination from '@/components/common/Pagination.vue'
import LoadingSkeleton from '@/components/common/LoadingSkeleton.vue'
import ErrorState from '@/components/common/ErrorState.vue'

const props = defineProps(['resourceType'])

const entry = computed(() => getRegistryEntry(props.resourceType))
const { items, page, pageCount, hasNext, hasPrev, loading, error, next, prev } = useResourceList(
  () => entry.value?.endpoint ?? '',
)
</script>

<template>
  <section v-if="entry" class="mx-auto max-w-6xl px-4 py-10 sm:px-6">
    <CategoryHeader :icon="entry.icon" :color="entry.color" :title="entry.pluralLabel" :description="entry.description" />

    <LoadingSkeleton v-if="loading && !items.length" />
    <ErrorState v-else-if="error" :message="error" @retry="prev(); next()" />
    <template v-else>
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <ResourceCard v-for="item in items" :key="item.name ?? item.url" :entry="entry" :item="item" />
      </div>
      <Pagination :page="page" :page-count="pageCount" :has-next="hasNext" :has-prev="hasPrev" @next="next" @prev="prev" />
    </template>
  </section>
  <section v-else class="mx-auto max-w-6xl px-4 py-20 text-center text-slate-500">Unknown resource type.</section>
</template>
