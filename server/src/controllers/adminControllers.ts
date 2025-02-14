import { Request, Response } from "express";
import prisma from "../config/db";

/**
 * Get all users (Admin Only)
 */
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Error fetching users" });
  }
};

/**
 * Update Subscription Status (Admin Only)
 */
export const updateSubscriptionStatus = async (req: Request, res: Response) => {
  try {
    const { userId, status } = req.body;

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { subscriptionStatus: status },
    });

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Error updating subscription status" });
  }
};
