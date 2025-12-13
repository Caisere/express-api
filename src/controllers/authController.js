const register = async (req, res) => {
    const {name, email, password} = req.body;
    return res.json({
        name: name,
        email: email,
        passowrd: password
    })
}

export {register}