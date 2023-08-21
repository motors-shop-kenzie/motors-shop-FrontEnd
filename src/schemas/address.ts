import { z } from "zod";

export const addressSchema = z.object({
  id: z.string(),
  zip_code: z.string(),
  state: z.string(),
  city: z.string(),
  street: z.string(),
  number: z.number(),
  complement: z.string().optional(),
  userId: z.string(),
});

export const addressSchemaRegister = z.object({
  zip_code: z.string(),
  state: z.string(),
  city: z.string(),
  street: z.string(),
  number: z.coerce.number(),
  complement: z.string().optional(),
});

export const addressSchemaUpdate = addressSchemaRegister.optional();
