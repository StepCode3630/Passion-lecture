import vine from '@vinejs/vine'

export const createBookValidator = vine.compile(
  vine.object({
    titre: vine.string().minLength(1).maxLength(255),
    nb_page: vine.number().min(1).max(9999),
    resume: vine.string().minLength(10).maxLength(2000),
    editeur: vine.string().minLength(1).maxLength(255),
    annee_publication: vine.number().min(1000).max(9999),
    lien_extrait: vine.string().url().optional(),
    image: vine.string().optional(),
    categoryId: vine.number(),
    authorId: vine.number(),
  })
)

export const updateBookValidator = vine.compile(
  vine.object({
    titre: vine.string().minLength(1).maxLength(255).optional(),
    nb_page: vine.number().min(1).max(9999).optional(),
    resume: vine.string().minLength(10).maxLength(2000).optional(),
    editeur: vine.string().minLength(1).maxLength(255).optional(),
    annee_publication: vine.number().min(1000).max(9999),
    lien_extrait: vine.string().url().optional(),
    image: vine.string().optional(),
    categoryId: vine.number().optional(),
    authorId: vine.number().optional(),
  })
)
