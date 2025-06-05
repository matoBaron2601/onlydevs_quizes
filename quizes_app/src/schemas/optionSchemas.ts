import { t } from 'elysia';

export const optionSchema = t.Object({
	id: t.Optional(t.String()),
	text: t.String(),
	isCorrect: t.Boolean()
});
