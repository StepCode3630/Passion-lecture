import Book from '#models/book'
import { getBooksQueryValidator } from '#validators/book_query_validator'
import { createBookValidator, updateBookValidator } from '#validators/book_validator'
import type { HttpContext } from '@adonisjs/core/http'

export default class BooksController {
  // index avec pagination, tri, filtrage et recherche
  async index({ request, response }: HttpContext) {
    // recup et valide les paramètres de pagination
    const {
      page = 1,
      limit = 10,
      sort = 'created_at',
      order = 'desc',
      categoryId,
      authorId,
      userId,
      search,
    } = await request.validateUsing(getBooksQueryValidator)

    // Construit la requête avec les relations préchargées
    // pas de await ,construit la requête, on l'exécute à la fin
    const query = Book.query().preload('author').preload('category')

    // Filtre par catégorie
    if (categoryId) {
      query.where('category_id', categoryId)
    }

    // Filtre par auteur
    if (authorId) {
      query.where('author_id', authorId)
    }
    // filtre par utilisateur
    if (userId) {
      query.where('user_id', userId)
    }

    // Recherche dans titre, éditeur et résumé
    if (search) {
      query.where((subQuery) => {
        subQuery
          .whereILike('titre', `%${search}%`)
          .orWhereILike('editeur', `%${search}%`)
          .orWhereILike('resume', `%${search}%`)
      })
    }

    // Tri
    query.orderBy(sort, order as 'asc' | 'desc')

    // exec avec pagination
    const books = await query.paginate(page, limit)

    // Config des URLs de pagination
    books.baseUrl('/books')
    books.queryString({ page, limit, sort, order, categoryId, authorId, search })

    return response.ok(books)
  }

  async store({ request, response, auth }: HttpContext) {
    const data = await request.validateUsing(createBookValidator)
    const book = await Book.create({
      ...data,
      userId: auth.user!.id,
    })
    await book.load('author')
    await book.load('category')
    return response.created(book)
  }

  async show({ params, response }: HttpContext) {
    const book = await Book.query()
      .where('id', params.id)
      .preload('author')
      .preload('category')
      .preload('comments', (commentQuery) => {
        commentQuery.preload('user')
      })
      .firstOrFail()
    return response.ok(book)
  }

  /**
   * Show individual record
   */
  async update({ params, request, response, bouncer }: HttpContext) {
    const book = await Book.findOrFail(params.id)

    if (await bouncer.denies('editBook', book)) {
      return response.forbidden({ message: "Vous n'avez pas le droit de modifier ce livre" })
    }

    const data = await request.validateUsing(updateBookValidator)
    book.merge(data)
    await book.save()
    await book.load('author')
    await book.load('category')
    return response.ok(book)
  }

  async destroy({ params, response, bouncer }: HttpContext) {
    const book = await Book.findOrFail(params.id)

    if (await bouncer.denies('deleteBook', book)) {
      return response.forbidden({ message: "Vous n'avez pas le droit de supprimer ce livre" })
    }

    await book.delete()
    return response.noContent()
  }
}
