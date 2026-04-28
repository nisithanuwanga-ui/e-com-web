import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import ProductView from '../views/ProductView.vue'
import LoginView from '../views/LoginView.vue' // 1. Import it

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/product/:id',
    name: 'ProductDetail',
    component: ProductView,
  },
  {
    path: '/login', // 2. Add the route
    name: 'Login',
    component: LoginView,
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router