<template>
  <div id="layout">
    <AppHeader />

    <main>
      <RouterView />
    </main>
    <TheFooter />

    <AppToast />
    <AppConfirm />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import AppHeader from './components/appHeader.vue'
import TheFooter from './components/TheFooter.vue'
import AppToast from './components/AppToast.vue'
import AppConfirm from './components/AppConfirm.vue'
</script>

<style>
body {
  margin: 0;
  font-family: Arial, sans-serif;
}

main {
  min-height: calc(100vh - 80px);
}

.form-page .error,
.form-container .error {
  color: #b94a48;
  font-size: 0.85rem;
  margin-top: 5px;
  font-weight: bold;
}
</style>
