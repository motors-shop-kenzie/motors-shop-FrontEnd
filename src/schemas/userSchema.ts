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
  number: z.number(),
  complement: z.string().optional(),
});

export const addressSchemaUpdate = addressSchemaRegister.optional();

export const userSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  name: z.string(),
  email: z.string().email(),
  cpf: z.string().max(11),
  isAdmin: z.boolean(),
  telephone: z.string(),
  description: z.string().optional(),
  birthdate: z.string(),
  address: addressSchema,
});

export const userSchemaRegister = z.object({
  name: z.string(),
  email: z.string().email(),
  cpf: z.string().max(11),
  isAdmin: z.boolean(),
  telephone: z.string(),
  description: z.string().optional(),
  birthdate: z.string(),
  address: addressSchemaRegister.optional(),
  password: z.string(),
});

export const userSchemaUpdate = userSchemaRegister.optional();

export type RegisterData = z.infer<typeof userSchemaRegister>;
