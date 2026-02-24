<template>
  <header class="main-header">
    <nav class="navbar">
      <div class="nav-links">
        <RouterLink :to="{ name: 'home' }" class="logo-container">
          <img src="@/assets/logo.png" alt="Logo App" class="logo" />
        </RouterLink>
        <RouterLink :to="{ name: 'books-list' }">Mes Livres</RouterLink>
        <RouterLink :to="{ name: 'discover' }">Découvrir</RouterLink>
        <RouterLink :to="{ name: 'profile' }" class="profile-link">Compte</RouterLink>
      </div>
    </nav>
  </header>

  <main class="content">
    <RouterView />
  </main>
</template>

<style scoped>
.main-header {
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1rem 2rem;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.logo {
  height: 40px;
}

.nav-links {
  display: flex;
  gap: 20px;
}

.nav-links a {
  text-decoration: none;
  color: #2c3e50;
  font-weight: 500;
}

/* Style pour le lien actif (Vue ajoute cette classe automatiquement) */
.router-link-active {
  color: #42b983 !important;
  border-bottom: 2px solid #42b983;
}

.content {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}
</style>
