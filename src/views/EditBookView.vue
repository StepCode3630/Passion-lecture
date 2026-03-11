<template>
  <div v-if="form" class="edit-page">
    <div class="header-actions">
      <button class="btn-back" @click="$router.back()">⬅ Retour</button>
      <h1>Modifier l'ouvrage</h1>
    </div>

    <div class="edit-container">
      <div class="image-section">
        <div class="image-wrapper" @click="promptImageUrl">
          <img :src="form.imagePath" :alt="form.title" class="current-cover" />
          <div class="image-hover-overlay">
            <span class="pencil-icon">✏️</span>
            <p>Modifier l'image</p>
          </div>
        </div>
        <p class="image-tip">Cliquez sur l'image pour changer l'URL</p>
      </div>

      <form class="form" @submit.prevent="updateBook">
        <div class="row">
          <label>Titre *</label>
          <input v-variable v-model.trim="form.title" type="text" />
        </div>

        <div class="row row-half">
          <div class="col">
            <label>Prénom Auteur</label>
            <input v-model.trim="form.writer.firstname" type="text" />
          </div>
          <div class="col">
            <label>Nom Auteur</label>
            <input v-model.trim="form.writer.lastname" type="text" />
          </div>
        </div>

        <div class="row row-half">
          <div class="row">
            <label>Catégorie *</label>

            <select v-model="form.categoryId" class="custom-select">
              <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                {{ cat.label }}
              </option>
            </select>
          </div>
          <div class="col">
            <label>Année Édition</label>
            <input v-model.number="form.editionYear" type="number" />
          </div>
        </div>

        <div class="row">
          <label>Résumé *</label>
          <textarea v-model.trim="form.abstract" rows="6"></textarea>
        </div>

        <div class="row">
          <label>Éditeur</label>
          <input v-model.trim="form.editor" type="text" />
        </div>

        <div class="row">
          <label>Lien PDF (Extrait)</label>
          <input v-model.trim="form.pdfLink" type="url" />
        </div>

        <div class="actions">
          <button class="btn-action" type="submit" :disabled="isSaving">
            {{ isSaving ? 'Enregistrement...' : 'Enregistrer les modifications' }}
          </button>
        </div>
      </form>
    </div>
  </div>
  <div v-else class="loading">Chargement des données...</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import BookServices from '@/services/BookServices'
import CategorieServices from '@/services/CategorieServices'

const route = useRoute()
const router = useRouter()
const isSaving = ref(false)
const form = ref(null)

const categories = ref([])

// 1. Charger les données existantes au montage
onMounted(async () => {
  try {
    const response = await BookServices.getBook(route.params.id)
    form.value = response.data
    // load categories even if the book request succeeds; failures are
    // non-fatal (we can still edit the record, but the dropdown will be
    // empty).
    try {
      const catResponse = await CategorieServices.getCategories()
      categories.value = catResponse.data
    } catch (catErr) {
      console.error('Erreur chargement catégories dans édition :', catErr)
      // leave categories empty so the select still renders, user can
      // at least see the existing category label from form.value.category
    }
  } catch (error) {
    alert('Impossible de charger les données du livre.')
    router.push('/')
  }
})

// 2. Fonction pour changer l'image via un prompt
const promptImageUrl = () => {
  const newUrl = prompt("Entrez la nouvelle URL de l'image :", form.value.imagePath)
  if (newUrl && newUrl.trim() !== '') {
    form.value.imagePath = newUrl.trim()
  }
}

// 3. Envoyer les modifications au serveur (PUT)
const updateBook = async () => {
  isSaving.value = true

  // On met à jour la date de modification
  form.value.updatedAt = new Date().toISOString()

  try {
    // Dans BookServices, créez une méthode updateBook(id, data) { return apiClient.put('/books/'+id, data) }
    // Ensure the nested category object stays in sync with the flat id field
    form.value.category = {
      id: form.value.categoryId,
      label:
        categories.value.find((cat) => cat.id === form.value.categoryId)?.label ||
        form.value.category?.label ||
        '',
    }

    await BookServices.updateBook(form.value.id, form.value)
    alert('Ouvrage mis à jour avec succès !')
    router.push({ name: 'book-details', params: { id: form.value.id } })
  } catch (error) {
    console.error(error)
    alert('Erreur lors de la sauvegarde.')
  } finally {
    isSaving.value = false
  }
}
</script>

<style scoped>
.edit-page {
  max-width: 900px;
  margin: 0 auto;
  padding: 40px 20px;
  font-family: 'Courier New', Courier, monospace;
}
.header-actions {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 40px;
}
.btn-back {
  background: none;
  border: 1px solid #333;
  padding: 8px 15px;
  border-radius: 10px;
  cursor: pointer;
  font-family: inherit;
}

.edit-container {
  display: flex;
  gap: 40px;
  align-items: flex-start;
}

/* --- STYLE IMAGE HOVER --- */
.image-section {
  flex: 0 0 250px;
  text-align: center;
}
.image-wrapper {
  position: relative;
  width: 250px;
  height: 375px;
  border: 2px solid #333;
  cursor: pointer;
  overflow: hidden;
  border-radius: 10px;
}
.current-cover {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: filter 0.3s;
}

.image-hover-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(168, 209, 231, 0.8); /* Bleu ciel transparent */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s;
}
.image-wrapper:hover .image-hover-overlay {
  opacity: 1;
}
.image-wrapper:hover .current-cover {
  filter: blur(2px);
}

.pencil-icon {
  font-size: 3rem;
  margin-bottom: 10px;
}
.image-tip {
  font-size: 0.8rem;
  margin-top: 10px;
  color: #666;
  font-style: italic;
}

/* --- STYLE FORMULAIRE --- */
.form {
  flex: 1;
}
.row {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
}
.row-half {
  flex-direction: row;
  gap: 20px;
}
.col {
  flex: 1;
  display: flex;
  flex-direction: column;
}

label {
  font-weight: bold;
  text-decoration: underline;
  margin-bottom: 5px;
}
input,
textarea {
  padding: 12px;
  border: 1px solid #333;
  border-radius: 10px;
  font-family: inherit;
  background-color: #fcfcfc;
}

.btn-action {
  background-color: #a8d1e7;
  border: 1px solid #333;
  padding: 15px 30px;
  border-radius: 15px;
  cursor: pointer;
  font-family: inherit;
  font-weight: bold;
  width: 100%;
  margin-top: 20px;
}

@media (max-width: 768px) {
  .edit-container {
    flex-direction: column;
    align-items: center;
  }
  .row-half {
    flex-direction: column;
    gap: 0;
  }
}
.custom-select {
  padding: 12px;
  border: 1px solid #333;
  border-radius: 10px;
  font-family: inherit; /* Conserve le style Courier New */
  font-size: 1rem;
  background-color: #fcfcfc;
  cursor: pointer;
  appearance: none; /* Masque la flèche native du navigateur... */

  /* ...pour en dessiner une personnalisée ! */
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1em;
  padding-right: 2.5rem; /* Espace pour la flèche */
}

.custom-select:focus {
  outline: none;
  border-color: #a8d1e7;
  background-color: #fff;
  box-shadow: 0 0 0 3px rgba(168, 209, 231, 0.3);
}
</style>
