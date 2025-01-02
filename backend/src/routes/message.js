import express from 'express';
import { getMessages, getUsersForSidebar, sendMessage } from '../controllers/messageController.js';
import { protectRoute } from '../middleware/authMiddleware';
const router = express.Router();

router.get("/user",protectRoute,getUsersForSidebar);

router.get("/:id",protectRoute,getMessages);

router.post("/send",protectRoute,sendMessage)

export default router;