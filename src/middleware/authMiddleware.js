import jwt from 'jsonwebtoken'
import {prisma} from '../config/db.js'

// Read token from request, check if token is valid
export const authMiddleware = async (req, res, next) => {
    let token; 

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(" ")[1]
    } else if (req.cookies?.jwt) {
        token = req.cookies.jwt
    }

    if (!token) {
        return res.status(401).json({
            error: 'Not Authorized! Invalid User'
        })
    }

    // verify token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET) // this uses the jwt secret to verify the token. 

        // the decoded comes back with the userId, which was passed to the payload. so we can also use that to verify the user
        const user = await prisma.user.findUnique({
            where: {
                id: decoded.id
            }
        })
        

        if(!user) {
            return res.status(401).json({
                error: 'User no longer exist'
            })
        }

        // add the user object to the req 
        req.user = user
        
        next()
        
    } catch (err) {
        return res.status(401).json({
            error: "Not authorized, token failed"
        })
    }
}