import { Router } from "express";
import * as controller from "./auth.controller.js";
import verifyToken from "./verifyToken.js";

const router = Router();

router.post("/register", controller.register);
router.post("/login", controller.login);
router.get("/verify/:token", controller.verifyEmail);

router.get("/me", verifyToken, controller.me);

export default router;
