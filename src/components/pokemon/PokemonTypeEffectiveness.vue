<script setup>
import { computed } from 'vue'
import { useResourceByUrl } from '@/composables/useResourceByUrl'
import TypeBadge from '@/components/common/TypeBadge.vue'

const props = defineProps(['types'])

const { data: type1 } = useResourceByUrl(() => props.types[0]?.type.url)
const { data: type2 } = useResourceByUrl(() => props.types[1]?.type.url)

const multipliers = computed(() => {
  const map = {}
  const relations = [type1.value?.damage_relations, type2.value?.damage_relations].filter(Boolean)
  for (const rel of relations) {
    for (const t of rel.double_damage_from) map[t.name] = (map[t.name] ?? 1) * 2
    for (const t of rel.half_damage_from) map[t.name] = (map[t.name] ?? 1) * 0.5
    for (const t of rel.no_damage_from) map[t.name] = (map[t.name] ?? 1) * 0
  }
  return map
})

function groupBy(predicate) {
  return Object.entries(multipliers.value)
    .filter(([, m]) => predicate(m))
    .sort((a, b) => b[1] - a[1])
}

const weakTo = computed(() => groupBy((m) => m > 1))
const resistantTo = computed(() => groupBy((m) => m > 0 && m < 1))
const immuneTo = computed(() => groupBy((m) => m === 0))

const ready = computed(() => !!type1.value && (props.types.length < 2 || !!type2.value))
</script>

<template>
  <div v-if="ready" class="space-y-4">
    <div v-if="weakTo.length">
      <p class="mb-1.5 text-xs font-semibold uppercase tracking-wide text-slate-400">Weak To</p>
      <div class="flex flex-wrap gap-2">
        <div v-for="[name, mult] in weakTo" :key="name" class="relative">
          <TypeBadge :name="name" />
          <span class="absolute -right-1.5 -top-1.5 rounded-full bg-poke-red px-1 text-[10px] font-bold text-white">{{ mult }}x</span>
        </div>
      </div>
    </div>
    <div v-if="resistantTo.length">
      <p class="mb-1.5 text-xs font-semibold uppercase tracking-wide text-slate-400">Resistant To</p>
      <div class="flex flex-wrap gap-2">
        <div v-for="[name, mult] in resistantTo" :key="name" class="relative">
          <TypeBadge :name="name" />
          <span class="absolute -right-1.5 -top-1.5 rounded-full bg-emerald-600 px-1 text-[10px] font-bold text-white">{{ mult }}x</span>
        </div>
      </div>
    </div>
    <div v-if="immuneTo.length">
      <p class="mb-1.5 text-xs font-semibold uppercase tracking-wide text-slate-400">Immune To</p>
      <div class="flex flex-wrap gap-2">
        <TypeBadge v-for="[name] in immuneTo" :key="name" :name="name" />
      </div>
    </div>
  </div>
</template>
