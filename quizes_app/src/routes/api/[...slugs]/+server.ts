import { Elysia } from 'elysia';
import { typesenseApi } from '../typesenseApi';
import { quizApi } from '../quizApi';
import authApi from '../authApi';
import chunkerApi from '../chunkerApi';
import { cors } from '@elysiajs/cors';

const app = new Elysia({ prefix: '/api' })
  .use(
    cors({
      origin: 'http://localhost:5173',
      credentials: true,
    })
  )
  .use(authApi)
  .guard(
    {
      beforeHandle: async ({ jwt, cookie: { auth }, status }) => {
        try {
          if (!auth?.value) {
            return status(401, 'Unauthorized');
          }

          const authorized = await jwt.verify(auth.value);
          if (!authorized) {
            return status(401, 'Unauthorized');
          }

        } catch (error) {
          return status(500, 'Something went wrong :(');
        }
      },
    },
    (protectedApp) =>
      protectedApp.use(typesenseApi).use(quizApi).use(chunkerApi)
  );

type RequestHandler = (context: {
  request: Request;
}) => Response | Promise<Response>;

export const GET: RequestHandler = ({ request }) => app.handle(request);
export const POST: RequestHandler = ({ request }) => app.handle(request);
export const DELETE: RequestHandler = ({ request }) => app.handle(request);
export const PUT: RequestHandler = ({ request }) => app.handle(request);
