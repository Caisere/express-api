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

const getMovieById = async (req, res) => {
    try {
        const movieId = req.params.id;

        const movie = await prisma.movie.findUnique({
            where: {
                id: movieId
            }, 
            omit: {
                createdBy: true
            }
        })

        if (!movie) {
            return res.status(404).json({
                error: `Movie not found for ${movieId}. The movie you\'re trying to get is not valid or might have been removed by the creator. Please, try again`
            })
        }
    
        return res.status(200).json({
            message: "Success",
            movie: movie
        })

    } catch(error) {
        console.error(error)
        return res.status(500).json({
            error: "Internal server error. Please try again",
            message: env.NODE_ENV === 'development' ? error.message : undefined
        })
    }
}

export {getAllMovies, getMovieById}