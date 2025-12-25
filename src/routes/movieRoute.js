import express from 'express'
import { getAllMovies } from '../controllers/moviesController.js'

// creating a route, we use the .router() function
const router = express.Router()

router.get("/", getAllMovies)

router.post("/", (req, res) => {
    const data = req.body
    return res.json({
        data
    })
})




export default router;

