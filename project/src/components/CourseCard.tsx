import { Course } from '../lib/supabase';
import { DollarSign } from 'lucide-react';

interface CourseCardProps {
  course: Course;
  onViewDetails: (courseId: string) => void;
}

export function CourseCard({ course, onViewDetails }: CourseCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer group">
      <div className="relative h-48 overflow-hidden bg-slate-200">
        {course.image_url ? (
          <img
            src={course.image_url}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-300 to-slate-400">
            <span className="text-4xl text-slate-600 font-bold">
              {course.title.charAt(0)}
            </span>
          </div>
        )}

        <div className="absolute top-3 right-3">
          <span
            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${
              course.price === 0
                ? 'bg-green-500 text-white'
                : 'bg-slate-900 text-white'
            }`}
          >
            {course.price === 0 ? (
              'Free'
            ) : (
              <>
                <DollarSign size={14} />
                {course.price.toFixed(2)}
              </>
            )}
          </span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-xl font-bold text-slate-900 mb-2 line-clamp-1">
          {course.title}
        </h3>
        <p className="text-slate-600 text-sm line-clamp-2 mb-4">
          {course.description}
        </p>
        <button
          onClick={() => onViewDetails(course.id)}
          className="w-full py-2 px-4 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors"
        >
          View Details
        </button>
      </div>
    </div>
  );
}
