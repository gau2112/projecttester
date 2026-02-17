import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle2, ChevronRight, XCircle, RefreshCcw, ArrowLeft, Timer } from 'lucide-react';
import { Button } from '../components/Button';
import { Card, CardContent } from '../components/Card';
import clsx from 'clsx';

// Mock Data
const MOCK_QUESTIONS = [
    {
        id: 1,
        question: "What is the powerhouse of the cell?",
        options: ["Nucleus", "Mitochondria", "Ribosome", "Golgi Apparatus"],
        correctAnswer: 1
    },
    {
        id: 2,
        question: "Which gas is most abundant in the Earth's atmosphere?",
        options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
        correctAnswer: 2
    },
    {
        id: 3,
        question: "What is the chemical symbol for Gold?",
        options: ["Ag", "Fe", "Au", "Pb"],
        correctAnswer: 2
    },
    {
        id: 4,
        question: "Who developed the theory of relativity?",
        options: ["Isaac Newton", "Albert Einstein", "Galileo Galilei", "Nikola Tesla"],
        correctAnswer: 1
    },
    {
        id: 5,
        question: "What is the hardest natural substance on Earth?",
        options: ["Iron", "Diamond", "Quartz", "Granite"],
        correctAnswer: 1
    }
];

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

    // Use Demo questions if subjectId is 'demo', otherwise mock questions
    const questions = subjectId === 'demo' ? DEMO_QUESTIONS : MOCK_QUESTIONS;

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [timeLeft, setTimeLeft] = useState(15); // 15 seconds per question

    // Capitalize subject ID for display
    const subjectName = subjectId ? subjectId.charAt(0).toUpperCase() + subjectId.slice(1) : 'General';

    const currentQuestion = questions[currentQuestionIndex];

    // Timer Logic
    useEffect(() => {
        if (showResults || isAnswered) return;

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
    }, [currentQuestionIndex, isAnswered, showResults]);

    // Reset timer when question changes
    useEffect(() => {
        setTimeLeft(15);
    }, [currentQuestionIndex]);

    const handleTimeout = () => {
        setIsAnswered(true);
        // Timeout counts as incorrect (selectedOption remains null or whatever was selected)
    };

    const handleOptionSelect = (index: number) => {
        if (isAnswered) return;
        setSelectedOption(index);
    };

    const handleSubmit = () => {
        if (selectedOption === null) return;

        setIsAnswered(true);
        if (selectedOption === currentQuestion.correctAnswer) {
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
                <div className="text-sm font-medium text-slate-500">
                    {subjectName} Quiz
                </div>
            </div>

            {/* Progress & Timer */}
            <div className="grid gap-4">
                <div className="flex justify-between items-center text-sm font-medium text-slate-600">
                    <span>Question {currentQuestionIndex + 1}/{questions.length}</span>
                    <div className={clsx("flex items-center gap-2", timeLeft <= 5 ? "text-red-600 animate-pulse" : "text-indigo-600")}>
                        <Timer className="h-4 w-4" />
                        <span>00:{timeLeft.toString().padStart(2, '0')}</span>
                    </div>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2.5">
                    <div
                        className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500"
                        style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                    ></div>
                </div>
            </div>

            <Card>
                <CardContent className="p-8 space-y-8">
                    <h2 className="text-2xl font-bold text-slate-900 leading-snug">
                        {currentQuestion.question}
                    </h2>

                    <div className="space-y-3">
                        {currentQuestion.options.map((option, index) => {
                            const isSelected = selectedOption === index;
                            const isCorrect = currentQuestion.correctAnswer === index;

                            let variantClass = "border-slate-200 hover:border-indigo-200 hover:bg-slate-50";

                            if (isAnswered) {
                                if (isCorrect) variantClass = "border-green-500 bg-green-50 text-green-700 font-medium";
                                else if (isSelected) variantClass = "border-red-500 bg-red-50 text-red-700";
                                else variantClass = "border-slate-200 opacity-50";
                            } else if (isSelected) {
                                variantClass = "border-indigo-600 bg-indigo-50 text-indigo-700 ring-1 ring-indigo-600";
                            }

                            return (
                                <button
                                    key={index}
                                    onClick={() => handleOptionSelect(index)}
                                    disabled={isAnswered}
                                    className={clsx(
                                        "w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-between group",
                                        variantClass
                                    )}
                                >
                                    <span className="text-lg">{option}</span>
                                    {isAnswered && isCorrect && <CheckCircle2 className="h-5 w-5 text-green-600" />}
                                    {isAnswered && isSelected && !isCorrect && <XCircle className="h-5 w-5 text-red-600" />}
                                </button>
                            );
                        })}
                    </div>

                    <div className="flex justify-end pt-4 border-t border-slate-100">
                        {!isAnswered ? (
                            <Button onClick={handleSubmit} disabled={selectedOption === null} size="lg" className="px-8">
                                Submit Answer
                            </Button>
                        ) : (
                            <Button onClick={handleNext} size="lg" className="px-8 gap-2">
                                {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'View Results'}
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
