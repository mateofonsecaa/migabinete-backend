import multer from "multer";
import path from "path";
import fs from "fs";

// Carpeta absoluta correcta: backend/src/uploads
const uploadFolder = path.join(process.cwd(), "src/uploads");

// Crear carpeta si no existe
if (!fs.existsSync(uploadFolder)) {
    fs.mkdirSync(uploadFolder, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadFolder);
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
        cb(null, uniqueName);
    }
});

const upload = multer({ storage });

export default upload;
