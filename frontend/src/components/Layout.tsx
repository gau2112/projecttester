import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, User, LogIn, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from './Button';

interface LayoutProps {
    children: ReactNode;
    isAuthenticated?: boolean;
}

export function Layout({ children, isAuthenticated = false }: LayoutProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    const isAuthPage = ['/login', '/register'].includes(location.pathname);

    if (isAuthPage) {
        return <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4">{children}</main>;
    }

    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                    <Link to="/" className="flex items-center space-x-2">
                        <div className="p-2 bg-indigo-600 rounded-lg">
                            <BookOpen className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
                            Samriddhi
                        </span>
                    </Link>

                    <div className="hidden md:flex items-center space-x-6">
                        <Link to="/" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">
                            Home
                        </Link>
                        <Link to="/features" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">
                            Features
                        </Link>
                        <Link to="/pricing" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">
                            Pricing
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-4">
                        {isAuthenticated ? (
                            <Button variant="ghost" size="sm" className="gap-2">
                                <User className="h-4 w-4" />
                                Profile
                            </Button>
                        ) : (
                            <>
                                <Link to="/login">
                                    <Button variant="ghost" size="sm">
                                        Log in
                                    </Button>
                                </Link>
                                <Link to="/register">
                                    <Button size="sm">
                                        Get Started
                                    </Button>
                                </Link>
                            </>
                        )}
                    </div>

                    <button
                        className="md:hidden p-2 text-slate-600"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-4">
                        <Link to="/" className="block text-sm font-medium text-slate-600">
                            Home
                        </Link>
                        <Link to="/features" className="block text-sm font-medium text-slate-600">
                            Features
                        </Link>
                        <hr className="border-slate-100" />
                        <div className="flex flex-col space-y-2">
                            <Link to="/login">
                                <Button variant="outline" className="w-full justify-start">
                                    Log in
                                </Button>
                            </Link>
                            <Link to="/register">
                                <Button className="w-full justify-start">
                                    Get Started
                                </Button>
                            </Link>
                        </div>
                    </div>
                )}
            </nav>

            <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {children}
            </main>

            <footer className="border-t border-slate-200 bg-white py-8 mt-auto">
                <div className="mx-auto max-w-7xl px-4 text-center text-sm text-slate-500">
                    © {new Date().getFullYear()} Samriddhi Learning Platform. All rights reserved.
                </div>
            </footer>
        </div>
    );
}
