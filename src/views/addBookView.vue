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
          <input v-model.trim="form.category" type="text" placeholder="Ex: Roman, Manga..." />
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
            <input v-model.trim="form.writer.firstname" type="text" placeholder="Ex: George" />
            <p v-if="errors.writer.firstname" class="error">{{ errors.writer.firstname }}</p>
          </div>
          <div class="col">
            <label>Nom de l'auteur *</label>
            <input v-model.trim="form.writer.lastname" type="text" placeholder="Ex: Orwell" />
            <p v-if="errors.writer.lastname" class="error">{{ errors.writer.lastname }}</p>
          </div>
        </div>

        <div class="row">
          <label>Éditeur *</label>
          <input v-model.trim="form.editor" type="text" placeholder="Ex: Gallimard" />
          <p v-if="errors.editor" class="error">{{ errors.editor }}</p>
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
          <button class="btn-action" type="submit" :disabled="isSubmitting">
            {{ isSubmitting ? 'Ajout en cours...' : 'Ajouter le livre' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import BookServices from '@/services/BookServices'

const router = useRouter()
const isSubmitting = ref(false)

// L'objet form tel que tu l'as défini
const form = ref({
  title: '',
  category: '',
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

// L'objet pour stocker les erreurs (on initialise writer pour éviter les bugs)
const errors = ref({ writer: {} })

// Fonction de validation
const validateForm = () => {
  let isValid = true
  errors.value = { writer: {} } // On réinitialise les erreurs

  if (!form.value.title) {
    errors.value.title = 'Le titre est requis.'
    isValid = false
  }
  if (!form.value.category) {
    errors.value.category = 'La catégorie est requise.'
    isValid = false
  }
  if (!form.value.pages) {
    errors.value.pages = 'Le nombre de pages est requis.'
    isValid = false
  }
  if (!form.value.summary) {
    errors.value.summary = 'Le résumé est requis.'
    isValid = false
  }
  if (!form.value.editor) {
    errors.value.editor = "L'éditeur est requis."
    isValid = false
  }
  if (!form.value.year) {
    errors.value.year = "L'année est requise."
    isValid = false
  }
  if (!form.value.image) {
    errors.value.image = "L'URL de l'image est requise."
    isValid = false
  }
  if (!form.value.pdf) {
    errors.value.pdf = "L'URL du PDF est requise."
    isValid = false
  }

  if (!form.value.writer.firstname) {
    errors.value.writer.firstname = 'Le prénom est requis.'
    isValid = false
  }
  if (!form.value.writer.lastname) {
    errors.value.writer.lastname = 'Le nom est requis.'
    isValid = false
  }

  return isValid
}

// Fonction appelée à la soumission
const submit = async () => {
  if (!validateForm()) return

  isSubmitting.value = true

  // 1. Génération de la date actuelle au format exact attendu
  const now = new Date().toISOString()

  // 2. Génération d'IDs temporaires pour l'auteur et la catégorie
  // (Puisqu'on les tape à la main au lieu de les sélectionner dans une liste)
  const tempCategoryId = 'cat_' + Date.now().toString().slice(-4)
  const tempWriterId = 'writer_' + Date.now().toString().slice(-4)
  const adminUserId = '1' // On simule que c'est l'admin qui ajoute

  // 3. Construction de l'objet EXACTEMENT comme sur ton modèle
  const newBook = {
    title: form.value.title,
    numberOfPages: form.value.pages,
    pdfLink: form.value.pdf,
    abstract: form.value.summary,
    editor: form.value.editor,
    editionYear: form.value.year,
    imagePath: form.value.image,

    // Dates du livre
    createdAt: now,
    updatedAt: now,

    // Les clés étrangères (IDs)
    categoryId: tempCategoryId,
    writerId: tempWriterId,
    userId: adminUserId,

    // L'objet Catégorie imbriqué
    category: {
      id: tempCategoryId,
      label: form.value.category,
      createdAt: now,
      updatedAt: now,
    },

    // L'objet Auteur imbriqué
    writer: {
      id: tempWriterId,
      lastname: form.value.writer.lastname,
      firstname: form.value.writer.firstname,
      createdAt: now,
      updatedAt: now,
    },

    // L'objet Utilisateur imbriqué (fixé sur admin pour l'instant)
    user: {
      id: adminUserId,
      username: 'admin',
      role: 'admin',
      createdAt: '2026-02-22T07:48:00.000+00:00',
      updatedAt: '2026-02-22T07:48:00.000+00:00',
    },
  }

  try {
    // JSON Server s'occupera d'ajouter le champ "id" principal du livre
    await BookServices.addBook(newBook)
    router.push('/')
  } catch (error) {
    console.error("Erreur lors de l'ajout:", error)
    alert("Une erreur est survenue lors de l'ajout du livre.")
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
}

.form-container {
  border: 2px solid #333;
  padding: 40px;
  border-radius: 20px;
  background-color: #fff;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
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
  text-decoration: underline;
}

input,
textarea {
  padding: 12px;
  border: 1px solid #333;
  border-radius: 10px;
  font-family: inherit;
  font-size: 1rem;
  background-color: #fcfcfc;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: #a8d1e7;
  background-color: #fff;
  box-shadow: 0 0 0 3px rgba(168, 209, 231, 0.3);
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
  font-family: inherit;
  font-weight: bold;
  font-size: 1.1rem;
  transition: transform 0.2s;
}

.btn-action:hover:not(:disabled) {
  transform: scale(1.02);
}

.btn-action:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* Responsive */
@media (max-width: 600px) {
  .row-half {
    flex-direction: column;
    gap: 0;
  }
}
</style>
