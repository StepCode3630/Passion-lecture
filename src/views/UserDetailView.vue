<template>
  <section class="page" v-if="user">
    <h1>Détail de l'utilisateur</h1>

    <p><strong>Pseudo :</strong> {{ user.pseudo }}</p>
    <p><strong>Rôle utilisateur:</strong> {{ user.role }}</p>

    <h2>Livres de {{ user.pseudo }}</h2>
    <ul>
      <li v-for="b in userBooks" :key="b.id">
        <RouterLink :to="{ name: 'book-detail', params: { id: b.id } }">
          {{ b.title }}
        </RouterLink>
      </li>
    </ul>

    <RouterLink to="/books">Retour à la liste</RouterLink>
  </section>

  <section v-else class="page">
    <p>Utilisateur non trouvé</p>
    <RouterLink to="/books">Retour à la liste</RouterLink>
  </section>
</template>

<script setup>
import { computed } from "vue"
import { RouterLink } from "vue-router"
import { books, users } from "@/data/mockData.js"

const props = defineProps({
  id: { type: String, required: true },
})

const user = computed(() => users.find((u) => String(u.id) === props.id))

const userBooks = computed(() => {
  if (!user.value) return []
  return books.filter((b) => b.userId === user.value.id)
})
</script>

<style scoped>
.page {
  max-width: 900px;
  margin: 0 auto;
}
</style>
