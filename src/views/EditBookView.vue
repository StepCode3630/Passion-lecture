<template>
  <section class="page" v-if="book">
    <h1>Modifier les données d'un ouvrage</h1>

    <!-- -->
    <p v-if=""></p>
    <p></p>

    <p>
      <strong>Posté par :</strong>
    </p>
  </section>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { computed } from 'vue'
import {  } from
import {  } from


const router = useRouter()
const actualUser = computed(() => getActualUser())


// récup id depuis url
const props = defineProps({
  id: {type: String, required: true},
})

// vérification des droits user
const okEdit = computed(() => {
  if (!actualUser.value || !book) return false
  return (
    actualUser.value.id === book.userId || actualUser.value.role === 'admin'
  )
  })
</script>

<style scoped>
.page {
  max-width: 900px;
  margin: 0 auto;
}
</style>
