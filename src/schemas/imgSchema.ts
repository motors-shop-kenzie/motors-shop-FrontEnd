import {z} from "zod";

export const imgSchema = z.object({
    id: z.string(), 
    url_img: z.string(),
    carProductsId: z.string(),
})

export type imgData = z.infer<typeof imgSchema>