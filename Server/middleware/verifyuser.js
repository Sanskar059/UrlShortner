import jwt from "jsonwebtoken";

export const verifyUser = (req, res, next) => {
    const token = req.cookies.token; // assuming cookie-parser is used

    if (!token) {
        return res.status(401).send("Unauthorized");
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id; // <--- this is your user._id
        next();
    } catch (err) {
        res.status(401).send("Invalid token");
    }
};
