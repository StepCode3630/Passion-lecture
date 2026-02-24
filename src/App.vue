<template>
  <div class="app">
    <header class="topbar">
      <nav class="nav">
        <RouterLink to="/" class="navLink">Accueil</RouterLink>
        <RouterLink to="/books" class="navLink">Livres</RouterLink>
      </nav>
    </header>

    <main class="main">
      <RouterView />
    </main>

    <footer class="footer">
      <small>Passion Lecture 2026</small>
    </footer>
  <div id="layout">
    <AppHeader />

    <main>
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from "vue-router"
</script>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.topbar {
  border-bottom: 1px solid #ddd;
  padding: 12px 16px;
}

.nav {
  display: flex;
  gap: 12px;
}

.navLink {
  text-decoration: none;
  padding: 6px 10px;
  border-radius: 6px;
}

.navLink.router-link-active {
  font-weight: 700;
  text-decoration: underline;
}

.main {
  flex: 1;
  padding: 16px;
}

.footer {
  border-top: 1px solid #ddd;
  padding: 12px 16px;
  text-align: center;
import { RouterView } from 'vue-router'
// Importation du composant
import AppHeader from './components/appHeader.vue'
</script>

<style>
/* Styles globaux pour toute l'app */
body {
  margin: 0;
  font-family: Arial, sans-serif;
}
main {
  min-height: calc(100vh - 80px); /* Ajuste selon la taille du header */
}
</style>
