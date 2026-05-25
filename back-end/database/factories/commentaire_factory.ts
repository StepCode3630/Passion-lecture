import factory from '@adonisjs/lucid/factories'
import Comment from '#models/comment'
import { UserFactory } from './user_factory.js'
import { BookFactory } from './book_factory.js'

export const CommentaireFactory = factory
  .define(Comment, async ({ faker }) => {
    return {
      message: faker.lorem.paragraph(),
      etoile: faker.number.int({ min: 1, max: 5 }),
    }
  })
  .relation('user', () => UserFactory)
  .relation('book', () => BookFactory)
  .build()
