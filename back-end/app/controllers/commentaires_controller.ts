import type { HttpContext } from '@adonisjs/core/http'
import Commentaire from '#models/commentaire'
import { createCommentaireValidator } from '#validators/commentaire_validator'
import { getCommentairesQueryValidator } from '#validators/commentaire_query_validator'

export default class CommentairesController {
  async index({ request, response }: HttpContext) {
    const {
      page = 1,
      limit = 5,
      sort = 'created_at',
      order = 'desc',
      bookId,
      userId,
      search,
    } = await request.validateUsing(getCommentairesQueryValidator)

    const query = Commentaire.query().preload('user').preload('book')

    if (bookId) {
      query.where('book_id', bookId)
    }

    if (userId) {
      query.where('user_id', userId)
    }

    if (search) {
      query.whereILike('message', `%${search}%`)
    }

    query.orderBy(sort, order as 'asc' | 'desc')

    const commentaires = await query.paginate(page, limit)

    commentaires.baseUrl('/commentaires')
    commentaires.queryString({ page, limit, sort, order, bookId, userId, search })

    return response.ok(commentaires)
  }

  async store({ request, response, auth }: HttpContext) {
    const data = await request.validateUsing(createCommentaireValidator)
    const commentaire = await Commentaire.create({
      ...data,
      // récup l'user connecté
      userId: auth.user!.id,
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
