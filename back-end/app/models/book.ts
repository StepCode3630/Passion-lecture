import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import User from './user.js'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Author from './author.js'
import Category from './category.js'
import Commentaire from './comment.js'

export default class Book extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare titre: string

  @column()
  declare image: string

  @column()
  declare annee_publication: Date

  @column()
  declare nb_page: number

  @column()
  declare lien_extrait: string

  @column()
  declare resume: string

  @column()
  declare editeur: string

  @column()
  declare categoryId: number | null

  @column()
  declare authorId: number | null

  @column()
  declare userId: number | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => User)
  declare users: BelongsTo<typeof User>

  @belongsTo(() => Author)
  declare authors: BelongsTo<typeof Author>

  @belongsTo(() => Category)
  declare categories: BelongsTo<typeof Category>

  @hasMany(() => Commentaire)
  declare commentaires: HasMany<typeof Commentaire>
}
