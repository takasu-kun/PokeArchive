<script setup>
import { computed } from 'vue'
import { useResource } from '@/composables/useResource'
import { getByPath } from '@/utils/path'
import { idFromUrl } from '@/api/client'
import { resolveResourceRoute } from '@/registry'
import { humanize } from '@/composables/useLocalized'
import TypeBadge from './TypeBadge.vue'

const props = defineProps(['entry', 'item'])

const identifier = computed(() => props.item.name ?? idFromUrl(props.item.url))
const needsDetail = props.entry.listFields.some((f) => f.key !== 'name' && f.key !== 'id')

const { data, loading } = useResource(
  props.entry.endpoint,
  () => (needsDetail ? identifier.value : undefined),
)

const to = computed(() => resolveResourceRoute(props.entry.key, identifier.value))
const title = computed(() => (props.item.name ? humanize(props.item.name) : `#${identifier.value}`))

const imageField = computed(() => props.entry.listFields.find((f) => f.kind === 'image'))
const metaFields = computed(() =>
  props.entry.listFields.filter((f) => f.key !== 'name' && f.kind !== 'image' && f.kind !== 'badge' && f.kind !== 'badge-list'),
)

function resolve(field) {
  if (!data.value) return undefined
  return field.transform ? field.transform(data.value) : getByPath(data.value, field.key)
}

const imageSrc = computed(() => (imageField.value ? resolve(imageField.value) : undefined))

/** Flattened, ready-to-render list of badge chips across every badge/badge-list listField. */
const badgeChips = computed(() => {
  const chips = []
  for (const field of props.entry.listFields) {
    if (field.kind !== 'badge' && field.kind !== 'badge-list') continue
    const value = resolve(field)
    if (value === undefined || value === null) continue
    const entries = Array.isArray(value) ? value : [value]
    for (const entry of entries) {
      const name = typeof entry === 'string' ? entry : entry?.name
      if (name) chips.push({ key: `${field.key}:${name}`, name })
    }
  }
  return chips
})

function metaValue(field) {
  const value = resolve(field)
  return value === undefined || value === null ? null : value
}
</script>

<template>
  <RouterLink
    :to="to"
    class="group flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-poke-red/40 hover:shadow-md dark:border-slate-700 dark:bg-surface-dark-raised"
  >
    <div class="flex items-center gap-3">
      <div
        v-if="imageField"
        class="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800"
      >
        <img
          v-if="imageSrc"
          :src="imageSrc"
          :alt="title"
          class="h-12 w-12 object-contain"
          loading="lazy"
        />
        <div v-else class="h-8 w-8 animate-pulse rounded-full bg-slate-300 dark:bg-slate-600" />
      </div>
      <div class="min-w-0 flex-1">
        <p class="truncate font-display text-base font-semibold capitalize text-slate-800 group-hover:text-poke-red dark:text-white">
          {{ title }}
        </p>
        <p v-if="loading && needsDetail" class="text-xs text-slate-400">Loading…</p>
      </div>
    </div>

    <div v-if="badgeChips.length" class="flex flex-wrap gap-1.5">
      <TypeBadge v-for="chip in badgeChips" :key="chip.key" :name="chip.name" :linkable="false" size="sm" />
    </div>

    <div v-if="metaFields.length && data" class="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
      <template v-for="field in metaFields" :key="field.key">
        <span v-if="metaValue(field) !== null">{{ field.label }}: {{ metaValue(field) }}</span>
      </template>
    </div>
  </RouterLink>
</template>
