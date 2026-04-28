import Category from '#models/category'
import factory from '@adonisjs/lucid/factories'

export const CategorieFactory = factory
  .define(Category, async ({ faker }) => {
    return {
      name: faker.lorem.word(),
    }
  })
  .build()
