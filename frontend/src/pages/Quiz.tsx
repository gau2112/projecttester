import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle2, ChevronRight, XCircle, RefreshCcw, ArrowLeft, Timer } from 'lucide-react';
import { Button } from '../components/Button';
import { Card, CardContent } from '../components/Card';
import clsx from 'clsx';

// Demo questions for users without accounts or for testing
const DEMO_QUESTIONS = [
    {
        id: 101,
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        correctAnswer: 1
    },
    {
        id: 102,
        question: "What is 2 + 2 × 2?",
        options: ["6", "8", "4", "2"],
        correctAnswer: 0
    },
    {
        id: 103,
        question: "Who painted the Mona Lisa?",
        options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
        correctAnswer: 2
    }
];

export function Quiz() {
    const { subjectId } = useParams();
    const navigate = useNavigate();

    const [questions, setQuestions] = useState<any[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [timeLeft, setTimeLeft] = useState(15);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch questions from API
    useEffect(() => {
        const fetchQuestions = async () => {
            if (subjectId === 'demo') {
                setQuestions(DEMO_QUESTIONS);
                setIsLoading(false);
                return;
            }

            try {
                setIsLoading(true);
                const response = await fetch(`http://localhost:5000/api/questions/${subjectId}`);
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || 'Failed to fetch questions');
                }

                if (data.length === 0) {
                    setError('No questions found for this subject.');
                } else {
                    setQuestions(data);
                }
            } catch (err: any) {
                setError(err.message);
                console.error('Fetch error:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchQuestions();
    }, [subjectId]);

    // Capitalize subject ID for display
    const subjectName = subjectId ? subjectId.charAt(0).toUpperCase() + subjectId.slice(1) : 'General';

    const currentQuestion = questions[currentQuestionIndex];

    // Timer Logic
    useEffect(() => {
        if (showResults || isAnswered || isLoading || questions.length === 0) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    handleTimeout();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [currentQuestionIndex, isAnswered, showResults, isLoading, questions.length]);

    // Reset timer when question changes
    useEffect(() => {
        setTimeLeft(15);
    }, [currentQuestionIndex]);

    const handleTimeout = () => {
        setIsAnswered(true);
    };

    const handleOptionSelect = (index: number) => {
        if (isAnswered) return;
        setSelectedOption(index);
    };

    const handleSubmit = () => {
        if (selectedOption === null) return;

        setIsAnswered(true);
        // Map correct_answer from snake_case to camelCase if needed, or stick to backend format
        const isCorrect = selectedOption === currentQuestion.correct_answer;
        if (isCorrect) {
            setScore(score + 1);
        }
    };

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedOption(null);
            setIsAnswered(false);
        } else {
            setShowResults(true);
        }
    };

    const restartQuiz = () => {
        setCurrentQuestionIndex(0);
        setSelectedOption(null);
        setIsAnswered(false);
        setScore(0);
        setShowResults(false);
        setTimeLeft(15);
    };

    if (showResults) {
        const percentage = Math.round((score / questions.length) * 100);

        return (
            <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-500">
                <div className="text-center space-y-4">
                    <div className="inline-flex items-center justify-center p-4 rounded-full bg-indigo-100 text-indigo-600 mb-4">
                        <CheckCircle2 className="h-12 w-12" />
                    </div>
                    <h1 className="text-3xl font-bold text-slate-900">Quiz Completed!</h1>
                    <p className="text-slate-600">You scored {score} out of {questions.length}</p>
                </div>

                <Card className="overflow-hidden">
                    <div className="bg-slate-50 border-b border-slate-200 p-8 text-center">
                        <div className="text-5xl font-black text-indigo-600 mb-2">{percentage}%</div>
                        <div className="text-sm font-medium text-slate-500 uppercase tracking-wider">Accuracy</div>
                    </div>
                    <CardContent className="p-8">
                        <div className="space-y-4">
                            <Button onClick={restartQuiz} className="w-full" size="lg">
                                <RefreshCcw className="mr-2 h-4 w-4" /> Try Again
                            </Button>
                            <Button variant="outline" onClick={() => navigate('/dashboard')} className="w-full" size="lg">
                                Back to Dashboard
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard')} className="gap-2 pl-0">
                    <ArrowLeft className="h-4 w-4" /> Back
                </Button>
                <div className="text-sm font-medium text-slate-500 uppercase tracking-wider">
                    {subjectName} Quiz
                </div>
            </div>

            {isLoading ? (
                <div className="flex flex-col items-center justify-center py-24 space-y-6">
                    <div className="relative">
                        <div className="h-16 w-16 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
                        <RefreshCcw className="h-6 w-6 text-indigo-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                    </div>
                    <p className="text-slate-500 font-medium italic animate-pulse">Fetching your questions...</p>
                </div>
            ) : error ? (
                <div className="max-w-md mx-auto">
                    <Card className="border-red-100 bg-red-50/50">
                        <CardContent className="p-8 text-center space-y-6">
                            <div className="p-4 bg-red-100 text-red-600 rounded-full inline-flex">
                                <XCircle className="h-8 w-8" />
                            </div>
                            <h2 className="text-xl font-bold text-slate-900">
                                {error.includes('No questions') ? 'No Questions Found' : 'Connection Error'}
                            </h2>
                            <p className="text-slate-600 italic">"{error}"</p>
                            <Button variant="outline" onClick={() => navigate('/dashboard')} className="w-full">
                                Back to Dashboard
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            ) : questions.length === 0 ? (
                <div className="text-center py-20">
                    <p className="text-slate-500 italic">No questions available for this subject yet.</p>
                </div>
            ) : (
                <>
                    {/* Progress & Timer */}
                    <div className="grid gap-4">
                        <div className="flex justify-between items-center text-sm font-medium text-slate-600">
                            <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
                            <div className={clsx("flex items-center gap-2 px-3 py-1 rounded-full", timeLeft <= 5 ? "bg-red-50 text-red-600 animate-pulse border border-red-100" : "bg-indigo-50 text-indigo-600 border border-indigo-100")}>
                                <Timer className="h-4 w-4" />
                                <span className="font-mono">00:{timeLeft.toString().padStart(2, '0')}</span>
                            </div>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                            <div
                                className="bg-gradient-to-r from-indigo-500 to-violet-500 h-2.5 rounded-full transition-all duration-700 ease-out"
                                style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                            ></div>
                        </div>
                    </div>

                    <Card className="border-slate-200 shadow-sm">
                        <CardContent className="p-8 space-y-8">
                            <h2 className="text-2xl font-bold text-slate-900 leading-tight">
                                {currentQuestion.question}
                            </h2>

                            <div className="space-y-3">
                                {currentQuestion.options.map((option: string, index: number) => {
                                    const isSelected = selectedOption === index;
                                    const isCorrect = currentQuestion.correct_answer === index;

                                    let variantClass = "border-slate-200 hover:border-indigo-200 hover:bg-slate-50/50";

                                    if (isAnswered) {
                                        if (isCorrect) variantClass = "border-green-500 bg-green-50 text-green-700 font-semibold shadow-sm shadow-green-100";
                                        else if (isSelected) variantClass = "border-red-500 bg-red-50 text-red-700 shadow-sm shadow-red-100";
                                        else variantClass = "border-slate-100 opacity-60";
                                    } else if (isSelected) {
                                        variantClass = "border-indigo-600 bg-indigo-50 text-indigo-700 ring-4 ring-indigo-50 font-medium";
                                    }

                                    return (
                                        <React.Fragment key={index}>
                                            <button
                                                onClick={() => handleOptionSelect(index)}
                                                disabled={isAnswered}
                                                className={clsx(
                                                    "w-full text-left p-5 rounded-2xl border-2 transition-all duration-300 flex items-center justify-between group",
                                                    variantClass
                                                )}
                                            >
                                                <div className="flex items-center gap-4">
                                                    <span className={clsx(
                                                        "flex items-center justify-center h-8 w-8 rounded-lg border-2 text-sm font-bold transition-colors",
                                                        isSelected ? "bg-indigo-600 border-indigo-600 text-white" : "border-slate-200 text-slate-400 group-hover:border-indigo-300 group-hover:text-indigo-600"
                                                    )}>
                                                        {String.fromCharCode(65 + index)}
                                                    </span>
                                                    <span className="text-lg">{option}</span>
                                                </div>
                                                {isAnswered && isCorrect && <CheckCircle2 className="h-6 w-6 text-green-600" />}
                                                {isAnswered && isSelected && !isCorrect && <XCircle className="h-6 w-6 text-red-600" />}
                                            </button>

                                            {isAnswered && isCorrect && isSelected && currentQuestion.explanation && (
                                                <div className="p-5 bg-gradient-to-br from-green-50 to-emerald-50 text-green-800 text-sm rounded-2xl border border-green-100 animate-in slide-in-from-top-4 duration-500 shadow-sm">
                                                    <div className="flex items-start gap-3">
                                                        <CheckCircle2 className="h-5 w-5 mt-0.5 text-green-600 shrink-0" />
                                                        <div>
                                                            <p className="font-bold text-green-900 mb-1">Expert Explanation</p>
                                                            <p className="leading-relaxed opacity-90">{currentQuestion.explanation}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </React.Fragment>
                                    );
                                })}
                            </div>

                            <div className="flex justify-end pt-6 border-t border-slate-100">
                                {!isAnswered ? (
                                    <Button
                                        onClick={handleSubmit}
                                        disabled={selectedOption === null}
                                        size="lg"
                                        className="px-10 rounded-full shadow-lg shadow-indigo-100"
                                    >
                                        Submit Answer
                                    </Button>
                                ) : (
                                    <Button onClick={handleNext} size="lg" className="px-10 rounded-full gap-2 shadow-lg shadow-indigo-100">
                                        {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'View Results'}
                                        <ChevronRight className="h-5 w-5" />
                                    </Button>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </>
            )}
        </div>
    );
}
