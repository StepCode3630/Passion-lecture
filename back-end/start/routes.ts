/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import CommentairesController from '#controllers/commentaires_controller'

router.resource('commentaires', CommentairesController).apiOnly()
