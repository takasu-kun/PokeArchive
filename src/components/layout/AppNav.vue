<script setup>
import { CLUSTERS } from '@/registry/clusters'

defineProps({ vertical: { type: Boolean, default: false } })
const emit = defineEmits(['navigate'])
</script>

<template>
  <nav :class="vertical ? 'flex flex-col gap-1' : 'hidden items-center gap-1 lg:flex'">
    <RouterLink
      v-for="cluster in CLUSTERS"
      :key="cluster.key"
      :to="cluster.key === 'pokemon' ? '/pokemon' : `/${cluster.key}`"
      class="rounded-full px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-poke-red/10 hover:text-poke-red dark:text-slate-300 dark:hover:bg-poke-red/15"
      active-class="bg-poke-red/10 text-poke-red dark:bg-poke-red/20"
      @click="emit('navigate')"
    >
      {{ cluster.label }}
    </RouterLink>
  </nav>
</template>
