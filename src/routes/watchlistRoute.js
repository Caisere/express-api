import express from 'express'

// the controller functions imports
import { addToWatchlist, getUsersWatchlist, getWatchedListByUser, removeFromWatchlist, updateWatchlistItem } from '../controllers/watchlistController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'
import { validateRequest } from '../middleware/validateRequest.js'
import { addToWatchlistSchema, updateWatchlistSchema } from '../validators/watchlistValidator.js'
import { validateUUIDMiddleware } from '../middleware/validateUUIDMiddleware.js'


const router = express.Router()

// this is going to run before these routes
router.use(authMiddleware)


// get user watchlist
router.get('/', getUsersWatchlist)

// get user watched movies and its information
router.get('/:id', validateUUIDMiddleware('id'), getWatchedListByUser)

// add watch movie route 
router.post('/', validateRequest(addToWatchlistSchema), addToWatchlist)

// delete movie from watch list route 
router.put('/:id', validateRequest(updateWatchlistSchema), updateWatchlistItem) // get the id from the request params

// delete movie from watch list route 
router.delete('/:id', removeFromWatchlist) // get the id from the request params



export default router;