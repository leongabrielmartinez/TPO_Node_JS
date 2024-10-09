import { Router } from "express";
import { songController } from "../controllers/songs.js";
import { verifyAccessToken } from "../middleWare/verifyAccessToken.js";

export const router = Router();



router.get("/", songController.getAll) 
router.get("/s", songController.getByTitle) 
router.post("/", verifyAccessToken, songController.createOne) 
router.patch("/:id", verifyAccessToken, songController.updateOne) 
router.delete("/:id", verifyAccessToken, songController.deleteOne) 