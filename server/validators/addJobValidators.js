import { z } from "zod";

export const addJobSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, "Title must be at least 2 characters")
    .max(100, "Title cannot be longer than 100 characters"),

  type: z.enum(["Full_Time", "Part_Time", "Contract", "Internship"], {
    message: "Invalid job type",
  }),

  description: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters"),

  salary: z
    .string()
    .trim()
    .min(1, "Salary is required"),

  location: z
    .string()
    .trim()
    .min(2, "Location must be at least 2 characters"),
});