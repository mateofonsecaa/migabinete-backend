import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import routes from "./routes.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

// __dirname para ESModules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ============================================================
   1) PARSERS — DEBEN IR PRIMERO (ANTES DE CORS Y ROUTES)
   ============================================================ */
app.use(express.json({ limit: "15mb" }));
app.use(express.urlencoded({ extended: true, limit: "15mb" }));

/* ============================================================
   2) CORS — CONFIG PRO Y SIMPLE
   ============================================================ */

const allowedOrigins = [
  "http://localhost:3000",
  "http://127.0.0.1:5500",
  "https://migabinete-frontend.onrender.com",
  "https://migabinete.com.ar",
  "https://www.migabinete.com.ar"
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error("No permitido por CORS"));
  },
  credentials: true,
}));

// Preflight global
app.options("*", cors());

/* ============================================================
   3) Seguridad
   ============================================================ */
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

/* ============================================================
   4) Logs HTTP
   ============================================================ */
app.use(morgan("dev"));

/* ============================================================
   5) Archivos estáticos (imagenes)
   ============================================================ */
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* ============================================================
   6) Ruta base
   ============================================================ */
app.get("/", (req, res) => {
  res.json({ message: "🌸 API funcionando correctamente 🌸" });
});

/* ============================================================
   7) Rutas del proyecto
   ============================================================ */
app.use("/api", routes);

/* ============================================================
   8) Error Handler global — CORREGIDO
   ============================================================ */
app.use((err, req, res, next) => {
  console.error("🔥 Error en servidor:", err);

  if (err.message === "No permitido por CORS") {
    return res.status(403).json({ error: "Origen no permitido" });
  }

  const status = err.status || 500;
  res.status(status).json({
    error: err.message || "Error inesperado",
  });
});

export default app;
