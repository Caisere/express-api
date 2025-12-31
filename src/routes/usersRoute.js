import express from 'express'
import { deleteUser, getAllUsers, getIndividualUser } from '../controllers/usersController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'
import { requireRole } from '../middleware/requireRole.js'



const router = express.Router()

router.use(authMiddleware)

/* 
    1. use a middleware to check who's trying to get users. this route should be a protected route between Admin and Super_Admin --- ✔️ 
*/

router.get('/', requireRole("Admin", "Super_Admin"), getAllUsers)

router.get('/:id', requireRole("Admin", "Super_Admin"), getIndividualUser)

router.delete('/:id', requireRole("Admin", "Super_Admin"), deleteUser)

export default router;