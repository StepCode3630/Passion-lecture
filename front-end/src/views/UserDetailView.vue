<template>
  <section class="page" v-if="user">
    <h1>Détail de l'utilisateur</h1>

    <!-- la page affiche pseudo, role, liste livre crée par cet utilisateur -->

    <!-- RouterLink utilisé pour naviguer entre les pages sans recharger le site
    remplace <a href>  
    -->

    <p><strong>Pseudo :</strong> {{ user.pseudo }}</p>
    <p><strong>Rôle utilisateur:</strong> {{ user.role }}</p>

    <h2>Livres de {{ user.pseudo }}</h2>
    <ul>
      <li v-for="book in userBooks" :key="book.id">
        <RouterLink :to="{ name: 'book-detail', params: { id: book.id } }">
          {{ book.title }}
        </RouterLink>
      </li>
    </ul>

    <RouterLink to="/books">Retour à la liste</RouterLink>
  </section>

  <section v-else class="page">
    <p>Utilisateur non trouvé</p>
    <RouterLink to="/books">Retour à la liste</RouterLink>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import BookServices from '@/services/BookServices'

// avec defineProps on récupère l'ID de l'utilisateur depuis les paramètres de l'URL
//on cherche l'utilisateur correspondant dans la liste des utilisateurs
//on affiche ses détails pseudo, rôle et la liste de ses livres.
//Si l'utilisateur n'est pas trouvé on affiche un message d'erreur.
const props = defineProps({
  id: { type: String, required: true },
})

// récupérer via services l'utilisateur via le service
const user = computed(() => BookServices.getUserById(Number(props.id)))

// récupérer les livres de l'utilisateur par services
const userBooks = computed(() => {
  if (!user.value) return []
  return BookServices.getBooksByUserId(user.value.id)
})
</script>

<style scoped>
.page {
  max-width: 900px;
  margin: 0 auto;
}
</style>
