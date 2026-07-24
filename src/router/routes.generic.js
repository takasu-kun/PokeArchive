import { CLUSTERS } from '@/registry/clusters'

/**
 * Cluster hub + generic list/detail routes for every cluster except 'pokemon',
 * which is special-cased with bespoke flat routes (/pokemon, /pokemon/:name)
 * registered separately in routes.js.
 */
export const genericRoutes = [
  ...CLUSTERS.filter((c) => c.key !== 'pokemon').map((cluster) => ({
    path: `/${cluster.key}`,
    name: `cluster-${cluster.key}`,
    component: () => import('@/views/ClusterHubView.vue'),
    props: { cluster: cluster.key },
  })),
  {
    path: '/:cluster/:resourceType',
    name: 'generic-list',
    component: () => import('@/views/generic/ListView.vue'),
    props: true,
  },
  {
    path: '/:cluster/:resourceType/:id',
    name: 'generic-detail',
    component: () => import('@/views/generic/DetailView.vue'),
    props: true,
  },
]
