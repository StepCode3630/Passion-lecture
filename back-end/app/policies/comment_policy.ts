import Comment from '#models/comment'
import User from '#models/user'
import { BasePolicy } from '@adonisjs/bouncer'
import type { AuthorizerResponse } from '@adonisjs/bouncer/types'

export default class CommentPolicy extends BasePolicy {
  async create(user: User): AuthorizerResponse {
    return true
  }
  async edit(user: User, comment: Comment): AuthorizerResponse {
    return user.id === comment.user.id
  }
  async delete(user: User, comment: Comment): AuthorizerResponse {
    return user.id === comment.user.id
  }
}
