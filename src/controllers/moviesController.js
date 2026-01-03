import { prisma } from "../config/db.js"
import { env } from "../validators/envValidation.js"
import { CreateMovieSchema } from "../validators/movieValidation.js"


const createMovie = async (req, res) => {
    try {
        const data = CreateMovieSchema.parse(req.body)
        
        const movieExist = await prisma.movie.findFirst({
            where: {
                title: data.title,
                releaseYear: data.releaseYear
            }
        })

        if (movieExist) {
            return res.status(400).json({
                error: 'Movie already exist'
            })
        }

        const createdMovie = await prisma.movie.create({
            data: {
                ...data,
                createdBy: req.user.id
            }
        })
        return res.status(200).json({
            message: "Movie successfully created",
            data: createdMovie
        })

    } catch(err) {
        console.error(err)
        return res.status(500).json({
            error: "Internal server error. Please try again",
            message: env.NODE_ENV === 'development' ? err.message : undefined
        })
    }
}

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

export {getAllMovies, getMovieById, createMovie}