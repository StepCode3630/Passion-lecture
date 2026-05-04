import factory from '@adonisjs/lucid/factories'
import Book from '#models/book'

export const BookFactory = factory
  .define(Book, async function ({ faker }) {
    return {
      titre: faker.book.title(),
      image: faker.string,
      nb_page: faker.number.int({ min: 6, max: 850 }),
      annee_publication: faker.date.between({
        from: '2020-01-01T00:00:00.000Z',
        to: '2030-01-01T00:00:00.000Z',
      }),
      lien_extrait: faker.string,
      resume: faker.lorem.paragraph({ min: 1, max: 2 }),
      editeur: faker.book.author,
    }
  })
  .build()
