// middleware to handle file uploads

import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// configure the storage to store the uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const destinationPath = file.mimetype.startsWith("image/")
          ? "../uploads/thumbnails"
          : "../uploads/books";
        cb(null, path.join(__dirname, destinationPath));
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

// ensure only pdfs are uploaded
function fileFilter(req, file, cb) {
    if (
      file.mimetype === "application/pdf" ||
      file.mimetype.startsWith("image/")
    ) {
        cb(null, true);
    } else {
        cb(new Error("Only PDF or image files are allowed"), false);
    }
}

const upload = multer({ storage, fileFilter }).fields([
  { name: "file", maxCount: 1 }, // PDF file
  { name: "thumbnail", maxCount: 1 },
]);

// Export middleware
export default function uploadMiddleware(req, res, next) {
    console.log("Request file:", req.file);
    upload(req, res, (err) => {
        if (err) {
            console.error("Multer error:", err.message);
            return res.status(400).json({ message: err.message });
        }
        console.log("Request body:", req.body);
        console.log("Uploaded files:", req.files);
        next();
    });
}