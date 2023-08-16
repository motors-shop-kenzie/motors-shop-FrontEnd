import { addressSchema, addressSchemaRegister, addressSchemaUpdate, userSchema, userSchemaRegister, userSchemaUpdate } from "@/schemas/userSchema";
import { z } from "zod";

export type TUser = z.infer<typeof userSchema>;

export type TUserRegister = z.infer<typeof userSchemaRegister>;

export type TUserUpdate = z.infer<typeof userSchemaUpdate>;

export type TAddress = z.infer<typeof addressSchema>;

export type TAddressRegister = z.infer<typeof addressSchemaRegister>;

export type TAddressUpdate = z.infer<typeof addressSchemaUpdate>;