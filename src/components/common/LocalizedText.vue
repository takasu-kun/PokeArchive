<script setup>
import { computed } from 'vue'
import { localizedText } from '@/composables/useLocalized'

const props = defineProps(['entries'])
const text = computed(() => localizedText(props.entries))
</script>

<template>
  <p v-if="text" class="text-sm leading-relaxed text-slate-600 dark:text-slate-300">{{ text }}</p>
  <p v-else class="text-sm text-slate-400 dark:text-slate-500">No description available.</p>
</template>
