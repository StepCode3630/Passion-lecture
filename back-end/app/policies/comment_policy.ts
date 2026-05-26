import Comment from '#models/comment'
import User from '#models/user'
import { BasePolicy } from '@adonisjs/bouncer'
import type { AuthorizerResponse } from '@adonisjs/bouncer/types'

export default class CommentPolicy extends BasePolicy {
  create(_user: User): AuthorizerResponse {
    return true
  }

  update(user: User, comment: Comment): AuthorizerResponse {
    return user.id === comment.userId || user.role === 'admin'
  }

  delete(user: User, comment: Comment): AuthorizerResponse {
    return user.id === comment.userId || user.role === 'admin'
  }
}
