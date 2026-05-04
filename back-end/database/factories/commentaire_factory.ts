import factory from '@adonisjs/lucid/factories'
import Commentaire from '#models/commentaire'

export const CommentaireFactory = factory
  .define(Commentaire, async ({ faker }) => {
    return {
      message: faker.lorem.paragraph(),
      etoile: faker.number.int({ min: 1, max: 5 }),
    }
  })
  .build()
