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
        <!-- Si connecté : nom de l'utilisateur + bouton déconnexion -->
        <template v-if="isLoggedIn">
          <span class="user-name">{{ userName }}</span>
          <button class="btn-logout" @click="handleLogout">Se déconnecter</button>
        </template>

        <!-- Si pas connecté : icône profil -->
        <template v-else>
          <RouterLink :to="{ name: 'profile' }" class="profile-icon">
            <div class="avatar-circle">
              <div class="avatar-head"></div>
              <div class="avatar-body"></div>
            </div>
          </RouterLink>
        </template>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { logout } from '../../api/api_auth'

const router = useRouter()
const isLoggedIn = ref(false)
const userName = ref('')

// Au chargement, on vérifie si un token existe dans le localStorage
onMounted(() => {
  const token = localStorage.getItem('token')
  const user = localStorage.getItem('user')

  if (token && user) {
    isLoggedIn.value = true
    userName.value = JSON.parse(user).fullName
  }
})

const handleLogout = async () => {
  try {
    await logout()
  } catch (error) {
    // Même si l'API échoue, on déconnecte quand même côté frontend
    console.error('Erreur logout:', error)
  } finally {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    isLoggedIn.value = false
    router.push({ name: 'profile' })
  }
}
</script>

<style scoped>
.main-header {
  background-color: #94b3c1;
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
.logo-img {
  height: 120px;
  display: block;
}
.nav-center {
  display: flex;
  gap: 30px;
}
.nav-button {
  background-color: #6b746a;
  color: white;
  text-decoration: none;
  padding: 12px 30px;
  border-radius: 30px;
  font-family: 'Courier New', Courier, monospace;
  font-weight: bold;
  font-size: 1.1rem;
  transition: transform 0.2s, background-color 0.2s;
}
.nav-button:hover {
  background-color: #555e54;
  transform: scale(1.05);
}
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
.router-link-active.nav-button {
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5);
  border-color: white;
}
.nav-right {
  display: flex;
  align-items: center;
  gap: 15px;
}
.user-name {
  font-family: 'Courier New', Courier, monospace;
  font-weight: bold;
  color: #fff;
}
.btn-logout {
  background-color: #6b746a;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 20px;
  cursor: pointer;
  font-family: 'Courier New', Courier, monospace;
  font-weight: bold;
  transition: background-color 0.2s;
}
.btn-logout:hover {
  background-color: #555e54;
}
</style>