import factory from '@adonisjs/lucid/factories'
import Book from '#models/book'
import Category from '#models/category'
import Author from '#models/author'
import User from '#models/user'
import { AuthorFactory } from './author_factory.js'
import { CategorieFactory } from './categorie_factory.js'
import { UserFactory } from './user_factory.js'

export const BookFactory = factory
  .define(Book, async ({ faker }) => {
    let categories = await Category.all()
    let authors = await Author.all()
    let users = await User.all()

    if (!categories.length) {
      await CategorieFactory.createMany(10)
      categories = await Category.all()
    }

    if (!authors.length) {
      await AuthorFactory.createMany(10)
      authors = await Author.all()
    }

    if (!users.length) {
      await UserFactory.createMany(10)
      users = await User.all()
    }

    return {
      titre: faker.book.title(),
      image: `/uploads/books/${faker.string.uuid()}.jpg`,
      nb_page: faker.number.int({ min: 6, max: 850 }),
      annee_publication: faker.date.between({
        from: '2020-01-01T00:00:00.000Z',
        to: '2030-01-01T00:00:00.000Z',
      }),
      lien_extrait: faker.internet.url(),
      resume: faker.lorem.paragraph({ min: 1, max: 2 }),
      editeur: faker.company.name(),
      categoryId: faker.helpers.arrayElement(categories).id,
      authorId: faker.helpers.arrayElement(authors).id,
      userId: faker.helpers.arrayElement(users).id,
    }
  })
  .build()
