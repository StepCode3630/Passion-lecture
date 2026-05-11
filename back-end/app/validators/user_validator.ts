import vine from '@vinejs/vine'

// pour créer un utilisateur
// register
export const createUserValidator = vine.compile(
  vine.object({
    fullName: vine.string().minLength(2).maxLength(100),
    email: vine.string().email(),
    password: vine.string().minLength(8).maxLength(255),
  })
)

// our modif utilisateur
export const updateUserValidator = vine.compile(
  vine.object({
    fullName: vine.string().minLength(2).maxLength(100).optional(),
    email: vine.string().email().optional(),
    password: vine.string().minLength(8).maxLength(255).optional(),
  })
)
