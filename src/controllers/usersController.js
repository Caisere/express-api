import { prisma } from "../config/db.js"
import { env } from "../validators/envValidation.js";

const getAllUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true
            },
        })

        return res.status(200).json({
            message: "All valid users",
            allValidUsers: users,
            total: users.length
        })

    } catch (error) {
        console.error("Registration error:", error);
        return res.status(500).json({
            error: "Internal server error. Please try again later.",
            message: env.NODE_ENV === "development" ? error.message : undefined,
        });
    }
}

const getIndividualUser = async (req, res) => {
    try {
        const userId = req.params.id;
    
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })
    
        if (!user) {
            res.status(400).json({
                message: `No user found with the provided Id ${userId}` 
            })
        }
    
        res.status(201).json({
            message: `User found for user-id: ${user.id}`,
            user: user
        })
    } catch (error) {
        console.error("Registration error:", error);
        return res.status(500).json({
            error: "Internal server error. Please try again later.",
            message: env.NODE_ENV === "development" ? error.message : undefined,
        });
    }
}

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id

        // check if the user in the user's table
        const existUser = await prisma.user.findUnique({
            where: {
                id: userId
            }
        }) 
    
        if(!existUser) {
            return res.status(404).json({
                error: "User not found"
            })
        }

        await prisma.user.delete({
            where: {
                id: userId
            }
        })

        res.status(200).json({
            status: "success",
            message: "User Successfully Deleted",
            performedBy: req.user.name
        })
        
    } catch (error) {
        console.error("Registration error:", error);
        return res.status(500).json({
            error: "Internal server error. Please try again later.",
            message: env.NODE_ENV === "development" ? error.message : undefined,
        });
    }
}

export {getAllUsers, getIndividualUser, deleteUser}