import { Bouncer } from '@adonisjs/bouncer'
import User from '#models/user'
import Book from '#models/book'
import Commentaire from '#models/commentaire'

export const editBook = Bouncer.ability((user: User, book: Book) => {
  return user.id === book.userId || user.role === 'admin'
})

export const deleteBook = Bouncer.ability((user: User, book: Book) => {
  return user.id === book.userId || user.role === 'admin'
})

export const deleteCommentaire = Bouncer.ability((user: User, commentaire: Commentaire) => {
  return user.id === commentaire.userId || user.role === 'admin'
})

export const isAdmin = Bouncer.ability((user: User) => {
  return user.role === 'admin'
})
