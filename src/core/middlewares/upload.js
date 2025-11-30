// backend/src/core/middlewares/upload.js
import multer from "multer";

// ⚠️ SUBE A MEMORIA, NO A DISCO
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5 MB máximo
  }
});

export default upload;
