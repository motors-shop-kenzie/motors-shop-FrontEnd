import { z } from "zod";

export type ValidationResult = { success: boolean; message?: string };

export const schemaValidation = <T>(schema: z.Schema<T>, value: T): ValidationResult => {
  const validate = schema.safeParse(value);

  return {
    success: validate.success,
    message: validate.success ? undefined : validate.error?.errors[0]?.message,
  };
};
