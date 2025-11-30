import { Router } from "express";

import authRoutes from "./modules/auth/auth.routes.js";
import patientRoutes from "./modules/patients/patients.routes.js";
import appointmentsRoutes from "./modules/appointments/appointments.routes.js";
import interviewRoutes from "./modules/interviews/interview.routes.js";
import observationRoutes from "./modules/observations/observations.routes.js";
import simpleRoutes from "./modules/simple/simple.routes.js";
import statsRoutes from "./modules/stats/stats.routes.js";
import uploadRoutes from "./modules/upload/upload.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/patients", patientRoutes);
router.use("/appointments", appointmentsRoutes);
router.use("/interviews", interviewRoutes);
router.use("/observations", observationRoutes);
router.use("/simple", simpleRoutes);
router.use("/stats", statsRoutes);
router.use("/upload", uploadRoutes);

export default router;
