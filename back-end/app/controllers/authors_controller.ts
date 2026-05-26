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

  async show({ params }: HttpContext) {
    const author = await Author.findOrFail(params.id)
    return author
  }

  async store({ request, response }: HttpContext) {
    const data = await request.validateUsing(createAuthorValidator)
    const author = await Author.create(data)
    return response.created(author)
  }
}