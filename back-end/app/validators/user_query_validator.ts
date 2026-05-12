import vine from '@vinejs/vine'

export const getUsersQueryValidator = vine.compile(
  vine.object({
    page: vine.number().min(1).optional(),
    limit: vine.number().min(1).max(100).optional(),
    sort: vine.string().in(['fullName', 'email', 'created_at']).optional(),
    order: vine.string().in(['asc', 'desc']).optional(),
    search: vine.string().trim().minLength(1).optional(),
  })
)
