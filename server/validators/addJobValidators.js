import { z } from 'zod';

export const addJobSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, 'Title must be at least 2 characters')
    .max(100, 'Title cannot be longer than 100 characters'),

  type: z.enum(['Full_Time', 'Part_Time', 'Contract', 'Internship'], {
    message: 'Invalid job type',
  }),

  description: z
    .string()
    .trim()
    .min(10, 'Description must be at least 10 characters'),

  salary: z.string().trim().min(5, 'Salary must be at least 5 characters'),

  workMode: z.enum(['ONSITE', 'HYBRID', 'REMOTE'], {
    error: () => ({
      message: 'Work mode must be one of: ONSITE, HYBRID, REMOTE',
    }),
  }),
  municipalityId: z.coerce
    .number()
    .int('Municipality is invalid')
    .positive('Municipality is invalid'),
});
