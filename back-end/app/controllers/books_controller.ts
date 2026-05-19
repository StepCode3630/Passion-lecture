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
      search,
    } = await request.validateUsing(getBooksQueryValidator)

    // Construit la requête avec les relations préchargées
    // pas de await, construit la requête, on l'exécute à la fin
    const query = Book.query().preload('author').preload('category')

    // Filtre par catégorie
    if (categoryId) {
      query.where('category_id', categoryId)
    }

    // Filtre par auteur
    if (authorId) {
      query.where('author_id', authorId)
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

  /**
   * Création d'un livre — le livre est associé à l'utilisateur connecté
   */
  async store({ request, response, auth }: HttpContext) {
    const data = await request.validateUsing(createBookValidator)
    const book = await Book.create({ ...data, userId: auth.user!.id })
    return response.created(book)
  }

  /**
   * Affiche un livre avec ses relations préchargées
   */
  async show({ params, response }: HttpContext) {
    const book = await Book.query()
      .where('id', params.id)
      .preload('author')
      .preload('category')
      .preload('comments')
      .firstOrFail()
    return response.ok(book)
  }

  /**
   * Modifier un livre — seul le propriétaire ou un admin peut le faire
   */
  async update({ params, request, response, auth }: HttpContext) {
    const book = await Book.findOrFail(params.id)
    const user = auth.user!

    // Règle métier : seul l'admin ou le propriétaire du livre peut modifier
    if (user.role !== 'admin' && book.userId !== user.id) {
      return response.forbidden({
        message: "Vous n'êtes pas autorisé à modifier ce livre",
      })
    }

    const data = await request.validateUsing(updateBookValidator)
    book.merge(data)
    await book.save()
    return response.ok(book)
  }

  /**
   * Supprimer un livre — seul le propriétaire ou un admin peut le faire
   */
  async destroy({ params, response, auth }: HttpContext) {
    const book = await Book.findOrFail(params.id)
    const user = auth.user!

    if (user.role !== 'admin' && book.userId !== user.id) {
      return response.forbidden({
        message: "Vous n'êtes pas autorisé à supprimer ce livre",
      })
    }

    await book.delete()
    return response.noContent()
  }
}
