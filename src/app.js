import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import routes from "./routes.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

// Necesario para ESModules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ===============================================
   CORS COMPLETO + PREVENTIVO (100% FUNCIONA)
   =============================================== */
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

  res.header("Vary", "Origin");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Authorization, Content-Type");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");

  // 👉 Responder preflight correctamente
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

/* ===============================================
   Parsers
   =============================================== */
app.use(express.json({ limit: "15mb" }));
app.use(express.urlencoded({ extended: true, limit: "15mb" }));

/* ===============================================
   Seguridad
   =============================================== */
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

/* ===============================================
   Logs
   =============================================== */
app.use(morgan("dev"));

/* ===============================================
   Archivos estáticos
   =============================================== */
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* ===============================================
   Ruta base
   =============================================== */
app.get("/", (req, res) => {
  res.json({ message: "API OK" });
});

/* ===============================================
   Rutas
   =============================================== */
app.use("/api", routes);

/* ===============================================
   404
   =============================================== */
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

/* ===============================================
   Error Handler
   =============================================== */
app.use((err, req, res, next) => {
  console.error("🔥 Error:", err);
  res.status(err.status || 500).json({
    error: err.message || "Error inesperado",
  });
});

export default app;
