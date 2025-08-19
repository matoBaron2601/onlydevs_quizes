import { t } from "elysia";

export const chunkSchema = t.Object({
	tags: t.Array(t.String())
});
