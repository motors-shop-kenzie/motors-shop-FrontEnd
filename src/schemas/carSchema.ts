import {z} from "zod";

export const carImgSchema = z.object({
    id: z.string(), 
    url_img: z.string(),
    carProductsId: z.string(),
})

export const carImgSchemaRegister = z.object({
    url_img: z.string(),
    carProductsId: z.string(),
})

export const carImgSchemaUpdate = z.object({
    url_img: z.string(),
})

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
})

export const carSchemaRegister = z.object({
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
    img: z.array(carImgSchema).optional(),
})

export const carSchemaUpdate = z.object({
    name: z.string().optional(),
    coverImg: z.string().optional(),
    price: z.number().optional(),
    year: z.number().max(4).optional(),
    km: z.number().optional(),
    description: z.string().optional(),
    color: z.string().optional(),
    gasoline: z.string().optional(),
    model: z.string().optional(),
    brand: z.string().optional(),
    tablePife: z.number().optional(),
    business: z.boolean().optional(),
    img: z.array(carImgSchema).optional(),
})






