import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import ProductView from '../views/ProductView.vue' // 1. Import it here

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/product/:id', // 2. The ":id" makes it dynamic!
    name: 'ProductDetail',
    component: ProductView,
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router