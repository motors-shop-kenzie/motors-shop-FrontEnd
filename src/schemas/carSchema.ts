import { z } from "zod";
import { userSchema } from "./userSchema";

export const carImgSchema = z.object({
  id: z.string(),
  url_img: z.string(),
  carProductsId: z.string(),
});

export const carImgSchemaRegister = z.object({
  url_img: z.string(),
  carProductsId: z.string(),
});

export const carImgSchemaUpdate = z.object({
  url_img: z.string(),
});

export const carSchema = z.object({
  id: z.string(),
  name: z.string(),
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
});

export const carSchemaRegister = z.object({
  name: z.string(),
  coverImg: z.string(),
  price: z.coerce.number(),
  year: z.coerce.number(),
  km: z.coerce.number(),
  description: z.string(),
  color: z.string(),
  gasoline: z.string(),
  model: z.string(),
  brand: z.string(),
  tablePife: z.coerce.number(),
  img: z.array(carImgSchema).optional(),
});

export const formRegisterCar = carSchemaRegister.omit({name:true})

export type TFormCar = z.infer<typeof formRegisterCar>

export type TCarsRegister = z.infer<typeof carSchemaRegister>;

export const carSchemaUpdate = carImgSchemaRegister.optional();
