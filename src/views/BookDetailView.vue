<template>
  <section class="page" v-if="book">
    <h1>Détail des Livres</h1>

    <!-- cette page récupére l ID depuis l'URL , cherche le livre correspondant, affiche ses infos, affiche lien vers utilisateur -->


    <h2>{{ book.title }}</h2>
    <p><strong>Auteur :</strong> {{ book.author }}</p>
    <p><strong>Catégorie :</strong> {{ book.category }}</p>

    <p>
      <strong>Posté par :</strong>
      <RouterLink :to="{ name: 'user-detail', params: { id: book.userId } }">
        {{ userPseudo }}
      </RouterLink>
    </p>

    <RouterLink to="/books">Retour à la liste</RouterLink>
  </section>

  <section v-else class="page">
    <p>Livre non trouvé</p>
    <RouterLink to="/books">Retour à la liste</RouterLink>
  </section>
</template>

<script setup>
import { computed } from "vue"
import { RouterLink } from "vue-router"
import { books, users } from "@/data/mockData.js"


// ici on récupère l'ID du livre depuis les paramètres de l'URL grâce à defineProps
// on cherche le livre correspondant dans notre liste de livres, et on affiche ses détails.
// On affiche aussi le pseudo de l'utilisateur qui a posté le livre, en cherchant dans la liste des utilisateurs.
const props = defineProps({
  id: { type: String, required: true },
})


// on utilise computed pour trouver le livre correspondant à l'ID dans les paramètres
// pour trouver le pseudo de l'utilisateur qui a posté le livre.
// Si le livre n'est pas trouvé on affiche un message d'erreur.
const book = computed(() => books.find((b) => String(b.id) === props.id))

// computed pour trouver le pseudo de l'utilisateur qui a posté le livre, ou afficher "Utilisateur inconnu" si l'utilisateur n'est pas trouvé
// on cherche l'utilisateur dans la liste des utilisateurs en comparant son ID avec le userId du livre, et on retourne son pseudo si trouvé, sinon un message d'erreur.
const userPseudo = computed(() => {
  if (!book.value) return ""
  const user = users.find((u) => u.id === book.value.userId)
  return user ? user.pseudo : "Utilisateur inconnu"
})
</script>

<style scoped>
.page {
  max-width: 900px;
  margin: 0 auto;
}
</style>
