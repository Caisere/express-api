import jwt from 'jsonwebtoken'
import { env } from '../validators/envValidation.js'

export const generateToken = (userId, res) => {
    const payload = {id: userId}

    if(!env.JWT_SECRET) {
        throw new Error('JWT_SECRET not defined or valid')
    }

    const token = jwt.sign(payload, env.JWT_SECRET, {
        expiresIn: env.JWT_EXPIRES_IN,

    })
    
    res.cookie("jwt", token, {
        httpOnly: true, // browser js no access
        secure: env.NODE_ENV === 'production', //secure in production
        sameSite: 'lax', 
        maxAge: (1000 * 60 * 60 * 24) * 7 // expires in 7days
    })

    // !
    // return token
}