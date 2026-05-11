import vine from '@vinejs/vine'

export const getCategoriesQueryValidator = vine.compile(
  vine.object({
    page: vine.number().min(1).optional(),
    limit: vine.number().min(1).max(100).optional(),
    sort: vine.string().in(['name', 'created_at']).optional(),
    order: vine.string().in(['asc', 'desc']).optional(),
    search: vine.string().trim().minLength(1).optional(),
  })
)
