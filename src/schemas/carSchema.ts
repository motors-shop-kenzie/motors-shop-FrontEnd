import { z } from "zod";
import { userSchema } from "./userSchema";

const urlSchema = z.string().url("Insira uma URL válida ou deixe em branco");

export const carImgSchema = z.object({
  id: z.string(),
  url_img: z.string().url(),
  carProductsId: z.string().optional(),
});

export const carImgRegisterSchema = z.object({
  url_img: urlSchema.optional(),
});

export const carSchema = z.object({
  id: z.string(),
  coverImg: z.string(),
  price: z.number(),
  year: z.number().max(4),
  km: z.number(),
  description: z.string(),
  color: z.string(),
  gasoline: z.string(),
  model: z.string(),
  brand: z.string(),
  tablePife: z.number(),
  business: z.boolean(),
  img: z.array(carImgSchema),
  active: z.boolean(),
  user: userSchema,
  userId: z.string().optional(),
});

export const carRegisterSchema = z.object({
  coverImg: z.string().nonempty({ message: "*" }),
  price: z.coerce.number().min(1, { message: "*" }),
  year: z.coerce.number(),
  km: z.coerce.number().min(1, { message: "*" }),
  description: z.string().nonempty({ message: "*" }),
  color: z.string().nonempty({ message: "*" }),
  gasoline: z.string(),
  model: z.string().nonempty({ message: "*" }),
  brand: z.string().nonempty({ message: "*" }),
  tablePife: z.coerce.number(),
  img: z.array(carImgRegisterSchema).optional(),
});

export const payloadRequestSchema = carRegisterSchema.extend({ business: z.boolean() });

export const carSchemaUpdate = carRegisterSchema.optional();
