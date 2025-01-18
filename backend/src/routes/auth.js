import express from 'express';
import { checkAuth, login, logout, signup, updateProfile } from '../controllers/authControllers.js';
import { protectRoute } from '../middleware/authMiddleware.js';
import articleController from "../controllers/article.js"
const router = express.Router();


router.post("/signup", signup)
router.post("/login", login)
router.post("/logout", logout)

router.put("/update-profile", protectRoute, updateProfile);
// ^protectRoute is a middleware 
router.get("/news",protectRoute, articleController)
router.get("/check", protectRoute, checkAuth);



export default router;