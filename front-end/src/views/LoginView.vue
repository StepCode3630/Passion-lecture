<template>
  <div class="form-page">
    <div class="header-actions">
      <button class="btn-back" @click="$router.back()">⬅ Retour</button>
      <h1>Connexion</h1>
    </div>

    <AppBanner
      v-if="formError"
      :message="formError"
      @close="formError = ''"
    />

    <div class="form-container">
      <form class="form" @submit.prevent="submit">
        <div class="row">
          <label>Email *</label>
          <input v-model.trim="form.email" type="email" placeholder="votre@email.com" />
          <p v-if="errors.email" class="error">{{ errors.email }}</p>
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
import { login } from '../../api/api_auth'
import { useToast } from '@/composables/useToast'
import { handleApiError } from '@/utils/formatApiError'
import AppBanner from '@/components/AppBanner.vue'

const router = useRouter()
const toast = useToast()
const isSubmitting = ref(false)
const formError = ref('')

const form = ref({
  email: '',
  password: '',
})

const errors = ref({})

const validateForm = () => {
  errors.value = {}
  let valid = true

  if (!form.value.email) {
    errors.value.email = "L'email est requis."
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
  formError.value = ''

  try {
    const data = await login(form.value.email, form.value.password)
    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify({
      id: data.id,
      fullName: data.fullName,
      email: data.email,
      role: data.role,
    }))

    toast.success(`Bienvenue, ${data.fullName} !`)
    router.push('/')
  } catch (error) {
    formError.value = 'Identifiants incorrects.'
    handleApiError(error, {
      toast,
      errors,
      fallback: 'Email ou mot de passe incorrect.',
    })
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
.register-link {
  margin-top: 20px;
  text-align: center;
}
</style>