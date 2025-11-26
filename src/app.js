import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import routes from "./routes.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

// Necesario para manejar rutas absolutas
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* --- Seguridad --- */
app.use(
    helmet({
        crossOriginResourcePolicy: false, // ← NECESARIO PARA CARGAR IMÁGENES DESDE OTRO DOMINIO
    })
);

/* --- Logs HTTP --- */
app.use(morgan("dev"));

/* --- CORS --- */
/* --- CORS --- */
app.use(cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));


/* --- Parsers --- */
app.use(express.json({ limit: "15mb" }));
app.use(express.urlencoded({ extended: true, limit: "15mb" }));

/* --- Archivos estáticos (imagenes perfil) --- */
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* --- Ruta base --- */
app.get("/", (req, res) => {
    res.json({ message: "🌸 API funcionando correctamente 🌸" });
});

/* --- Rutas del proyecto --- */
app.use("/api", routes);

// --- Manejador global de errores ---
app.use((err, req, res, next) => {
    console.error("🔥 Error en servidor:", err);

    return res.status(400).json({
        error: err.message || "Error inesperado"
    });
});

export default app;
