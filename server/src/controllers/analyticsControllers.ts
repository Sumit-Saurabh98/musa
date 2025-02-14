import { Request, Response } from "express";
import prisma from "../config/db";

/**
 * Get Dashboard Analytics
 */
export const getDashboardAnalytics = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user; // Extract userId from auth middleware

    // Count total projects
    const totalProjects = await prisma.project.count({
      where: { ownerId: userId },
    });

    // Count total tasks
    const totalTasks = await prisma.task.count({
      where: { project: { ownerId: userId } },
    });

    // Count completed tasks
    const completedTasks = await prisma.task.count({
      where: { project: { ownerId: userId }, status: "completed" },
    });

    // Count pending tasks
    const pendingTasks = totalTasks - completedTasks;

    // Fetch team members count
    const teamMembers = await prisma.teamMember.count({
      where: { team: { project: { ownerId: userId } } },
    });

    res.status(200).json({
      totalProjects,
      totalTasks,
      completedTasks,
      pendingTasks,
      teamMembers,
    });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
