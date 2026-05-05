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

// routes publique
router.resource('books', BooksController).apiOnly()
router.resource('authors', AuthorsController).apiOnly()
router.resource('categories', CategoriesController).apiOnly()
router.resource('commentaires', CommentairesController).apiOnly()

// routes protégées besoin d'auth
router.resource('users', UsersController).apiOnly()
