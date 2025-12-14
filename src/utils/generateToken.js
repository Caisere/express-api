import jwt from 'jsonwebtoken'

export const generateToken = (userId, res) => {
    const payload = {id: userId}

    if(!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET not defined or valid')
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || "7d",

    })
    
    res.cookie("jwt", token, {
        httpOnly: true, // browser js no access
        secure: process.env.NODE_ENV === 'production', //secure in production
        sameSite: 'strict', 
        maxAge: (1000 * 60 * 60 * 24) * 7 // expires in 7days
    })

    return token
}