<template>
  <div v-if="form" class="edit-page">
    <div class="header-actions">
      <button class="btn-back" @click="$router.back()">⬅ Retour</button>
      <h1>Modifier l'ouvrage</h1>
    </div>

    <div class="edit-container">
      <div class="image-section">
        <div class="image-wrapper" @click="promptImageUrl">
          <img :src="form.image" :alt="form.titre" class="current-cover" />
          <div class="image-hover-overlay">
            <span class="pencil-icon">✏️</span>
            <p>Modifier l'image</p>
          </div>
        </div>
        <p class="image-tip">Cliquez sur l'image pour changer l'URL</p>
      </div>

      <form class="form" @submit.prevent="handleUpdate">
        <div class="row">
          <label>Titre *</label>
          <input v-model.trim="form.titre" type="text" />
        </div>

        <div class="row row-half">
          <div class="col">
            <label>Catégorie *</label>
            <select v-model="form.categoryId" class="custom-select">
              <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                {{ cat.name }}
              </option>
            </select>
          </div>
          <div class="col">
            <label>Année Édition</label>
            <input v-model.number="form.annee_publication" type="number" />
          </div>
        </div>

        <div class="row">
          <label>Résumé *</label>
          <textarea v-model.trim="form.resume" rows="6"></textarea>
        </div>

        <div class="row">
          <label>Éditeur</label>
          <input v-model.trim="form.editeur" type="text" />
        </div>

        <div class="row">
          <label>Lien PDF (Extrait)</label>
          <input v-model.trim="form.lien_extrait" type="url" />
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
import { getBookById, updateBook, getAllCategories } from '../../api/api_book'

const route = useRoute()
const router = useRouter()
const isSaving = ref(false)
const form = ref(null)
const categories = ref([])

onMounted(async () => {
  try {
    form.value = await getBookById(route.params.id)

    try {
      categories.value = await getAllCategories()
    } catch (catErr) {
      console.error('Erreur chargement catégories:', catErr)
    }
  } catch {
    alert('Impossible de charger les données du livre.')
    router.push('/')
  }
})

const promptImageUrl = () => {
  const newUrl = prompt("Entrez la nouvelle URL de l'image :", form.value.image)
  if (newUrl && newUrl.trim() !== '') {
    form.value.image = newUrl.trim()
  }
}

const handleUpdate = async () => {
  isSaving.value = true

  try {
    await updateBook(form.value.id, {
      titre: form.value.titre,
      resume: form.value.resume,
      editeur: form.value.editeur,
      annee_publication: form.value.annee_publication,
      lien_extrait: form.value.lien_extrait || undefined,
      image: form.value.image || undefined,
      categoryId: form.value.categoryId,
    })
    alert('Ouvrage mis à jour avec succès !')
    router.push({ name: 'book-details', params: { id: form.value.id } })
  } catch (error) {
    console.error(error)
    alert(error.message || 'Erreur lors de la sauvegarde.')
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
  transition: 0.2s all;
}
.btn-back:hover {
  background-color: #333;
  color: #fff;
}
.edit-container {
  display: flex;
  gap: 40px;
  align-items: flex-start;
}
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
  background: rgba(168, 209, 231, 0.8);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s;
}
.image-wrapper:hover .image-hover-overlay { opacity: 1; }
.image-wrapper:hover .current-cover { filter: blur(2px); }
.pencil-icon { font-size: 3rem; margin-bottom: 10px; }
.image-tip { font-size: 0.8rem; margin-top: 10px; color: #666; font-style: italic; }
.form { flex: 1; }
.row { margin-bottom: 20px; display: flex; flex-direction: column; }
.row-half { flex-direction: row; gap: 20px; }
.col { flex: 1; display: flex; flex-direction: column; }
label { font-weight: bold; margin-bottom: 5px; }
input, textarea, select {
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
  .edit-container { flex-direction: column; align-items: center; }
  .row-half { flex-direction: column; gap: 0; }
}
.custom-select {
  padding: 12px;
  border: 1px solid #333;
  border-radius: 10px;
  font-family: inherit;
  font-size: 1rem;
  background-color: #fcfcfc;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1em;
  padding-right: 2.5rem;
}
.custom-select:focus {
  outline: none;
  border-color: #a8d1e7;
  background-color: #fff;
  box-shadow: 0 0 0 3px rgba(168, 209, 231, 0.3);
}
</style>
