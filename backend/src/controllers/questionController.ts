import { Request, Response } from 'express';
import { supabase } from '../lib/supabase';

export const getQuestionsBySubject = async (req: Request, res: Response) => {
    try {
        const { subjectId } = req.params;

        if (!subjectId) {
            return res.status(400).json({ message: 'Subject ID is required' });
        }

        const { data: questions, error } = await supabase
            .from('questions')
            .select('*')
            .eq('subject_id', subjectId);

        if (error) {
            throw error;
        }

        res.json(questions);
    } catch (error: any) {
        console.error('Error fetching questions:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

// Add a generic endpoint for all questions or filtered by level
export const getAllQuestions = async (req: Request, res: Response) => {
    try {
        const { level } = req.query;
        let query = supabase.from('questions').select('*');

        if (level) {
            query = query.eq('level', level);
        }

        const { data: questions, error } = await query;

        if (error) throw error;

        res.json(questions);
    } catch (error: any) {
        console.error('Error fetching questions:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};
