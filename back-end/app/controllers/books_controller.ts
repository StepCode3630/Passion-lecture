import type { HttpContext } from '@adonisjs/core/http'
import Book from '#models/book'

export default class BooksController {
  // route publique donc pas besoin de bouncer
  async index({ response }: HttpContext) {
    const books = await Book.all()
    return response.ok(books)
  }

  // route protégée pour auth et bouncer donc sécurisé
  async update({ bouncer, params, request, response }: HttpContext) {
    const book = await Book.findOrFail(params.id)

    // 403 si non autorisé
    await bouncer.authorize('editBook', book)

    const data = request.only(['titre', 'resume', 'nb_page'])
    await book.merge(data).save()
    return response.ok(book)
  }

  async destroy({ bouncer, params, response }: HttpContext) {
    const book = await Book.findOrFail(params.id)

    // 403 si non autorisé
    await bouncer.authorize('deleteBook', book)
    await book.delete()
    return response.ok({ message: 'Livre supprimé' })
  }
}
