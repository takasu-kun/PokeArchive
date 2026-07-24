<script setup>
import CrossLink from '@/components/common/CrossLink.vue'

defineProps(['abilities'])
</script>

<template>
  <ul class="flex flex-wrap gap-2">
    <li v-for="a in abilities" :key="a.slot" class="flex items-center gap-1.5">
      <CrossLink :resource="a.ability" />
      <span v-if="a.is_hidden" class="rounded-full bg-poke-yellow/20 px-2 py-0.5 text-[10px] font-semibold text-poke-gold">Hidden</span>
    </li>
  </ul>
</template>
