import express from "express";
import { getAllUsers, updateSubscriptionStatus } from "../controllers/adminControllers";
import { isAuthenticated } from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/users", isAuthenticated, getAllUsers);
router.put("/update-subscription", isAuthenticated, updateSubscriptionStatus);

export default router;
