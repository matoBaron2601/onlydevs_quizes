import Elysia from 'elysia';
import { createQuizSchema } from '../../schemas/quizSchemas';
import { createQuizV1 } from '../../server/quizServer';

export const quizApi = new Elysia().post(
  'quiz/create',
  async (context) => {
    return await createQuizV1(context.query);
  },
  {
    query: createQuizSchema,
  }
);
