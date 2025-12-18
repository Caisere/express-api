import { prisma } from "../config/db.js"

const getAllUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                createAt: true
            },
        })

        return res.status(200).json({
            massage: "All valid users",
            allValidUsers: users,
            total: users.length
        })
    } catch (error) {
        console.error("Registration error:", error);
        return res.status(500).json({
            error: "Internal server error. Please try again later.",
            message: process.env.NODE_ENV === "development" ? error.message : undefined,
        });
    }
}

export {getAllUsers}