import type { HttpContext } from '@adonisjs/core/http'
import { registerValidator, loginValidator } from '#validators/auth'
import User from '#models/user'

export default class AuthController {
  async login({ request, response }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)

    const user = await User.verifyCredentials(email, password)
    const accessToken = await User.accessTokens.create(user)

    return response.ok({
      ...user.serialize(),
      token: accessToken.value!.release(),
    })
  }

  async register({ request, response }: HttpContext) {
    const payload = await request.validateUsing(registerValidator)

    const user = await User.create({
      ...payload,
      //On force le role user pour le moment
      role: 'user',
    })

    const accessToken = await User.accessTokens.create(user)

    return response.created({
      ...user.serialize(),
      token: accessToken.value!.release(),
    })
  }

  async logout({ auth, response }: HttpContext) {
    const user = auth.getUserOrFail()

    const tokenId = user.currentAccessToken.identifier
    await User.accessTokens.delete(user, tokenId)

    if (!tokenId) {
      return response.badRequest('No active token found')
    }
    return response.ok({ message: 'Logged out successfully' })
  }
}
