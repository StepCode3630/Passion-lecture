<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-logo">
        <RouterLink :to="{ name: 'home' }" class="logo-container">
          <img src="@/assets/logo.png" alt="Passion Lecture" class="logo-img" />
        </RouterLink>
      </div>

      <nav class="footer-nav">
        <RouterLink to="/about" class="footer-link">Qui sommes-nous</RouterLink>
        <RouterLink to="/contact" class="footer-link">Nous contacter</RouterLink>
      </nav>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  width: 100%;
  padding: 30px 0;
  border-top: 1px solid #333;
  margin-top: 50px;
  font-family: 'Courier New', Courier, monospace;
  background-color: #94b3c1;
}

.footer-container {
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between; /* Pousse les éléments aux extrémités */
  align-items: center;
  padding: 0 20px;
}

.footer-logo {
  font-weight: bold;
  font-size: 1.1rem;
}

.footer-nav {
  display: flex;
  flex-direction: column;
  gap: 30px; /* Espace entre les deux liens */
}

.footer-link {
  text-decoration: none;
  color: #333;
  font-size: 1.2rem;
  transition: opacity 0.2s;
}

.footer-link:hover {
  text-decoration: underline;
  opacity: 0.7;
}

/* Responsive : empiler sur mobile */
@media (max-width: 600px) {
  .footer-container {
    flex-direction: column;
    gap: 20px;
    text-align: center;
  }
}
</style>
