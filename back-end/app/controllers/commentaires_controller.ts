import type { HttpContext } from '@adonisjs/core/http'
import Commentaire from '#models/commentaire'
import { createCommentaireValidator } from '#validators/commentaire_validator'

export default class CommentairesController {

  async index({ response }: HttpContext) {
    const commentaires = await Commentaire.query().orderBy('created_at', 'desc').exec()
    return response.ok(commentaires)
  }

  async store({ request, response, auth }: HttpContext) {
    const data = await request.validateUsing(createCommentaireValidator)
    const commentaire = await Commentaire.create({
      ...data,
      // récup l'user connecté
      userId: auth.user!.id
    })
    return response.created(commentaire)
  }

  async show({ params, response }: HttpContext) {
    const commentaire = await Commentaire.findOrFail(params.id)
    return response.ok(commentaire)
  }

  async update({ params, request, response, bouncer }: HttpContext) {
    const commentaire = await Commentaire.findOrFail(params.id)

    // vérif que c'est son commentaire
    await bouncer.authorize('deleteCommentaire', commentaire)

    const data = await request.validateUsing(createCommentaireValidator)
    await commentaire.merge(data).save()
    return response.ok(commentaire)
  }

  async destroy({ params, response, bouncer }: HttpContext) {
    const commentaire = await Commentaire.findOrFail(params.id)

    // vérif que c'est son commentaire
    await bouncer.authorize('deleteCommentaire', commentaire)

    await commentaire.delete()
    return response.ok({ message: 'Commentaire supprimé' })
  }
}