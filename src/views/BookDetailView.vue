<template>
  <div v-if="book" class="book-detail">
    <button @click="$router.back()">⬅ Retour</button>

    <div class="detail-container">
      <img :src="book.imagePath" :alt="book.title" class="detail-cover" />

      <div class="info">
        <h1>{{ book.title }}</h1>
        <p class="author">Par {{ book.writer.firstname }} {{ book.writer.lastname }}</p>
        <p class="category">Catégorie : {{ book.category.label }}</p>
        <hr />
        <h3>Résumé</h3>
        <p>{{ book.abstract }}</p>
        <div class="meta">
          <span>Pages : {{ book.numberOfPages }}</span> |
          <span>Année : {{ book.editionYear }}</span>
        </div>
      </div>
    </div>
  </div>
  <div v-else>Chargement...</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import BookServices from '@/services/BookServices'

const route = useRoute()
const book = ref(null)

onMounted(async () => {
  const id = route.params.id // On récupère l'ID depuis l'URL
  try {
    const response = await BookServices.getBook(id)
    book.value = response.data
  } catch (error) {
    console.error('Erreur lors du chargement du livre', error)
  }
})
</script>

<style scoped>
.book-detail {
  padding: 40px;
  max-width: 1000px;
  margin: 0 auto;
}
.detail-container {
  display: flex;
  gap: 50px;
  margin-top: 20px;
}
.detail-cover {
  width: 300px;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}
.info {
  flex: 1;
  text-align: left;
}
/* ... ajoute tes styles pour que ce soit joli ... */
</style>
