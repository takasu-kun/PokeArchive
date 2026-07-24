<script setup>
import { computed } from 'vue'
import { idFromUrl, resourceTypeFromUrl } from '@/api/client'
import { resolveResourceRoute } from '@/registry'
import { humanize } from '@/composables/useLocalized'

const props = defineProps(['resource', 'label'])

const resourceType = computed(() => (props.resource ? resourceTypeFromUrl(props.resource.url) : ''))
const identifier = computed(() => props.resource?.name ?? (props.resource ? idFromUrl(props.resource.url) : ''))
const to = computed(() => (props.resource ? resolveResourceRoute(resourceType.value, identifier.value) : '#'))
const display = computed(() => props.label ?? humanize(props.resource?.name) ?? String(identifier.value))
</script>

<template>
  <RouterLink
    v-if="resource"
    :to="to"
    class="inline-flex items-center rounded-full border border-poke-blue/30 bg-poke-blue/5 px-2.5 py-1 text-sm font-medium text-poke-blue-dark transition-colors hover:bg-poke-blue/15 dark:border-poke-blue/40 dark:bg-poke-blue/10 dark:text-blue-300 dark:hover:bg-poke-blue/25"
  >
    {{ display }}
  </RouterLink>
  <span v-else class="text-sm text-slate-400 dark:text-slate-500">—</span>
</template>
