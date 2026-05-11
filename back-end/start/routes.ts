/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import BooksController from '#controllers/books_controller'
import AuthorsController from '#controllers/authors_controller'
import CategoriesController from '#controllers/categories_controller'
import CommentairesController from '#controllers/commentaires_controller'
import UsersController from '#controllers/users_controller'
import User from '#models/user'
import { middleware } from '#start/kernel'
import { validateHeaderValue } from 'http'
import AuthController from '#controllers/auth_controller'
import { create } from 'domain'

router.group(() => {
  // routes publique
  router.resource('books', BooksController).apiOnly().use(['store'], middleware.auth())
  router.resource('authors', AuthorsController).apiOnly()
  router.resource('categories', CategoriesController).apiOnly()
  /*
    router
      .group(() => {
        router.resource('commentaires', CommentsByBookController).apiOnly()
      })
      .prefix('books/:bookId')
      */
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
