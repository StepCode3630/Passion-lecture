import type { HttpContext } from '@adonisjs/core/http'
import Comment from '#models/comment'
import { getCommentsQueryValidator } from '#validators/comment_query_validator'
import { createCommentValidator } from '#validators/comment_validator'
import CommentPolicy from '#policies/comment_policy'

export default class CommentsController {
  async index({ request, response }: HttpContext) {
    const {
      page = 1,
      limit = 5,
      sort = 'created_at',
      order = 'desc',
      bookId,
      userId,
      search,
    } = await request.validateUsing(getCommentsQueryValidator)

    const query = Comment.query().preload('user').preload('book')

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

    const comments = await query.paginate(page, limit)

    comments.baseUrl('/comments')
    comments.queryString({ page, limit, sort, order, bookId, userId, search })

    return response.ok(comments)
  }

  async store({ request, response, auth }: HttpContext) {
    const data = await request.validateUsing(createCommentValidator)
    // L'utilisateur connecté est l'auteur du commentaire
    const comment = await Comment.create({
      ...data,
      userId: auth.user!.id,
    })
    return response.created(comment)
  }

  async show({ params, response }: HttpContext) {
    const comment = await Comment.query()
      .where('id', params.id)
      .preload('user')
      .preload('book')
      .firstOrFail()
    return response.ok(comment)
  }

  async update({ params, request, response, bouncer }: HttpContext) {
    const comment = await Comment.findOrFail(params.id)

    // Vérifie que l'utilisateur a le droit de modifier ce commentaire
    if (await bouncer.with(CommentPolicy).denies('update', comment)) {
      return response.unauthorized({
        message: "Vous n'êtes pas l'auteur de ce commentaire",
      })
    }

    const data = await request.validateUsing(createCommentValidator)
    await comment.merge(data).save()
    return response.ok(comment)
  }

  async destroy({ params, response, bouncer }: HttpContext) {
    const comment = await Comment.findOrFail(params.id)

    // Vérifie que l'utilisateur a le droit de supprimer ce commentaire
    if (await bouncer.with(CommentPolicy).denies('delete', comment)) {
      return response.unauthorized({
        message: "Vous n'êtes pas l'auteur de ce commentaire",
      })
    }

    await comment.delete()
    return response.noContent()
  }
}
