import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";

dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Define a custom Params type
interface CustomParams {
  folder: string;
  allowed_formats: string[];
}

// Configure Multer Storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "project-files" as string, // Ensure folder is recognized
    allowed_formats: ["jpg", "png", "pdf", "docx", "mp4"],
  } as CustomParams, // Cast to CustomParams
});

const upload = multer({ storage });

export default upload;
