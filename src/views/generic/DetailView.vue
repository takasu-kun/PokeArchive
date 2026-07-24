<script setup>
import { computed, defineAsyncComponent } from 'vue'
import { getRegistryEntry } from '@/registry'
import { useResource } from '@/composables/useResource'
import CategoryHeader from '@/components/common/CategoryHeader.vue'
import FieldSection from '@/components/common/FieldSection.vue'
import LoadingSkeleton from '@/components/common/LoadingSkeleton.vue'
import ErrorState from '@/components/common/ErrorState.vue'
import { humanize } from '@/composables/useLocalized'

const props = defineProps(['resourceType', 'id'])

const entry = computed(() => getRegistryEntry(props.resourceType))
const { data, loading, error, reload } = useResource(
  () => entry.value?.endpoint ?? '',
  () => props.id,
)

const DETAIL_COMPONENTS = {
  PokemonDetail: defineAsyncComponent(() => import('@/components/pokemon/PokemonDetail.vue')),
  EvolutionChainDetail: defineAsyncComponent(() => import('@/components/pokemon/EvolutionChainDetail.vue')),
  LocationAreaDetail: defineAsyncComponent(() => import('@/components/pokemon/LocationAreaDetail.vue')),
}

const bespokeComponent = computed(() => (entry.value?.detailComponent ? DETAIL_COMPONENTS[entry.value.detailComponent] : null))

const title = computed(() => {
  const name = data.value?.name ?? props.id
  return humanize(String(name))
})
</script>

<template>
  <section v-if="entry" class="mx-auto max-w-4xl px-4 py-10 sm:px-6">
    <LoadingSkeleton v-if="loading" variant="line" />
    <ErrorState v-else-if="error" :message="error" @retry="reload" />
    <template v-else-if="data">
      <component :is="bespokeComponent" v-if="bespokeComponent" :data="data" />
      <template v-else>
        <CategoryHeader :icon="entry.icon" :color="entry.color" :title="title" :description="entry.label" />
        <dl class="rounded-2xl border border-slate-200 bg-white px-6 dark:border-slate-700 dark:bg-surface-dark-raised">
          <FieldSection v-for="field in entry.detailFields" :key="field.key" :field="field" :data="data" />
        </dl>
      </template>
    </template>
  </section>
  <section v-else class="mx-auto max-w-4xl px-4 py-20 text-center text-slate-500">Unknown resource type.</section>
</template>
