import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle2, ChevronRight, XCircle, RefreshCcw, ArrowLeft } from 'lucide-react';
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

export function Quiz() {
    const { subjectId } = useParams();
    const navigate = useNavigate();

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);

    // Capitalize subject ID for display
    const subjectName = subjectId ? subjectId.charAt(0).toUpperCase() + subjectId.slice(1) : 'General';

    const currentQuestion = MOCK_QUESTIONS[currentQuestionIndex];

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
        if (currentQuestionIndex < MOCK_QUESTIONS.length - 1) {
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
    };

    if (showResults) {
        const percentage = Math.round((score / MOCK_QUESTIONS.length) * 100);

        return (
            <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-500">
                <div className="text-center space-y-4">
                    <div className="inline-flex items-center justify-center p-4 rounded-full bg-indigo-100 text-indigo-600 mb-4">
                        <CheckCircle2 className="h-12 w-12" />
                    </div>
                    <h1 className="text-3xl font-bold text-slate-900">Quiz Completed!</h1>
                    <p className="text-slate-600">You scored {score} out of {MOCK_QUESTIONS.length}</p>
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

            {/* Progress Bar */}
            <div className="w-full bg-slate-200 rounded-full h-2.5 mb-6">
                <div
                    className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500"
                    style={{ width: `${((currentQuestionIndex + 1) / MOCK_QUESTIONS.length) * 100}%` }}
                ></div>
            </div>

            <Card>
                <CardContent className="p-8 space-y-8">
                    <div className="flex justify-between items-start">
                        <span className="text-sm font-bold text-indigo-600 tracking-wider uppercase">
                            Question {currentQuestionIndex + 1} of {MOCK_QUESTIONS.length}
                        </span>
                    </div>

                    <h2 className="text-2xl font-bold text-slate-900 leading-snug">
                        {currentQuestion.question}
                    </h2>

                    <div className="space-y-3">
                        {currentQuestion.options.map((option, index) => {
                            const isSelected = selectedOption === index;
                            const isCorrect = currentQuestion.correctAnswer === index;

                            let variantClass = "border-slate-200 hover:border-indigo-200 hover:bg-slate-50";

                            if (isAnswered) {
                                if (isCorrect) variantClass = "border-green-500 bg-green-50 text-green-700";
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
                                    <span className="font-medium text-lg">{option}</span>
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
                                {currentQuestionIndex < MOCK_QUESTIONS.length - 1 ? 'Next Question' : 'View Results'}
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
