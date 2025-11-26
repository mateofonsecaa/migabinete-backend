import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

// Para obtener __dirname en ESModules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Subir a /src/uploads siempre relativo
const uploadFolder = path.join(__dirname, "../../uploads");

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
        const name = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
        cb(null, name);
    }
});

const upload = multer({ storage });
export default upload;
