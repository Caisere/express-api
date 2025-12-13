import { prisma } from "../config/db.js";
import bcrypt from "bcryptjs";

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

    return res.status(201).json({
      success: "User Successful Created",
      data: {
        user: {
        //   id: user.id,
          name: name,
          email: email,
        },
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({
      error: "Internal server error. Please try again later.",
      message:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

export { register };
