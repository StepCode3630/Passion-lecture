import vine from '@vinejs/vine'import vine from '@vinejs/vine'

export const createAuthorValidator = vine.compile(
  vine.object({
    lastName: vine.string().minLength(2).maxLength(100),
    firstName: vine.string().minLength(2).maxLength(100),
  })
)