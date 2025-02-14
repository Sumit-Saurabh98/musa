import express from "express";
import { createCheckoutSession } from "../controllers/paymentControllers";
import { isAuthenticated } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/checkout", isAuthenticated, createCheckoutSession);

export default router;
