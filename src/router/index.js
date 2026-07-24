import { createRouter, createWebHistory } from 'vue-router'
import { coreRoutes, notFoundRoute } from './routes'
import { genericRoutes } from './routes.generic'

export const router = createRouter({
  history: createWebHistory(),
  routes: [...coreRoutes, ...genericRoutes, notFoundRoute],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  },
})
