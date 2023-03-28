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
      path: '/category/:categoryName',
      name: 'category',
      component: category,
      props: true,
    },
    {
      path: '/product/:productId',
      name: 'product',
      component: category,
      props: true,
    },
    {
      path: '/cart',
      name: 'cart',
      component: cart
    },

  ]
})

export default router
