// Importing required modules
import path from "path"; // Node.js module to handle file paths
import multer from "multer"; // Middleware for handling multipart/form-data (file uploads)
import express from "express"; // Express framework for Node.js

// Create an Express router instance
const router = express.Router();

/**
 * Configure storage for Multer:
 * - destination: directory to save uploaded files
 * - filename: custom naming format using fieldname and timestamp
 */
const storage = multer.diskStorage({
  // Set upload destination folder
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Files will be saved in 'uploads' directory
  },

  // Set custom file name: <fieldname>-<timestamp>.<original extension>
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

/**
 * Function to filter allowed file types (only jpeg, jpg, png).
 * It checks both the file extension and MIME type.
 */
const checkFileType = (req, file, cb) => {
  // Allowed file types
  const filetypes = /jpeg|jpg|png/;

  // Check file extension and MIME type
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  // If both match, accept the file; otherwise, return an error
  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Error: File upload only supports images of type: jpeg, jpg, png");
  }
};

// Configure Multer with custom storage and file filter
const upload = multer({ storage, fileFilter: checkFileType });

/**
 * Route: POST /upload
 * - Uploads a single image file with field name 'image'
 * - Responds with the path to the uploaded image
 */
router.post("/", upload.single("image"), (req, res) => {
  // Respond with JSON containing the file URL
  res.json({ imageUrl: `/uploads/${req.file.filename}` });
});

// Export the router to be used in other parts of the app
export default router;
