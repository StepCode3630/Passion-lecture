<template>
  <section class="page">
    <h1>Ajouter un ouvrage</h1>

    <p>Se connecter pour ajouter un livre.</p>

    <form>
      <!-- titre -->
      <label></label>

      <!-- catégorie livre -->
      <label></label>

      <!-- nbr de page -->
      <label></label>

      <!-- résumé livre -->
      <label> </label>

      <!-- auteur -->
      <label> </label>

      <!-- editeur du livre -->
      <label> </label>

      <!-- Annee edition -->
      <label> </label>

      <!-- url de image -->
      <label> </label>

      <!-- extrait en  lien dpf -->
      <label> </label>

      <button>Ajouter</button>
    </form>
  </section>
</template>

<script setup>
import { react } from 'vue'

const form = react({
  title: '',
  category: '',
  pages: 1,
  summary: '',
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
  summary: '',
  author: '',
  editor: '',
  year: '',
  image: '',
  pdf: '',
})

function resetErreur() {}

function validation() {}

function manuelSubmit() {}
</script>
