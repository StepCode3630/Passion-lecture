import vine from '@vinejs/vine'

export const createCommentValidator = vine.compile(
  vine.object({
    message: vine.string().minLength(2).maxLength(1000),
    etoile: vine.number().min(1).max(5),
  })
)

// correction : le validator de mise à jour doit permettre de ne pas fournir tous les champs, et doit permettre de ne pas modifier le message ou les étoiles
export const updateCommentValidator = vine.compile(
  vine.object({
    message: vine.string().minLength(2).maxLength(1000).optional(),
    etoile: vine.number().min(1).max(5).optional(),
  })
)
