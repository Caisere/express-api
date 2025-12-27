import { prisma } from "../config/db.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
import { env } from "../validators/envValidation.js";

// User Registration/Sign-up function
const register = async (req, res) => {
    try {
        // Check if request body exists
        if (!req.body) {
            return res.status(400).json({
                error: "Request body is missing. Please send JSON data.",
            });
        }

        const { name, email, password } = req.body;

        // Validate required fields
        if (!name || !email || !password) {
            return res.status(400).json({
                error:
                "Missing required fields. Please provide name, email, and password.",
            });
        }

        // check is user already exist
        const userExists = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });

        // if user already exist, return user already exist error
        if (userExists) {
            return res.status(400).json({
                error: "User already exist with this email",
            });
        }

        // hash user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // add user to table
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword, 
            },
        });

        // generate jwt token
        const token = generateToken(user.id, res)

        return res.status(201).json({
            success: "User Successful Created",
            data: {
                user: {
                    //   id: user.id,
                    name: name,
                    email: email,
                },
                token
            },
        });

    } catch (error) {
        console.error("Registration error:", error);
        return res.status(500).json({
            error: "Internal server error. Please try again later.",
            message: env.NODE_ENV === "development" ? error.message : undefined,
        });
    }
};

// Login Function
const login = async (req, res) => {
    try {
        // check if request body exists
        if(!req.body) {
            return res.status(400).json({
                error: "Request body is missing. Please send valid data."
            })
        }

        const {email, password} = req.body

        // validate required fields
        if (!email || !password) {
            return res.status(400).json({
                error: "Invalid Email or Password. Please provide a valid email and password."
            });
        }

        // check if user email exist in DB
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });

        // if no user exist, return user already exist error
        if (!user) {
            return res.status(401).json({
                error: "Invalid email or password"
            });
        }

        // Verify Password - compare provided password and user's DB hashedPassword
        const isPasswordValid = await bcrypt.compare(password, user.password)


        if (!isPasswordValid) {
            return res.status(401).json({
                error: "Invalid email or password"
            });
        }

        // generate jwt token
        const token = generateToken(user.id, res)
        
        return res.status(200).json({
            statusCode: 200,
            success: "user successfully logged in",
            data: {
                user: {
                    id: user.id,
                    email: email,
                    role: user.role
                },
                token
            }
        })

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({
            error: "Internal server error. Please try again later.",
            message: env.NODE_ENV === "development" ? error.message : undefined,
        });
    }
}

const logout = async (req, res) => {
    try {
        res.cookie('jwt', "", {
            httpOnly: true,
            expires: new Date(0)
        })
        
        return res.status(200).json({
            status: "success",
            message: "Logged out successfully"
        })

    } catch(error) {
        console.error("Login error:", error);
        return res.status(500).json({
            error: "Internal server error. Please try again later.",
            message: process.env.NODE_ENV === "development" ? error.message : undefined,
        });
    }
}


export { register, login, logout };

