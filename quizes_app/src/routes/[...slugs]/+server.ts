import { Elysia } from 'elysia'

const app = new Elysia({ prefix: '/api' })

type RequestHandler = (context: {
  request: Request
}) => Response | Promise<Response>

export const GET: RequestHandler = ({ request }) => app.handle(request)
export const POST: RequestHandler = ({ request }) => app.handle(request)
