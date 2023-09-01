import {
  carImgRegisterSchema,
  carImgSchema,
  carSchema,
  carSchemaUpdate,
  payloadRequestSchema,
} from "@/schemas/carSchema";
import { DeepPartial } from "react-hook-form";
import { z } from "zod";

export type TCarProduct = z.infer<typeof carSchema>;

export interface ICreateCarImg extends TCarImgRegister {
  carProduct: string;
}
export type TCarImg = z.infer<typeof carImgSchema>;
export type TCarImgRegister = z.infer<typeof carImgRegisterSchema>;

export type TCarsPayloadRequest = z.infer<typeof payloadRequestSchema>;

type TCarDeepPartialUpdate = z.infer<typeof carSchemaUpdate>;
export type TCarUpdate = DeepPartial<TCarDeepPartialUpdate>;
