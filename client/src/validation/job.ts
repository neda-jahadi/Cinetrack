import { z } from "zod";

export const jobSchema = z.object({
  type: z.enum(["Full_Time", "Part_Time", "Contract", "Internship"]),
  title: z.string().min(1, "Please add a job title"),
  description: z
    .string()
    .min(30, "Description must be at least 30 characters long"),
  salary: z.string().min(1, "Please select a salary"),
  location: z.string().min(1, "Please add a location")
});

export type JobFormFields = z.infer<typeof jobSchema>;