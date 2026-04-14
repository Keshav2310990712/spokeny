import express from 'express';
import { registerUser, authUser, getUserProfile, updateProgress } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', authUser);
router.get('/profile', protect, getUserProfile);
router.put('/progress', protect, updateProgress);

export default router;
