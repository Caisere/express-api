import { prisma } from "../config/db.js";
import { env } from "../validators/envValidation.js";

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
        const watchlistItem = await prisma.watchlistItem.create({
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
            data: watchlistItem
        })
        
    } catch(err) {
        console.error(err)
        return res.status(500).json({
            error: "Internal server error. Please try again!",
            message: env.NODE_ENV === 'development' ? err.message : undefined,

        })
    }
}

// update the watchlist item 
const updateWatchlistItem = async (req, res) => {
    try {
        const {status, rating, note} = req.body
        const itemId = req.params.id

        // check watchlist item and verify the ownership before updating
        // check if the movie in the watchlist
        const watchlistItem = await prisma.watchlistItem.findUnique({
            where: {
                id: itemId
            }
        }) 

        if(!watchlistItem) {
            return res.status(404).json({
                error: "Watchlist item not found"
            })
        }

        // ensure only user can update item
        if(watchlistItem.userId !== req.user.id) {
            return res.status(404).json({
                error: "Not allowed to update this watchlist item"
            })
        }

        const updateData = {}

        if(status !== undefined) updateData.status = status.toUpperCase();
        if(rating !== undefined) updateData.rating = rating;
        if(note !== undefined) updateData.note = note;

        //update watchlist item
        const updatedItem = await prisma.watchlistItem.update({
            where: {
                id: itemId
            },
            data: updateData
        })

        res.status(200).json({
            status: "success",
            data: {
                watchlistItem: updatedItem // send current updated data with response
            }
        })

    } catch(err) {
        console.error(err)
        return res.status(500).json({
            error: "Internal server error. Please try again!",
            message: env.NODE_ENV === 'development' ? err.message : undefined,
        })
    }
}


const removeFromWatchlist = async (req, res) => {
    try {
        const id = req.params.id

        // check if the movie in the watchlist
        const watchlistItem = await prisma.watchlistItem.findUnique({
            where: {
                id: id
            }
        }) 
    
        if(!watchlistItem) {
            return res.status(404).json({
                error: "Watchlist item not found"
            })
        }
    
        // ensure only user can delete
        if(watchlistItem.userId !== req.user.id) {
            return res.status(404).json({
                error: "Not allowed to delete this watchlist item"
            })
        }
    
        await prisma.watchlistItem.delete({
            where: {
                id: id
            }
        })
    
        res.status(200).json({
            status: "success",
            message: "Movie removed from watchlist"
        })

    } catch (err) {
        console.error(err)
        return res.status(500).json({
            error: "Internal server error. Please try again!",
            message: env.NODE_ENV === 'development' ? err.message : undefined,
        })
    }
}

export {addToWatchlist, updateWatchlistItem,removeFromWatchlist}