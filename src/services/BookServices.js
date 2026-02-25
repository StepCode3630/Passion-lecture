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
  // ... dans ton objet export default
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
