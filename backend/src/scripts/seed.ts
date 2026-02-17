import fs from 'fs';
import path from 'path';
import { supabase } from '../lib/supabase';
import dotenv from 'dotenv';

dotenv.config();

const seed = async () => {
    console.log('🚀 Starting database seeding...');

    try {
        const filePath = path.join(__dirname, '../data/questions.json');
        const fileData = fs.readFileSync(filePath, 'utf8');
        const questions = JSON.parse(fileData);

        console.log(`📦 Found ${questions.length} questions in JSON. Preparing to insert...`);

        const { data, error } = await supabase
            .from('questions')
            .insert(questions)
            .select();

        if (error) {
            console.error('❌ Error during insertion:', error.message);
            process.exit(1);
        }

        console.log(`✅ Successfully seeded ${data.length} questions into the database!`);
        process.exit(0);
    } catch (error: any) {
        console.error('❌ Unexpected error:', error.message);
        process.exit(1);
    }
};

seed();
