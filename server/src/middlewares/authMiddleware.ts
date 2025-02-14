import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

/**
 * Middleware to check if user is authenticated
 */
export const isAuthenticated = (req: Request, res: Response, next: NextFunction) : void => {
  try {
    // Get token from cookie
    const token = req.cookies.token;
    if (!token){
        res.status(401).json({ error: "Unauthorized" });
        return;
    } 

    // Verify token
    const decoded = verifyToken(token);
    (req as any).user = decoded.userId;

    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};
