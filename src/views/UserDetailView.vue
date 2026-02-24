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
      <li v-for="b in userBooks" :key="b.id">
        <RouterLink :to="{ name: 'book-detail', params: { id: b.id } }">
          {{ b.title }}
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
import { books, users } from '@/data/mockData.js'

// avec defineProps on récupère l'ID de l'utilisateur depuis les paramètres de l'URL
//on cherche l'utilisateur correspondant dans la liste des utilisateurs
//on affiche ses détails pseudo, rôle et la liste de ses livres.
//Si l'utilisateur n'est pas trouvé on affiche un message d'erreur.
const props = defineProps({
  id: { type: String, required: true },
})

// la const user utilise computed pour trouver l'utilisateur correspondant à l'ID dans les paramètres de l'URL
// en cherchant dans la liste des utilisateurs. Si l'utilisateur n'est pas trouvé, user.value sera undefined et on affichera un message d'erreur.
const user = computed(() => users.find((u) => String(u.id) === props.id))

// ici on utilise computed pour créer une liste de livres qui appartiennent à l'utilisateur trouvé
// Si user.value est undefined donc utilisateur non trouvé, on retourne une liste vide.
// sinon on filtre la liste des livres pour ne garder que ceux dont le userId correspond à l'ID de l'utilisateur.
const userBooks = computed(() => {
  if (!user.value) return []
  return books.filter((b) => b.userId === user.value.id)
})
</script>

<style scoped>
.page {
  max-width: 900px;
  margin: 0 auto;
}
</style>
