import { Request, Response } from 'express';
import { generateQuestions } from '../services/aiService';

export const generateAIQuestions = async (req: Request, res: Response) => {
    try {
        const { subject, level, count } = req.body;

        if (!subject) {
            return res.status(400).json({ message: 'Subject is required' });
        }

        const questions = await generateQuestions(subject, level, count);

        res.json({
            message: `Successfully generated ${questions.length} questions for ${subject}`,
            questions
        });
    } catch (error: any) {
        console.error('AI Controller error:', error);
        res.status(500).json({
            message: 'Failed to generate questions with AI',
            error: error.message
        });
    }
};
