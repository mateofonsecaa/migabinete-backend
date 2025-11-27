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

/* --- Logs HTTP --- */
app.use(morgan("dev"));

/* --- CORS GLOBAL --- */
const allowedOrigins = [
  "http://localhost:3000",
  "http://127.0.0.1:5500",
  "https://migabinete-frontend.onrender.com",
  "https://migabinete.com.ar",
  "https://www.migabinete.com.ar"
];

app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }

  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");

  // ⚠️ CLAVE: aceptar preflight ANTES que cualquier middleware
  if (req.method === "OPTIONS") {
    return res.sendStatus(204); 
  }

  next();
});

/* --- Seguridad --- */
app.use(
    helmet({
        crossOriginResourcePolicy: false, // ← NECESARIO PARA CARGAR IMÁGENES DESDE OTRO DOMINIO
    })
);

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
