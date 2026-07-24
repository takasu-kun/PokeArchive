<script setup>
import { computed } from 'vue'
import { Icon } from '@iconify/vue'
import { resolveColorToken } from '@/utils/typeColors'

const props = defineProps(['icon', 'color', 'title', 'description'])

const hex = computed(() => resolveColorToken(props.color))
</script>

<template>
  <header class="mb-8 flex items-center gap-4">
    <div
      class="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl shadow-sm"
      :style="{ backgroundColor: `color-mix(in srgb, ${hex} 18%, transparent)` }"
    >
      <Icon :icon="icon" class="h-7 w-7" :style="{ color: hex }" />
    </div>
    <div>
      <h1 class="font-display text-2xl font-bold text-slate-800 dark:text-white sm:text-3xl">{{ title }}</h1>
      <p v-if="description" class="mt-1 text-sm text-slate-500 dark:text-slate-400">{{ description }}</p>
    </div>
  </header>
</template>
