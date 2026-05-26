import Category from '#models/category'
import { getCategoriesQueryValidator } from '#validators/category_query_validator'
import type { HttpContext } from '@adonisjs/core/http'

export default class CategoriesController {
  async index({ request, response }: HttpContext) {
    const {
      page = 1,
      limit = 20,
      sort = 'created_at',
      order = 'desc',
      search,
    } = await request.validateUsing(getCategoriesQueryValidator)

    const query = Category.query()

    if (search) {
      query.whereILike('name', `%${search}%`)
    }

    query.orderBy(sort, order as 'asc' | 'desc')

    const categories = await query.paginate(page, limit)

    categories.baseUrl('/categories')
    categories.queryString({ page, limit, sort, order, search })

    return response.ok(categories)
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    const categories = await Category.findOrFail(params.id)
    return categories
  }
}
