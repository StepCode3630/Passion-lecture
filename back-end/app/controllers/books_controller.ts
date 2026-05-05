import Book from '#models/book'
import type { HttpContext } from '@adonisjs/core/http'

export default class BooksController {
  async index({ response }: HttpContext) {
    const book = await Book.query().orderBy('created_at', 'desc').exec()
    return response.ok(book)
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {
    const data = request.all()

    return Book.create(data)
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    const book = await Book.findOrFail(params.id)
    return book
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {
    const data = request.all()
    const book = await Book.findOrFail(params.id)

    book.merge(data)
    await book.save()

    return book
  }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {
    const book = await Book.findOrFail(params.id)
    await book.delete()
    return book
  }
}
