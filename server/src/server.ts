import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import session from "express-session";
import http from "http";
import { Server } from "socket.io";

import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import projectRoutes from "./routes/projectRoutes";
import taskRoutes from "./routes/taskRoutes";
import fileRoutes from "./routes/fileRoutes";
import analyticsRoutes from "./routes/analyticsRoutes" 
import adminRoutes from "./routes/adminRoutes";
import paymentRoutes from "./routes/paymentRoutes";
import passport from "passport";

dotenv.config();

const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

const io = new Server(server, {
  cors: { origin: "*" }, // Change this for production security
});

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Store online users
const onlineUsers = new Map();

io.on("connection", (socket) => {
  console.log("⚡ User connected:", socket.id);

  // Handle user joining
  socket.on("joinProject", ({ userId, projectId }) => {
    socket.join(projectId);
    onlineUsers.set(userId, socket.id);
    console.log(`👥 User ${userId} joined project ${projectId}`);
  });

  // Real-time Task Updates
  socket.on("taskUpdated", ({ projectId, task }) => {
    io.to(projectId).emit("taskUpdated", task);
  });

  // Handle user disconnection
  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
    for (const [userId, socketId] of onlineUsers.entries()) {
      if (socketId === socket.id) {
        onlineUsers.delete(userId);
      }
    }
  });
});


// Test Route
app.get("/", (req, res) => {
  res.send("Social Media Analytics Dashboard Backend Running!");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/files", fileRoutes);
app.use("/api/analytics", analyticsRoutes);  
app.use("/api/admin", adminRoutes);
app.use("/api/payment", paymentRoutes);

// Start Server
const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
