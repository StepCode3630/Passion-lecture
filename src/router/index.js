import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BookDetailView from '../views/BookDetailView.vue'
import BookMyList from '@/views/BookMyList.vue'
import addBookView from '@/views/AddBookView.vue'
import EditBookView from '@/views/EditBookView.vue'
import BooksListView from '@/views/BooksListView.vue'

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
      component: BookMyList,
    },
    {
      path: '/decouvrir',
      name: 'discover',
      component: BooksListView,
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
      component: BookMyList,
    },
    {
      path: '/books/add',
      name: 'book-add',
      component: addBookView,
    },
    //{
    //  path: '/books/:id/edit',
    //  name: 'books-edit',
    //  component: EditBookView,
    //},
    // {
    //   path: '/users/:id',
    //   name: 'user-details',
    //   component: UserDetailView,
    // },
    {
      path: '/books/add',
      name: 'ajouter',
      component: addBookView,
    },
    {
      path: '/books/:id/edit',
      name: 'book-edit',
      component: EditBookView,
      props: true,
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('@/views/Contact.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/infoCreateur.vue'),
    },
  ],
})

export default router
