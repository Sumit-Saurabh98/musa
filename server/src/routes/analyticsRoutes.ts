import express from "express";
import { getDashboardAnalytics } from "../controllers/analyticsControllers";
import { isAuthenticated } from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/", isAuthenticated, getDashboardAnalytics);

export default router;
