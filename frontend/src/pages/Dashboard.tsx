import { useNavigate } from 'react-router-dom';
import { Book, Calculator, FlaskConical, Globe, History, Languages } from 'lucide-react';
import { Card, CardContent } from '../components/Card';

const subjects = [
    { id: 'math', name: 'Mathematics', icon: Calculator, color: 'bg-blue-100 text-blue-600', count: '12 Chapters' },
    { id: 'science', name: 'Science', icon: FlaskConical, color: 'bg-green-100 text-green-600', count: '10 Chapters' },
    { id: 'english', name: 'English', icon: Languages, color: 'bg-yellow-100 text-yellow-600', count: '8 Chapters' },
    { id: 'history', name: 'History', icon: History, color: 'bg-orange-100 text-orange-600', count: '15 Chapters' },
    { id: 'geography', name: 'Geography', icon: Globe, color: 'bg-cyan-100 text-cyan-600', count: '9 Chapters' },
    { id: 'hindi', name: 'Hindi', icon: Book, color: 'bg-red-100 text-red-600', count: '10 Chapters' },
];

export function Dashboard() {
    const navigate = useNavigate();

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h1 className="text-3xl font-bold text-slate-900">Select a Subject</h1>
                <p className="text-slate-600 mt-2">Choose a subject to start practicing your skills.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {subjects.map((subject) => (
                    <Card
                        key={subject.id}
                        className="cursor-pointer hover:shadow-md transition-all duration-200 hover:-translate-y-1 group"
                        onClick={() => navigate(`/quiz/${subject.id}`)}
                    >
                        <CardContent className="p-6 flex items-start space-x-4">
                            <div className={`p-3 rounded-xl ${subject.color} group-hover:scale-110 transition-transform duration-200`}>
                                <subject.icon className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg text-slate-900">{subject.name}</h3>
                                <p className="text-sm text-slate-500 mt-1">{subject.count}</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="mt-12">
                <h2 className="text-xl font-bold text-slate-900 mb-4">Recent Progress</h2>
                <Card>
                    <CardContent className="p-6">
                        <div className="text-center py-8 text-slate-500">
                            <p>No recent activity. Start a quiz to see your progress here!</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
