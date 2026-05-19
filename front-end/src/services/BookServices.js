import axios from 'axios'

const apiClient = axios.create({
  // On pointe vers l'adresse de Adonis server
  baseURL: 'http://localhost:3333',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

// ajout d'un interceptor pour inclure le token d'authentification dans les requêtes
// sans l interceptor, le token ne serait pas envoyé et les routes protégées par auth ne fonctionneraient pas
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default {
  // Récupérer tous les livres (GET api/books/)
  getBooks() {
    return apiClient.get('/books')
  },

  // Récupérer un livre spécifique (GET api/books/:id)
  getBook(id) {
    return apiClient.get('/books/' + id)
  },

  // Ajouter un livre (POST api/books/)
  // bookData est l'objet { titre, auteur, user, image }
  addBook(bookData) {
    return apiClient.post('/books', bookData)
  },

  // Modifier un livre (PUT api/books/:id)
  updateBook(id, bookData) {
    return apiClient.put('/books/' + id, bookData)
  },

  // Supprimer un livre (DELETE api/books/:id)
  deleteBook(id) {
    return apiClient.delete('/books/' + id)
  },
  // dans objet export defaut
  async addComment(commentData) {
    // Envoie le commentaire vers http://localhost:3000/comments
    return apiClient.post('/comments', commentData)
  },

  // src/services/BookServices.js
  // src/services/BookServices.js
  getComments() {
    return apiClient.get('/comments')
  },
}
