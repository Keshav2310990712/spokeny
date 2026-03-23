import express from 'express';
import { getQuizzesByCourse, createQuiz } from '../controllers/quizController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, admin, createQuiz);
router.route('/:courseId').get(getQuizzesByCourse);

export default router;
