import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { supabase } from '../lib/supabase';

const JWT_SECRET = process.env.JWT_SECRET || 'your_fallback_secret';

export const register = async (req: Request, res: Response) => {
    try {
        const { name, email, password, class: userClass } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Check if user already exists
        const { data: existingUser } = await supabase
            .from('users')
            .select('id')
            .eq('email', email)
            .single();

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user
        const { data: newUser, error } = await supabase
            .from('users')
            .insert([
                { name, email, password: hashedPassword, class: userClass }
            ])
            .select()
            .single();

        if (error) throw error;

        // Generate JWT
        const token = jwt.sign({ id: newUser.id }, JWT_SECRET, { expiresIn: '24h' });

        res.status(201).json({
            message: 'User registered successfully',
            token,
            user: { id: newUser.id, name: newUser.name, email: newUser.email }
        });
    } catch (error: any) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Missing email or password' });
        }

        // Find user
        const { data: user, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .single();

        if (error || !user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT
        const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '24h' });

        res.json({
            message: 'Login successful',
            token,
            user: { id: user.id, name: user.name, email: user.email }
        });
    } catch (error: any) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};
