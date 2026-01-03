import express from 'express'
import { createMovie, getAllMovies, getMovieById } from '../controllers/moviesController.js'
import { validateUUIDMiddleware } from '../middleware/validateUUIDMiddleware.js'
import { authMiddleware } from '../middleware/authMiddleware.js'
import { requireRole } from '../middleware/requireRole.js'

// creating a route, we use the .router() function
const router = express.Router()

router.get("/", getAllMovies)

router.get('/:id', validateUUIDMiddleware('id'), getMovieById)

router.post("/add", authMiddleware, requireRole('Admin', "Super_Admin"), createMovie)




export default router;

