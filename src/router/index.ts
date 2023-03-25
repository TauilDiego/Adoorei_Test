import { createRouter, createWebHistory } from 'vue-router'

const showcase = () => import('../views/ShowcaseHome.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: showcase
    },

  ]
})

export default router
