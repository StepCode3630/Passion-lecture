import type { HttpContext } from '@adonisjs/core/http'
import { registerValidator, loginValidator } from '#validators/auth'
import User from '#models/user'

export default class AuthController {
  async login({ request, response }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)

    const user = await User.verifyCredentials(email, password)

    const token = await User.accessTokens.create(user)

    // On renvoie le token utilisable côté client + les infos du user (sans le password)
    return response.ok({
      token: token.value!.release(),
      user: user.serialize(),
    })
  }

  async register({ request, response }: HttpContext) {
    const payload = await request.validateUsing(registerValidator)

    // On force toujours le rôle à "user" pour éviter qu'un visiteur ne s'auto-promeuve admin
    // Les admins doivent être créés manuellement (UPDATE en BDD)
    const user = await User.create({ ...payload, role: 'user' })

    return response.created(user)
  }

  async logout({ auth, response }: HttpContext) {
    const user = auth.getUserOrFail()

    const tokenId = auth.user?.currentAccessToken.identifier

    if (!tokenId) {
      return response.badRequest({ message: 'No active token found' })
    }

    await User.accessTokens.delete(user, tokenId)

    return response.ok({ message: 'Logged out successfully' })
  }
}
