import { Request, Response } from "express";
import prisma from "../config/db";

export const getProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, email: true },
    });

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user;
    const { name, email } = req.body;

    const user = await prisma.user.update({
      where: { id: userId },
      data: { name, email },
    });

    res.json({ message: "Profile updated successfully", user });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user;

    await prisma.user.delete({ where: { id: userId } });

    res.clearCookie("token");
    res.json({ message: "Account deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
