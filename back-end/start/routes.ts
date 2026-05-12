/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
const BooksController = () => import('#controllers/books_controller')
const AuthorsController = () => import('#controllers/authors_controller')
const CategoriesController = () => import('#controllers/categories_controller')
const CommentairesController = () => import('#controllers/commentaires_controller')
const UsersController = () => import('#controllers/users_controller')
import User from '#models/user'
import { middleware } from '#start/kernel'
import { validateHeaderValue } from 'http'
const AuthController = () => import('#controllers/auth_controller')
import { create } from 'domain'

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
        .resource('comments', CommentairesController)
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
    router.resource('commentaires', CommentsByUserController).apiOnly()
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
