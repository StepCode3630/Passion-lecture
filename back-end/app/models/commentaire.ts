import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'
// import User from './user.js'

export default class Commentaire extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare message: string

  // de 0 à 5
  @column()
  declare etoile: number

  @column()
  declare userFk: number

  @column()
  declare bookFk: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // relation
  //@belongsTo(() => User, { foreignKey: 'userFk' })
  //declare user: BelongsTo<typeof User>

  //@belongsTo(() => Book, { foreignKey: 'bookFk' })
  //declare book: BelongsTo<typeof Book>
}
