import { validator } from 'hono/validator';
import { z, type ZodSchema } from 'zod';
import { StatusCodes, type StatusResponse } from './responses.ts';

export const IdSchema = z.string().uuid('Invalid ID format');

export type Id = z.infer<typeof IdSchema>;

export const idValidator = validator('param', ({ id }, context) => {
	const { success: isValidId, data: parsedId, error } = IdSchema.safeParse(id);

	if (!isValidId) {
		return context.json<StatusResponse>({ message: error.format()._errors.join('') }, StatusCodes.BAD_REQUEST);
	}

	return parsedId;
});

export function jsonValidator<T extends ZodSchema>(schema: T) {
	return validator('json', (objToValidate, context) => {
		const { success: isValid, data, error } = schema.safeParse(objToValidate);

		if (!isValid) {
			return context.json<StatusResponse>({ message: 'Validation error', errors: error.flatten().fieldErrors }, StatusCodes.BAD_REQUEST);
		}

		return data as z.infer<T>;
	});
}
