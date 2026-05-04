import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'books'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable

      table.string('titre').unique
      table.string('image')
      table.date('annee_publication')
      table.integer('nb_page')

      table.string('lien_extrait').unique

      table.string('resume')
      table.string('editeur')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
