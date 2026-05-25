import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'
import { createUserValidator, updateUserValidator } from '#validators/user_validator'
import { getUsersQueryValidator } from '#validators/user_query_validator'

export default class UsersController {
  async index({ request, response, bouncer }: HttpContext) {
    if (await bouncer.denies('isAdmin')) {
      return response.forbidden({ message: 'Accès réservé aux administrateurs' })
    }

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

  async show({ params, response, auth, bouncer }: HttpContext) {
    const user = await User.findOrFail(params.id)

    if (user.id !== auth.user!.id && (await bouncer.denies('isAdmin'))) {
      return response.forbidden({ message: 'Accès non autorisé' })
    }

    return response.ok(user)
  }

  async store({ request, response, bouncer }: HttpContext) {
    if (await bouncer.denies('isAdmin')) {
      return response.forbidden({ message: 'Accès réservé aux administrateurs' })
    }

    const data = await request.validateUsing(createUserValidator)
    const user = await User.create({ ...data, role: 'user' })
    return response.created(user)
  }

  async update({ request, response, params, auth, bouncer }: HttpContext) {
    const user = await User.findOrFail(params.id)

    if (user.id !== auth.user!.id && (await bouncer.denies('isAdmin'))) {
      return response.forbidden({ message: 'Accès non autorisé' })
    }

    const data = await request.validateUsing(updateUserValidator)
    await user.merge(data).save()
    return response.ok(user)
  }

  async destroy({ params, response, auth, bouncer }: HttpContext) {
    const user = await User.findOrFail(params.id)

    if (user.id !== auth.user!.id && (await bouncer.denies('isAdmin'))) {
      return response.forbidden({ message: 'Accès non autorisé' })
    }

    await user.delete()
    return response.noContent()
  }
}
