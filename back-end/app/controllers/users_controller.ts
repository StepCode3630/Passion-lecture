import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'
import { createUserValidator, updateUserValidator } from '#validators/user_validator'
import { getUsersQueryValidator } from '#validators/user_query_validator'

export default class UsersController {
  async index({ request, response }: HttpContext) {
    const {
      page = 1,
      limit = 5,
      sort = 'created_at',
      order = 'desc',
      search,
    } = await request.validateUsing(getUsersQueryValidator)

    const query = User.query()

    if (search) {
      query.where((subQuery) => {
        subQuery.whereILike('full_name', `%${search}%`).orWhereILike('email', `%${search}%`)
      })
    }

    query.orderBy(sort, order as 'asc' | 'desc')

    const users = await query.paginate(page, limit)

    users.baseUrl('/users')
    users.queryString({ page, limit, sort, order, search })

    return response.ok(users)
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    const user = await User.findOrFail(params.id)
    return user
  }
  // validateur
  async store({ request, response }: HttpContext) {
    const data = await request.validateUsing(createUserValidator)
    const user = await User.create(data)
    return response.created(user)
  }

  async update({ request, response, params }: HttpContext) {
    const user = await User.findOrFail(params.id)
    const data = await request.validateUsing(updateUserValidator)
    await user.merge(data).save()
    return response.ok(user)
  }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {
    const user = await User.findOrFail(params.id)
    await user.delete()
    return user
  }
}
