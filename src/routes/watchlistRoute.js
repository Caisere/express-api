import express from 'express'

// the controller functions imports
import { addToWatchlist, removeFromWatchlist } from '../controllers/watchlistController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'


const router = express.Router()

// this is going to run before the route
router.use(authMiddleware)


// add watch movie route 
router.post('/', addToWatchlist)

// delete movie from watch list route 
router.delete('/:id', removeFromWatchlist) // get the id from the request params

// logout route
// router.post('/logout', logout)


export default router;