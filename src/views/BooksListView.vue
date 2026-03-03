<template>
  <section class="page">
    <h1>Livres</h1>

    <div class="filters">
      <label class="label">
        Catégorie
        <select v-model="selectedCategory">
          <option value="">Toutes</option>
          <option v-for="categorie in categories" :key="categorie" :value="categorie">
            {{ categorie }}
          </option>
        </select>
      </label>
    </div>

    <div class="list">
      <article v-for="book in filteredBooks" :key="book.id" class="card">
        <h2 class="title">
          <RouterLink :to="{ name: 'book-details', params: { id: book.id } }">
            {{ book.title }}
          </RouterLink>
        </h2>

        <p class="meta">
          <strong>Auteur :</strong>
          {{ book.writer?.firstname || '' }} {{ book.writer?.lastname || '' }}
        </p>

        <p class="meta">
          <strong>Posté par :</strong>
          <RouterLink :to="{ name: 'user-detail', params: { id: book.userId } }">
            {{ getUserPseudo(book.userId) }}
          </RouterLink>
        </p>

        <p class="meta"><strong>Catégorie :</strong> {{ book.category?.label || 'Inconnue' }}</p>
      </article>

      <p v-if="filteredBooks.length === 0" class="empty">Rien dans cette catégorie</p>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import BookServices from '@/services/BookServices'

const selectedCategory = ref('')

// Tolérance si books ou users sont undefined
const books = BookServices.books || []
const users = BookServices.users || []

// Extraire catégories uniques en filtrant null/undefined
const categories = computed(() => {
  const set = new Set()
  books.forEach((book) => {
    if (book.category?.label) set.add(book.category.label)
  })
  return Array.from(set).sort()
})

// Filtrer livres selon la catégorie sélectionnée
const filteredBooks = computed(() => {
  if (!selectedCategory.value) return books
  return books.filter((book) => book.category?.label === selectedCategory.value)
})

// Pseudo utilisateur
function getUserPseudo(userId) {
  const user = users.find((u) => String(u.id) === String(userId))
  return user ? user.username || user.pseudo || 'Utilisateur inconnu' : 'Utilisateur inconnu'
}
</script>

<style scoped>
.page {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
}

.filters {
  margin: 12px 0 18px;
  display: flex;
  gap: 12px;
  align-items: end;
}

.label {
  display: grid;
  gap: 6px;
}

select {
  padding: 6px 10px;
}

.list {
  display: grid;
  gap: 12px;
}

.card {
  border: 1px solid #e1e1e1;
  border-radius: 10px;
  padding: 12px 14px;
}

.title {
  margin: 0 0 8px;
}

.meta {
  margin: 4px 0;
}

.empty {
  opacity: 0.8;
  font-style: italic;
}
</style>
