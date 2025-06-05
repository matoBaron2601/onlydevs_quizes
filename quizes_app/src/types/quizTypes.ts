import { type Static } from 'elysia';
import { createQuizSchema, quizSchema } from '../schemas/quizSchemas';

export type Quiz = Static<typeof quizSchema>;
export type CreateQuiz = Static<typeof createQuizSchema>;
export type UpdateQuiz = Partial<CreateQuiz>;
export type GetQuizById = Pick<Quiz, 'id'>;

