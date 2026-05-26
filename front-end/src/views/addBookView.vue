<template>
  <div class="form-page">
    <div class="header-actions">
      <button class="btn-back" @click="$router.back()">⬅ Retour</button>
      <h1>Ajouter un nouvel ouvrage</h1>
    </div>

    <div class="form-container">
      <form class="form" @submit.prevent="submit">
        <div class="row">
          <label>Titre *</label>
          <input v-model.trim="form.titre" type="text" placeholder="Ex: 1984" />
          <p v-if="errors.titre" class="error">{{ errors.titre }}</p>
        </div>

        <div class="row">
          <label>Catégorie *</label>
          <select v-model="form.categoryId">
            <option v-for="categorie in categories" :key="categorie.id" :value="categorie.id">
              {{ categorie.name }}
            </option>
          </select>
          <p v-if="errors.categoryId" class="error">{{ errors.categoryId }}</p>
        </div>

        <div class="row row-half">
          <div class="col">
            <label>Pages *</label>
            <input v-model.number="form.nb_page" type="number" min="1" />
            <p v-if="errors.nb_page" class="error">{{ errors.nb_page }}</p>
          </div>
          <div class="col">
            <label>Année *</label>
            <input v-model.number="form.annee_publication" type="number" />
            <p v-if="errors.annee_publication" class="error">{{ errors.annee_publication }}</p>
          </div>
        </div>

        <div class="row">
          <label>Résumé *</label>
          <textarea v-model.trim="form.resume" rows="5"></textarea>
          <p v-if="errors.resume" class="error">{{ errors.resume }}</p>
        </div>

        <div class="row row-half">
          <div class="col">
            <label>Prénom de l'auteur *</label>
            <input v-model.trim="authorFirstName" type="text" />
            <p v-if="errors.author" class="error">{{ errors.author }}</p>
          </div>
          <div class="col">
            <label>Nom de l'auteur *</label>
            <input v-model.trim="authorLastName" type="text" />
          </div>
        </div>

        <div class="row">
          <label>Éditeur *</label>
          <input v-model.trim="form.editeur" type="text" />
          <p v-if="errors.editeur" class="error">{{ errors.editeur }}</p>
        </div>

        <div class="row">
          <label>Image (URL)</label>
          <input v-model.trim="form.image" type="url" />
        </div>

        <div class="row">
          <label>Extrait PDF (URL)</label>
          <input v-model.trim="form.lien_extrait" type="url" />
        </div>

        <div class="actions">
          <button class="btn-action" type="submit" :disabled="isSubmitting">
            {{ isSubmitting ? 'Ajout en cours...' : 'Ajouter le livre' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import BookServices from '@/services/BookServices'
import CategorieServices from '@/services/CategorieServices'

const router = useRouter()
const isSubmitting = ref(false)
const categories = ref([])
const authorFirstName = ref('')
const authorLastName = ref('')

const form = ref({
  titre: '',
  categoryId: null,
  nb_page: null,
  annee_publication: null,
  resume: '',
  editeur: '',
  image: '',
  lien_extrait: '',
})

const errors = ref({})

const loadCategories = async () => {
  try {
    const response = await CategorieServices.getCategories()
    categories.value = response.data.data ?? response.data
  } catch (error) {
    console.error('Erreur chargement catégories:', error)
    alert('Impossible de charger les catégories. Vérifiez que le serveur est démarré.')
  }
}

onMounted(() => {
  loadCategories()
})

const validateForm = () => {
  errors.value = {}
  let valid = true

  if (!form.value.titre) {
    errors.value.titre = 'Le titre est requis.'
    valid = false
  }
  if (!form.value.categoryId) {
    errors.value.categoryId = 'La catégorie est requise.'
    valid = false
  }
  if (!form.value.nb_page || form.value.nb_page < 1) {
    errors.value.nb_page = 'Nombre de pages invalide.'
    valid = false
  }
  if (!form.value.annee_publication) {
    errors.value.annee_publication = "L'année est requise."
    valid = false
  }
  if (!form.value.resume) {
    errors.value.resume = 'Le résumé est requis.'
    valid = false
  }
  if (!form.value.editeur) {
    errors.value.editeur = "L'éditeur est requis."
    valid = false
  }
  if (!authorFirstName.value || !authorLastName.value) {
    errors.value.author = "Le prénom et le nom de l'auteur sont requis."
    valid = false
  }

  return valid
}

const submit = async () => {
  if (!validateForm()) return

  isSubmitting.value = true

  try {
    const token = localStorage.getItem('token')
    const headers = { Authorization: `Bearer ${token}` }

    // On crée d'abord l'auteur pour récupérer son ID
    const authorResponse = await axios.post(
      'http://localhost:3333/authors',
      { firstName: authorFirstName.value, lastName: authorLastName.value },
      { headers }
    )
    const authorId = authorResponse.data.id

    // On crée le livre avec l'authorId récupéré
    const response = await BookServices.addBook({
      titre: form.value.titre,
      nb_page: form.value.nb_page,
      annee_publication: form.value.annee_publication,
      resume: form.value.resume,
      editeur: form.value.editeur,
      image: form.value.image || undefined,
      lien_extrait: form.value.lien_extrait || undefined,
      categoryId: form.value.categoryId,
      authorId: authorId,
    })

    router.push({ name: 'book-details', params: { id: response.data.id } })
  } catch (error) {
    console.error(error)
    alert("Erreur lors de l'ajout du livre.")
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.form-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
  font-family: 'Courier New', Courier, monospace;
}
.header-actions {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 30px;
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
.form-container {
  border: 2px solid #333;
  padding: 40px;
  border-radius: 20px;
  background: #fff;
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
  margin-bottom: 8px;
}
input, textarea, select {
  padding: 12px;
  border: 1px solid #333;
  border-radius: 10px;
  font-family: inherit;
}
textarea {
  resize: vertical;
}
.error {
  color: #d9534f;
  font-size: 0.85rem;
  margin-top: 5px;
  font-weight: bold;
}
.actions {
  margin-top: 30px;
  text-align: right;
}
.btn-action {
  background-color: #a8d1e7;
  border: 1px solid #333;
  padding: 15px 40px;
  border-radius: 15px;
  cursor: pointer;
  font-weight: bold;
}
.btn-action:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
@media (max-width: 600px) {
  .row-half {
    flex-direction: column;
    gap: 0;
  }
}
</style>
