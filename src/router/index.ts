import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import ProductView from '../views/ProductView.vue'
import LoginView from '../views/LoginView.vue' 
import CartView from '../views/CartView.vue'
import CategoryView from '../views/CategoryView.vue'

const routes: Array<RouteRecordRaw> = [
  { path: '/', name: 'Home', component: Home,},
  { path: '/laptops', name: 'Laptops', component: CategoryView, props: { categoryKey: 'laptops' } },
  { path: '/mobiles', name: 'Mobiles', component: CategoryView, props: { categoryKey: 'mobiles' } },
  { path: '/tablets', name: 'Tablets', component: CategoryView, props: { categoryKey: 'tablets' } },
  { path: '/accessories', name: 'Accessories', component: CategoryView, props: { categoryKey: 'accessories' } },
  { path: '/product/:id', name: 'ProductDetail', component: ProductView,},
  { path: '/login', name: 'Login', component: LoginView,},
  { path: '/cart', name: 'Cart', component: CartView }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router