import factory from '@adonisjs/lucid/factories'
import Book from '#models/book'
import Category from '#models/category'
import Author from '#models/author'
import User from '#models/user'

export const BookFactory = factory
  .define(Book, async ({ faker }) => {
    const categories = await Category.all()
    const authors = await Author.all()
    const users = await User.all()

    return {
      titre: `${faker.book.title()} - ${faker.string.uuid().substring(0, 6)}`,
      image: `/uploads/books/${faker.string.uuid()}.jpg`,
      nb_page: faker.number.int({ min: 6, max: 850 }),
      annee_publication: faker.number.int({ min: 1900, max: 2025 }),
      lien_extrait: faker.internet.url(),
      resume: faker.lorem.paragraph({ min: 1, max: 2 }),
      editeur: faker.company.name(),
      categoryId: faker.helpers.arrayElement(categories).id,
      authorId: faker.helpers.arrayElement(authors).id,
      userId: faker.helpers.arrayElement(users).id,
    }
  })
  .build()
