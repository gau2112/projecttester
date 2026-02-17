import { Link } from 'react-router-dom';
import { ArrowRight, Brain, Target, Zap } from 'lucide-react';
import { Button } from '../components/Button';

export function Home() {
    return (
        <div className="space-y-20 pb-20">
            {/* Hero Section */}
            <section className="text-center space-y-6 pt-10 sm:pt-20">
                <div className="inline-flex items-center rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-800 mb-4">
                    <span className="flex h-2 w-2 rounded-full bg-indigo-600 mr-2"></span>
                    New AI-Powered Learning Assistant
                </div>
                <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
                    Master Your Subjects with <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
                        Intelligent Practice
                    </span>
                </h1>
                <p className="mx-auto max-w-2xl text-lg sm:text-xl text-slate-600">
                    Personalized quizzes, chapter-wise revision, and AI-driven progress tracking
                    designed to help you achieve academic excellence.
                </p>
                <div className="flex justify-center gap-4 pt-4">
                    <Link to="/register">
                        <Button size="lg" className="rounded-full px-8">
                            Start Learning Now <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </Link>
                    <Link to="/quiz/demo">
                        <Button variant="secondary" size="lg" className="rounded-full px-8">
                            Try Demo Quiz
                        </Button>
                    </Link>
                    <Link to="/features">
                        <Button variant="outline" size="lg" className="rounded-full px-8">
                            Explore Features
                        </Button>
                    </Link>
                </div>
            </section>

            {/* Features Grid */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    {
                        icon: Target,
                        title: "Focused Revision",
                        desc: "Select specific subjects and chapters to target your weak areas efficiently."
                    },
                    {
                        icon: Brain,
                        title: "AI Adaptive",
                        desc: "Questions that adapt to your skill level, ensuring you're always challenged."
                    },
                    {
                        icon: Zap,
                        title: "Instant Feedback",
                        desc: "Get detailed explanations and performance analytics immediately after each quiz."
                    }
                ].map((feature, i) => (
                    <div key={i} className="group p-8 rounded-2xl bg-white border border-slate-200 hover:border-indigo-100 hover:shadow-lg transition-all duration-300">
                        <div className="h-12 w-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-6 text-indigo-600 group-hover:scale-110 transition-transform">
                            <feature.icon className="h-6 w-6" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                        <p className="text-slate-600 leading-relaxed">
                            {feature.desc}
                        </p>
                    </div>
                ))}
            </section>
        </div>
    );
}
