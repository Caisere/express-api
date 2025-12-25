import express from 'express'

// the controller functions imports
import {login, logout, register} from '../controllers/authController.js'
import { validateRequest } from '../middleware/validateRequest.js'
import { loginSchema, registerSchema } from '../validators/authValidation.js'


const router = express.Router()

// register route
router.post('/register', validateRequest(registerSchema),register)

// login route
router.post('/login', validateRequest(loginSchema),login)

// logout route
router.post('/logout', logout)


export default router;