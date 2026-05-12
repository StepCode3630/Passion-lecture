import type { HttpContext } from '@adonisjs/core/http'
import Commentaire from '#models/comment'
import { Bouncer } from '@adonisjs/bouncer'
import CommentPolicy from '#policies/comment_policy'
import { resolve } from 'path'
import { messages } from '@vinejs/vine/defaults'

export default class CommentairesController {
  /**
   * Display a list of resource
   */
  async index({ response }: HttpContext) {
    const commentaires = await Commentaire.query().orderBy('created_at', 'desc').exec()
    return response.ok(commentaires)
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const { message, etoile, userId } = request.all()

    const data = {
      message,
      etoile,
      userId,
    }

    return response.created(data)
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    const commentaire = await Commentaire.findOrFail(params.id)
    return commentaire
  }

  /** A SUPPRIMER !!!!!!!!
   * Handle form submission for the edit action
   */
  // async update({ params, request }: HttpContext) {
  //   const data = request.all()
  //   const commentaire = await Commentaire.findOrFail(params.id)

  //   commentaire.merge(data)
  //   await commentaire.save()

  //   return commentaire
  // }

  /**
   * Delete record
   */
  async destroy({ params, response, bouncer }: HttpContext) {
    const comment = await await Commentaire.query()
      .where('id', params.id)
      .where('book_id', params.book_id)
      .firstOrFail()
    if (await bouncer.with(CommentPolicy).denies('delete', comment)) {
      return response.unauthorized({
        messages: "vous n etes pas l'auther de co com",
      })
    }
    await comment.delete()

    return response.noContent()
  }
}
