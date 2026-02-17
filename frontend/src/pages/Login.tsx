import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/Card';

import { useAuth } from '../context/AuthContext';

export function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            login(data.user, data.token);
            navigate('/dashboard');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md animate-in fade-in zoom-in-95 duration-500">
            <div className="flex justify-center mb-8">
                <div className="p-3 bg-indigo-600 rounded-2xl shadow-xl shadow-indigo-200">
                    <BookOpen className="h-8 w-8 text-white" />
                </div>
            </div>

            <Card>
                <CardHeader className="text-center space-y-2">
                    <CardTitle className="text-3xl">Welcome back</CardTitle>
                    <CardDescription className="text-base">
                        Enter your credentials to access your account
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        {error && (
                            <div className="p-3 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100 italic">
                                {error}
                            </div>
                        )}
                        <Input
                            label="Email"
                            type="email"
                            placeholder="student@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <Input
                            label="Password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <div className="flex justify-end">
                            <Link to="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                Forgot password?
                            </Link>
                        </div>
                    </CardContent>
                    <CardFooter className="flex-col space-y-4">
                        <Button type="submit" className="w-full" size="lg" isLoading={isLoading}>
                            Sign in
                        </Button>
                        <p className="text-center text-sm text-slate-500">
                            Don't have an account?{' '}
                            <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors">
                                Sign up
                            </Link>
                        </p>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
