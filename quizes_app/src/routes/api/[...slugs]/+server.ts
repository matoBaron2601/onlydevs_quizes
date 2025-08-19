import { Elysia } from 'elysia';
import { typesenseApi } from '../typesenseApi';
import { quizApi } from '../quizApi';
import authApi from '../authApi';
import chunkerApi from '../chunkerApi';

const app = new Elysia({ prefix: '/api' })
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
