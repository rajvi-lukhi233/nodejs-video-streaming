import path from "path";
import multer from "multer";
import fs from "fs";

const uploadFolder = path.resolve("src/uploads/videos");

// const uploadFolder = "src/uploads/videos";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync(uploadFolder)) {
      fs.mkdirSync(uploadFolder, { recursive: true });
    }
    cb(null, uploadFolder);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

export const upload = multer({ storage });
