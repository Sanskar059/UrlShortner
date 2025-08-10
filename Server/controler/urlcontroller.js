import shortid from "shortid";
import URL from "../Model/urlModel.js"; // make sure path is correct

export const handleGenerateshorturl = async (req, res) => {
  try {
    const shtid = shortid();
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ msg: "Enter URL first" });
    }

    await URL.create({
      shortedURL: shtid,
      originalUrl: url,
      visitHistory: [], // fixed: you had `totalClick` but schema uses `visitHistory`
      createdBy: req.userId
    });
  
    return res.status(201).json({ shortId: shtid });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Server error" });
  }
};


export const getUrls =  async (req, res) => {
  const urls = await URL.find({ createdBy: req.userId });
 res.json({
  success: true,
  urls
});

;
};


