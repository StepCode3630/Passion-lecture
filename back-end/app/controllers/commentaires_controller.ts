import type { HttpContext } from '@adonisjs/core/http'
import Commentaire from '#models/commentaire'

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
  async store({ request }: HttpContext) {
    const data = request.all()

    return Commentaire.create(data)
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    const commentaire = await Commentaire.findOrFail(params.id)
    return commentaire
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {
    const data = request.all()
    const commentaire = await Commentaire.findOrFail(params.id)

    commentaire.merge(data)
    await commentaire.save()

    return commentaire
  }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {
    const commentaire = await Commentaire.findOrFail(params.id)
    await commentaire.delete()
    return commentaire
  }
}
