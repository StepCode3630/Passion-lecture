import factory from '@adonisjs/lucid/factories'
import Comment from '#models/comment'
import User from '#models/user'
import Book from '#models/book'

export const CommentaireFactory = factory
  .define(Comment, async ({ faker }) => {
    const users = await User.all()
    const books = await Book.all()

    return {
      message: faker.lorem.paragraph(),
      etoile: faker.number.int({ min: 1, max: 5 }),
      userId: faker.helpers.arrayElement(users).id,
      bookId: faker.helpers.arrayElement(books).id,
    }
  })
  .build()
