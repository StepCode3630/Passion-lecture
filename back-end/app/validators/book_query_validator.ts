import vine from '@vinejs/vine'

export const getBooksQueryValidator = vine.compile(
  vine.object({
    page: vine.number().min(1).optional(),
    limit: vine.number().min(1).max(100).optional(),
    sort: vine.string().in(['titre', 'nb_page', 'annee_publication', 'created_at']).optional(),
    order: vine.string().in(['asc', 'desc']).optional(),
    categoryId: vine.number().optional(),
    authorId: vine.number().optional(),
    search: vine.string().trim().minLength(1).optional(),
  })
)
