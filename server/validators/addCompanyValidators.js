import { z } from "zod";

export const addCompanySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Company name must be at least 2 characters")
    .max(100, "Company name cannot be longer than 100 characters"),

  description: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description cannot be longer than 1000 characters"),

  contactEmail: z
    .string()
    .trim()
    .email("Invalid contact email"),

  contactPhone: z
    .string()
    .trim()
    .min(5, "Contact phone must be at least 5 characters")
    .max(30, "Contact phone cannot be longer than 30 characters"),
});



