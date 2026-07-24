<script setup>
import { computed } from 'vue'
import { getByPath } from '@/utils/path'
import TypeBadge from './TypeBadge.vue'
import CrossLink from './CrossLink.vue'
import LocalizedText from './LocalizedText.vue'
import { localizedName } from '@/composables/useLocalized'

const props = defineProps(['field', 'data'])

const value = computed(() => (props.field.transform ? props.field.transform(props.data) : getByPath(props.data, props.field.key)))
const isEmpty = computed(() => {
  const v = value.value
  return v === undefined || v === null || v === '' || (Array.isArray(v) && v.length === 0)
})

function asResourceList(v) {
  return Array.isArray(v) ? v : []
}
</script>

<template>
  <div v-if="!isEmpty" class="border-b border-slate-100 py-4 last:border-0 dark:border-slate-800">
    <dt class="mb-1.5 text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">{{ field.label }}</dt>
    <dd>
      <template v-if="field.kind === 'image'">
        <img :src="value" :alt="field.label" class="h-20 w-20 object-contain" loading="lazy" />
      </template>

      <template v-else-if="field.kind === 'badge'">
        <TypeBadge v-if="field.linkResourceType === 'type'" :name="typeof value === 'object' ? value.name : String(value)" />
        <CrossLink v-else :resource="value" />
      </template>

      <template v-else-if="field.kind === 'badge-list'">
        <div class="flex flex-wrap gap-2">
          <template v-if="field.linkResourceType === 'type'">
            <TypeBadge v-for="(v, i) in asResourceList(value)" :key="i" :name="v.name ?? String(v)" />
          </template>
          <template v-else>
            <CrossLink v-for="(v, i) in asResourceList(value)" :key="i" :resource="v" />
          </template>
        </div>
      </template>

      <template v-else-if="field.kind === 'link'">
        <CrossLink :resource="value" />
      </template>

      <template v-else-if="field.kind === 'link-list'">
        <div class="flex flex-wrap gap-2">
          <CrossLink v-for="(v, i) in asResourceList(value)" :key="i" :resource="v" />
        </div>
      </template>

      <template v-else-if="field.kind === 'localized-text'">
        <LocalizedText :entries="value" />
      </template>

      <template v-else-if="field.kind === 'localized-name'">
        <span class="text-sm text-slate-700 dark:text-slate-200">{{ localizedName(value) || '—' }}</span>
      </template>

      <template v-else-if="field.kind === 'boolean'">
        <span
          class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold"
          :class="value ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300' : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'"
        >
          {{ value ? 'Yes' : 'No' }}
        </span>
      </template>

      <template v-else-if="field.kind === 'raw-list'">
        <span class="text-sm text-slate-700 dark:text-slate-200">{{ Array.isArray(value) ? value.join(', ') : value }}</span>
      </template>

      <template v-else>
        <span class="text-sm text-slate-700 dark:text-slate-200">{{ value }}</span>
      </template>
    </dd>
  </div>
</template>
