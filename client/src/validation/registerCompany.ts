import { z } from "zod";

export const registerCompanySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Company name must be at least 2 characters")
    .max(100, "Company name is too long"),

  description: z
    .string()
    .trim()
    .min(8, "Description must be at least 8 characters")
    .max(1000, "Description is too long"),

  contactEmail: z
    .string()
    .trim()
    .email("Invalid email address")
    .toLowerCase(),

  contactPhone: z
    .string()
    .trim()
    .min(6, "Phone number is too short")
    .max(30, "Phone number is too long"),
});

export type RegisterCompanyFormFields = z.infer<
  typeof registerCompanySchema
>;