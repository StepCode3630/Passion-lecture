<template>
  <div class="about">
    <div class="about-container">
      <h1>Créateurs du projet</h1>

      <p class="description">Le projet <strong>Passion Lecture</strong> a été réalisé par :</p>

      <div class="creators">
        <div class="creator-card">
          <h2>Stepan Patricny</h2>
          <p>Apprenti en informatique</p>
          <p>Développement d'application</p>
        </div>

        <div class="creator-card">
          <h2>Camille Rais</h2>
          <p>Apprentie en informatique</p>
          <p>Développement d'application</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Pas de logique nécessaire
</script>

<style scoped>
.about {
  padding: 60px 20px;
  font-family: 'Courier New', Courier, monospace;
  display: flex;
  justify-content: center;
}

.about-container {
  text-align: center;
  max-width: 800px;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 20px;
}

.description {
  font-size: 1.2rem;
  margin-bottom: 40px;
}

/* cartes créateurs */

.creators {
  display: flex;
  justify-content: center;
  gap: 40px;
  flex-wrap: wrap;
}

.creator-card {
  background: #a8d1e7;
  border: 1px solid #333;
  padding: 25px 35px;
  border-radius: 20px;
  min-width: 250px;
  transition: all 0.2s;
}

.creator-card:hover {
  background: #8bb8d0;
  transform: scale(1.05);
}

h2 {
  margin-bottom: 10px;
}

p {
  margin: 5px 0;
}
</style>
