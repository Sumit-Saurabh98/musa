import express from "express";
import passport from "../config/passport";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config();
import { login, logout, register } from "../controllers/authControllers";
import { generateToken } from "../utils/jwt";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET as string;

// Google OAuth
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    const user = req.user as any;
    const token = generateToken(user.id);

    res.cookie("token", token, { httpOnly: true, secure: false });
    res.redirect(process.env.FRONTEND_URL + '/dashboard');
  }
);

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout)
  

export default router;