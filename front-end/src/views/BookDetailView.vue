<template>
  <div v-if="book" class="detail-page">
    <h1 class="main-title">Detail de {{ book.titre }}</h1>

    <section class="top-section">
      <div class="cover-column">
        <img :src="book.image" :alt="book.titre" class="book-cover" />
        <div class="stars-row">
          <span class="avereage-number">{{ averageRating }}</span>
          <span class="star">★</span>
        </div>
      </div>

      <div class="info-column">
        <div class="info-group">
          <span class="label">Auteur</span>
          <span class="value">{{ book.author?.firstName }} {{ book.author?.lastName }}</span>
        </div>
        <div class="info-group">
          <span class="label">Editeur</span>
          <span class="value">{{ book.editeur }}</span>
        </div>
        <div class="info-group">
          <span class="label">Année</span>
          <span class="value">{{ book.annee_publication }}</span>
        </div>
        <div class="info-group">
          <span class="label">Catégorie</span>
          <span class="value">{{ book.category?.name }}</span>
        </div>
        <div class="info-group">
          <span class="label">Nombre de pages</span>
          <span class="value">{{ book.nb_page }}</span>
        </div>
        <a :href="book.lien_extrait" target="_blank" class="extrait-link">Extrait</a>
      </div>
    </section>

    <section class="bottom-section">
      <div class="comments-column">
        <button class="btn-action" @click="showModal = true">Ajouter un commentaire ?</button>

        <div v-if="comments.length > 0">
          <div v-for="comment in comments" :key="comment.id" class="comment-card">
            <div class="comment-header">
              <span class="comment-user">{{ comment.user?.fullName }}</span>
              <div class="comment-stars">
                <span v-for="s in parseInt(comment.etoile)" :key="s">★</span>
              </div>
            </div>
            <div class="comment-box">
              {{ comment.message }}
            </div>
          </div>
        </div>
        <p v-else class="no-comments">Aucun commentaire pour le moment.</p>

        <button v-if="comments.length > 2" class="btn-action btn-small">Voir plus</button>
      </div>

      <div class="summary-column">
        <h2 class="summary-title">Résumé</h2>
        <p class="summary-text">{{ book.resume }}</p>
      </div>
    </section>

    <div v-if="showModal" class="modal-overlay" @click.self="showModal = false">
      <div class="modal-content">
        <div class="modal-header">
          <h3>Laisser un avis</h3>
          <button class="close-btn" @click="showModal = false">×</button>
        </div>

        <textarea
          v-model="commentText"
          placeholder="Votre message (ex: Banger !)"
          class="comment-input"
        ></textarea>

        <div class="form-controls">
          <select v-model="commentStars" class="star-select">
            <option value="5">5 Étoiles ★★★★★</option>
            <option value="4">4 Étoiles ★★★★☆</option>
            <option value="3">3 Étoiles ★★★☆☆</option>
            <option value="2">2 Étoiles ★★☆☆☆</option>
            <option value="1">1 Étoile ★☆☆☆☆</option>
          </select>

          <button @click="submitComment" :disabled="isSubmitting" class="btn-action">
            {{ isSubmitting ? 'Envoi...' : 'Poster' }}
          </button>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="loading">
    <p>Chargement de l'ouvrage...</p>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import BookServices from '@/services/BookServices'

const route = useRoute()
const book = ref(null)
const comments = ref([])

const showModal = ref(false)
const commentText = ref('')
const commentStars = ref(5)
const isSubmitting = ref(false)

const loadComments = async () => {
  try {
    const response = await BookServices.getComments(route.params.id)
    comments.value = response.data.data ?? response.data
  } catch (error) {
    console.error('Erreur chargement commentaires:', error)
  }
}

onMounted(async () => {
  try {
    const response = await BookServices.getBook(route.params.id)
    book.value = response.data
    await loadComments()
  } catch (error) {
    console.error('Erreur chargement livre:', error)
  }
})

const submitComment = async () => {
  if (!commentText.value.trim()) return

  isSubmitting.value = true

  try {
    await BookServices.addComment(route.params.id, {
      message: commentText.value,
      etoile: parseInt(commentStars.value),
    })
    commentText.value = ''
    showModal.value = false
    await loadComments()
  } catch (error) {
    console.error(error)
    alert("Erreur lors de l'envoi du commentaire.")
  } finally {
    isSubmitting.value = false
  }
}

const averageRating = computed(() => {
  if (comments.value.length === 0) return 0
  const total = comments.value.reduce((acc, c) => acc + Number(c.etoile), 0)
  return (total / comments.value.length).toFixed(1)
})
</script>

<style scoped>
.detail-page {
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px 20px;
  font-family: 'Courier New', Courier, monospace;
  text-align: left;
}
.main-title { text-align: center; margin-bottom: 50px; font-size: 1.8rem; }
.top-section { display: flex; justify-content: center; gap: 60px; margin-bottom: 60px; }
.book-cover { width: 250px; height: auto; border: 1px solid #000; box-shadow: 5px 5px 15px rgba(0,0,0,0.1); }
.stars-row { text-align: center; margin-top: 10px; color: #ffb400; font-size: 1.5rem; }
.info-column { display: flex; flex-direction: column; gap: 12px; }
.info-group { display: flex; flex-direction: column; }
.label { font-weight: bold; margin-bottom: 2px; }
.extrait-link { margin-top: 20px; color: #000; font-weight: bold; transition: 0.2s all; }
.extrait-link:hover { text-decoration: underline; color: #00a6ff; }
.bottom-section { display: flex; gap: 80px; }
.comments-column, .summary-column { flex: 1; }
.btn-action {
  background-color: #a8d1e7;
  border: 1px solid #333;
  padding: 12px 25px;
  border-radius: 15px;
  cursor: pointer;
  width: 100%;
  font-family: inherit;
  font-weight: bold;
  transition: transform 0.2s;
}
.btn-action:hover:not(:disabled) { transform: scale(1.02); }
.btn-small { width: auto; padding: 8px 30px; display: block; margin: 20px auto; }
.comment-card { margin-top: 25px; }
.comment-header { display: flex; align-items: center; gap: 15px; margin-bottom: 5px; }
.comment-user { font-weight: bold; }
.comment-stars { color: #ffb400; }
.comment-box { border: 1px solid #333; border-radius: 15px; padding: 15px; min-height: 60px; }
.summary-title { margin-top: 0; font-size: 1.3rem; text-decoration: underline; }
.summary-text { line-height: 1.5; text-align: justify; }
.modal-overlay {
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0,0,0,0.6); display: flex; justify-content: center;
  align-items: center; z-index: 1000;
}
.modal-content { background: white; padding: 30px; border-radius: 20px; width: 90%; max-width: 500px; border: 2px solid #333; }
.modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.close-btn { background: none; border: none; font-size: 2rem; cursor: pointer; }
.comment-input {
  width: 90%; max-width: 90%; min-width: 90%;
  min-height: 120px; height: 120px; max-height: 400px;
  padding: 15px; border-radius: 10px; border: 1px solid #333;
  font-family: inherit; margin-bottom: 15px;
}
.form-controls { display: flex; justify-content: space-between; align-items: center; gap: 15px; }
.star-select { padding: 10px; border-radius: 8px; border: 1px solid #333; font-family: inherit; }
.loading { text-align: center; padding: 100px; font-size: 1.5rem; }
</style>
