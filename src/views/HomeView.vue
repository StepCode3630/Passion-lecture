<template>
  <div class="home">
    <div class="hero-section">
      <h1>Découvrez l'art de la lecture avec Passion Lecture</h1>
      <p>Vous pouvez partagez, ajoutez et commentez les ouvrages de la communautés de l’ETML</p>
    </div>

    <section class="carousel-container">
      <h2 class="section-title">Nouveautés</h2>

      <div class="carousel-navigation">
        <button class="nav-btn prev" @click="scroll('left')" :disabled="isAtStart">
          <span class="arrow">◀</span>
        </button>

        <div class="carousel-window">
          <div class="books-track" ref="carouselTrack" @scroll="updateScrollPosition">
            <div v-for="livre in ouvrages" :key="livre.id" class="book-card">
              <div class="card-content">
                <img :src="livre.image" :alt="livre.titre" class="cover" />

                <div class="info-overlay">
                  <h3 class="title">{{ livre.titre }}</h3>
                  <p class="author">{{ livre.auteur }}</p>

                  <div class="hover-details">
                    <div class="stars">★★★★★</div>
                    <p class="added-by">
                      Ajouté par : <span>{{ livre.user }}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button class="nav-btn next" @click="scroll('right')" :disabled="isAtEnd">
          <span class="arrow">▶</span>
        </button>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import BookServices from '@/services/BookServices' // Importation du service API

// 1. État réactif
const ouvrages = ref([]) // Liste des livres (chargée via l'API)
const carouselTrack = ref(null) // Référence vers l'élément HTML pour le scroll
const scrollLeftPosition = ref(0) // Position actuelle du scroll
const maxScroll = ref(0) // Valeur maximale de scroll possible

// 2. Chargement des données au montage du composant
onMounted(async () => {
  try {
    const response = await BookServices.getBooks()
    ouvrages.value = response.data

    // On attend un petit peu que le DOM se dessine pour calculer le scroll max
    setTimeout(() => {
      updateScrollPosition()
    }, 100)
  } catch (error) {
    console.error('Erreur lors de la récupération des ouvrages :', error)
  }
})

// 3. Logique du Carousel
const updateScrollPosition = () => {
  if (carouselTrack.value) {
    scrollLeftPosition.value = carouselTrack.value.scrollLeft
    maxScroll.value = carouselTrack.value.scrollWidth - carouselTrack.value.clientWidth
  }
}

// Calculs pour activer/désactiver les flèches
const isAtStart = computed(() => scrollLeftPosition.value <= 0)
const isAtEnd = computed(() => scrollLeftPosition.value >= maxScroll.value - 5)

const scroll = (direction) => {
  // On définit la largeur d'un scroll (ici, la largeur visible de la fenêtre)
  const scrollAmount = carouselTrack.value.clientWidth

  if (direction === 'left') {
    carouselTrack.value.scrollLeft -= scrollAmount
  } else {
    carouselTrack.value.scrollLeft += scrollAmount
  }

  // On met à jour la position après le mouvement
  setTimeout(updateScrollPosition, 500)
}
</script>

<style scoped>
/* ... (Tes styles précédents restent identiques) ... */

.home {
  padding: 2rem;
  font-family: 'Courier New', Courier, monospace;
}
.hero-section {
  text-align: center;
  margin-bottom: 3rem;
}
.section-title {
  font-weight: bold;
  margin-bottom: 20px;
  padding-left: 50px;
}
.carousel-navigation {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}
.carousel-window {
  width: 900px;
  overflow: hidden;
}
.books-track {
  display: flex;
  gap: 20px;
  scroll-behavior: smooth;
  overflow-x: hidden;
  padding: 20px 0;
}
.book-card {
  min-width: calc((100% - 40px) / 3);
  text-align: center;
  transition: transform 0.3s ease;
}
.card-content {
  padding: 15px;
  border-radius: 25px;
  transition: all 0.4s ease;
}
.cover {
  width: 100%;
  height: 350px;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}
.info-overlay {
  margin-top: 15px;
}
.title {
  font-size: 1.2rem;
  margin: 0;
}
.author {
  font-size: 0.9rem;
  color: #666;
}
.hover-details {
  max-height: 0;
  opacity: 0;
  transition: all 0.4s ease;
  overflow: hidden;
}
.stars {
  color: #f39c12;
  font-size: 1.2rem;
  margin: 10px 0;
}
.added-by {
  font-size: 0.85rem;
  border-bottom: 1px solid #333;
  display: inline-block;
}
.book-card:hover .card-content {
  background-color: #94b3c1;
}
.book-card:hover .hover-details {
  max-height: 100px;
  opacity: 1;
}

/* --- STYLE DES BOUTONS --- */
.nav-btn {
  background: #a8d1e7;
  border: 1px solid #333;
  width: 50px;
  height: 80px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.prev {
  border-radius: 50% 10px 10px 50%;
}
.next {
  border-radius: 10px 50% 50% 10px;
}

.nav-btn:hover:not(:disabled) {
  background: #8bb8d0;
  transform: scale(1.05);
}

/* --- STYLE DISABLED --- */
.nav-btn:disabled {
  background: #d1d1d1; /* Gris clair */
  border-color: #999;
  cursor: not-allowed;
  opacity: 0.5;
}

.nav-btn:disabled .arrow {
  color: #777;
}
</style>
