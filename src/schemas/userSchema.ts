import { z } from "zod";
import { addressSchema, addressSchemaRegister } from "./address";

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
  name: z.string().nonempty({ message: "*" }),
  email: z.string().email({ message: "Email inválido!" }).nonempty({ message: "*" }),
  password: z.string().nonempty({ message: "*" }),
  cpf: z.string().max(11).nonempty({ message: "*" }),
  telephone: z.string().nonempty({ message: "*" }),
  description: z.string().optional(),
  birthdate: z.string().nonempty({ message: "*" }),
  address: addressSchemaRegister.optional(),
});

export const userSchemaRegisterRequest = userSchemaRegister.extend({
  isAdmin: z.boolean(),
});

export const userSchemaLogin = z.object({
  email: z.string().nonempty({ message: "*" }),
  password: z.string().nonempty({ message: "*" }),
});

export const userSchemaUpdate = userSchemaRegister.optional();

export const sendEmailResetPasswordSchema = userSchemaLogin.omit({
  password: true,
});

export const userResetPassword = z.object({
  password: z.string(),
});

export const resetPasswordSchema = userResetPassword
  .extend({
    passwordConfirm: z.string().min(1, "A confirmação de senha é obrigatória"),
  })
  .refine(({ password, passwordConfirm }) => password === passwordConfirm, {
    message: "As senhas precisam corresponderem",
    path: ["passwordConfirm"],
  });
