import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/Card';

export function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        class: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            navigate('/dashboard');
        }, 1500);
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
                    <CardTitle className="text-3xl">Create an account</CardTitle>
                    <CardDescription className="text-base">
                        Start your learning journey today
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        <Input
                            label="Full Name"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                label="Class/Grade"
                                placeholder="10th"
                                value={formData.class}
                                onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                                required
                            />
                            <Input
                                label="Section (Optional)"
                                placeholder="A"
                            />
                        </div>
                        <Input
                            label="Email"
                            type="email"
                            placeholder="student@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                        <Input
                            label="Password"
                            type="password"
                            placeholder="Create a strong password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                        />
                    </CardContent>
                    <CardFooter className="flex-col space-y-4">
                        <Button type="submit" className="w-full" size="lg" isLoading={isLoading}>
                            Create account
                        </Button>
                        <p className="text-center text-sm text-slate-500">
                            Already have an account?{' '}
                            <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors">
                                Sign in
                            </Link>
                        </p>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
