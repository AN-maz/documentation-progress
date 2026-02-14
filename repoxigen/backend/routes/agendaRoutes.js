import express from "express";
import { createAgenda, getAllAgenda } from "../controllers/agendaController.js";
import { submitAbsensi } from "../controllers/absensiController.js";
import { verifyToken, onlyAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", verifyToken,onlyAdmin, createAgenda);
router.get("/", verifyToken, getAllAgenda);

router.post("/absen", verifyToken, submitAbsensi);

export default router;
