<template>
  <div id="layout">
    <AppHeader />

    <main>
      <RouterView />
    </main>
    <TheFooter />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
// Importation du composant
import AppHeader from './components/appHeader.vue'
import TheFooter from './components/TheFooter.vue'
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
