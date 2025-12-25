import z from "zod";


const passwordSchema = z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character");

    
const registerSchema = z.object({
    name: z.string(),
    email: z.email("Input a valid email"),
    password: passwordSchema
})

const loginSchema = z.object({
    email: z.email("Input a valid email"),
    password: passwordSchema
})    


export {loginSchema, registerSchema}