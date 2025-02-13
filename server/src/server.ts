import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import session from "express-session";

import authRoutes from "./routes/authRoutes";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

app.use(
  session({
    secret: process.env.JWT_SECRET as string,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // Set `true` in production with HTTPS
  })
);

// Test Route
app.get("/", (req, res) => {
  res.send("Social Media Analytics Dashboard Backend Running!");
});

// Routes
app.use("/auth", authRoutes);

// Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
