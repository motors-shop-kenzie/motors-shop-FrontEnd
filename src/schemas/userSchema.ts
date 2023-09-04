import { z } from "zod";
import { addressSchema, addressSchemaRegister } from "./address";

function removeNonDigits(value: string): string {
  return value.replace(/\D/g, "");
}

export const userSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  name: z.string(),
  email: z.string().email(),
  cpf: z.string(),
  isAdmin: z.boolean(),
  telephone: z.string(),
  description: z.string().optional(),
  birthdate: z.string(),
  address: addressSchema,
});

export const userSchemaRegister = z
  .object({
    name: z.string().nonempty({ message: "Campo obrigatório" }),
    email: z.string().email({ message: "Email inválido" }),
    password: z.string().nonempty({ message: "Campo obrigatório" }),
    cpf: z
      .string()
      .transform(removeNonDigits)
      .refine((value) => value.length === 11, {
        message: "CPF inválido",
      }),
    telephone: z.string().nonempty({ message: "Campo obrigatório" }),
    description: z.string().optional(),
    birthdate: z.string().nonempty({ message: "Campo obrigatório" }),
    address: addressSchemaRegister.optional(),
    password_confirmation: z.string(),
  })
  .extend({
    isAdmin: z.boolean().optional(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Senhas não são iguais!",
    path: ["password_confirmation"],
  });

export const userSchemaLogin = z.object({
  email: z.string(),
  password: z.string(),
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
    message: "As senhas precisam corresponder",
    path: ["passwordConfirm"],
  });
