export const JOB_SORT = {
  RECENT: 'recent',
  SALARY_ASC: 'salary_asc',
  SALARY_DESC: 'salary_desc',
} as const;

export const JOB_TYPES = [
  'Full_Time',
  'Part_Time',
  'Contract',
  'Internship',
] as const;

export const WORK_MODE = ['ONSITE', 'HYBRID', 'REMOTE'] as const;

export const JOB_TYPES_LABELS = {
  Full_Time: 'Full Time',
  Part_Time: 'Part Time',
  Contract: 'Contract',
  Internship: 'Internship',
} as const;

export const WORK_MODE_LABELS = {
  ONSITE: 'On Site',
  HYBRID: 'Hybrid',
  REMOTE: 'Remote',
} as const;
