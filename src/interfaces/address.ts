import { addressSchema, addressSchemaRegister, addressSchemaUpdate } from "@/schemas/address";
import { z } from "zod";

export type TAddress = z.infer<typeof addressSchema>;

export type TAddressRegister = z.infer<typeof addressSchemaRegister>;

export type TAddressUpdate = z.infer<typeof addressSchemaUpdate>;
