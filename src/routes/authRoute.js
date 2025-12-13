import express from 'express'

// the controller functions imports
import {register} from '../controllers/authController.js'


const router = express.Router()

// register route
router.post('/register', register)

export default router;