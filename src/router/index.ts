import { createRouter, createWebHistory } from 'vue-router'

const showcase = () => import('@/views/ShowcaseHome.vue')
const category = () => import('@/views/CategoryFilter.vue')
const cart = () => import('@/views/CartCheckout.vue')

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: showcase
    },
    {
      path: '/category',
      name: 'category',
      component: category
    },
    {
      path: '/cart',
      name: 'cart',
      component: cart
    }
  ]
})

export default router
