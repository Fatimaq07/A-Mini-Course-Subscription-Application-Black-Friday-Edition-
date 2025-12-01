import { useAuth } from '../contexts/AuthContext';
import { LogOut, BookOpen, Home, GraduationCap } from 'lucide-react';

interface NavbarProps {
  currentPage: 'home' | 'my-courses';
  onNavigate: (page: 'home' | 'my-courses') => void;
}

export function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const { signOut, user } = useAuth();

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <GraduationCap className="text-slate-900" size={32} />
              <span className="text-xl font-bold text-slate-900">LearnHub</span>
            </div>

            <div className="flex gap-1">
              <button
                onClick={() => onNavigate('home')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  currentPage === 'home'
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Home size={18} />
                <span>Courses</span>
              </button>

              <button
                onClick={() => onNavigate('my-courses')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  currentPage === 'my-courses'
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <BookOpen size={18} />
                <span>My Courses</span>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-600">
              {user?.email}
            </span>
            <button
              onClick={signOut}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 text-slate-900 hover:bg-slate-200 transition-colors font-medium"
            >
              <LogOut size={18} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
