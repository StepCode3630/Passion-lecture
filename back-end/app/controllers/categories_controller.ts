import Category from '#models/category'
import type { HttpContext } from '@adonisjs/core/http'

export default class CategoriesController {
  async index({ response }: HttpContext) {
    const categories = await Category.query().orderBy('created_at', 'desc').exec()
    return response.ok(categories)
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {
    const data = request.all()

    return Category.create(data)
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    const categories = await Category.findOrFail(params.id)
    return categories
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {
    const data = request.all()
    const categories = await Category.findOrFail(params.id)

    categories.merge(data)
    await categories.save()

    return categories
  }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {
    const categories = await Category.findOrFail(params.id)
    await categories.delete()
    return categories
  }
}
