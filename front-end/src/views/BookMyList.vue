<template>
  <div class="admin-container">
    <div class="header-actions">
      <h1>Mes livres</h1>
      <RouterLink to="/books/add" class="btn-add"> + Ajouter un livre </RouterLink>
    </div>

    <div class="books-grid">
      <div v-for="book in books" :key="book.id" class="book-item">
        <RouterLink :to="{ name: 'book-details', params: { id: book.id } }" class="card-link">
          <div class="book-card">
            <img :src="book.imagePath" :alt="book.title" class="book-image" />
            <div class="book-info">
              <h3>{{ book.title }}</h3>
              <p>{{ book.writer.firstname }} {{ book.writer.lastname }}</p>
            </div>

            <div class="hover-actions">
              <RouterLink
                :to="{ name: 'book-edit', params: { id: book.id } }"
                class="action-btn edit"
              >
                ✏️
              </RouterLink>
              <button class="action-btn delete" @click.stop.prevent="removeBook(book.id)">
                🗑️
              </button>
            </div>
          </div>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import BookServices from '@/services/BookServices'
import { ref, onMounted } from 'vue'

const books = ref([])

// Fonction pour charger (ou recharger) les livres
const loadBooks = async () => {
  const response = await BookServices.getBooks()
  books.value = response.data
}

onMounted(loadBooks)

// LA FONCTION DE SUPPRESSION
const removeBook = async (id) => {
  // 1. Sécurité : Toujours demander confirmation
  if (confirm('Es-tu sûr de vouloir supprimer ce livre ?')) {
    try {
      // 2. Appel au serveur
      await BookServices.deleteBook(id)

      // 3. Mise à jour de l'interface (on recharge la liste)
      await loadBooks()

      alert('Livre supprimé avec succès !')
    } catch (error) {
      console.error('Erreur lors de la suppression :', error)
      alert('Impossible de supprimer le livre.')
    }
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

/* Grille de livres */
.books-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 30px;
}

.card-link {
  text-decoration: none;
  color: inherit;
}

.book-card {
  position: relative; /* Important pour l'overlay */
  border: 1px solid #eee;
  padding: 15px;
  border-radius: 10px;
  transition:
    transform 0.3s,
    box-shadow 0.3s;
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

/* Actions au survol */
.hover-actions {
  position: absolute;
  text-decoration: none;
  bottom: 0;
  left: 0;
  right: 0;
  background: #93acb5;
  display: flex;
  justify-content: space-around;
  padding: 10px;
  opacity: 0; /* Caché par défaut */
  transition: opacity 0.3s;
  border-radius: 0 0 10px 10px;
  border-top: 1px solid #eee;
}

.book-card:hover .hover-actions {
  opacity: 1; /* Apparaît au survol */
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
  text-decoration: none;
}

.delete:hover {
  filter: drop-shadow(0 0 5px red);
}

.edit:hover {
  filter: drop-shadow(0 0 5px yellow);
}
</style>
