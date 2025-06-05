import { t } from 'elysia';
import { questionSchema } from './questionSchemas';

export const quizSchema = t.Object({
	id: t.Optional(t.String()),
	questions: t.Array(questionSchema)
});

export const createQuizSchema = t.Object({
	tags: t.Array(t.String())
});
