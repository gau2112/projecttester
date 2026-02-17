import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

import { Dashboard } from './pages/Dashboard';
import { Quiz } from './pages/Quiz';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter basename="/projecttester">
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/quiz/:subjectId" element={<Quiz />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  );
}


export default App;
