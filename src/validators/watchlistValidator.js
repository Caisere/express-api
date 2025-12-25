import {z} from 'zod'


// status, rating, note
const statusSchema = z.
    enum(["PLANNED", "WATCHING", "COMPLETED", "DROPPED"], {
        error: () => {
            message: "Status must be one of: PLANNED, WATCHING, COMPLETED, DROPPED"
        }
    }).
    optional();

const ratingSchema = z.
    coerce.number()
    .int("Rating must be an integer")
    .min(1, "Rating must be between 1 and 10")
    .max(10, 'Rating must be between 1 and 10')
    .optional();

const noteSchema = z
    .string().
    optional()



const addToWatchlistSchema = z.object({
    movieId: z.string().uuid(),
    status: statusSchema,
    rating: ratingSchema,
    note: noteSchema,
})

const updateWatchlistSchema = z.object({
    status: statusSchema,
    rating: ratingSchema,
    note: noteSchema,
})



export {addToWatchlistSchema, updateWatchlistSchema}