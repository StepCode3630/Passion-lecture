<template>
  <section class="page" v-if="book">
    <h1>Modifier les données d'un ouvrage</h1>

    <!-- -->
    <p v-if="!okEdit" class="avertissement">
      Vous ne pouvez pas faire de modification sur ce livre.
    </p>

    <form v-else class="form" @submit.prevent="validEdit">
      <label>
        Titre ouvrage
        <input v-model.trim="form.title" type="text" />
      </label>

      <label>
        Catégorie
        <input v-model.trim="form.category" type="text" />
      </label>

      <label>
        Résumé
        <input v-model.trim="form.resume" type="text" />
      </label>

      <label>
        Auteur
        <input v-model.trim="form.author" type="text" />
      </label>
    </form>

    <label>
      editeur
      <input v-model.trim="form.editor" type="text" />
    </label>

    <label>
      Année
      <input v-model.number="form.year" type="number" />
    </label>

    <label>
      Image
      <input v-model.trim="form.image" type="url" />
    </label>

    <label>
      PDF
      <input v-model.trim="form.pdf" type="text" />
    </label>

    <button><strong> Enregistrer </strong></button>
  </section>

  <section v-else class="page">
    <p><strong> Ce livre n'existe pas </strong></p>
    <RouterLink to="/books"> Retour </RouterLink>
  </section>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { reactive, computed } from 'vue'
// AJOUTER CHEMIN JUSTE
import { books } from '@/'
import { actualUser } from '@/'

const router = useRouter()

const actualUser = computed(() => getActualUser())
// export function getActualUser() {
// return JSON.parse(localStorage.getItem('user'))
//}

// trouver livre et index tableau
const book = books.find((book) => String(book.id) === props.id)
const index = books.findIndex((book) => book.id === book.id)

// récup id depuis url
const props = defineProps({
  id: { type: String, required: true },
})

// vérification des droits user ou admin
const okEdit = computed(() => {
  if (!actualUser.value || !book) return false
  return actualUser.value.id === book.userId || actualUser.value.role === 'admin'
})

// validation modification
function validEdit() {
  if (!okEdit.value) return
}

// form
const form = reactive({
  title: book?.title || '',
  category: book?.category || '',
  pages: book?.pages || 1,
  resume: book?.resume || '',
  author: book?.author || '',
  editor: book?.editor || '',
  year: book?.year || '',
  image: book?.image || '',
  pdf: book?.pdf || '',
})

// utilisation de ... stread operator qui compie toute les props de l objet la
// copie ancien livre + ecrase avec valeur form
// modifie que valeur changé les autres reste
if (index !== -1) {
  books[index] = {
    ...books[index],
    ...form,
  }
}

//retour sur detail
router.push({
  name: 'book-detail',
  params: { id: book.id },
})
</script>

<style scoped>
.page {
  max-width: 900px;
  margin: 0 auto;
}
</style>
