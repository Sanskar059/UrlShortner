import express from "express";
import { getUrls, handleGenerateshorturl } from "../controler/urlcontroller.js";
import { auth } from "../middleware/auth.js";
import { verifyUser } from "../middleware/verifyuser.js";

const router = express.Router();

router.post("/",verifyUser, handleGenerateshorturl);
router.get("/my-urls", verifyUser , getUrls);

export default router;
