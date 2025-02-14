import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt";
import prisma from "../config/db";
import { registerSchema, loginSchema } from "../utils/validation";

export const register = async (req: Request, res: Response): Promise<void> => {
  const validation = registerSchema.safeParse(req.body);
  if (!validation.success) {
    res.status(400).json({ error: validation.error.errors });
    return;
  }

  const { name, email, password } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      res.status(400).json({ error: "User already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword, provider: "local" },
    });

    const token = generateToken(user.id);
    res.cookie("token", token, { httpOnly: true, secure: false });

    res
      .status(201)
      .json({ message: "User registered successfully", user, token });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    console.error(error);
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const validation = loginSchema.safeParse(req.body);
  if (!validation.success) {
    res.status(400).json({ error: validation.error.errors });
    return;
  }

  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (
      !user ||
      !user.password ||
      !(await bcrypt.compare(password, user.password))
    ) {
      res.status(400).json({ error: "Invalid credentials" });
      return;
    }

    const token = generateToken(user.id);
    res.cookie("token", token, { httpOnly: true, secure: false });

    res.json({ message: "Login successful", user, token });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    console.error(error);
  }
};

export const logout = (req: Request, res: Response): void => {
  res.clearCookie("token");
  res.json({ message: "Logout successful" });
};
