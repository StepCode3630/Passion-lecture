import axios from 'axios'

const apiClient = axios.create({
  // On pointe vers l'adresse de JSON Server
  baseURL: 'http://localhost:3000',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

export default {
  getCategories() {
    return apiClient.get('/categories')
  },
}
