import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BookDetailView from '../views/BookDetailView.vue'
import BooksListView from '../views/BooksListView.vue'
import AddBookView from '../views/AddBookView.vue'
import EditBookView from '../views/EditBookView.vue'
import UserDetailView from '../views/UserDetailView.vue'

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
    {
      path: '/books/:id',
      name: 'book-details',
      component: BookDetailView,
      // on peut recevoir l'id directement comme une prop
      props: true,
    },
    {
      path: '/books',
      name: 'books-list',
      component: BooksListView,
    },
    {
      path: '/books/add',
      name: 'book-add',
      component: AddBookView,
    },
    {
      path: '/books/:id/edit',
      name: 'books-edit',
      component: EditBookView,
    },
    {
      path: '/users/:id',
      name: 'user-details',
      component: UserDetailView,
    },
  ],
})

export default router
