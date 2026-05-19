import Comment from '#models/comment'
import User from '#models/user'
import { BasePolicy } from '@adonisjs/bouncer'
import type { AuthorizerResponse } from '@adonisjs/bouncer/types'

export default class CommentPolicy extends BasePolicy {
  async create(_user: User): Promise<AuthorizerResponse> {
    return true
  }

  // correction : les méthodes d'autorisation pour update et delete doivent vérifier que l'utilisateur est l'auteur du commentaire
  async update(user: User, comment: Comment): Promise<AuthorizerResponse> {
    return user.id === comment.userId
  }

  async delete(user: User, comment: Comment): Promise<AuthorizerResponse> {
    return user.id === comment.userId
  }
}
