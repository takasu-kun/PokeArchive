export const coreRoutes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
  },
  {
    path: '/pokemon',
    name: 'pokemon-list',
    component: () => import('@/views/pokemon/PokemonListView.vue'),
  },
  {
    path: '/pokemon/:name',
    name: 'pokemon-detail',
    component: () => import('@/views/pokemon/PokemonDetailView.vue'),
    props: true,
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/SearchView.vue'),
  },
]

export const notFoundRoute = {
  path: '/:pathMatch(.*)*',
  name: 'not-found',
  component: () => import('@/views/NotFoundView.vue'),
}
