import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: "7d"
    })

    res.cookie("authToken",token, {
        maxAge: 7 * 24 * 60 * 60 *1000, //7d
        httpOnly: true,
        sameSite: "none",
        secure: true,
        path: "/",
    });

    return token;
}