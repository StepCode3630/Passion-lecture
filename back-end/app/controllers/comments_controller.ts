import type { HttpContext } from '@adonisjs/core/http'
import Comment from '#models/comment'
import Book from '#models/book'
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

    if (bookId) query.where('book_id', bookId)
    if (userId) query.where('user_id', userId)
    if (search) query.whereILike('message', `%${search}%`)

    query.orderBy(sort, order as 'asc' | 'desc')

    const comments = await query.paginate(page, limit)
    comments.baseUrl('/comments')
    comments.queryString({ page, limit, sort, order, bookId, userId, search })

    return response.ok(comments)
  }

  async store({ params, request, response, auth }: HttpContext) {
    await Book.findOrFail(params.book_id)
    const data = await request.validateUsing(createCommentValidator)
    const comment = await Comment.create({
      ...data,
      userId: auth.user!.id,
      bookId: params.book_id,
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

  async destroy({ params, response, auth }: HttpContext) {
    if (auth.user!.role !== 'admin') {
      return response.forbidden({
        message: 'Seul un administrateur peut supprimer un commentaire',
      })
    }
    const comment = await Comment.findOrFail(params.id)
    await comment.delete()
    return response.noContent()
  }
}
