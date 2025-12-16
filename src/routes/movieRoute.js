import express from 'express'

// creating a route, we use the .router() function
const router = express.Router()

router.get("/", (req, res) => {
    return res.json({
        message: 'This request is comming from the Movie Route',
    })
})

router.post("/", (req, res) => {
    const data = req.body()
    return res.json({
        data
    })
})




export default router;

