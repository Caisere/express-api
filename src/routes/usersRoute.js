import express from 'express'
import { deleteUser, getAllUsers, getIndividualUser } from '../controllers/usersController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'
import { requireRole } from '../middleware/requireRole.js'


const router = express.Router()

//Middlewares
router.use(authMiddleware)
router.use(requireRole("Admin", "Super_Admin"))


// Routes
router.get('/', getAllUsers)

router.get('/:id', getIndividualUser)

router.delete('/:id', deleteUser)


export default router;