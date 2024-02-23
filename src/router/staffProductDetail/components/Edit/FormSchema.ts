import { z } from "zod";

export const formSchema = z.object({
  name: z
    .string({
        invalid_type_error: "Name must be a string",
    })
    .min(2, {
      message: "name must be at least 2 characters.",
    })
    .max(50, { message: "name must be at most 50 characters." }),
  value: z
    .string({
        invalid_type_error: "Value must be a string",
    })
    .min(2, {
      message: "value must be at least 2 characters.",
    })
    .max(50, { message: "value must be at most 50 characters." }),
});
