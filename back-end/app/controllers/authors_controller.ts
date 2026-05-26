import type { HttpContext } from '@adonisjs/core/http'
import Author from '#models/author'
import { createAuthorValidator } from '#validators/author_validator'
import { getAuthorsQueryValidator } from '#validators/author_query_validator'

export default class AuthorsController {
  async index({ request, response }: HttpContext) {
    const {
      page = 1,
      limit = 20,
      sort = 'created_at',
      order = 'desc',
      search,
    } = await request.validateUsing(getAuthorsQueryValidator)

    const query = Author.query()

    // Recherche dans nom et prénom
    if (search) {
      query.where((subQuery) => {
        subQuery.whereILike('last_name', `%${search}%`).orWhereILike('first_name', `%${search}%`)
      })
    }

    query.orderBy(sort, order as 'asc' | 'desc')

    const authors = await query.paginate(page, limit)

    authors.baseUrl('/authors')
    authors.queryString({ page, limit, sort, order, search })

    return response.ok(authors)
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    const author = await Author.findOrFail(params.id)
    return author
  }

  //A supprimer
  // /**
  //  * Handle form submission for the edit action
  //  */
  // async update({ params, request }: HttpContext) {
  //   const data = request.all()
  //   const author = await Author.findOrFail(params.id)

  //   author.merge(data)
  //   await author.save()

  //   return author
  // }

  // /**
  //  * Delete record
  //  */
  // async destroy({ params }: HttpContext) {
  //   const author = await Author.findOrFail(params.id)
  //   await author.delete()
  //   return author
  // }

  // // validator
  // async store({ request, response, auth }: HttpContext) {
  //   const data = await request.validateUsing(createAuthorValidator)
  //   // quand la validation n est pas ok adonis envoit 422
  //   // si ca passe : les data sont propre
  //   const author = await Author.create(data)
  //   return response.created(author)
  // }
}
