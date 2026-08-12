import { JOB_TYPES, WORK_MODE } from '../constants/job';
import { z } from 'zod';

export const jobSchema = z.object({
  type: z.enum(JOB_TYPES, { message: 'Please select a Job Type' }),
  workMode: z.enum(WORK_MODE, { message: 'Please select a Work Mode' }),
  title: z.string().min(1, 'Please add a job title'),
  description: z
    .string()
    .min(30, 'Description must be at least 30 characters long'),
  salary: z.string().min(1, 'Please select a salary'),
  municipalityId: z.string().min(1, 'Please select a municipality'),
});

export type JobFormFields = z.infer<typeof jobSchema>;
