import type { HttpContext } from '@adonisjs/core/http'
import Book from '#models/book'
import Comment from '#models/comment'
import { getCommentsQueryValidator } from '#validators/comment_query_validator'
import { createCommentValidator } from '#validators/comment_validator'
import CommentPolicy from '#policies/comment_policy'

export default class CommentsController {
  async index({ request, response, params }: HttpContext) {
    const {
      page = 1,
      limit = 5,
      sort = 'created_at',
      order = 'desc',
      userId,
      search,
    } = await request.validateUsing(getCommentsQueryValidator)

    const query = Comment.query()
      .where('book_id', params.book_id)
      .preload('user')
      .preload('book')

    if (userId) {
      query.where('user_id', userId)
    }

    if (search) {
      query.whereILike('message', `%${search}%`)
    }

    query.orderBy(sort, order as 'asc' | 'desc')

    const comments = await query.paginate(page, limit)

    comments.baseUrl(`/books/${params.book_id}/comments`)
    comments.queryString({ page, limit, sort, order, userId, search })

    return response.ok(comments)
  }

  async store({ request, response, auth, params }: HttpContext) {
    await Book.findOrFail(params.book_id)
    const data = await request.validateUsing(createCommentValidator)
    const comment = await Comment.create({
      ...data,
      userId: auth.user!.id,
      bookId: Number(params.book_id),
    })
    await comment.load('user')
    return response.created(comment)
  }

  async show({ params, response }: HttpContext) {
    const comment = await Comment.query()
      .where('id', params.id)
      .where('book_id', params.book_id)
      .preload('user')
      .preload('book')
      .firstOrFail()
    return response.ok(comment)
  }

  async update({ params, request, response, bouncer }: HttpContext) {
    const comment = await Comment.query()
      .where('id', params.id)
      .where('book_id', params.book_id)
      .firstOrFail()

    if (await bouncer.with(CommentPolicy).denies('update', comment)) {
      return response.forbidden({
        message: "Vous n'êtes pas l'auteur de ce commentaire",
      })
    }

    const data = await request.validateUsing(createCommentValidator)
    await comment.merge(data).save()
    await comment.load('user')
    return response.ok(comment)
  }

  async destroy({ params, response, bouncer }: HttpContext) {
    const comment = await Comment.query()
      .where('id', params.id)
      .where('book_id', params.book_id)
      .firstOrFail()

    if (await bouncer.with(CommentPolicy).denies('delete', comment)) {
      return response.forbidden({
        message: "Vous n'êtes pas l'auteur de ce commentaire",
      })
    }

    await comment.delete()
    return response.noContent()
  }
}
