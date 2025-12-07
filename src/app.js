import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import routes from "./routes.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

// Necesario para ESModules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ============================================================
   1) CORS PROFESIONAL — FUNCIONA SIEMPRE (Render + Koyeb)
   ============================================================ */
const allowedOrigins = [
  "http://localhost:3000",
  "http://127.0.0.1:5500",
  "https://migabinete-frontend.onrender.com",
  "https://migabinete.com.ar",
  "https://www.migabinete.com.ar"
];

app.use((req, res, next) => {
  const origin = req.headers.origin;

  // Caso 1: origin válido → devolverlo
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  } 
  // Caso 2: requests SIN origin (Chrome, Safari, preflight raro)
  else {
    res.header("Access-Control-Allow-Origin", "https://migabinete-frontend.onrender.com");
  }

  res.header("Vary", "Origin");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Authorization, Content-Type");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

/* ============================================================
   2) Parsers — después de CORS
   ============================================================ */
app.use(express.json({ limit: "15mb" }));
app.use(express.urlencoded({ extended: true, limit: "15mb" }));

/* ============================================================
   3) Seguridad
   ============================================================ */
app.use(
  helmet({
    crossOriginResourcePolicy: false, // Necesario para servir imágenes
  })
);

/* ============================================================
   4) Logs HTTP
   ============================================================ */
app.use(morgan("dev"));

/* ============================================================
   5) Archivos estáticos (para imágenes)
   ============================================================ */
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* ============================================================
   6) Ruta base
   ============================================================ */
app.get("/", (req, res) => {
  res.json({ message: "🌸 API funcionando correctamente 🌸" });
});

/* ============================================================
   7) Rutas de API
   ============================================================ */
app.use("/api", routes);

/* ============================================================
   8) 404 Not Found
   ============================================================ */
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

/* ============================================================
   9) Error Handler Global
   ============================================================ */
app.use((err, req, res, next) => {
  console.error("🔥 Error en servidor:", err);

  if (err.message === "No permitido por CORS") {
    return res.status(403).json({ error: "Origen no permitido" });
  }

  res.status(err.status || 500).json({
    error: err.message || "Error inesperado",
  });
});

export default app;
