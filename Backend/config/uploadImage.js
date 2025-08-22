// config/uploadImage.js
import multer from "multer";
import path from "path";

// Storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

// File filter to allow only images
const fileFilter = (req, file, cb) => {
  const allowed = ["image/jpeg", "image/png", "image/jpg", "image/gif"];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed"), false);
  }
};

// Multer instance (not .single yet)
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
});

export default upload;
