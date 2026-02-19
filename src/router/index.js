// src/router/index.js
import { createRouter, createWebHistory } from "vue-router"

import HomeView from "@/views/HomeView.vue"
import BooksListView from "@/views/BooksListView.vue"
import BookDetailView from "@/views/BookDetailView.vue"
import UserDetailView from "@/views/UserDetailView.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", name: "home", component: HomeView },
    { path: "/books", name: "books", component: BooksListView },

    // pour détail ouvrage
    { path: "/books/:id", name: "book-detail", component: BookDetailView, props: true },

    // chemin pour détail user
    { path: "/users/:id", name: "user-detail", component: UserDetailView, props: true },

    // pour fallback
    { path: "/:pathMatch(.*)*", redirect: "/" },
  ],
})

export default router
