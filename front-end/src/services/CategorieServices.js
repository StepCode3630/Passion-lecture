import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:3333',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

export default {
  getCategories() {
    return apiClient.get('/categories')
  },

  getCategory(id) {
    return apiClient.get('/categorie/' + id)
  },
}
