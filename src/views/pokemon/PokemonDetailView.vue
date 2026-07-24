<script setup>
import { useResource } from '@/composables/useResource'
import LoadingSkeleton from '@/components/common/LoadingSkeleton.vue'
import ErrorState from '@/components/common/ErrorState.vue'
import PokemonDetail from '@/components/pokemon/PokemonDetail.vue'

const props = defineProps(['name'])

const { data, loading, error, reload } = useResource('pokemon', () => props.name)
</script>

<template>
  <section class="mx-auto max-w-4xl px-4 py-10 sm:px-6">
    <LoadingSkeleton v-if="loading" variant="line" :rows="8" />
    <ErrorState v-else-if="error" :message="error" @retry="reload" />
    <PokemonDetail v-else-if="data" :data="data" />
  </section>
</template>
