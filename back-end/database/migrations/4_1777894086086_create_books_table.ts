import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'books'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()

      table.string('titre').notNullable()
      table.string('image')
      table.integer('annee_publication')
      table.integer('nb_page')

      table.string('lien_extrait').unique()

      table.string('resume')
      table.string('editeur')

      table
        .integer('category_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('categories')
        .onDelete('CASCADE')
      table
        .integer('author_id')
        .unsigned()
        // temporairement nullable pour éviter les problèmes de création de livres avant les auteurs
        .nullable()
        .references('id')
        .inTable('authors')
        .onDelete('CASCADE')
      table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
