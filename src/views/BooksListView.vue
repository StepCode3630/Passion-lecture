<template>
  <section class="page">
    <h1>Livres</h1>

    <div class="filters">
      <label class="label">
        Catégorie
        <select v-model="selectedCategory">
          <option value="">Toutes</option>
          <option v-for="categorie in categories" :key="categorie.id" :value="categorie.label">
            {{ categorie.label }}
          </option>
        </select>
      </label>
    </div>

    <div class="list">
      <article v-for="book in filteredBooks" :key="book.id" class="book-card">
        <RouterLink :to="{ name: 'book-detail', params: { id: book.id } }" class="book-card-link">
          <img class="cover" :src="book.imagePath" :alt="book.title" />
          <div class="card-content">
            <h2 class="title">{{ book.title }}</h2>
            <p class="author">{{ book.writer?.firstname }} {{ book.writer?.lastname }}</p>
            <p class="meta">Posté par : {{ getUserPseudo(book.userId) }}</p>
            <p class="meta">Catégorie : {{ book.category?.label || 'Inconnue' }}</p>
          </div>
        </RouterLink>
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

// Livres et utilisateurs depuis BookServices
const books = BookServices.books || []
const users = BookServices.users || []

// Extraire catégories uniques depuis le JSON
const categories = computed(() => {
  const map = new Map()
  books.forEach((book) => {
    if (book.category?.label && !map.has(book.category.id)) {
      map.set(book.category.id, book.category)
    }
  })
  return Array.from(map.values())
})

// Filtrer les livres selon la catégorie
const filteredBooks = computed(() => {
  if (!selectedCategory.value) return books
  return books.filter((book) => book.category?.label === selectedCategory.value)
})

// Récupérer pseudo utilisateur
function getUserPseudo(userId) {
  const user = users.find((u) => String(u.id) === String(userId))
  return user ? user.username || user.pseudo || 'Utilisateur inconnu' : 'Utilisateur inconnu'
}
</script>

<style scoped>
.page {
  max-width: 900px;
  margin: 0 auto;
  padding: 40px 20px;
  font-family: 'Courier New', Courier, monospace;
  text-align: center;
}

h1 {
  font-size: 2.2rem;
  font-weight: bold;
  margin-bottom: 30px;
  color: #2c3e50;
}

.filters {
  margin-bottom: 25px;
  display: flex;
  justify-content: center;
  gap: 20px;
}

.label {
  display: flex;
  flex-direction: column;
  font-weight: bold;
  color: #2c3e50;
  font-size: 0.95rem;
}

select {
  padding: 8px 12px;
  border-radius: 10px;
  border: 1px solid #ccc;
  font-family: inherit;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

select:hover {
  border-color: #2c3e50;
}

.list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

.book-card {
  width: 250px;
  background-color: #f9f9f9;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.3s ease,
    background-color 0.3s ease;
  text-align: left;
}

.book-card-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.cover {
  width: 100%;
  height: 320px;
  object-fit: cover;
  border-bottom: 1px solid #ddd;
}

.card-content {
  padding: 12px 14px;
}

.title {
  font-size: 1.2rem;
  font-weight: bold;
  margin: 0 0 6px;
}

.author {
  font-size: 0.95rem;
  color: #555;
  margin: 0 0 6px;
}

.meta {
  font-size: 0.9rem;
  color: #666;
  margin: 2px 0;
}

.book-card:hover {
  transform: translateY(-5px);
  background-color: #e0f0f7;
}

.empty {
  font-style: italic;
  color: #666;
  margin-top: 20px;
}

/* Responsive */
@media (max-width: 600px) {
  .book-card {
    width: 100%;
  }
}
</style>
