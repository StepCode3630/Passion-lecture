<template>
  <div class="home">
    <div class="hero-section">
      <h1>Découvrez l'art de la lecture</h1>
      <p>Partagez, ajoutez et commentez les ouvrages de la communauté ETML !</p>
    </div>

    <section class="carousel-container">
      <h2 class="section-title">Nouveautés</h2>

      <div class="carousel-navigation">
        <button class="nav-btn prev" @click="scroll('left')">
          <span class="arrow">◀</span>
        </button>

        <div class="carousel-window">
          <div class="books-track" ref="carouselTrack">
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

        <button class="nav-btn next" @click="scroll('right')">
          <span class="arrow">▶</span>
        </button>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 1. Liste de 5 ouvrages minimum
const ouvrages = ref([
  {
    id: 1,
    titre: 'Bleach',
    auteur: 'Tite Kubo',
    user: 'Tom',
    image:
      'https://tse1.mm.bing.net/th/id/OIP.XFoKdlqqqjKRiCCv9mHOmgHaLK?w=600&h=904&rs=1&pid=ImgDetMain&o=7&rm=3',
  },
  {
    id: 2,
    titre: 'Les Misérables',
    auteur: 'Victor Hugo',
    user: 'Jean-Val',
    image: 'https://m.media-amazon.com/images/I/81AsVpYmH5L.jpg',
  },
  {
    id: 3,
    titre: 'Mamie Gangster',
    auteur: 'David Walliams',
    user: 'Lucas',
    image: 'https://m.media-amazon.com/images/I/91M-M9uS6lL.jpg',
  },
  {
    id: 4,
    titre: '1984',
    auteur: 'George Orwell',
    user: 'Sonia',
    image: 'https://m.media-amazon.com/images/I/91SZSW8qSsL.jpg',
  },
  {
    id: 5,
    titre: "L'Étranger",
    auteur: 'Albert Camus',
    user: 'Marc',
    image: 'https://m.media-amazon.com/images/I/81S7mS2-Z0L.jpg',
  },
])

// 2. Logique du carousel
const carouselTrack = ref(null)

const scroll = (direction) => {
  const scrollAmount = carouselTrack.value.clientWidth / 1 // On scroll de la largeur visible
  if (direction === 'left') {
    carouselTrack.value.scrollLeft -= scrollAmount
  } else {
    carouselTrack.value.scrollLeft += scrollAmount
  }
}
</script>

<style scoped>
/* --- MISE EN PAGE GÉNÉRALE --- */
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

/* --- CAROUSEL STRUCTURE --- */
.carousel-navigation {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.carousel-window {
  width: 900px; /* Ajusté pour 3 livres d'environ 280px + gaps */
  overflow: hidden; /* Cache les livres 4 et 5 */
}

.books-track {
  display: flex;
  gap: 20px;
  scroll-behavior: smooth;
  overflow-x: hidden;
  padding: 20px 0;
}

/* --- CALCUL POUR AFFICHER EXACTEMENT 3 LIVRES --- */
.book-card {
  /* (100% de la fenêtre - les gaps) / 3 */
  min-width: calc((100% - 40px) / 3);
  text-align: center;
  transition: transform 0.3s ease;
}

/* --- STYLE DES CARTES --- */
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

/* --- ÉLÉMENTS HOVER (CACHÉS) --- */
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

/* --- EFFET HOVER (INSPIRÉ DU SCREEN) --- */
.book-card:hover .card-content {
  background-color: #94b3c1; /* Le bleu-gris du screen */
}

.book-card:hover .hover-details {
  max-height: 100px;
  opacity: 1;
}

/* --- BOUTONS --- */
.nav-btn {
  background: #a8d1e7;
  border: 1px solid #333;
  width: 50px;
  height: 80px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
}

.prev {
  border-radius: 50% 10px 10px 50%;
}
.next {
  border-radius: 10px 50% 50% 10px;
}
.nav-btn:hover {
  background: #8bb8d0;
}
</style>
