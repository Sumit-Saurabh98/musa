import { Request, Response } from "express";

// ✅ Upload File Controller
export const uploadFile = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ error: "No file uploaded" });
      return;
    }

    const fileUrl = req.file.path; // Cloudinary URL

    res.status(201).json({ message: "File uploaded successfully", fileUrl });
    return;
  } catch (error) {
    res.status(500).json({ error: "File upload failed" });
    return
  }
};
