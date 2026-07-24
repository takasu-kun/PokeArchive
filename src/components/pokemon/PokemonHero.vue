<script setup>
import { computed, ref } from 'vue'
import { Icon } from '@iconify/vue'
import { humanize } from '@/composables/useLocalized'
import { typeColor } from '@/utils/typeColors'
import TypeBadge from '@/components/common/TypeBadge.vue'

const props = defineProps(['pokemon'])

const shiny = ref(false)

const animated = computed(() => props.pokemon.sprites.versions?.['generation-v']?.['black-white']?.animated)

const artwork = computed(() => props.pokemon.sprites.other?.['official-artwork'])

const spriteSrc = computed(() => {
  const s = props.pokemon.sprites
  if (shiny.value) {
    return animated.value?.front_shiny || artwork.value?.front_shiny || s.front_shiny || s.front_default
  }
  return animated.value?.front_default || artwork.value?.front_default || s.front_default
})

const primaryType = computed(() => props.pokemon.types[0]?.type.name ?? 'normal')
</script>

<template>
  <div
    class="relative overflow-hidden rounded-3xl p-8 shadow-sm"
    :style="{ background: `linear-gradient(135deg, color-mix(in srgb, ${typeColor(primaryType)} 30%, white) 0%, color-mix(in srgb, ${typeColor(primaryType)} 12%, transparent) 100%)` }"
  >
    <Icon icon="mdi:pokeball" class="pointer-events-none absolute -right-10 -top-10 h-56 w-56 text-white/30 dark:text-white/10" />

    <div class="relative flex flex-col items-center gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div class="flex flex-col items-center sm:items-start">
        <span class="font-display text-sm font-semibold text-slate-500 dark:text-slate-300">#{{ String(pokemon.id).padStart(4, '0') }}</span>
        <h1 class="font-display text-3xl font-bold capitalize text-slate-800 dark:text-white sm:text-4xl">{{ humanize(pokemon.name) }}</h1>
        <div class="mt-2 flex flex-wrap justify-center gap-2 sm:justify-start">
          <TypeBadge v-for="t in pokemon.types" :key="t.slot" :name="t.type.name" />
        </div>
        <dl class="mt-4 flex gap-6 text-center sm:text-left">
          <div>
            <dt class="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">Height</dt>
            <dd class="font-semibold text-slate-700 dark:text-slate-200">{{ (pokemon.height / 10).toFixed(1) }} m</dd>
          </div>
          <div>
            <dt class="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">Weight</dt>
            <dd class="font-semibold text-slate-700 dark:text-slate-200">{{ (pokemon.weight / 10).toFixed(1) }} kg</dd>
          </div>
          <div>
            <dt class="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">Base XP</dt>
            <dd class="font-semibold text-slate-700 dark:text-slate-200">{{ pokemon.base_experience ?? '—' }}</dd>
          </div>
        </dl>
      </div>

      <div class="flex flex-col items-center gap-2">
        <img v-if="spriteSrc" :src="spriteSrc" :alt="pokemon.name" class="h-40 w-40 object-contain drop-shadow-xl sm:h-48 sm:w-48" />
        <div v-else class="flex h-40 w-40 items-center justify-center text-slate-300 sm:h-48 sm:w-48">
          <Icon icon="mdi:help" class="h-16 w-16" />
        </div>
        <button
          type="button"
          class="flex items-center gap-1.5 rounded-full border border-slate-300/60 bg-white/70 px-3 py-1 text-xs font-medium text-slate-600 backdrop-blur transition hover:border-poke-yellow hover:text-poke-gold dark:border-slate-600 dark:bg-slate-800/70 dark:text-slate-300"
          @click="shiny = !shiny"
        >
          <Icon icon="mdi:star-four-points" class="h-3.5 w-3.5" :class="shiny ? 'text-poke-yellow' : ''" />
          {{ shiny ? 'Shiny' : 'Show shiny' }}
        </button>
      </div>
    </div>
  </div>
</template>
