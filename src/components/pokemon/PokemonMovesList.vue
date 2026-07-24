<script setup>
import { computed, ref } from 'vue'
import CrossLink from '@/components/common/CrossLink.vue'
import { humanize } from '@/composables/useLocalized'

const props = defineProps(['moves'])

const methods = computed(() => {
  const set = new Set()
  props.moves.forEach((m) => m.version_group_details.forEach((vgd) => set.add(vgd.move_learn_method.name)))
  return Array.from(set)
})

const selectedMethod = ref('')
const activeMethod = computed(() => selectedMethod.value || methods.value[0] || '')

const rows = computed(() => {
  const list = []
  for (const m of props.moves) {
    const matches = m.version_group_details.filter((v) => v.move_learn_method.name === activeMethod.value)
    if (!matches.length) continue
    const latest = matches[matches.length - 1]
    list.push({ move: m.move, level: latest.level_learned_at })
  }
  if (activeMethod.value === 'level-up') {
    list.sort((a, b) => a.level - b.level)
  } else {
    list.sort((a, b) => a.move.name.localeCompare(b.move.name))
  }
  return list
})
</script>

<template>
  <div>
    <select
      v-model="selectedMethod"
      class="mb-3 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm capitalize text-slate-700 dark:border-slate-700 dark:bg-surface-dark-raised dark:text-slate-200"
    >
      <option v-for="m in methods" :key="m" :value="m">{{ humanize(m) }}</option>
    </select>

    <div class="max-h-80 overflow-y-auto rounded-xl border border-slate-100 dark:border-slate-800">
      <div
        v-for="row in rows"
        :key="row.move.name"
        class="flex items-center justify-between gap-3 border-b border-slate-100 px-3 py-2 last:border-0 dark:border-slate-800"
      >
        <CrossLink :resource="row.move" />
        <span v-if="activeMethod === 'level-up'" class="text-xs font-semibold text-slate-400">Lv. {{ row.level }}</span>
      </div>
      <p v-if="!rows.length" class="px-3 py-6 text-center text-sm text-slate-400">No moves for this method.</p>
    </div>
  </div>
</template>
