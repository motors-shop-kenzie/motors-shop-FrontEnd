import {z} from "zod";
import { imgSchema } from "./imgSchema";


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
    tablePife: z.number(),
    business: z.boolean(),
    img: z.array(imgSchema),
})

export type CarData = z.infer<typeof carSchema>