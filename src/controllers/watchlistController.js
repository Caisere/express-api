import { prisma } from "../config/db.js";

const addToWatchlist = async (req, res) => {
    try {
        const {movieId, status, rating, note} = req.body;

        // verify movie exist in movies table 
        const movie = await prisma.movie.findUnique({
            where: {
                id: movieId
            }
        })

        // return movie not found error
        if(!movie) {
            return res.status(404).json({
                error: 'Movie not found!'
            })
        }

        // check if movie already added to the user watchlist
        const existInWatchlist = await prisma.watchlistItem.findUnique({
            where: {
                userId_movieId: {
                    userId: req.user.id,
                    movieId: movieId
                }
            }
        })

        if(existInWatchlist) {
            return res.status(400).json({
                error: 'Movie already in the watchlist!'
            })
        }

        // create the watchlistitem 
        const washliistItem = await prisma.watchlistItem.create({
            data: {
                userId: req.user.id,
                movieId,
                status: status || "PLANNED",
                rating,
                note
            }
        })

        
        return res.status(201).json({
            message: 'Movie successfully added!',
            data: washliistItem
        })
    } catch(err) {
        console.error(err)
        return res.status(500).json({
            error: "Internal server error. Please try again!",
            message: process.env.NODE_ENV === 'development' ? err.message : undefined,

        })
    }
}

const removeFromWatchlist = async (req, res) => {

}

export {addToWatchlist, removeFromWatchlist}