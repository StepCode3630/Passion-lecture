import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'
import { createUserValidator, updateUserValidator } from '#validators/user_validator'

export default class UsersController {
  async index({ response }: HttpContext) {
    const user = await User.query().orderBy('created_at', 'desc').exec()
    return response.ok(user)
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
