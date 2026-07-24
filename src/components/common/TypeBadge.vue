<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { Icon } from '@iconify/vue'
import { typeColor } from '@/utils/typeColors'

const props = defineProps({
  name: {},
  linkable: { type: Boolean, default: true },
  size: { default: 'md' },
})

const DARK_TEXT_TYPES = new Set(['electric', 'ice', 'ground', 'fairy', 'normal'])
const TYPE_ICONS = {
  normal: 'mdi:circle-outline',
  fire: 'mdi:fire',
  water: 'mdi:water',
  electric: 'mdi:flash',
  grass: 'mdi:leaf',
  ice: 'mdi:snowflake',
  fighting: 'mdi:boxing-glove',
  poison: 'mdi:flask',
  ground: 'mdi:image-filter-hdr',
  flying: 'mdi:feather',
  psychic: 'mdi:eye',
  bug: 'mdi:bug',
  rock: 'mdi:terrain',
  ghost: 'mdi:ghost',
  dragon: 'mdi:dragon',
  dark: 'mdi:weather-night',
  steel: 'mdi:shield',
  fairy: 'mdi:sparkles',
}

const textClass = computed(() => (DARK_TEXT_TYPES.has(props.name) ? 'text-slate-900' : 'text-white'))
const icon = computed(() => TYPE_ICONS[props.name] ?? 'mdi:help-box')
const sizeClass = computed(() => (props.size === 'sm' ? 'text-xs px-2 py-0.5 gap-1' : 'text-sm px-3 py-1 gap-1.5'))
</script>

<template>
  <component
    :is="linkable ? RouterLink : 'span'"
    :to="linkable ? `/misc/type/${name}` : undefined"
    class="inline-flex items-center rounded-full font-semibold capitalize shadow-sm transition-transform hover:scale-105"
    :class="[textClass, sizeClass]"
    :style="{ backgroundColor: typeColor(name) }"
  >
    <Icon :icon="icon" class="shrink-0" :class="size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'" />
    {{ name }}
  </component>
</template>
