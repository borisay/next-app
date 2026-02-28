import { object, string, number } from "zod";
import { z } from "zod";

export const signInSchema = object({
  email: string({ error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  // password: string({ required_error: "Password is required" })
  password: string({ error: "Password is required" })
    .min(1, "Password is required")
    .min(6, "Password must be more than 6 characters")
    .max(32, "Password must be less than 32 characters"),
});

export const ingredientSchema = object({
  name: string().min(1, "Name is required"),
  category: z.enum([
    "VEGETABLES",
    "FRUITS",
    "MEAT",
    "DAIRY",
    "SPICES",
    "OTHER",
  ]),
  unit: z.enum([
    "TEA_SPOON",
    "TABLE_SPOON",
    "OUNCES",
    "CUP",
    "POUNDS",
    "PIECES",
  ]),

  // pricePerUnit: number({ invalid_type_error: "Price has to be a number" })
  pricePerUnit: number({ error: "Price has to be a number" })
    .min(0, "Price has to be positive")
    .nullable(),
  description: string().optional(),
});
