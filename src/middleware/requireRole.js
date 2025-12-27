
const requireRole = (...allowedRoles) => {
    return (req, res, next) => {

        if(!allowedRoles.includes(req.user.role)){
            res.json({message: "You're not allowed to perform this action"})
        }

        next()
    }
}

export {requireRole}