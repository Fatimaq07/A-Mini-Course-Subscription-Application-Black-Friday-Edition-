import { useState, useEffect } from 'react';
import { supabase, Subscription } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { Loader2, Calendar, DollarSign } from 'lucide-react';

export function MyCourses() {
  const { user } = useAuth();
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSubscriptions();
  }, []);

  const loadSubscriptions = async () => {
    try {
      const { data, error } = await supabase
        .from('subscriptions')
        .select(`
          *,
          courses (
            id,
            title,
            description,
            price,
            image_url,
            created_at
          )
        `)
        .eq('user_id', user?.id)
        .order('subscribed_at', { ascending: false });

      if (error) throw error;
      setSubscriptions(data || []);
    } catch (error) {
      console.error('Error loading subscriptions:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
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
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">My Courses</h1>
          <p className="text-lg text-slate-600">
            {subscriptions.length > 0
              ? `You're enrolled in ${subscriptions.length} course${subscriptions.length !== 1 ? 's' : ''}`
              : 'You haven\'t enrolled in any courses yet'}
          </p>
        </div>

        {subscriptions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subscriptions.map((subscription) => {
              const course = subscription.courses;
              if (!course) return null;

              return (
                <div
                  key={subscription.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="relative h-48 bg-slate-200">
                    {course.image_url ? (
                      <img
                        src={course.image_url}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-300 to-slate-400">
                        <span className="text-4xl text-slate-600 font-bold">
                          {course.title.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-5">
                    <h3 className="text-xl font-bold text-slate-900 mb-2 line-clamp-1">
                      {course.title}
                    </h3>
                    <p className="text-slate-600 text-sm line-clamp-2 mb-4">
                      {course.description}
                    </p>

                    <div className="space-y-2 pt-4 border-t border-slate-200">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <DollarSign size={16} className="text-slate-500" />
                        <span>
                          Price Paid:{' '}
                          <span className="font-semibold text-slate-900">
                            {subscription.price_paid === 0
                              ? 'Free'
                              : `$${subscription.price_paid.toFixed(2)}`}
                          </span>
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Calendar size={16} className="text-slate-500" />
                        <span>
                          Enrolled: {formatDate(subscription.subscribed_at)}
                        </span>
                      </div>
                    </div>

                    <button className="w-full mt-4 py-2 px-4 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors">
                      Continue Learning
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar size={40} className="text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                No courses yet
              </h3>
              <p className="text-slate-600 mb-6">
                Start learning by browsing our course catalog and enrolling in courses that interest you.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
