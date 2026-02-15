import express from "express";
import {
  createAgenda,
  getAllAgenda,
  getParticipants,
} from "../controllers/agendaController.js";
import { submitAbsensi } from "../controllers/absensiController.js";
import { verifyToken, onlyAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", verifyToken, onlyAdmin, createAgenda);
router.get("/", verifyToken, getAllAgenda);

router.post("/absen", verifyToken, submitAbsensi);
router.get("/:id_agenda/participants", verifyToken, onlyAdmin, getParticipants);

export default router;
