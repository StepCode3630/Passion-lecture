import { CategorieFactory } from '#database/factories/categorie_factory'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    CategorieFactory.createMany(10)
  }
}
