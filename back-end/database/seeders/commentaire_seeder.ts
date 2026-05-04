import { CommentaireFactory } from '#database/factories/commentaire_factory'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    CommentaireFactory.createMany(10)
  }
}
