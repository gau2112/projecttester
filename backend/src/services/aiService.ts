import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
import { supabase } from '../lib/supabase';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export const generateQuestions = async (subject: string, level: string = 'medium', count: number = 5) => {
    if (!process.env.GEMINI_API_KEY) {
        throw new Error('GEMINI_API_KEY is not configured in .env');
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Generate ${count} multiple-choice questions for the subject: ${subject}. 
  The difficulty level should be ${level}.
  Return the result ONLY as a JSON array of objects with the following structure:
  [
    {
      "question": "string",
      "options": ["string", "string", "string", "string"],
      "correct_answer": number (0-indexed),
      "explanation": "string"
    }
  ]
  Do not include any other text or markdown formatting outside the JSON array.`;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Clean potential markdown wrap
        const jsonString = text.replace(/```json|```/g, '').trim();
        const questions = JSON.parse(jsonString);

        // Insert into Supabase
        const questionsToInsert = questions.map((q: any) => ({
            ...q,
            subject_id: subject.toLowerCase(),
            level: level
        }));

        const { data, error } = await supabase
            .from('questions')
            .insert(questionsToInsert)
            .select();

        if (error) throw error;

        return data;
    } catch (error: any) {
        console.error('AI Generation error:', error);
        throw error;
    }
};
