import {
  carImgRegisterSchema,
  carRegisterSchema,
  carSchema,
  carSchemaUpdate,
  payloadRequestSchema,
} from "@/schemas/carSchema";
import { z } from "zod";

export type TCarProduct = z.infer<typeof carSchema>;

export type TCarProductRegister = z.infer<typeof carRegisterSchema>;

export type TCarImgRegister = z.infer<typeof carImgRegisterSchema>;

export type TCarsFormRequest = z.infer<typeof carRegisterSchema>;

export type TCarsPayloadRequest = z.infer<typeof payloadRequestSchema>;

export type TCarUpdate = z.infer<typeof carSchemaUpdate>;
