// src/router/index.js
import { createRouter, createWebHistory } from "vue-router"

import HomeView from "@/views/HomeView.vue"
import BooksListView from "@/views/BooksListView.vue"
import BookDetailView from "@/views/BookDetailView.vue"
import UserDetailView from "@/views/UserDetailView.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", name: "home",
      component: HomeView },
      // chemin pour liste des livres
    { path: "/books", name: "books",
      component: BooksListView },

    // pour détail ouvrage
    // :id est un patamètre dynamique qui correspond à l'identifiant du livre
    { path: "/books/:id", name: "book-detail",
      component: BookDetailView, props: true },

    // chemin pour détail user
    { path: "/users/:id", name: "user-detail",
    component: UserDetailView, props: true },

    // pour fallback
    // : pathMatch(.*)* est une syntaxe spéciale qui capture tous les chemins qui ne correspondent à aucune route définie
    { path: "/:pathMatch(.*)*", redirect: "/" },
  ],
})

export default router
