import express from "express";
import {
  createAgenda,
  getAllAgenda,
  getParticipants,
  updateAgenda,
  deleteAgenda,
  kickParticipant
} from "../controllers/agendaController.js";
import { submitAbsensi } from "../controllers/absensiController.js";
import { verifyToken, onlyAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", verifyToken, onlyAdmin, createAgenda);
router.get("/", verifyToken, getAllAgenda);
router.put("/:id_agenda", verifyToken, onlyAdmin, updateAgenda);
router.delete("/:id_agenda", verifyToken,onlyAdmin,deleteAgenda);
router.get("/:id_agenda/participants", verifyToken, onlyAdmin, getParticipants);
router.delete("/participants/:id_absensi", verifyToken, onlyAdmin, kickParticipant);


router.post("/absen", verifyToken, submitAbsensi);

export default router;
