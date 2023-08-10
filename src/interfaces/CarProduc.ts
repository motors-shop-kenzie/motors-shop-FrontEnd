import { carImgSchema, carImgSchemaRegister, carImgSchemaUpdate, carSchema, carSchemaRegister, carSchemaUpdate } from "@/schemas/carSchema";

import {z} from "zod";

export type TCarProduct = z.infer<typeof carSchema>

export type TCarProductRegister = z.infer<typeof carSchemaRegister>

export type TCarProductUpdate = z.infer<typeof carSchemaUpdate>

export type TCarImgData = z.infer<typeof carImgSchema>

export type TCarImgRegister = z.infer<typeof carImgSchemaRegister>

export type TCarImgUpdate = z.infer<typeof carImgSchemaUpdate>