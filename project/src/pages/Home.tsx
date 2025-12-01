import { useState, useEffect } from 'react';
import { supabase, Course } from '../lib/supabase';
import { CourseCard } from '../components/CourseCard';
import { Loader2 } from 'lucide-react';

interface HomeProps {
  onViewCourse: (courseId: string) => void;
}

export function Home({ onViewCourse }: HomeProps) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCourses(data || []);
    } catch (error) {
      console.error('Error loading courses:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-slate-50">
        <Loader2 className="animate-spin text-slate-900" size={48} />
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Discover Amazing Courses
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Browse our collection of courses and start learning today. Use promo code{' '}
            <span className="font-bold text-slate-900">BFSALE25</span> for 50% off paid courses!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onViewDetails={onViewCourse}
            />
          ))}
        </div>

        {courses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-600 text-lg">No courses available yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
