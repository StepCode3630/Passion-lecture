import type { HttpContext } from '@adonisjs/core/http'
import Comment from '#models/comment'
import { getCommentsQueryValidator } from '#validators/comment_query_validator'
import { createCommentValidator } from '#validators/comment_validator'

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

  async store({ request, response }: HttpContext) {
    const data = await request.validateUsing(createCommentValidator)
    // TODO: quand l'auth est prête, remplacer userId du body par auth.user!.id
    const comment = await Comment.create(data)
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

  async update({ params, request, response }: HttpContext) {
    const comment = await Comment.findOrFail(params.id)
    // TODO: quand l'auth est prête, ajouter bouncer.authorize('updateComment', comment)

    const data = await request.validateUsing(createCommentValidator)
    await comment.merge(data).save()
    return response.ok(comment)
  }

  async destroy({ params, response }: HttpContext) {
    const comment = await Comment.findOrFail(params.id)
    // TODO: quand l'auth est prête, ajouter bouncer.authorize('deleteComment', comment)

    await comment.delete()
    return response.noContent()
  }
}
