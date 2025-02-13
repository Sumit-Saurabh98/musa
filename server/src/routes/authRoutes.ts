import express from "express";
import passport from "../config/passport";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import prisma from "../config/db";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET as string;

// Google OAuth
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    const user = req.user as any;
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });
    res.redirect(`${process.env.FRONTEND_URL}/dashboard?token=${token}`);
  }
);

// Register with Email/Password
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword, provider: "email" },
    });

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });
    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ message: "Error registering user" });
  }
});

// Login with Email/Password
router.post("/login", async (req, res) : Promise<void> => {

    console.log(req.body);
  const { email, password } = req.body;

  

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.password){
        res.status(400).json({ message: "Invalid credentials" });
        return;
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
        res.status(400).json({ message: "Invalid credentials" });
        return;
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });
    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ message: "Error logging in" });
  }
});

router.post("/logout", (req, res) => {
    res.clearCookie("token");
    res.json({ message: "Logged out successfully" });
  });
  

export default router;
