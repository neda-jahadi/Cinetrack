import { z } from "zod";

export const jobSchema = z.object({
  type: z.enum(["Full-Time", "Part-Time", "Contract", "Internship"]),
  title: z.string().min(1, "Please add a job title"),
  description: z
    .string()
    .min(30, "Description must be at least 30 characters long"),
  salary: z.string().min(1, "Please select a salary"),
  location: z.string().min(1, "Please add a location"),
  company: z.string().min(1, "Please add a company location"),
  company_description: z
    .string()
    .min(30, "Company description must be at least 30 characters long"),
  contact_email: z.email(),
  contact_phone: z
    .string()
    .trim()
    .transform((v) => (v === "" ? undefined : v))
    .optional()
    .refine(
      (v) => !v || /^[0-9+()\-.\s]+$/.test(v),
      "Phone number contains invalid characters",
    )
    .refine(
      (v) => !v || v.replace(/\D/g, "").length >= 7,
      "Phone number is too short",
    ),
});

export type JobFormFields = z.infer<typeof jobSchema>;