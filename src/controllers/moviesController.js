import { prisma } from "../config/db.js"
import { env } from "../validators/envValidation.js"

const getAllMovies = async (req, res) => {
    try {
        const movies = await prisma.movie.findMany()

        return res.status(200).json({
            message: 'success',
            movies: movies 
        })

    }catch (err) {
        console.error(err)
        return res.status(500).json({
            error: "Internal server error. Please try again",
            message: env.NODE_ENV === 'development' ? err.message : undefined
        })
    }
} 

export {getAllMovies}