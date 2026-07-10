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

// To validate password strength
export const passwordSchema = z
  .string()
  .min(1, { message: "Password is required" })
  .min(8, { message: "Password must be at least 8 characters" })
  .regex(/[^A-Za-z0-9]/, {
    message: "Password must contain at least one special character",
  });

// Schema for user sign up
export const signUpSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  email: z.email({ message: "Invalid email address" }),
  password: passwordSchema,
});

// validate booking
export const newBookingSchema = z.object({
  userId: z.string(),
  jobType: z.string({ message: "Include a job type" }),
  jobDetails: z.string().min(3, "Include a short discription about the job"),
  deliveryDate: z.date({ message: "Select a delivery Date" }),
});

// VALIDATE THE PROFILE
export const profileSchema = z.object({
  name: z.string().min(2).max(100),
  userName: z.string().min(3).max(30).optional().or(z.literal("")),
  email: z.string().email(),
  phoneNumber: z.string().optional().or(z.literal("")),
  otherNumber: z.string().optional().or(z.literal("")),
  gender: z.string().optional().or(z.literal("")),
  bio: z.string().max(500).optional().or(z.literal("")),
  businessName: z.string().optional().or(z.literal("")),
  businessAddress: z.string().optional().or(z.literal("")),
  image: z.string().optional().or(z.literal("")),
  paymentMethods: z.string().optional().or(z.literal("")),
  dateOfBirth: z.string().optional(),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
