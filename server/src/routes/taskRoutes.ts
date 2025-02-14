import express from "express";
import { createTask, getTasksByProject, updateTaskStatus, deleteTask, assignTask } from "../controllers/taskControllers";
import { isAuthenticated } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/", isAuthenticated, createTask);
router.get("/:projectId", isAuthenticated, getTasksByProject);
router.put("/:taskId", isAuthenticated, updateTaskStatus);
router.delete("/:taskId", isAuthenticated, deleteTask);
router.post("/:id/assign", isAuthenticated, assignTask);

export default router;
