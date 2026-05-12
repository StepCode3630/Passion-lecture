import { Bouncer } from '@adonisjs/bouncer'
import User from '#models/user'
import Book from '#models/book'
import Comment from '#models/comment'

export const editBook = Bouncer.ability((user: User, book: Book) => {
  return user.id === book.userId || user.role === 'admin'
})

export const deleteBook = Bouncer.ability((user: User, book: Book) => {
  return user.id === book.userId || user.role === 'admin'
})

export const deleteComment = Bouncer.ability((user: User, comment: Comment) => {
  return user.id === comment.userId || user.role === 'admin'
})

export const isAdmin = Bouncer.ability((user: User) => {
  return user.role === 'admin'
})
