import Book from '#models/book'
import { createBookValidator, updateBookValidator } from '#validators/book_validator'
import type { HttpContext } from '@adonisjs/core/http'

export default class BooksController {
  async index({ response }: HttpContext) {
    const books = await Book.query()
      .preload('author')
      .preload('category')
      .orderBy('created_at', 'desc')
    return response.ok(books)
  }

  async store({ request, response }: HttpContext) {
    // si invalide AdonisJS renvoie automatiquement un 422 propre
    const data = await request.validateUsing(createBookValidator)
    const book = await Book.create(data)
    return response.created(book)
  }

  async show({ params, response }: HttpContext) {
    const book = await Book.query()
      .where('id', params.id)
      .preload('author')
      .preload('category')
      .preload('commentaires')
      .firstOrFail()
    return response.ok(book)
  }

  async update({ params, request, response }: HttpContext) {
    const book = await Book.findOrFail(params.id)
    const data = await request.validateUsing(updateBookValidator)
    book.merge(data)
    await book.save()
    return response.ok(book)
  }

  async destroy({ params, response }: HttpContext) {
    const book = await Book.findOrFail(params.id)
    await book.delete()
    return response.noContent() // 204
  }
}
