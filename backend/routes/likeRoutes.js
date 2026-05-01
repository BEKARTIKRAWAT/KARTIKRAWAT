import express from "express";
import { getLikes, toggleLike } from "../controllers/likeController.js";

const router = express.Router();

router.get("/", getLikes);
router.post("/:projectId", toggleLike);

export default router;