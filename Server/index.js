import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import userauth from "./routes/userAuth.js";
import urlroute from "./routes/urlRoute.js"
import url from "./Model/urlModel.js"
// ES module import

dotenv.config();

const app = express();

// Middleware
app.use(
  cors({
   
    origin: "*", // explicit origin for credentials
    credentials: true
  })
);
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/user", userauth);
app.use("/url", urlroute);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Start server

app.get('/:id', async (req, res) => {
  try {
    const shortId = req.params.id;

    // Find the URL entry by shortId
    const entry = await url.findOneAndUpdate(
      { shortedURL: shortId },
      { $inc: { clicks: 1 } },
    { new: true }
    );

    if (!entry) {
      return res.status(404).send('Short URL not found');
    }

    // Redirect to the original URL
    res.redirect(entry.originalUrl);

  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
