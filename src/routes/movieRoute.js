import express from 'express'
import { getAllMovies, getMovieById } from '../controllers/moviesController.js'
import { validateUUIDMiddleware } from '../middleware/validateUUIDMiddleware.js'

// creating a route, we use the .router() function
const router = express.Router()

router.get("/", getAllMovies)

router.get('/:id', validateUUIDMiddleware('id'), getMovieById)

router.post("/", (req, res) => {
    const data = req.body
    return res.json({
        data
    })
})




export default router;

