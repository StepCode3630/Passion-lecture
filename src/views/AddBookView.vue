<template>
  <section class="page">
    <h1>Ajouter un ouvrage</h1>

    <p v-if="!currentUser" class="avertissment">Se connecter pour ajouter un livre.</p>

    <form v-else class="form" @submit.prevent="manualSubmit">
      <!-- titre -->
      <label>
        <input v-model.trim="form.title" type="text" />
      </label>
      <p v-if="erreur.title" class="erreur">{{ erreur.title }}</p>

      <!-- catégorie livre -->
      <label>
        <input v-model.trim="form.category" type="text" />
      </label>
      <p v-if="erreur.category" class="erreur">{{ erreur.category }}</p>

      <!-- nbr de page -->
      <label>
        <input v-model.number="form.pages" type="number" min="1" />
      </label>
      <p v-if="erreur.pages" class="erreur">{{ erreur.pages }}</p>

      <!-- résumé livre -->
      <label>
        <textarea v-model.trim="form.sumarry" rows="4"></textarea>
      </label>
      <p v-if="erreur.summary" class="erreur">{{ erreur.sumarry }}</p>

      <!-- auteur -->
      <label>
        <input v-model.trim="form.author" type="text" />
      </label>
      <p v-if="erreur.author" class="erreur">{{ erreur.author }}</p>

      <!-- editeur du livre -->
      <label>
        <input v-model.trim="form.editor" type="text" />
      </label>
      <p v-if="erreur.editor" class="erreur">{{ erreur.editor }}</p>

      <!-- Annee edition -->
      <label>
        <input v-model.number="form.year" type="number" />
      </label>
      <p v-if="erreur.year" class="erreur">{{ erreur.year }}</p>

      <!-- url de image -->
      <label>
        <input v-model.trim="form.image" type="url" />
      </label>
      <p v-if="erreur.image" class="erreur">{{ erreur.image }}</p>

      <!-- extrait en  lien dpf -->
      <label>
        <input v-model.trim="form.pdf" type="text" />
      </label>
      <p v-if="erreur.pdf" class="erreur">{{ erreur.pdf }}</p>

      <button>Ajouter</button>
    </form>
  </section>
</template>

<script setup>
import { react, computed } from 'vue'
import { getActualUser } from '@/services/auth'
import { useRouter } from 'vue-router'

const actualUser = computed(() => getActualUser())
const router = useRouter()

const form = react({
  title: '',
  category: '',
  pages: 1,
  resume: '',
  author: '',
  editor: '',
  year: new Date(),
  image: '',
  pdf: '',
})

const erreur = react({
  title: '',
  category: '',
  pages: '',
  resume: '',
  author: '',
  editor: '',
  year: '',
  image: '',
  pdf: '',
})

function resetErreur() {
  Object.keys(erreur).forEach((key) => (erreur[key] = ''))
}

function validation() {
  resetErreur()
  let valide = true

  if (!form.title) {
    erreur.title = 'Entrez un titre'
    valide = false
  }

  if (!form.category) {
    erreur.category = 'Entrez une catégorie'
    valide = false
  }

  if (!form.pages || form.pages <= 1) {
    erreur.pages = 'Entrez le nombre de pages valide'
    valide = false
  }

  if (!form.resume) {
    erreur.resume = 'Ecrivez un résumé'
    valide = false
  }
  if (!form.author) {
    erreur.author = "Entrez un nom d'auteur"
    valide = false
  }
  if (!form.editor) {
    erreur.editor = 'Entrez un editeur'
    valide = false
  }
  if (!form.year) {
    erreur.year = 'Entrez une année de publication'
    valide = false
  }
  if (!form.image) {
    erreur.image = 'Insérez une image'
    valide = false
  }
  if (!form.pdf) {
    erreur.pdf = 'Insérez un pdf'
    valide = false
  }

  const actualYear = new Date().getFullYear()
  if (!form.year || form.year < 1400 || form.year > actualYear) {
    erreur.year = `L’année doit être entre 1400 et ${actualYear}.`
    valide = false
  }

  return ok
}

function manualSubmit() {
  if (!validation()) return

  const addNewewBook = {
    id: Date.now(),
    title: form.title,
    category: form.category,
    pages: form.pages,
    summary: form.summary,
    author: form.author,
    editor: form.editor,
    year: form.year,
    image: form.image,
    pdf: form.pdf,
    userId: currentUser.value.id,
  }

  router.push({
    name: 'book-detail',
    params: { id: addNewBook.id },
    state: { book: addNewBook },
  })
}
</script>
