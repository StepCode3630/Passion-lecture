import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
import BooksController from '#controllers/books_controller'
import AuthorsController from '#controllers/authors_controller'
import CategoriesController from '#controllers/categories_controller'
import CommentairesController from '#controllers/commentaires_controller'
import UsersController from '#controllers/users_controller'
import AuthController from '#controllers/auth_controller'

// Auth (login / register / logout)
router.post('/login', [AuthController, 'login'])
router.post('/register', [AuthController, 'register'])
router.delete('/logout', [AuthController, 'logout']).use(middleware.auth())

// Routes publiques (lecture seule)
router.get('/books', [BooksController, 'index'])
router.get('/books/:id', [BooksController, 'show'])
router.get('/authors', [AuthorsController, 'index'])
router.get('/authors/:id', [AuthorsController, 'show'])
router.get('/categories', [CategoriesController, 'index'])
router.get('/categories/:id', [CategoriesController, 'show'])
router.get('/commentaires', [CommentairesController, 'index'])
router.get('/commentaires/:id', [CommentairesController, 'show'])

// routes protégées necessite une connexion
router.group(() => {
  // Books - bouncer vérifie les droits dans le controller
  router.post('/books', [BooksController, 'store'])
  router.put('/books/:id', [BooksController, 'update'])
  router.delete('/books/:id', [BooksController, 'destroy'])

  // pour les commentaires
  router.post('/commentaires', [CommentairesController, 'store'])
  router.put('/commentaires/:id', [CommentairesController, 'update'])
  router.delete('/commentaires/:id', [CommentairesController, 'destroy'])

  // que pour user et admin à voir dans le controller
  router.get('/users', [UsersController, 'index'])
  router.get('/users/:id', [UsersController, 'show'])
  router.put('/users/:id', [UsersController, 'update'])
  router.delete('/users/:id', [UsersController, 'destroy'])

}).use(middleware.auth())