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

router
  .group(() => {
    // routes publique
    router.resource('books', BooksController).apiOnly()
    router.resource('authors', AuthorsController).apiOnly()
    router.resource('categories', CategoriesController).apiOnly()
    router
      .group(() => {
        router.resource('commentaires', CommentairesController).apiOnly()
      })
      .prefix('books/:bookId')
  })
  .use(middleware('auth'))
// routes protégées besoin d'auth
router.resource('users', UsersController).apiOnly()

router.post('/users/:id/tokens', async ({ params }) => {
  const user = await User.findOrFail(params.id)
  const token = await User.accessTokens.create(user)

  return {
    type: 'bearer',
    value: token.value!.release(),
  }
})
router.delete('/projects/:id')
