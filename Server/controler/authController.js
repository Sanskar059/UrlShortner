import User from "../Model/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send("Email already registered");
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save user
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        res.send("Signup successful");
    } catch (err) {
        res.status(500).send(err.message);
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send("Invalid credentials");
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send("Invalid credentials");
        }

        // Create token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

        res
            .cookie("token", token, {
  httpOnly: true,
  sameSite: "none",  // allow cross-site cookie
  secure: process.env.NODE_ENV === "production", // send cookie only over HTTPS in prod
  maxAge: 24 * 60 * 60 * 1000, // 1 day expiration in ms (optional)
})
            .send("Login successful");
    } catch (err) {
        res.status(500).send(err.message);
    }
};
