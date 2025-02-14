import { Request, Response } from "express";
import prisma from "../config/db";

// ✅ Create a project
export const createProject = async (req: Request, res: Response) : Promise<void> => {
  try {
    const { name } = req.body;
    const userId = (req as any).user; // Extract from middleware

    if (!name) {
      res.status(400).json({ error: "Project name is required" });
      return
    }

    const project = await prisma.project.create({
      data: { name, ownerId: userId },
    });

    res.status(201).json(project);
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// ✅ Get all projects for the authenticated user
export const getProjects = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user;

    const projects = await prisma.project.findMany({
      where: { ownerId: userId },
      include: { tasks: true }, // Fetch tasks related to the project
    });

    res.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// ✅ Get a single project by ID
export const getProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const { projectId } = req.params;

    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: { tasks: true },
    });

    if (!project) {
      res.status(404).json({ error: "Project not found" });
      return
    }

    res.json(project);
  } catch (error) {
    console.error("Error fetching project:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// ✅ Update a project
export const updateProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const { projectId } = req.params;
    const { name } = req.body;
    const userId = (req as any).user;

    const project = await prisma.project.findUnique({ where: { id: projectId } });

    if (!project) {
      res.status(404).json({ error: "Project not found" });
      return;
    }

    if (project.ownerId !== userId) {
      res.status(403).json({ error: "Unauthorized" });
      return;
    }

    const updatedProject = await prisma.project.update({
      where: { id: projectId },
      data: { name },
    });

    res.json(updatedProject);
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// ✅ Delete a project
export const deleteProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const { projectId } = req.params;
    const userId = (req as any).user;

    const project = await prisma.project.findUnique({ where: { id: projectId } });

    if (!project) {
      res.status(404).json({ error: "Project not found" });
      return;
    }

    if (project.ownerId !== userId) {
      res.status(403).json({ error: "Unauthorized" });
      return;
    }

    await prisma.project.delete({ where: { id: projectId } });

    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
