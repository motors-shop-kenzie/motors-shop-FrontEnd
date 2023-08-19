import {
  addressSchema,
  addressSchemaRegister,
  addressSchemaUpdate,
  resetPasswordSchema,
  sendEmailResetPasswordSchema,
  userSchema,
  userSchemaLogin,
  userSchemaRegister,
  userSchemaRegisterRequest,
  userSchemaUpdate,
} from "@/schemas/userSchema";
import { z } from "zod";

export type TUser = z.infer<typeof userSchema>;

export type TUserRegister = z.infer<typeof userSchemaRegister>;

export type TUserRegisterResquest = z.infer<typeof userSchemaRegisterRequest>;

export type TUserLogin = z.infer<typeof userSchemaLogin>;

export type TUserUpdate = z.infer<typeof userSchemaUpdate>;

export type TAddress = z.infer<typeof addressSchema>;

export type TAddressRegister = z.infer<typeof addressSchemaRegister>;

export type TAddressUpdate = z.infer<typeof addressSchemaUpdate>;

export type ResetPasswordData = z.infer<typeof resetPasswordSchema>;

export type SendEmailResetPasswordData = z.infer<typeof sendEmailResetPasswordSchema>;
