import vine from '@vinejs/vine'

export const createBookValidator = vine.compile(
  vine.object({
    titre: vine.string().minLength(1).maxLength(255),
    nb_page: vine.number().min(1).max(9999),
    resume: vine.string().minLength(10).maxLength(2000),
    editeur: vine.string().minLength(1).maxLength(255),
    annee_publication: vine.date(),
    lien_extrait: vine.string().url().optional(),
    image: vine.string().optional(),
    categoryId: vine.number(),
    authorId: vine.number(),
  })
)