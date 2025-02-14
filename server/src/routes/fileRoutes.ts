import express from "express";
import upload from "../middlewares/fileUpload";
import { isAuthenticated } from "../middlewares/authMiddleware";
import { uploadFile } from "../controllers/fileController";

const router = express.Router();

router.post("/", isAuthenticated, upload.single("file"), uploadFile);

export default router;
