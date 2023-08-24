import { z } from "zod";

export type ValidationResult = { success: boolean; message?: string };

/**
 * Validates a value against a Zod schema.
 * @param schema The Zod schema to validate against.
 * @param value The value to validate against the schema.
 * @returns An object indicating whether the validation was successful and an optional error message if it failed.
 */
export const schemaValidation = <T>(schema: z.Schema<T>, value: T): ValidationResult => {
  const validate = schema.safeParse(value);

  return {
    success: validate.success,
    message: validate.success ? undefined : validate.error?.errors[0]?.message,
  };
};
