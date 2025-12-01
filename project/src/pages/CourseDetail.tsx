import { useState, useEffect, FormEvent } from 'react';
import { supabase, Course } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { Toast } from '../components/Toast';
import { ArrowLeft, DollarSign, Check, Tag, Loader2 } from 'lucide-react';

interface CourseDetailProps {
  courseId: string;
  onBack: () => void;
  onSubscribed: () => void;
}

export function CourseDetail({ courseId, onBack, onSubscribed }: CourseDetailProps) {
  const { user } = useAuth();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [subscribing, setSubscribing] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [discountedPrice, setDiscountedPrice] = useState<number | null>(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    loadCourse();
    checkSubscription();
  }, [courseId]);

  const loadCourse = async () => {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .eq('id', courseId)
        .maybeSingle();

      if (error) throw error;
      setCourse(data);
    } catch (error) {
      console.error('Error loading course:', error);
      setToast({ message: 'Failed to load course', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const checkSubscription = async () => {
    try {
      const { data } = await supabase
        .from('subscriptions')
        .select('id')
        .eq('user_id', user?.id)
        .eq('course_id', courseId)
        .maybeSingle();

      setIsSubscribed(!!data);
    } catch (error) {
      console.error('Error checking subscription:', error);
    }
  };

  const handleApplyPromo = (e: FormEvent) => {
    e.preventDefault();

    if (!course) return;

    if (promoCode.trim().toUpperCase() === 'BFSALE25') {
      const discounted = course.price * 0.5;
      setDiscountedPrice(discounted);
      setPromoApplied(true);
      setToast({ message: '50% discount applied!', type: 'success' });
    } else {
      setToast({ message: 'Invalid promo code', type: 'error' });
      setPromoApplied(false);
      setDiscountedPrice(null);
    }
  };

  const handleSubscribe = async () => {
    if (!course || !user) return;

    if (course.price > 0 && !promoApplied) {
      setToast({ message: 'Please apply a valid promo code', type: 'error' });
      return;
    }

    setSubscribing(true);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setToast({ message: 'Not authenticated', type: 'error' });
        return;
      }

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/subscribe`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            courseId: course.id,
            promoCode: course.price > 0 ? promoCode : null,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to subscribe');
      }

      setToast({ message: 'Successfully subscribed to course!', type: 'success' });
      setIsSubscribed(true);
      setTimeout(() => {
        onSubscribed();
      }, 1500);
    } catch (error) {
      setToast({
        message: error instanceof Error ? error.message : 'Failed to subscribe',
        type: 'error',
      });
    } finally {
      setSubscribing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-slate-50">
        <Loader2 className="animate-spin text-slate-900" size={48} />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <p className="text-slate-600 text-lg mb-4">Course not found</p>
          <button
            onClick={onBack}
            className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 py-8">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back to Courses</span>
        </button>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="relative h-64 md:h-96 bg-slate-200">
            {course.image_url ? (
              <img
                src={course.image_url}
                alt={course.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-300 to-slate-400">
                <span className="text-6xl text-slate-600 font-bold">
                  {course.title.charAt(0)}
                </span>
              </div>
            )}
          </div>

          <div className="p-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 mb-2">
                  {course.title}
                </h1>
                <div className="flex items-center gap-2">
                  {course.price === 0 ? (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-500 text-white rounded-full text-sm font-semibold">
                      Free Course
                    </span>
                  ) : (
                    <div className="flex items-center gap-3">
                      {promoApplied && discountedPrice !== null ? (
                        <>
                          <span className="text-2xl font-bold text-slate-900">
                            ${discountedPrice.toFixed(2)}
                          </span>
                          <span className="text-lg text-slate-500 line-through">
                            ${course.price.toFixed(2)}
                          </span>
                          <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-500 text-white rounded-full text-xs font-semibold">
                            50% OFF
                          </span>
                        </>
                      ) : (
                        <span className="text-2xl font-bold text-slate-900">
                          ${course.price.toFixed(2)}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="prose max-w-none mb-8">
              <p className="text-slate-700 text-lg leading-relaxed">
                {course.description}
              </p>
            </div>

            {isSubscribed ? (
              <div className="bg-green-50 border-2 border-green-500 rounded-xl p-6">
                <div className="flex items-center gap-3 text-green-700">
                  <Check size={24} className="flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-lg">Already Subscribed</p>
                    <p className="text-sm text-green-600">
                      You have access to this course. Check "My Courses" to continue learning.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="border-t border-slate-200 pt-8">
                {course.price > 0 && (
                  <div className="mb-6">
                    <div className="bg-slate-50 rounded-xl p-6 mb-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Tag className="text-slate-700" size={20} />
                        <h3 className="font-semibold text-slate-900">
                          Have a Promo Code?
                        </h3>
                      </div>
                      <form onSubmit={handleApplyPromo} className="flex gap-3">
                        <input
                          type="text"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          placeholder="Enter promo code"
                          className="flex-1 px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none"
                        />
                        <button
                          type="submit"
                          className="px-6 py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors"
                        >
                          Apply
                        </button>
                      </form>
                      {promoApplied && (
                        <p className="text-green-600 text-sm mt-2 flex items-center gap-1">
                          <Check size={16} />
                          Promo code applied successfully!
                        </p>
                      )}
                    </div>
                  </div>
                )}

                <button
                  onClick={handleSubscribe}
                  disabled={subscribing || (course.price > 0 && !promoApplied)}
                  className="w-full py-4 px-6 bg-slate-900 text-white rounded-xl font-semibold text-lg hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {subscribing ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      Subscribing...
                    </>
                  ) : (
                    <>
                      <DollarSign size={20} />
                      {course.price === 0 ? 'Subscribe for Free' : 'Subscribe Now'}
                    </>
                  )}
                </button>

                {course.price > 0 && !promoApplied && (
                  <p className="text-sm text-slate-600 text-center mt-3">
                    Apply promo code BFSALE25 for 50% discount
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
