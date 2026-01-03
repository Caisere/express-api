import z from "zod";

export const uuidSchema = z.string().uuid()


export const CreateMovieSchema = z.object({
    title: z.string(),
    overview: z.string().optional(),
    releaseYear: z.number().int(),
    genres: z.array(z.string()).default([]),
    runtime: z.number().int().optional(),
    posterUrl: z.string().optional(),
})