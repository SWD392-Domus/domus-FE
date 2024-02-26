import { z } from "zod";

export const createProductSchema = z.object({
  name: z
    .string()
    .min(2, { message: "name must be at least 2 characters." })
    .max(50, { message: "name must be at most 50 characters." }),
  brand: z
    .string()
    .min(2, { message: "brand must be at least 2 characters." })
    .max(50, { message: "brand must be at most 50 characters." }),
  description: z
    .string()
    .min(2, { message: "description must be at least 2 characters." })
    .max(100, { message: "description must be at most 50 characters." }),
});

export const createDetailsSchema = z.object({
    price: z
      .string()
      .refine(value => {
        const parsed = parseFloat(value);
        return !isNaN(parsed) && parsed >= 1 && parsed <= 1000000;
      }, { message: "price must be a number between 1 and 1000000." }),

  });

  
