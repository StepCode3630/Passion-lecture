<template>
  <section class="page">
    <h1 class="section-title">Livres</h1>

    <!-- filtre par catégories -->
    <div class="filters">
      <label class="label">
        Catégorie
        <select v-model="selectedCategory">
          <option value="">Toutes</option>
          <option v-for="categorie in categories" :key="categorie.id" :value="categorie.id">
            {{ categorie.label }}
          </option>
        </select>
      </label>
    </div>

    <!-- list livre -->
    <!-- parcourt list livre, crée carte pour chaque livre, rend chaque carte cliquable  -->
    <div class="books-track">
      <!-- parcourt tableau filtreBook, book = objet, article = balise. -->
      <article v-for="book in filteredBooks" :key="book.id" class="book-card">
        <!-- va voir dans book detail -->
        <RouterLink :to="{ name: 'book-details', params: { id: book.id } }" class="book-card-link">
          <div class="card-content">
            <img :src="book.imagePath" alt="Couverture" class="cover" />
            <div class="info-overlay">
              <h2 class="title">{{ book.title }}</h2>
              <!-- évite une erreur si writer est null -->
              <p class="author">
                {{ book.writer?.firstname || '' }} {{ book.writer?.lastname || '' }}
              </p>
              <p class="meta">
                <strong>Catégorie :</strong> {{ book.category?.label || 'Inconnue' }}
              </p>
              <p class="meta"><strong>Posté par :</strong> {{ getUserPseudo(book.userId) }}</p>
            </div>
          </div>
        </RouterLink>
      </article>
    </div>

    <p v-if="filteredBooks.length === 0" class="empty">Rien dans cette catégorie</p>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import BookServices from '@/services/BookServices'
import CategorieServices from '@/services/CategorieServices'

const selectedCategory = ref('')
const books = ref([])
// const users = ref([])
const categories = ref([])

onMounted(async () => {
  try {
    const response = await CategorieServices.getCategories()
    categories.value = response.data
  } catch (error) {
    console.error('Erreur chargement catégories:', error)
  }
  try {
    const BookResponse = await BookServices.getBooks()
    books.value = BookResponse.data
  } catch (error) {
    console.error('Erreur chargement livres:', error)
  }
})

// Filtrer par categoryId
const filteredBooks = computed(() => {
  if (!selectedCategory.value) return books.value

  return books.value.filter((book) => book.categoryId === selectedCategory.value)
})

// récup le pseudo utilisateur
function getUserPseudo(userId) {
  const user = books.value.find((b) => b.user?.id == userId)?.user
  return user ? user.username : 'Utilisateur inconnu'
}
</script>

<style scoped>
/* CONTENEUR PRINCIPAL */
.page {
  max-width: 1000px;
  margin: 2rem auto;
  padding: 20px;
  font-family: 'Courier New', Courier, monospace;
  text-align: center;
}

/* TITRE DE SECTION */
.section-title {
  font-weight: bold;
  margin-bottom: 2rem;
}

/* FILTRE CATÉGORIE */
.filters {
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
}

.label {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

select {
  padding: 6px 12px;
  font-family: inherit;
  border-radius: 6px;
  border: 1px solid #ccc;
}

/* LISTE DES LIVRES */
.books-track {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

.book-card {
  width: 280px;
  border-radius: 25px;
  overflow: hidden;
  text-align: center;
  background-color: #f4f7f8;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.book-card-link {
  text-decoration: none;
  color: inherit;
}

.book-card:hover {
  transform: translateY(-5px);
}

.card-content {
  padding: 15px;
}

.cover {
  width: 100%;
  height: 350px;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.info-overlay {
  margin-top: 12px;
}

.title {
  font-size: 1.2rem;
  margin: 0;
}

.author {
  font-size: 0.95rem;
  color: #666;
  margin: 4px 0;
}

.meta {
  font-size: 0.85rem;
  margin: 2px 0;
}

/* MESSAGE QUAND AUCUN LIVRE */
.empty {
  margin-top: 2rem;
  font-style: italic;
  color: #777;
}
</style>
