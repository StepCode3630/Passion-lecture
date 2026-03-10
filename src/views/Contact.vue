<template>
  <div class="contact">
    <div class="contact-container">
      <h1>Nous contacter</h1>

      <p>
        Si vous souhaitez nous contacter ou contribuer au projet
        <strong>Passion Lecture</strong>, vous pouvez consulter notre dépôt GitHub.
      </p>

      <a class="github-btn" href="https://github.com/StepCode3630/Passion-lecture" target="_blank">
        Voir le projet sur GitHub
      </a>
    </div>
  </div>
</template>

<script setup>
// Pas de logique nécessaire pour cette page simple
</script>

<style scoped>
.contact {
  padding: 60px 20px;
  font-family: 'Courier New', Courier, monospace;
  display: flex;
  justify-content: center;
}

.contact-container {
  text-align: center;
  max-width: 600px;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 20px;
}

p {
  font-size: 1.2rem;
  margin-bottom: 40px;
  line-height: 1.5;
}

/* bouton github */

.github-btn {
  background: #a8d1e7;
  border: 1px solid #333;
  padding: 15px 35px;
  border-radius: 30px;
  text-decoration: none;
  color: black;
  font-weight: bold;
  transition: all 0.2s;
}

.github-btn:hover {
  background: #8bb8d0;
  transform: scale(1.05);
}
</style>
