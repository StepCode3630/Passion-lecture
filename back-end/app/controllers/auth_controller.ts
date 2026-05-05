import type { HttpContext } from '@adonisjs/core/http'
import { registerValidator, loginValidator } from '#validators/auth'
import User from '#models/user'

export default class AuthController {
  async login({ request, response }: HttpContext) {
    const { email, password } = request.validateUsing(loginValidator)

    const user = await User.verifyCredentials(email, password)

    const token = await User.accessTokens.create(user)

    // Return the token and user data
    return response.ok({
      type: 'bearer',
      ...user.serialize(),
    })
  }
  async register({ request, response }: HttpContext) {
    const payload = request.validateUsing(registerValidator)

    const user = await User.create(payload)

    return response.created(user)
  }
}

async function logout({ auth, response }: HttpContext) {
  const user = auth.getUserOrFail()

  const tokens = auth.user?.currentAccessToken.identifier

  if (!tokens) {
    return response.badRequest('No active token found')
  }

  await User.accessTokens.delete(user, tokens)

  return response.ok({ message: 'Logged out successfully' })
}
