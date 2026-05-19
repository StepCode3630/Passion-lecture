import router from '@adonisjs/core/services/router'
const BooksController = () => import('#controllers/books_controller')
const AuthorsController = () => import('#controllers/authors_controller')
const CategoriesController = () => import('#controllers/categories_controller')
const CommentsController = () => import('#controllers/comments_controller')
const UsersController = () => import('#controllers/users_controller')
import { middleware } from '#start/kernel'
const AuthController = () => import('#controllers/auth_controller')
import swagger from '#config/swagger'
import AutoSwagger from 'adonis-autoswagger'

router.group(() => {
  // Lecture publique, écriture protégée par authentification.
  // Les checks métier (admin / propriétaire) sont faits dans les contrôleurs.

  router
    .resource('books', BooksController)
    .apiOnly()
    .use(['store', 'update', 'destroy'], middleware.auth())

  router
    .resource('authors', AuthorsController)
    .apiOnly()
    .use(['store', 'update', 'destroy'], middleware.auth())

  router
    .resource('categories', CategoriesController)
    .apiOnly()
    .use(['store', 'update', 'destroy'], middleware.auth())

  router
    .group(() => {
      router
        .resource('comments', CommentsController)
        .apiOnly()
        .except(['update']) // un commentaire posté ne peut pas être modifié
        .use(['store', 'destroy'], middleware.auth())
    })
    .prefix('books/:book_id')
})

// Pas de création via /users : on passe par /user/register
router
  .resource('users', UsersController)
  .apiOnly()
  .except(['store'])
  .use(['update', 'destroy'], middleware.auth())

router
  .group(() => {
    router.post('register', [AuthController, 'register'])
    router.post('login', [AuthController, 'login'])
    router.post('logout', [AuthController, 'logout']).use(middleware.auth())
  })
  .prefix('user')

// Documentation Swagger
router.get('swagger', async () => {
  return AutoSwagger.default.docs(router.toJSON(), swagger)
})

router.get('docs', async () => {
  return AutoSwagger.default.ui('/swagger', swagger)
})
