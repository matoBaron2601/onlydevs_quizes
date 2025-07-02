import type { Static } from 'elysia'
import type { userSchema } from '../schemas/userSchemas'

export type User = Static<typeof userSchema>
