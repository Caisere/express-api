import express from 'express'

// creating a route, we use the .router() function
const router = express.Router()

router.get("/", (req, res) => {
    return res.json({
        message: 'This is request is comming from the Movie Route',
    })
})

router.post("/", (req, res) => {
    return res.json({
        
    })
})




export default router;

