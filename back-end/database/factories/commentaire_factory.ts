import factory from '@adonisjs/lucid/factories'
import Comment from '#models/comment'

export const CommentaireFactory = factory
  .define(Comment, async ({ faker }) => {
    return {
      message: faker.lorem.paragraph(),
      etoile: faker.number.int({ min: 1, max: 5 }),
    }
  })
  .build()
