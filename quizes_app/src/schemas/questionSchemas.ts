import { t } from 'elysia';
import { optionSchema } from './optionSchemas';

export const questionSchema = t.Object({
	id: t.Optional(t.String()),
	text: t.String(),
	options: t.Array(optionSchema)
});
