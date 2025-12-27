import z from "zod";

export const roleSchema = z.object({
    role: z.enum(["Admin", "Super_Admin"]),
});