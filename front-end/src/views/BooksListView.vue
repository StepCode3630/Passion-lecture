<template>
  <section class="page">
    <h1 class="section-title">Livres</h1>

    <div class="filters">
      <label class="label">
        Catégorie
        <select v-model="selectedCategory">
          <option value="">Toutes</option>
          <option v-for="categorie in categories" :key="categorie.id" :value="categorie.id">
            {{ categorie.name }}
          </option>
        </select>
      </label>
    </div>

    <div class="books-track">
      <article v-for="book in filteredBooks" :key="book.id" class="book-card">
        <RouterLink :to="{ name: 'book-details', params: { id: book.id } }" class="book-card-link">
          <div class="card-content">
            <img :src="book.image" alt="Couverture" class="cover" />
            <div class="info-overlay">
              <h2 class="title">{{ book.titre }}</h2>
              <p class="author">
                {{ book.author?.firstName || '' }} {{ book.author?.lastName || '' }}
              </p>
              <p class="meta">
                <strong>Catégorie :</strong> {{ book.category?.name || 'Inconnue' }}
              </p>
              <p class="meta">
                <strong>Posté par :</strong> {{ book.user?.fullName || 'Inconnu' }}
              </p>
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
import { getAllBooks, getAllCategories } from '../../api/api_book'

const selectedCategory = ref('')
const books = ref([])
const categories = ref([])

onMounted(async () => {
  try {
    categories.value = await getAllCategories()
  } catch (error) {
    console.error('Erreur chargement catégories:', error)
    alert('Erreur lors du chargement des catégories.')
  }

  try {
    books.value = await getAllBooks()
  } catch (error) {
    console.error('Erreur chargement livres:', error)
  }
})

const filteredBooks = computed(() => {
  if (!selectedCategory.value) return books.value
  return books.value.filter((book) => String(book.categoryId) === String(selectedCategory.value))
})
</script>

<style scoped>
.page { max-width: 1000px; margin: 2rem auto; padding: 20px; font-family: 'Courier New', Courier, monospace; text-align: center; }
.section-title { font-weight: bold; margin-bottom: 2rem; }
.filters { margin-bottom: 2rem; display: flex; justify-content: center; }
.label { display: flex; flex-direction: column; gap: 6px; }
select { padding: 6px 12px; font-family: inherit; border-radius: 6px; border: 1px solid #ccc; }
.books-track { display: flex; flex-wrap: wrap; justify-content: center; gap: 20px; }
.book-card { width: 280px; border-radius: 25px; overflow: hidden; text-align: center; background-color: #f4f7f8; box-shadow: 0 8px 16px rgba(0,0,0,0.1); transition: transform 0.3s ease; }
.book-card-link { text-decoration: none; color: inherit; }
.book-card:hover { transform: translateY(-5px); }
.card-content { padding: 15px; }
.cover { width: 100%; height: 350px; object-fit: cover; border-radius: 10px; box-shadow: 0 10px 20px rgba(0,0,0,0.1); }
.info-overlay { margin-top: 12px; }
.title { font-size: 1.2rem; margin: 0; }
.author { font-size: 0.95rem; color: #666; margin: 4px 0; }
.meta { font-size: 0.85rem; margin: 2px 0; }
.empty { margin-top: 2rem; font-style: italic; color: #777; }
</style>