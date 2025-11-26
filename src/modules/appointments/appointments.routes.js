import { Router } from "express";
import * as controller from "./appointments.controller.js";
import { authenticate } from "../../core/middlewares/authenticate.js";

const router = Router();

// Obtener todos los turnos
router.get("/", authenticate, controller.getAll);

// Obtener tratamientos por paciente
router.get("/patient/:id", authenticate, controller.getByPatient);

// Crear turno
router.post("/", authenticate, controller.create);

// Actualizar turno
router.put("/:id", authenticate, controller.update);

// Eliminar turno
router.delete("/:id", authenticate, controller.remove);

export default router;
