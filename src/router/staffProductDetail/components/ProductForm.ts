import { z } from "zod"

export const productSchema = z.object({
    name: z.string().min(2, {
      message: "Product name must be at least 2 characters.",
    }).max(50, {
        message: "Product description must less than 50 characters.",
    }),
    description: z.string().min(2, {
      message: "Product description must be at least 2 characters.",
    }).max(50, {
        message: "Product description must less than 100 characters.",
    }),
    brand: z.string().min(2, {
        message: "Product brand must be at least 2 characters.",
      }).max(50, {
          message: "Product brand must less than 50 characters.",
      }),
  });