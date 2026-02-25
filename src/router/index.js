import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/mes-livres',
      name: 'books-list',
      component: HomeView,
    },
    {
      path: '/decouvrir',
      name: 'discover',
      component: HomeView,
    },
    {
      path: '/compte',
      name: 'profile',
      component: HomeView,
    },
  ],
})

export default router
