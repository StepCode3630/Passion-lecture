<template>
  <section class="page">
    <h1>Livres</h1>

    <div class="filters">
      <label class="label">
        Catégorie
        <select v-model="selectedCategory">
          <option value="">Toutes</option>
          <option v-for="cat in categories" :key="cat" :value="cat">
            {{ cat }}
          </option>
        </select>
      </label>
    </div>

    <div class="list">
      <article v-for="book in filteredBooks" :key="book.id" class="card">
        <!-- pour titre cliquable sur détail livre -->
        <h2 class="title">
          <RouterLink :to="{ name: 'book-detail', params: { id: book.id } }">
            {{ book.title }}
          </RouterLink>
        </h2>

        <p class="meta">
          <strong>Auteur :</strong> {{ book.author }}
        </p>

        <!-- pour pseudo cliquable vers détail user -->
        <p class="meta">
          <strong>Posté par :</strong>
          <RouterLink
            :to="{ name: 'user-detail', params: { id: book.userId } }"
          >
            {{ getUserPseudo(book.userId) }}
          </RouterLink>
        </p>

        <p class="meta">
          <strong>Catégorie :</strong> {{ book.category }}
        </p>
      </article>

      <p v-if="filteredBooks.length === 0" class="empty">
        Rien dans cette catégorie
      </p>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from "vue"
import { RouterLink } from "vue-router"
import { books, users } from "@/data/mockData.js"

const selectedCategory = ref("")

const categories = computed(() => {
  const set = new Set(books.map((b) => b.category))
  return Array.from(set).sort()
})

const filteredBooks = computed(() => {
  if (!selectedCategory.value) return books
  return books.filter((b) => b.category === selectedCategory.value)
})

function getUserPseudo(userId) {
  const user = users.find((u) => u.id === userId)
  return user ? user.pseudo : "Utilisateur non trouvé"
}
</script>

<style scoped>
.page {
  max-width: 900px;
  margin: 0 auto;
}

.filters {
  margin: 12px 0 18px;
  display: flex;
  gap: 12px;
  align-items: end;
}

.label {
  display: grid;
  gap: 6px;
}

select {
  padding: 6px 10px;
}

.list {
  display: grid;
  gap: 12px;
}

.card {
  border: 1px solid #e1e1e1;
  border-radius: 10px;
  padding: 12px 14px;
}

.title {
  margin: 0 0 8px;
}

.meta {
  margin: 4px 0;
}

.empty {
  opacity: 0.8;
  font-style: italic;
}
</style>
