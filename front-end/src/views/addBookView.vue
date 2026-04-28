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
          <input v-model.trim="form.title" type="text" placeholder="Ex: 1984" />
          <p v-if="errors.title" class="error">{{ errors.title }}</p>
        </div>

        <div class="row">
          <label>Catégorie *</label>
          <select v-model="selectedCategory">
            <option v-for="categorie in categories" :key="categorie.id" :value="categorie.id">
              {{ categorie.label }}
            </option>
          </select>
          <p v-if="errors.category" class="error">{{ errors.category }}</p>
        </div>

        <div class="row row-half">
          <div class="col">
            <label>Pages *</label>
            <input v-model.number="form.pages" type="number" min="1" />
            <p v-if="errors.pages" class="error">{{ errors.pages }}</p>
          </div>
          <div class="col">
            <label>Année *</label>
            <input v-model.number="form.year" type="number" />
            <p v-if="errors.year" class="error">{{ errors.year }}</p>
          </div>
        </div>

        <div class="row">
          <label>Résumé *</label>
          <textarea v-model.trim="form.summary" rows="5"></textarea>
          <p v-if="errors.summary" class="error">{{ errors.summary }}</p>
        </div>

        <div class="row row-half">
          <div class="col">
            <label>Prénom de l'auteur *</label>
            <input v-model.trim="form.writer.firstname" type="text" />
            <p v-if="errors.writer.firstname" class="error">
              {{ errors.writer.firstname }}
            </p>
          </div>
          <div class="col">
            <label>Nom de l'auteur *</label>
            <input v-model.trim="form.writer.lastname" type="text" />
            <p v-if="errors.writer.lastname" class="error">
              {{ errors.writer.lastname }}
            </p>
          </div>
        </div>

        <div class="row">
          <label>Éditeur *</label>
          <input v-model.trim="form.editor" type="text" />
          <p v-if="errors.editor" class="error">{{ errors.editor }}</p>
        </div>

        <div class="row">
          <label>Image (URL)</label>
          <input v-model.trim="form.image" type="url" />
          <p v-if="errors.image" class="error">{{ errors.image }}</p>
        </div>

        <div class="row">
          <label>Extrait PDF (URL)</label>
          <input v-model.trim="form.pdf" type="url" />
          <p v-if="errors.pdf" class="error">{{ errors.pdf }}</p>
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
import BookServices from '@/services/BookServices'
import CategorieServices from '@/services/CategorieServices'

const router = useRouter()
const isSubmitting = ref(false)
const categories = ref([])
const selectedCategory = ref('')

//Charger les catégories au montage
const loadCategories = async () => {
  try {
    const response = await CategorieServices.getCategories()
    categories.value = response.data
  } catch (error) {
    console.error('Erreur chargement catégories:', error)
    // inform the user so they know something went wrong with the API
    alert('Impossible de charger la liste des catégories. Vérifiez que le serveur est démarré.')
  }
}

const form = ref({
  title: '',
  category: null,
  pages: null,
  summary: '',
  writer: {
    firstname: '',
    lastname: '',
  },
  editor: '',
  year: null,
  image: '',
  pdf: '',
})

onMounted(() => {
  loadCategories()
})

const errors = ref({ writer: {} })

const validateForm = () => {
  let valid = true
  errors.value = { writer: {} }

  if (!form.value.title) {
    errors.value.title = 'Le titre est requis.'
    valid = false
  }

  if (!selectedCategory.value) {
    errors.value.category = 'La catégorie est requise.'
    valid = false
  }

  if (!form.value.pages || form.value.pages < 1) {
    errors.value.pages = 'Nombre de pages invalide.'
    valid = false
  }

  if (!form.value.year) {
    errors.value.year = "L'année est requise."
    valid = false
  }

  if (!form.value.summary) {
    errors.value.summary = 'Le résumé est requis.'
    valid = false
  }

  if (!form.value.editor) {
    errors.value.editor = "L'éditeur est requis."
    valid = false
  }

  // if (!form.value.image) {
  //   errors.value.image = "L'image est requise."
  //   valid = false
  // }

  // if (!form.value.pdf) {
  //   errors.value.pdf = 'Le lien PDF est requis.'
  //   valid = false
  // }

  if (!form.value.writer.firstname) {
    errors.value.writer.firstname = 'Prénom requis.'
    valid = false
  }

  if (!form.value.writer.lastname) {
    errors.value.writer.lastname = 'Nom requis.'
    valid = false
  }

  return valid
}

// envoit formulaire au service
const submit = async () => {
  if (!validateForm()) return

  // requete pour ajouter livre
  isSubmitting.value = true
  const now = new Date().toISOString()

  const writerId = 'writer_' + Date.now()
  const userId = '1'

  const resolvedCategoryId = selectedCategory.value || 'cat_' + Date.now() // fallback if nothing selected

  const newBook = {
    title: form.value.title,
    numberOfPages: form.value.pages,
    pdfLink: form.value.pdf,
    abstract: form.value.summary,
    editor: form.value.editor,
    editionYear: form.value.year,
    imagePath: form.value.image,
    createdAt: now,
    updatedAt: now,
    categoryId: resolvedCategoryId,
    writerId,
    userId,
    category: {
      id: resolvedCategoryId,
      label:
        categories.value.find((cat) => cat.id === selectedCategory.value)?.label ||
        selectedCategory.value ||
        'Inconnue',
    },
    writer: {
      id: writerId,
      firstname: form.value.writer.firstname,
      lastname: form.value.writer.lastname,
      createdAt: now,
      updatedAt: now,
    },
    user: {
      id: userId,
      username: 'admin',
      role: 'admin',
      createdAt: now,
      updatedAt: now,
    },
  }

  // envoie la requete d'ajout et redirige vers la page de détails du livre créé
  try {
    const response = await BookServices.addBook(newBook)
    const createdBook = response.data

    router.push({
      name: 'book-details',
      params: { id: createdBook.id },
    })
  } catch (error) {
    console.error(error)
    alert("Erreur lors de l'ajout.")
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
  transition: 0.2s all;
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

input,
textarea {
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
