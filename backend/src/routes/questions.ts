import { Router } from 'express';
import { getQuestionsBySubject, getAllQuestions } from '../controllers/questionController';
import { generateAIQuestions } from '../controllers/aiController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

// Public routes (if needed) or protected
router.get('/', getAllQuestions);
router.get('/:subjectId', getQuestionsBySubject);

// AI Generation Route (Should be protected in production)
router.post('/generate', generateAIQuestions);

export default router;
