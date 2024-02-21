import { z } from "zod";

export const editSchema = z.object({
  price: z
    .number()
    .min(0, {
      message: "Product name must be at least 2 characters.",
    })
    .max(100000, {
      message: "Product description must less than 50 characters.",
    }),
  size: z
    .string()
    .min(2, {
      message: "Product size must be at least 2 characters.",
    })
    .max(50, {
      message: "Product size must less than 50 characters.",
    }),
  material: z
    .string()
    .min(2, {
      message: "Product material must be at least 2 characters.",
    })
    .max(50, {
      message: "Product material must less than 50 characters.",
    }),
  color: z
    .string()
    .min(2, {
      message: "Product color must be at least 2 characters.",
    })
    .max(50, {
      message: "Product color must less than 50 characters.",
    }),
});
