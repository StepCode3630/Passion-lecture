import { AuthorFactory } from '#database/factories/author_factory'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    AuthorFactory.createMany(10)
  }
}
