import { useState } from 'react';
import { useAuth } from './contexts/AuthContext';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Home } from './pages/Home';
import { CourseDetail } from './pages/CourseDetail';
import { MyCourses } from './pages/MyCourses';
import { Navbar } from './components/Navbar';
import { Loader2 } from 'lucide-react';

type View = 'login' | 'signup' | 'home' | 'course-detail' | 'my-courses';

function App() {
  const { user, loading } = useAuth();
  const [view, setView] = useState<View>('login');
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 className="animate-spin text-slate-900" size={48} />
      </div>
    );
  }

  if (!user) {
    if (view === 'signup') {
      return <Signup onSwitchToLogin={() => setView('login')} />;
    }
    return <Login onSwitchToSignup={() => setView('signup')} />;
  }

  const handleViewCourse = (courseId: string) => {
    setSelectedCourseId(courseId);
    setView('course-detail');
  };

  const handleBackToHome = () => {
    setSelectedCourseId(null);
    setView('home');
  };

  const handleNavigate = (page: 'home' | 'my-courses') => {
    if (page === 'home') {
      setView('home');
    } else {
      setView('my-courses');
    }
  };

  const currentPage = view === 'my-courses' ? 'my-courses' : 'home';

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />

      {view === 'home' && <Home onViewCourse={handleViewCourse} />}

      {view === 'course-detail' && selectedCourseId && (
        <CourseDetail
          courseId={selectedCourseId}
          onBack={handleBackToHome}
          onSubscribed={() => setView('my-courses')}
        />
      )}

      {view === 'my-courses' && <MyCourses />}
    </div>
  );
}

export default App;
