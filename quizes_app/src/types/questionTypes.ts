import { type Static } from 'elysia';
import { questionSchema } from '../schemas/questionSchemas';

export type Question = Static<typeof questionSchema>;
export type CreateQuestion = Omit<Question, 'id'>;
export type UpdateQuestion = Partial<Question>;
export type GetQuestionById = Pick<Question, 'id'>;

