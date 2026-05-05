import type { HttpContext } from '@adonisjs/core/http'
import Author from '#models/author'
import { createAuthorValidator } from '#validators/author_validator'


export default class AuthorsController {
  async index({ response }: HttpContext) {
    const author = await Author.query().orderBy('created_at', 'desc').exec()
    return response.ok(author)
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {
    const data = request.all()

    return Author.create(data)
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    const author = await Author.findOrFail(params.id)
    return author
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {
    const data = request.all()
    const author = await Author.findOrFail(params.id)

    author.merge(data)
    await author.save()

    return author
  }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {
    const author = await Author.findOrFail(params.id)
    await author.delete()
    return author
  }

  // validator
  async store({ request, response, auth }: HttpContext) {
    const data = await request.validateUsing(createAuthorValidator)
    // quand la validation n est pas ok adonis envoit 422
    // sica passe : les data sont propre
    const author = await Author.create({ ...data, userId: auth.user!.id })
    return response.created(author)
  }
}
