import type { HttpContext } from '@adonisjs/core/http'
import Book from '#models/book'
import { createBookValidator } from '#validators/book_validator'


export default class BooksController {
  // route publique donc pas besoin de bouncer
  async index({ response }: HttpContext) {
    const books = await Book.all()
    return response.ok(books)
  }

  // route protégée pour auth et bouncer donc sécurisé
  async update({ bouncer, params, request, response }: HttpContext) {
    const book = await Book.findOrFail(params.id)

    // 403 si non autorisé (chapitre sécurité)
    await bouncer.authorize('editBook', book)

    const data = request.only(['titre', 'resume', 'nb_page'])
    await book.merge(data).save()
    return response.ok(book)
  }

  async destroy({ bouncer, params, response }: HttpContext) {
    const book = await Book.findOrFail(params.id)

    // 403 si non autorisé (chapitre sécurité)
    await bouncer.authorize('deleteBook', book)
    await book.delete()
    return response.ok({ message: 'Livre supprimé' })
  }

  // validator
  async store({ request, response, auth }: HttpContext) {
    const data = await request.validateUsing(createBookValidator)
    // quand la validation n est pas ok adonis envoit 422
    // sica passe : les data sont propre
    const book = await Book.create({ ...data, userId: auth.user!.id })
    return response.created(book)
  }
}
