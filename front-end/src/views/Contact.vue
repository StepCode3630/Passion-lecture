<template>
  <div class="contact">
    <div class="contact-container">
      <h1>Nous contacter</h1>

      <p>
        Si vous souhaitez nous contacter ou voir notre travail :
        <strong>Passion Lecture</strong>, vous pouvez consulter notre dépôt GitHub.
      </p>

      <a class="github-btn" href="https://github.com/StepCode3630/Passion-lecture" target="_blank">
        Voir le projet sur GitHub
      </a>

      <!-- formulaire de contacte front uniquement -->

      <div class="form-container">
        <h2>Envoyer un message</h2>

        <form @submit.prevent="submit">
          <div class="row">
            <label>Nom *</label>
            <input v-model.trim="form.name" type="text" />
            <p v-if="errors.name" class="error">{{ errors.name }}</p>
          </div>

          <div class="row">
            <label>Email *</label>
            <input v-model.trim="form.email" type="email" />
            <p v-if="errors.email" class="error">{{ errors.email }}</p>
          </div>

          <div class="row">
            <label>Message *</label>
            <textarea v-model.trim="form.message" rows="5"></textarea>
            <p v-if="errors.message" class="error">{{ errors.message }}</p>
          </div>

          <div class="actions">
            <button class="btn-action" type="submit">Envoyer</button>
          </div>

          <p v-if="success" class="success">Message envoyé ! (simulation front-end)</p>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
  name: '',
  email: '',
  message: '',
})

const errors = ref({})
const success = ref(false)

const validateForm = () => {
  errors.value = {}
  let valid = true

  if (!form.value.name) {
    errors.value.name = 'Le nom est requis.'
    valid = false
  }

  if (!form.value.email) {
    errors.value.email = "L'email est requis."
    valid = false
  }

  if (!form.value.message) {
    errors.value.message = 'Le message est requis.'
    valid = false
  }

  return valid
}

const submit = () => {
  if (!validateForm()) return

  success.value = true

  form.value = {
    name: '',
    email: '',
    message: '',
  }
}
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

/* formulaire */

.form-container {
  margin-top: 60px;
  border: 2px solid #333;
  border-radius: 20px;
  padding: 40px;
  text-align: left;
  background: white;
}

h2 {
  text-align: center;
  margin-bottom: 30px;
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

input,
textarea {
  padding: 12px;
  border: 1px solid #333;
  border-radius: 10px;
  font-family: inherit;
}

textarea {
  resize: vertical;
}

.actions {
  margin-top: 20px;
  text-align: right;
}

.btn-action {
  background-color: #a8d1e7;
  border: 1px solid #333;
  padding: 12px 35px;
  border-radius: 15px;
  cursor: pointer;
  font-weight: bold;
}

.btn-action:hover {
  background-color: #8bb8d0;
}

.error {
  color: #d9534f;
  font-size: 0.85rem;
  margin-top: 5px;
  font-weight: bold;
}

.success {
  margin-top: 20px;
  color: green;
  font-weight: bold;
  text-align: center;
}
</style>
