import express from "express"
import { getPendingList,approveMember,rejectMember } from "../controllers/adminController.js"
import {verifyToken, onlyAdmin} from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(verifyToken, onlyAdmin);

router.get('/pending', getPendingList);
router.post('/approve', approveMember);
router.post('/reject', rejectMember);

export default router;