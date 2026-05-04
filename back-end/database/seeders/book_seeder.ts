import { BookFactory } from '#database/factories/book_factory'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    BookFactory.createMany(20)
  }
}
