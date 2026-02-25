<template>
  <div v-if="book" class="detail-page">
    <h1 class="main-title">Detail de {{ book.title }}</h1>
    <div class="top-section">
      <div class="cover-column">
        <img :src="book.imagePath" :alt="book.title" class="book-cover" />
        <div class="stars-row">
          <span v-for="i in 5" :key="i" class="star">★</span>
        </div>
      </div>

      <div class="info-column">
        <div class="info-group">
          <span class="label">Auteur</span>
          <span class="value">{{ book.writer.firstname }} {{ book.writer.lastname }}</span>
        </div>
        <div class="info-group">
          <span class="label">Editeur</span>
          <span class="value">{{ book.editor }}</span>
        </div>
        <div class="info-group">
          <span class="label">Année</span>
          <span class="value">{{ book.editionYear }}</span>
        </div>
        <div class="info-group">
          <span class="label">categorie</span>
          <span class="value">{{ book.category.label }}</span>
        </div>
        <div class="info-group">
          <span class="label">Nombre de pages</span>
          <span class="value">{{ book.numberOfPages }}</span>
        </div>

        <a :href="book.pdfLink" target="_blank" class="extrait-link">Extrait</a>
      </div>
    </div>

    <div class="bottom-section">
      <div class="comments-column">
        <button class="btn-action">Ajouter un commentaire ?</button>

        <div class="comment-card">
          <div class="comment-header">
            <span class="comment-user">Latif</span>
            <div class="comment-stars">★★★★★</div>
          </div>
          <div class="comment-box">Banger</div>
        </div>

        <button class="btn-action btn-small">Voir plus</button>
      </div>

      <div class="summary-column">
        <h2 class="summary-title">Résumé</h2>
        <p class="summary-text">{{ book.abstract }}</p>
      </div>
    </div>
  </div>

  <div v-else class="loading">
    <p>Chargement de l'ouvrage...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import BookServices from '@/services/BookServices'

const route = useRoute()
const book = ref(null)

onMounted(async () => {
  const id = route.params.id
  try {
    const response = await BookServices.getBook(id)
    book.value = response.data
  } catch (error) {
    console.error('Erreur lors de la récupération du livre:', error)
  }
})
</script>

<style scoped>
.detail-page {
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px 20px;
  font-family: 'Courier New', Courier, monospace; /* Typo du screen */
  text-align: left;
}

.main-title {
  text-align: center;
  margin-bottom: 50px;
  font-size: 1.8rem;
}

/* --- SECTION HAUTE --- */
.top-section {
  display: flex;
  justify-content: center;
  gap: 60px;
  margin-bottom: 60px;
}

.book-cover {
  width: 250px;
  height: auto;
  border: 1px solid #000;
}

.stars-row {
  text-align: center;
  margin-top: 10px;
  color: #ffb400;
  font-size: 1.5rem;
}

.info-column {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.info-group {
  display: flex;
  flex-direction: column;
}

.label {
  font-weight: bold;
}
.extrait-link {
  margin-top: 20px;
  color: #000;
  text-decoration: underline;
  font-weight: bold;
}

/* --- SECTION BASSE --- */
.bottom-section {
  display: flex;
  gap: 80px;
}

.comments-column,
.summary-column {
  flex: 1;
}

.btn-action {
  background-color: #a8d1e7; /* Bleu ciel du screen */
  border: 1px solid #333;
  padding: 12px 25px;
  border-radius: 15px;
  cursor: pointer;
  width: 100%;
  font-family: inherit;
  margin-bottom: 30px;
}

.btn-small {
  width: auto;
  padding: 8px 30px;
  display: block;
  margin: 20px auto;
}

.comment-card {
  margin-top: 20px;
}

.comment-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 5px;
}

.comment-user {
  font-weight: bold;
}
.comment-stars {
  color: #ffb400;
  font-size: 0.9rem;
}

.comment-box {
  border: 1px solid #333;
  border-radius: 15px;
  padding: 15px;
  min-height: 80px;
}

.summary-title {
  margin-top: 0;
  font-size: 1.2rem;
}

.summary-text {
  line-height: 1.4;
  text-align: justify;
}

.loading {
  text-align: center;
  padding: 100px;
}
</style>
