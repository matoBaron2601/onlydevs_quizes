import { Elysia } from 'elysia';
import { typesenseApi } from '../typesenseApi';
import { quizApi } from '../quizApi';
import authApi from '../authApi';
import chunkerApi from '../chunkerApi';
import { cors } from '@elysiajs/cors';

const app = new Elysia({ prefix: '/api' })
  .use(
    cors({
      origin: 'http://localhost:5173', // Update this to match your front-end origin
      credentials: true, // Allow credentials to be included (cookies, HTTP authentication)
    })
  )
  .use(typesenseApi)
  .use(quizApi)
  .use(authApi)
  .use(chunkerApi);

type RequestHandler = (context: {
  request: Request;
}) => Response | Promise<Response>;

export const GET: RequestHandler = ({ request }) => app.handle(request);
export const POST: RequestHandler = ({ request }) => app.handle(request);
export const DELETE: RequestHandler = ({ request }) => app.handle(request);
export const PUT: RequestHandler = ({ request }) => app.handle(request);
