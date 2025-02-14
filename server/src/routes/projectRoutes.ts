import express from "express";
import { createProject, getProjects, getProject, deleteProject, updateProject } from "../controllers/projectControllers";
import { isAuthenticated } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/", isAuthenticated, createProject);
router.get("/", isAuthenticated, getProjects);
router.get("/:projectId", isAuthenticated, getProject);
router.put("/:projectId", isAuthenticated, updateProject);
router.delete("/:projectId", isAuthenticated, deleteProject);

export default router;
