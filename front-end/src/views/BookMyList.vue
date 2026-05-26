<template>
  <div class="admin-container">
    <div class="header-actions">
      <h1>Mes livres</h1>
      <RouterLink v-if="isLoggedIn" to="/books/add" class="btn-add"> + Ajouter un livre </RouterLink>
    </div>

    <AppBanner
      v-if="loadError"
      :message="loadError"
      action-label="Réessayer"
      @action="loadBooks"
      @close="loadError = ''"
    />

    <p v-if="!isLoggedIn" class="empty">
      Connectez-vous pour voir vos livres.
      <RouterLink :to="{ name: 'profile' }">Se connecter</RouterLink>
    </p>

    <p v-else-if="loading" class="empty">Chargement...</p>

    <p v-else-if="books.length === 0" class="empty">Vous n'avez pas encore ajouté de livre.</p>

    <div v-else class="books-grid">
      <div v-for="book in books" :key="book.id" class="book-item">
        <div class="book-card">
          <RouterLink
            :to="{ name: 'book-details', params: { id: book.id } }"
            class="card-link"
          >
            <img :src="book.image" :alt="book.titre" class="book-image" />
            <div class="book-info">
              <h3>{{ book.titre }}</h3>
              <p>{{ book.author?.firstName }} {{ book.author?.lastName }}</p>
            </div>
          </RouterLink>

          <div class="hover-actions">
            <RouterLink
              :to="{ name: 'book-edit', params: { id: book.id } }"
              class="action-btn edit"
            >
              ✏️
            </RouterLink>
            <button class="action-btn delete" @click="removeBook(book.id)">🗑️</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getAllBooks, deleteBook } from '../../api/api_book'
import { useToast } from '@/composables/useToast'
import { useConfirm } from '@/composables/useConfirm'
import { handleApiError } from '@/utils/formatApiError'
import AppBanner from '@/components/AppBanner.vue'

const toast = useToast()
const { confirm } = useConfirm()

const books = ref([])
const loading = ref(false)
const isLoggedIn = ref(false)
const loadError = ref('')

const loadBooks = async () => {
  const userRaw = localStorage.getItem('user')
  if (!userRaw) {
    isLoggedIn.value = false
    books.value = []
    return
  }

  isLoggedIn.value = true
  loading.value = true
  loadError.value = ''

  try {
    const user = JSON.parse(userRaw)
    books.value = await getAllBooks({ userId: user.id })
  } catch (error) {
    loadError.value = 'Impossible de charger vos livres.'
    handleApiError(error, { silent: true })
  } finally {
    loading.value = false
  }
}

onMounted(loadBooks)

const removeBook = async (id) => {
  const accepted = await confirm({
    title: 'Supprimer ce livre ?',
    message: 'Cette action est définitive.',
    confirmText: 'Supprimer',
    cancelText: 'Annuler',
    variant: 'danger',
  })

  if (!accepted) return

  try {
    await deleteBook(id)
    await loadBooks()
    toast.success('Livre supprimé.')
  } catch (error) {
    handleApiError(error, {
      toast,
      fallback: 'Impossible de supprimer ce livre.',
    })
  }
}
</script>

<style scoped>
.admin-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  font-family: 'Courier New', Courier, monospace;
}

.header-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
}

.btn-add {
  background-color: #a8d1e7;
  border: 1px solid #333;
  padding: 10px 20px;
  border-radius: 10px;
  text-decoration: none;
  color: #000;
  font-weight: bold;
  transition: 0.6s ease;
}

.btn-add:hover {
  background-color: #94b3c1;
  color: white;
  transition: 0.3s ease;
  transform: scale(1.05);
}

.empty {
  text-align: center;
  font-style: italic;
  color: #666;
}

.books-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 30px;
}

.card-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.book-card {
  position: relative;
  border: 1px solid #eee;
  padding: 15px;
  border-radius: 10px;
  transition: transform 0.3s, box-shadow 0.3s;
  height: 100%;
  background-color: white;
}

.book-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.book-image {
  width: 100%;
  aspect-ratio: 2/3;
  object-fit: cover;
  border-radius: 5px;
  margin-bottom: 10px;
}

.hover-actions {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: #93acb5;
  display: flex;
  justify-content: space-around;
  padding: 10px;
  opacity: 0;
  transition: opacity 0.3s;
  border-radius: 0 0 10px 10px;
  border-top: 1px solid #eee;
}

.book-card:hover .hover-actions {
  opacity: 1;
}

.action-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 5px;
  transition: transform 0.2s;
  text-decoration: none;
}

.action-btn:hover {
  transform: scale(1.2);
}

.delete:hover {
  filter: drop-shadow(0 0 5px red);
}

.edit:hover {
  filter: drop-shadow(0 0 5px yellow);
}
</style>
