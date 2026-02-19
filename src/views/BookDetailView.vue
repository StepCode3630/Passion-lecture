<template>
  <section class="page" v-if="book">
    <h1>Détail des Livres</h1>

    <h2>{{ book.title }}</h2>
    <p><strong>Auteur :</strong> {{ book.author }}</p>
    <p><strong>Catégorie :</strong> {{ book.category }}</p>

    <p>
      <strong>Posté par :</strong>
      <RouterLink :to="{ name: 'user-detail', params: { id: book.userId } }">
        {{ userPseudo }}
      </RouterLink>
    </p>

    <RouterLink to="/books">Retour à la liste</RouterLink>
  </section>

  <section v-else class="page">
    <p>Livre non trouvé</p>
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

const book = computed(() => books.find((b) => String(b.id) === props.id))

const userPseudo = computed(() => {
  if (!book.value) return ""
  const user = users.find((u) => u.id === book.value.userId)
  return user ? user.pseudo : "Utilisateur inconnu"
})
</script>

<style scoped>
.page {
  max-width: 900px;
  margin: 0 auto;
}
</style>
