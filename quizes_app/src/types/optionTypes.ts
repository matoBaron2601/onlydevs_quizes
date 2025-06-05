import { type Static } from 'elysia';
import {  optionSchema } from '../schemas/optionSchemas';

export type Option = Static<typeof optionSchema>;
export type CreateOption = Omit<Option, 'id'>;
export type UpdateOption = Partial<Option>;
export type GetOptionById = Pick<Option, 'id'>;


