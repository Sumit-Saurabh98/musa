import { Request, Response } from "express";
import prisma from "../config/db"; // Ensure Prisma is set up
import { Server } from "socket.io";

let io: Server;
export const setSocketInstance = (socketInstance: Server) => {
  io = socketInstance;
};

// ✅ Create a new task
export const createTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, status, description, projectId } = req.body;

    if (!title || !projectId) {
      res.status(400).json({ error: "Title and Project ID are required" });
      return
    }

    const task = await prisma.task.create({
      data: { title, status: status || "Pending", description, projectId },
    });

    res.status(201).json(task);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// ✅ Get all tasks for a project
export const getTasksByProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const { projectId } = req.params;

    const tasks = await prisma.task.findMany({
      where: { projectId },
    });

    res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// ✅ Update task status
export const updateTaskStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { taskId } = req.params;
    const { status } = req.body;

    const task = await prisma.task.findUnique({ where: { id: taskId } });

    if (!task) {
      res.status(404).json({ error: "Task not found" });
      return
    }

    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: { status },
    });

    // Emit real-time update
    io.to(task.projectId).emit("taskUpdated", task);

    res.json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// ✅ Delete a task
export const deleteTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { taskId } = req.params;

    const task = await prisma.task.findUnique({ where: { id: taskId } });

    if (!task) {
      res.status(404).json({ error: "Task not found" });
      return
    }

    await prisma.task.delete({ where: { id: taskId } });

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// ✅ Assign a task to a user
export const assignTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { assignedToId } = req.body;

    const task = await prisma.task.findUnique({ where: { id } });

    if (!task) {
      res.status(404).json({ error: "Task not found" });
      return
    }

    const updatedTask = await prisma.task.update({
      where: { id },
      data: { assignedToId },
    });

    res.json(updatedTask);
  } catch (error) {
    console.error("Error assigning task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
