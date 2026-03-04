<template>
  <section class="page">
    <h1>Ajouter un ouvrage</h1>

    <form class="form" @submit.prevent="submit">
      <div class="row">
        <label>Titre *</label>
        <input v-model.trim="form.title" type="text" />
        <p v-if="errors.title" class="error">{{ errors.title }}</p>
      </div>

      <div class="row">
        <label>Catégorie *</label>
        <input v-model.trim="form.category" type="text" placeholder="Ex: Roman" />
        <p v-if="errors.category" class="error">{{ errors.category }}</p>
      </div>

      <div class="row">
        <label>Pages *</label>
        <input v-model.number="form.pages" type="number" min="1" />
        <p v-if="errors.pages" class="error">{{ errors.pages }}</p>
      </div>

      <div class="row">
        <label>Résumé *</label>
        <textarea v-model.trim="form.summary" rows="4"></textarea>
        <p v-if="errors.summary" class="error">{{ errors.summary }}</p>
      </div>

      <div class="row">
        <label>Prénom de l'auteur *</label>
        <input v-model.trim="form.writer.firstname" type="text" placeholder="Ex: Leo" />
        <p v-if="errors.writer.firstname" class="error">{{ errors.writer.firstname }}</p>
      </div>

      <div class="row">
        <label>Nom de l'auteur *</label>
        <input v-model.trim="form.writer.lastname" type="text" placeholder="Ex: Tolstoy" />
        <p v-if="errors.writer.lastname" class="error">{{ errors.writer.lastname }}</p>
      </div>

      <div class="row">
        <label>Éditeur *</label>
        <input v-model.trim="form.editor" type="text" />
        <p v-if="errors.editor" class="error">{{ errors.editor }}</p>
      </div>

      <div class="row">
        <label>Année *</label>
        <input v-model.number="form.year" type="number" />
        <p v-if="errors.year" class="error">{{ errors.year }}</p>
      </div>

      <div class="row">
        <label>Image (URL) *</label>
        <input v-model.trim="form.image" type="url" placeholder="https://..." />
        <p v-if="errors.image" class="error">{{ errors.image }}</p>
      </div>

      <div class="row">
        <label>Extrait PDF (URL) *</label>
        <input v-model.trim="form.pdf" type="url" placeholder="https://..." />
        <p v-if="errors.pdf" class="error">{{ errors.pdf }}</p>
      </div>

      <div class="actions">
        <button class="btn" type="submit">Ajouter</button>
      </div>
    </form>
  </section>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import BookServices from '@/services/BookServices'

const router = useRouter()

// Formulaire
const form = reactive({
  title: '',
  category: '',
  pages: 1,
  summary: '',
  editor: '',
  year: new Date().getFullYear(),
  image: '',
  pdf: '',
  writer: {
    firstname: '',
    lastname: '',
  },
})

const errors = reactive({
  title: '',
  category: '',
  pages: '',
  summary: '',
  editor: '',
  year: '',
  image: '',
  pdf: '',
  writer: {
    firstname: '',
    lastname: '',
  },
})

// Réinitialiser erreurs
function resetErrors() {
  Object.keys(errors).forEach((key) => (errors[key] = ''))
}

// Validation simple
function validateForm() {
  resetErrors()
  let valid = true
  const currentYear = new Date().getFullYear()

  if (!form.title) {
    errors.title = 'Entrez un titre'
    valid = false
  }
  if (!form.category) {
    errors.category = 'Entrez une catégorie'
    valid = false
  }
  if (!form.pages || form.pages < 1) {
    errors.pages = 'Nombre de pages invalide'
    valid = false
  }
  if (!form.summary) {
    errors.summary = 'Entrez un résumé'
    valid = false
  }
  if (!form.writer) {
    errors.writer = 'Entrez un auteur'
    valid = false
  }
  if (!form.editor) {
    errors.editor = 'Entrez un éditeur'
    valid = false
  }
  if (!form.year || form.year < 1500 || form.year > currentYear) {
    errors.year = `Année entre 1500 et ${currentYear}`
    valid = false
  }
  if (!form.image) {
    errors.image = 'Entrez une URL d’image'
    valid = false
  }
  if (!form.pdf) {
    errors.pdf = 'Entrez une URL PDF'
    valid = false
  }

  return valid
}

// Soumission
async function submit() {
  if (!validateForm()) return

  // Séparer prénom et nom de l'auteur

  const timestamp = Date.now().toString()

  const newBook = {
    title: form.title,
    numberOfPages: form.pages,
    pdfLink: form.pdf,
    abstract: form.summary,
    editor: form.editor,
    editionYear: form.year,
    imagePath: form.image,
    categoryId: Date.now().toString(),
    writerId: Date.now().toString(),
    userId: '1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    category: {
      id: Date.now().toString(),
      label: form.category,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    writer: {
      id: Date.now().toString(),
      firstname: form.writer.firstname,
      lastname: form.writer.lastname,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },

    user: {
      id: '1',
      username: 'admin',
      role: 'admin',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  }

  try {
    const response = await BookServices.addBook(newBook)
    // Redirection vers la page détail du livre
    router.push({ name: 'book-detail', params: { id: response.data.id } })
  } catch (err) {
    console.error('Erreur ajout du livre:', err)
    alert('Impossible d’ajouter le livre. Vérifiez la console.')
  }
}
</script>

<style scoped>
.page {
  max-width: 800px;
  margin: auto;
  padding: 20px;
}
.row {
  margin-bottom: 12px;
}
label {
  display: block;
  font-weight: bold;
  margin-bottom: 4px;
}
input,
textarea {
  width: 100%;
  padding: 6px;
  border-radius: 4px;
  border: 1px solid #ccc;
}
.error {
  color: red;
  font-size: 0.9em;
  margin-top: 2px;
}
.actions {
  margin-top: 18px;
}
.btn {
  padding: 8px 14px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: #2c3e50;
  color: white;
}
</style>
