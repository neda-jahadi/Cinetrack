import { z } from "zod";

const addMovieSchema = z.object({
    title: z.string().min(1, "Title is required"),
    overview: z.string().optional(),
    releaseYear: z.coerce
    .number()
    .int("Release year must be an integer")
    .min(1888, "Release year is too old")
    .max(new Date().getFullYear() + 5, "Release year is too far in the future"),
    genres: z.array(z.string()).default([]),
    runtime: z.coerce.number().int("Runtime must be an integer")
    .positive("Runtime must be positive")
    .optional(),
    posterUrl:  z.string().url("Poster URL must be a valid URL").optional(),
});


export { addMovieSchema };