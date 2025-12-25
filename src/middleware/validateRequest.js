export const validateRequest = (schema) => {
    return (req, res, next) => {
        const result = schema.safeParse(req.body);

        if (!result.success) {
            const formatted = result.error.format();

            const flatErrors = Object.values(formatted).flat().filter(Boolean).flatMap(err => err._errors);

            return res.status(400).json({
                message: flatErrors.join(", ")
            })
        }

        next()
    }
}