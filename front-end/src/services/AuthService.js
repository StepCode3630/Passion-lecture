import axios from 'axios'

// créer un client axios avec l'adresse de base du backend
const apiClient = axios.create({
  baseURL: 'http://localhost:3333',
  headers: {
    'Content-Type': 'application/json',
  },
})

// avant chaque requête il faut ajouter le token si on en a un
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default {
  // pour créer un compte
  register(fullName, email, password) {
    return apiClient.post('/user/register', { fullName, email, password })
  },

  // se connecter
  login(email, password) {
    return apiClient.post('/user/login', { email, password })
  },

  // se déconnecter
  logout() {
    return apiClient.post('/user/logout')
  },
}
