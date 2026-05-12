import { BaseSeeder } from '@adonisjs/lucid/seeders'
import AuthorSeeder from '#database/seeders/author_seeder'
import CategorySeeder from '#database/seeders/category_seeder'
import UserSeeder from '#database/seeders/user_seeder'
import BookSeeder from '#database/seeders/book_seeder'
import CommentaireSeeder from '#database/seeders/commentaire_seeder'

export default class extends BaseSeeder {
  async run() {
    await new UserSeeder(this.client).run()

    await new AuthorSeeder(this.client).run()
    await new CategorySeeder(this.client).run()
    await new BookSeeder(this.client).run()
    await new CommentaireSeeder(this.client).run()
  }
}
