import vine from '@vinejs/vine'

export const createCommentaireValidator = vine.compile(
  vine.object({
    message: vine.string().minLength(2).maxLength(1000),
    etoile: vine.number().min(1).max(5),
  })
)