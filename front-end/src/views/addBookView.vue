<template>
  <div class="form-page">
    <div class="header-actions">
      <button class="btn-back" @click="$router.back()">⬅ Retour</button>
      <h1>Ajouter un nouvel ouvrage</h1>
    </div>

    <AppBanner
      v-if="formError"
      :message="formError"
      @close="formError = ''"
    />

    <div class="form-container">
      <form class="form" @submit.prevent="submit">
        <div class="row">
          <label>Titre *</label>
          <input v-model.trim="form.titre" type="text" placeholder="Ex: 1984" />
          <p v-if="errors.titre" class="error">{{ errors.titre }}</p>
        </div>

        <div class="row">
          <label>Catégorie *</label>
          <select v-model.number="form.categoryId">
            <option disabled :value="null">Choisir une catégorie</option>
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
import { getAllCategories, createAuthor, createBook } from '../../api/api_book'
import { useToast } from '@/composables/useToast'
import { handleApiError } from '@/utils/formatApiError'
import AppBanner from '@/components/AppBanner.vue'

const router = useRouter()
const toast = useToast()
const isSubmitting = ref(false)
const formError = ref('')
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

onMounted(async () => {
  try {
    categories.value = await getAllCategories()
    if (categories.value.length > 0 && form.value.categoryId == null) {
      form.value.categoryId = categories.value[0].id
    }
  } catch (error) {
    formError.value = 'Impossible de charger les catégories.'
    handleApiError(error, { silent: true })
  }
})

const validateForm = () => {
  errors.value = {}
  let valid = true

  if (!form.value.titre) { errors.value.titre = 'Le titre est requis.'; valid = false }
  if (!form.value.categoryId) { errors.value.categoryId = 'La catégorie est requise.'; valid = false }
  if (!form.value.nb_page || form.value.nb_page < 1) { errors.value.nb_page = 'Nombre de pages invalide.'; valid = false }
  if (!form.value.annee_publication || form.value.annee_publication < 1000 || form.value.annee_publication > 9999) {
    errors.value.annee_publication = "L'année doit être entre 1000 et 9999."
    valid = false
  }
  if (!form.value.resume || form.value.resume.length < 10) {
    errors.value.resume = 'Le résumé doit contenir au moins 10 caractères.'
    valid = false
  }
  if (!form.value.editeur) { errors.value.editeur = "L'éditeur est requis."; valid = false }
  if (!authorFirstName.value || authorFirstName.value.length < 2 || !authorLastName.value || authorLastName.value.length < 2) {
    errors.value.author = "Le prénom et le nom de l'auteur doivent contenir au moins 2 caractères."
    valid = false
  }

  return valid
}

const submit = async () => {
  if (!validateForm()) return

  isSubmitting.value = true
  formError.value = ''

  try {
    // créer d'abord l'auteur pour récupérer son ID
    const author = await createAuthor(authorFirstName.value, authorLastName.value)

    if (!author?.id) {
      throw new Error("Impossible de récupérer l'auteur créé.")
    }

    const bookPayload = {
      titre: form.value.titre,
      nb_page: Number(form.value.nb_page),
      annee_publication: Number(form.value.annee_publication),
      resume: form.value.resume,
      editeur: form.value.editeur,
      categoryId: Number(form.value.categoryId),
      authorId: Number(author.id),
    }

    const imageUrl = form.value.image?.trim()
    const extraitUrl = form.value.lien_extrait?.trim()
    if (imageUrl) bookPayload.image = imageUrl
    if (extraitUrl) bookPayload.lien_extrait = extraitUrl

    const book = await createBook(bookPayload)

    toast.success('Livre ajouté avec succès.')
    router.push({ name: 'book-details', params: { id: book.id } })
  } catch (error) {
    handleApiError(error, {
      toast,
      errors,
      fallback: "Impossible d'ajouter le livre. Vérifiez vos informations ou reconnectez-vous.",
    })
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
