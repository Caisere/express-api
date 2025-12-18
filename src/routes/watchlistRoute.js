import express from 'express'

// the controller functions imports
import { addToWatchlist } from '../controllers/watchlistController.js'


const router = express.Router()

// register route
router.post('/', addToWatchlist)

// login route
// router.post('/login', login)

// logout route
// router.post('/logout', logout)


export default router;