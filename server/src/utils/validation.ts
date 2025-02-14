import { z } from "zod";

export const registerSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });
  
  export const loginSchema = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });
  
  export const projectSchema = z.object({
    name: z.string().min(3, "Project name must be at least 3 characters"),
  });
  
  export const taskSchema = z.object({
    title: z.string().min(3, "Task title must be at least 3 characters"),
    status: z.enum(["To Do", "In Progress", "Done"]),
    projectId: z.string().uuid(),
    assignedToId: z.string().uuid().optional(),
  });
