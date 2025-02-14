import express from "express";
import { getProfile, updateProfile, deleteUser } from "../controllers/userControllers";
import { isAuthenticated } from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/profile", isAuthenticated, getProfile);
router.put("/profile", isAuthenticated, updateProfile);
router.delete("/delete", isAuthenticated, deleteUser);

export default router;
