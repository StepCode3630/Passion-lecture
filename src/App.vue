<template>
  <div id="layout">
    <AppHeader />

    <main>
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
// Importation du composant
import AppHeader from './components/appheader.vue'
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
