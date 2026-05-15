import { z } from "zod";
import { formatToDecimalPlaces } from "./utils";

const currency = z
  .string()
  .refine(
    (value) => /^\d+(\.\d{2})?$/.test(formatToDecimalPlaces(Number(value))),
    "Price must be a valid number with up to two decimal places",
  );

const imageSchema = z.object({
  id: z.string(),
  url: z.string(),
  alt: z.string().nullable(),
  createdAt: z.date(),
  productId: z.string(),
});

// Scema for inserting product data
export const insertProductSchema = z.object({
  name: z.string().min(3, "Product must be at least 3 characters long"),
  slug: z.string().min(3, "Slug must be at least 3 characters long"),
  category: z.string().min(3, "Category must be at least 3 characters long"),
  brand: z.string().min(3, "Brand must be at least 3 characters long"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long"),
  stock: z.coerce.number(),
  images: z.array(imageSchema).min(1, "At least one image URL is required"),
  isFeatured: z.boolean(),
  banner: z.string().nullable(),
  price: currency,
});
