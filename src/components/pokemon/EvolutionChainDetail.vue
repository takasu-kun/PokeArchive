<script setup>
import CategoryHeader from '@/components/common/CategoryHeader.vue'
import EvolutionNode from './EvolutionNode.vue'

defineProps({ data: {}, embedded: { type: Boolean, default: false } })
</script>

<template>
  <div>
    <CategoryHeader v-if="!embedded" icon="mdi:family-tree" color="type-dragon" title="Evolution Chain" :description="`Chain #${data.id}`" />
    <div class="overflow-x-auto rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-surface-dark-raised">
      <EvolutionNode :link="data.chain" />
    </div>
  </div>
</template>
