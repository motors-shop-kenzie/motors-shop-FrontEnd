import { carImgRegisterSchema, carSchema, carSchemaUpdate, payloadRequestSchema } from "@/schemas/carSchema";
import { DeepPartial } from "react-hook-form";
import { z } from "zod";

export type TCarProduct = z.infer<typeof carSchema>;

export type TCarProductRegister = z.infer<typeof payloadRequestSchema>;

export type TCarImgRegister = z.infer<typeof carImgRegisterSchema>;

export type TCarsFormRequest = z.infer<typeof payloadRequestSchema>;

export type TCarsPayloadRequest = z.infer<typeof payloadRequestSchema>;

type TCarDeepPartialUpdate = z.infer<typeof carSchemaUpdate>;
export type TCarUpdate = DeepPartial<TCarDeepPartialUpdate>;
