export const JOB_SORT = {
    RECENT: "recent",
    SALARY_ASC: "salary_asc",
    SALARY_DESC: "salary_desc",
} as const;

export type JobSort = (typeof JOB_SORT)[keyof typeof JOB_SORT];