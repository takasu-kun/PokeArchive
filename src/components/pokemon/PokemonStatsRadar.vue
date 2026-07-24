<script setup>
import { computed } from 'vue'
import { Radar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
} from 'chart.js'

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip)

const props = defineProps(['stats', 'color'])

const STAT_LABELS = {
  hp: 'HP',
  attack: 'Attack',
  defense: 'Defense',
  'special-attack': 'Sp. Atk',
  'special-defense': 'Sp. Def',
  speed: 'Speed',
}

const chartData = computed(() => ({
  labels: props.stats.map((s) => STAT_LABELS[s.stat.name] ?? s.stat.name),
  datasets: [
    {
      label: 'Base Stat',
      data: props.stats.map((s) => s.base_stat),
      backgroundColor: `${props.color ?? '#EE1515'}40`,
      borderColor: props.color ?? '#EE1515',
      pointBackgroundColor: props.color ?? '#EE1515',
      borderWidth: 2,
    },
  ],
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    r: {
      beginAtZero: true,
      suggestedMax: 160,
      ticks: { display: false, stepSize: 40 },
      pointLabels: { font: { size: 12, weight: 600 } },
      grid: { color: 'rgba(148, 163, 184, 0.3)' },
      angleLines: { color: 'rgba(148, 163, 184, 0.3)' },
    },
  },
  plugins: {
    tooltip: { enabled: true },
  },
}

const total = computed(() => props.stats.reduce((sum, s) => sum + s.base_stat, 0))
</script>

<template>
  <div>
    <div class="h-72">
      <Radar :data="chartData" :options="chartOptions" />
    </div>
    <p class="mt-2 text-center text-sm font-medium text-slate-500 dark:text-slate-400">Total: {{ total }}</p>
  </div>
</template>
