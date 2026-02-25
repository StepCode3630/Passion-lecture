<template>
  <section class="page">
    <h1>Ajouter un nouveau livre</h1>

    <p v-if="!actualUser">Vous devez être connecté pour ajouter un livre.</p>

    <form v-else @submit.prevent="submitForm">
      <label>
        Titre du livre
        <input v-model="form.title" type="text" />
      </label>

      <label>
        Catégorie
        <input v-model="form.category" type="text" />
      </label>

      <label>
        Résumé
        <textarea v-model="form.summary" rows="4"></textarea>
      </label>

      <label>
        Auteur
        <input v-model="form.author" type="text" />
      </label>

      <label>
        Éditeur
        <input v-model="form.editor" type="text" />
      </label>

      <label>
        Année de publication
        <input v-model.number="form.year" type="number" />
      </label>

      <label>
        Image (URL)
        <input v-model="form.image" type="url" />
      </label>

      <label>
        PDF (URL)
        <input v-model="form.pdf" type="text" />
      </label>

      <button type="submit">Ajouter le livre</button>
    </form>
  </section>
</template>

<script setup>
import { reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
// JSON entre livres et utilisateurs
import data from '@/data/mockData.json'

// récup les livres et utilisateurs
const books = data.books
const users = data.users

const router = useRouter()

//récup l'utilisateur connecté stocké en localStorage
function getActualUser() {
  return JSON.parse(localStorage.getItem('user'))
}

const actualUser = computed(() => getActualUser())

// Formulaire prérempli
const form = reactive({
  title: '',
  category: '',
  summary: '',
  author: '',
  editor: '',
  year: new Date().getFullYear(),
  image: '',
  pdf: '',
})

// pour ajouter le livre
function submitForm() {
  if (!actualUser.value) {
    alert('Vous devez être connecté pour ajouter un livre.')
    return
  }

  // Création du nouveau livre
  const newBook = {
    id: Date.now().toString(), // ID simple basé sur timestamp
    title: form.title,
    category: form.category,
    summary: form.summary,
    author: form.author,
    editor: form.editor,
    year: form.year,
    image: form.image,
    pdf: form.pdf,
    //relie le livre à l'utilisateur connecté
    userId: actualUser.value.id,
  }

  // ajoute livre dans tableau
  books.push(newBook)

  //vers la page détail du livre
  router.push({
    name: 'book-detail',
    params: { id: newBook.id },
  })
}
</script>

<style scoped>
.page {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

label {
  display: flex;
  flex-direction: column;
}

input,
textarea {
  padding: 6px 10px;
  font-family: inherit;
}

button {
  width: 150px;
  padding: 10px;
  margin-top: 10px;
  font-weight: bold;
  cursor: pointer;
}
</style>
