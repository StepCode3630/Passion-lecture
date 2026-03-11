<template>
  <div class="form-page">
    <div class="header-actions">
      <button class="btn-back" @click="$router.back()">⬅ Retour</button>
      <h1>Connexion</h1>
    </div>

    <div class="form-container">
      <form class="form" @submit.prevent="submit">
        <div class="row">
          <label>Nom d'utilisateur *</label>
          <input v-model.trim="form.username" type="text" placeholder="Votre identifiant" />
          <p v-if="errors.username" class="error">{{ errors.username }}</p>
        </div>

        <div class="row">
          <label>Mot de passe *</label>
          <input v-model.trim="form.password" type="password" placeholder="••••••••" />
          <p v-if="errors.password" class="error">{{ errors.password }}</p>
        </div>

        <div class="actions">
          <button class="btn-action" type="submit" :disabled="isSubmitting">
            {{ isSubmitting ? 'Connexion...' : 'Se connecter' }}
          </button>
        </div>

        <p class="register-link">
          Pas encore de compte ?
          <RouterLink :to="{ name: 'register' }">Créer un compte</RouterLink>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const isSubmitting = ref(false)

const form = ref({
  username: '',
  password: '',
})

const errors = ref({})

const validateForm = () => {
  errors.value = {}
  let valid = true

  if (!form.value.username) {
    errors.value.username = "Le nom d'utilisateur est requis."
    valid = false
  }

  if (!form.value.password) {
    errors.value.password = 'Le mot de passe est requis.'
    valid = false
  }

  return valid
}

const submit = async () => {
  if (!validateForm()) return

  isSubmitting.value = true

  try {
    // Simulation connexion (à remplacer par ton service Auth)
    if (form.value.username === 'admin' && form.value.password === 'admin') {
      router.push('/')
    } else {
      alert('Identifiants incorrects')
    }
  } catch (error) {
    console.error(error)
    alert('Erreur de connexion')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.form-page {
  max-width: 500px;
  margin: 0 auto;
  padding: 40px 20px;
  font-family: 'Courier New', Courier, monospace;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 30px;
}

.btn-back {
  background: none;
  border: 1px solid #333;
  padding: 8px 15px;
  border-radius: 10px;
  cursor: pointer;
  font-family: inherit;
}

.form-container {
  border: 2px solid #333;
  padding: 40px;
  border-radius: 20px;
  background: #fff;
}

.row {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
}

label {
  font-weight: bold;
  margin-bottom: 8px;
  text-decoration: underline;
}

input {
  padding: 12px;
  border: 1px solid #333;
  border-radius: 10px;
  font-family: inherit;
}

.error {
  color: #d9534f;
  font-size: 0.85rem;
  margin-top: 5px;
  font-weight: bold;
}

.actions {
  margin-top: 30px;
  text-align: right;
}

.btn-action {
  background-color: #a8d1e7;
  border: 1px solid #333;
  padding: 15px 40px;
  border-radius: 15px;
  cursor: pointer;
  font-weight: bold;
}

.btn-action:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
</style>
