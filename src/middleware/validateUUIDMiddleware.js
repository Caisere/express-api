import z from "zod"

export const validateUUIDMiddleware = (paramName = 'id') => {
    return (req, res, next) => {
        const movieId = req.params[paramName]
        console.log(movieId)
        const uuidSchema = z.string().uuid();

        if(!uuidSchema.safeParse(movieId)) {
            return res.status(400).json({
                error: `Invalid ${paramName} format. Must be a valid UUID.`
            });
        }
        
        next()
    }
}