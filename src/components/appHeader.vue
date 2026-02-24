<template>
  <header class="main-header">
    <nav class="navbar">
      <RouterLink :to="{ name: 'home' }" class="logo-container">
        <img src="@/assets/logo.png" alt="Passion Lecture" class="logo-img" />
      </RouterLink>

      <div class="nav-center">
        <RouterLink :to="{ name: 'books-list' }" class="nav-button"> Mes livres </RouterLink>
        <RouterLink :to="{ name: 'discover' }" class="nav-button"> Découvrir </RouterLink>
      </div>

      <div class="nav-right">
        <RouterLink :to="{ name: 'profile' }" class="profile-icon">
          <div class="avatar-circle">
            <div class="avatar-head"></div>
            <div class="avatar-body"></div>
          </div>
        </RouterLink>
      </div>
    </nav>
  </header>
</template>

<style scoped>
/* Conteneur principal avec la couleur de ton image */
.main-header {
  background-color: #94b3c1; /* Le bleu-gris de l'image */
  padding: 10px 40px;
  height: 100%;
  display: flex;
  align-items: center;
}

.navbar {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
}

/* Logo */
.logo-img {
  height: 120px; /* Ajuste selon la taille de ton logo.png */
  display: block;
}

/* Boutons centraux */
.nav-center {
  display: flex;
  gap: 30px;
}

.nav-button {
  background-color: #6b746a; /* Couleur gris-vert sombre des boutons */
  color: white;
  text-decoration: none;
  padding: 12px 30px;
  border-radius: 30px;
  /* border: 1px solid #333; */
  font-family: 'Courier New', Courier, monospace;
  font-weight: bold;
  font-size: 1.1rem;
  transition:
    transform 0.2s,
    background-color 0.2s;
}

.nav-button:hover {
  background-color: #555e54;
  transform: scale(1.05);
}

/* Icône de profil (Avatar dessiné en CSS pour correspondre à l'image) */
.avatar-circle {
  width: 45px;
  height: 45px;
  background-color: #f0f4ff;
  border: 1px solid #333;
  border-radius: 50%;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.avatar-head {
  width: 18px;
  height: 18px;
  border: 1px solid #333;
  border-radius: 50%;
  margin-top: 5px;
}

.avatar-body {
  width: 35px;
  height: 25px;
  border: 1px solid #333;
  border-radius: 50% 50% 0 0;
  background: white;
  margin-top: 2px;
}

/* Style pour le lien actif */
.router-link-active.nav-button {
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5);
  border-color: white;
}
</style>
