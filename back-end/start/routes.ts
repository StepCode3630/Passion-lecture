import router from '@adonisjs/core/services/router'
const BooksController = () => import('#controllers/books_controller')
const AuthorsController = () => import('#controllers/authors_controller')
const CategoriesController = () => import('#controllers/categories_controller')
const CommentsController = () => import('#controllers/comments_controller')
const UsersController = () => import('#controllers/users_controller')
import User from '#models/user'
import { middleware } from '#start/kernel'
import { validateHeaderValue } from 'http'
const AuthController = () => import('#controllers/auth_controller')
import { create } from 'domain'
import swagger from '#config/swagger'
import AutoSwagger from 'adonis-autoswagger'

router.group(() => {
  // routes publique
  router
    .resource('books', BooksController)
    .apiOnly()
    .use(['store', 'update', 'destroy'], middleware.auth())
  router.resource('authors', AuthorsController).apiOnly()
  router.resource('categories', CategoriesController).apiOnly()

  router
    .group(() => {
      router
        .resource('comments', CommentsController)
        .apiOnly()
        .use(['store', 'destroy'], middleware.auth())
    })
    .prefix('books/:book_id')
})

// routes protégées besoin d'auth
router.resource('users', UsersController).apiOnly()

//router
/*
  .group(() => {
    router.resource('comments', CommentsByUserController).apiOnly()
  })
  .prefix('users/:userId')
  .use(middleware.auth())
  */

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
