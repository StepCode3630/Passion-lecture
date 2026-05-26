import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:3333',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

// Avant chaque requête, on ajoute le token si on en a un
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default {
  getBooks(params = {}) {
    return apiClient.get('/books', { params })
  },

  getBook(id) {
    return apiClient.get('/books/' + id)
  },

  addBook(bookData) {
    return apiClient.post('/books', bookData)
  },

  updateBook(id, bookData) {
    return apiClient.put('/books/' + id, bookData)
  },

  deleteBook(id) {
    return apiClient.delete('/books/' + id)
  },

  getComments(bookId) {
    return apiClient.get('/books/' + bookId + '/comments')
  },

  addComment(bookId, commentData) {
    return apiClient.post('/books/' + bookId + '/comments', commentData)
  },
}
