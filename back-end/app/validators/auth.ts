import vine from '@vinejs/vine'

export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().email(),
    password: vine.string().minLength(6),
  })
)

export const registerValidator = vine.compile(
  vine.object({
    fullName: vine.string().minLength(3).nullable(),
    email: vine
      .string()
      .email()
      .unique(async (db, value) => {
        const user = await db.from('users').where('email', value).first()
        return !user
      }),
    // correction : rend le role optionnel pour permettre la création d'utilisateurs sans spécifier de rôle, et on valide que s'il est fourni, il doit être soit 'admin' soit 'user'
    role: vine.enum(['admin', 'user']).optional(),
    password: vine.string().minLength(10),
  })
)
