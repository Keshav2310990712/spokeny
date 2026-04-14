import React, { useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  PlayCircle,
  CheckCircle,
  Award,
  BookOpen,
  Users,
  Star,
  Clock,
  ShoppingCart,
  ArrowLeft,
  Share2,
  Target,
  Sparkles,
  MessageSquare,
  SendHorizonal,
} from 'lucide-react';
import { enrollCourse, updateProgress } from '../slices/enrollmentSlice';
import { addToCart } from '../slices/cartSlice';
import { aiAPI } from '../services/api';
import { getCourseById } from '../data/courseCatalog';

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enrolledCourses } = useSelector((state) => state.enrollment);
  const { userInfo } = useSelector((state) => state.auth);
  const course = getCourseById(id);
  const [successMessage, setSuccessMessage] = useState('');
  const [selectedLessonId, setSelectedLessonId] = useState(course?.lessons[0]?.id ?? null);
  const [coachPrompt, setCoachPrompt] = useState('');
  const [coachMessages, setCoachMessages] = useState([]);
  const [coachLoading, setCoachLoading] = useState(false);

  const enrolledCourse = enrolledCourses.find((item) => item.id === course?.id);
  const isEnrolled = Boolean(enrolledCourse);
  const completedLessonIds = enrolledCourse?.completedLessons ?? [];
  const totalLessons = course?.lessons.length ?? 0;
  const completedLessons = course
    ? course.lessons.filter((lesson) => completedLessonIds.includes(lesson.id)).length
    : 0;
  const progress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  const selectedLesson = useMemo(() => {
    if (!course) {
      return null;
    }

    return course.lessons.find((lesson) => lesson.id === selectedLessonId) ?? course.lessons[0];
  }, [course, selectedLessonId]);

  const defaultCoachPrompt = selectedLesson
    ? `I am working on "${selectedLesson.title}" in "${course?.title}". Explain what this task wants me to do, give me step-by-step guidance, and show me a small example.\n\nTask: ${selectedLesson.practice}`
    : '';

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="glass rounded-3xl p-8 text-center max-w-lg">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
            Course not found
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            This course link does not match any course in the current catalog.
          </p>
          <button
            onClick={() => navigate('/free-courses')}
            className="px-6 py-3 bg-brand-500 text-white rounded-xl font-semibold"
          >
            Browse Courses
          </button>
        </div>
      </div>
    );
  }

  const handleEnroll = () => {
    if (!userInfo) {
      navigate('/login');
      return;
    }

    dispatch(
      enrollCourse({
        id: course.id,
        title: course.title,
        thumbnail: course.thumbnail,
        duration: course.duration,
        category: course.category,
        lessonCount: course.lessons.length,
      })
    );
    setSuccessMessage('Successfully enrolled in the course!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleAddToCart = () => {
    if (!userInfo) {
      navigate('/login');
      return;
    }

    dispatch(
      addToCart({
        _id: course.id,
        title: course.title,
        price: course.price,
        thumbnail: course.thumbnail,
      })
    );
    setSuccessMessage('Course added to cart!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleLessonComplete = (lessonId) => {
    if (!isEnrolled) {
      setSuccessMessage('Enroll first to track lesson progress.');
      setTimeout(() => setSuccessMessage(''), 2500);
      return;
    }

    if (completedLessonIds.includes(lessonId)) {
      return;
    }

    const nextCompletedCount = completedLessons + 1;
    const nextProgress = Math.round((nextCompletedCount / totalLessons) * 100);

    dispatch(
      updateProgress({
        courseId: course.id,
        progress: nextProgress,
        lessonId,
      })
    );
  };

  const handlePrepareAiCoach = () => {
    setCoachPrompt(defaultCoachPrompt);
  };

  const handleAskAiCoach = async () => {
    const nextPrompt = coachPrompt.trim() || defaultCoachPrompt;
    if (!nextPrompt || !selectedLesson) {
      return;
    }

    const userMessage = {
      role: 'user',
      content: nextPrompt,
    };
    const nextHistory = [...coachMessages, userMessage];

    try {
      setCoachLoading(true);
      setCoachMessages(nextHistory);
      setCoachPrompt('');

      const response = await aiAPI.askCoach({
        prompt: nextPrompt,
        courseTitle: course.title,
        lessonTitle: selectedLesson.title,
        task: selectedLesson.practice,
        history: nextHistory,
      });

      setCoachMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: response.data.reply,
        },
      ]);
    } catch (error) {
      setCoachMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            error.response?.data?.message ||
            'The AI coach could not answer right now. Please try again in a moment.',
        },
      ]);
    } finally {
      setCoachLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-dark-bg dark:to-dark-surface">
      <div className="relative h-80 overflow-hidden">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 bg-white/90 dark:bg-dark-surface/90 backdrop-blur-md rounded-full hover:bg-white dark:hover:bg-dark-surface transition-colors z-10"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
        <div className="glass rounded-3xl p-8 mb-12 border border-brand-500/20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <span className="px-4 py-2 bg-brand-500/20 text-brand-600 dark:text-brand-400 rounded-full text-sm font-semibold">
                  {course.category}
                </span>
                <span className="px-4 py-2 bg-white/60 dark:bg-dark-surface/60 text-gray-700 dark:text-gray-200 rounded-full text-sm font-semibold">
                  {course.level}
                </span>
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-bold text-gray-900 dark:text-white">
                    {course.rating}
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">
                    ({course.reviews.toLocaleString()} reviews)
                  </span>
                </div>
              </div>

              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {course.title}
              </h1>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                {course.description}
              </p>

              <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400 flex-wrap">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-brand-500" />
                  <span>{course.students.toLocaleString()} students</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-brand-500" />
                  <span>{course.duration} total</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-brand-500" />
                  <span>By {course.instructor}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-6">
                {course.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 dark:bg-dark-surface text-gray-600 dark:text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-brand-500 to-purple-600 rounded-2xl p-8 text-white h-fit sticky top-32">
              <div className="text-4xl font-bold mb-2">
                {course.price > 0 ? `$${course.price}` : 'Free'}
              </div>
              <p className="text-brand-100 mb-6">
                {course.price > 0 ? 'All-access pass' : 'Start learning right away'}
              </p>

              {successMessage && (
                <div className="mb-4 p-3 bg-green-400 text-green-900 rounded-lg text-sm font-semibold">
                  {successMessage}
                </div>
              )}

              {isEnrolled ? (
                <div className="space-y-3">
                  <div className="p-3 bg-white/20 rounded-lg text-center">
                    <p className="text-sm font-semibold">Already enrolled</p>
                  </div>
                  <button
                    onClick={() => navigate('/my-learning')}
                    className="w-full px-6 py-3 bg-white text-brand-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    Go to My Learning
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <button
                    onClick={handleEnroll}
                    className="w-full px-6 py-3 bg-white text-brand-600 font-semibold rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105"
                  >
                    {course.price > 0 ? 'Enroll Now' : 'Start for Free'}
                  </button>
                  {course.price > 0 && (
                    <button
                      onClick={handleAddToCart}
                      className="w-full px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      Add to Cart
                    </button>
                  )}
                </div>
              )}

              <button className="w-full mt-4 p-2 rounded-lg hover:bg-white/10 transition-colors flex items-center justify-center gap-2 text-sm">
                <Share2 className="w-4 h-4" />
                Share
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <div className="glass rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-900 dark:text-white">
                <PlayCircle className="text-brand-500" /> Course Curriculum
              </h2>

              <div className="space-y-3">
                {course.lessons.map((lesson, idx) => {
                  const isCompleted = completedLessonIds.includes(lesson.id);

                  return (
                    <div
                      key={lesson.id}
                      onClick={() => setSelectedLessonId(lesson.id)}
                      className={`glass p-5 rounded-xl border transition-all group cursor-pointer ${
                        selectedLesson?.id === lesson.id
                          ? 'border-brand-500/60'
                          : 'border-gray-200 dark:border-gray-700 hover:border-brand-500/50'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4 flex-1">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-inner ${
                              isCompleted
                                ? 'bg-green-100 text-green-600 dark:bg-green-900/30'
                                : 'bg-brand-100 text-brand-600 dark:bg-brand-900/30'
                            }`}
                          >
                            {isCompleted ? <CheckCircle size={20} /> : idx + 1}
                          </div>
                          <div>
                            <h3
                              className={`font-semibold ${
                                isCompleted
                                  ? 'text-gray-900 dark:text-white'
                                  : 'text-gray-700 dark:text-gray-300'
                              }`}
                            >
                              {lesson.title}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {lesson.duration} . {lesson.practice}
                            </p>
                          </div>
                        </div>

                        <button
                          onClick={(event) => {
                            event.stopPropagation();
                            setSelectedLessonId(lesson.id);
                            handleLessonComplete(lesson.id);
                          }}
                          className={`p-3 rounded-full transition-all ${
                            isCompleted
                              ? 'bg-transparent text-gray-400'
                              : 'bg-brand-500 text-white shadow-lg shadow-brand-500/30 group-hover:scale-110'
                          }`}
                        >
                          <PlayCircle size={20} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {selectedLesson && (
              <div className="glass rounded-2xl p-8 border border-gray-200 dark:border-gray-700 mt-8">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="px-4 py-2 rounded-full bg-brand-500/10 text-brand-500 text-sm font-semibold">
                    Lesson {selectedLesson.order}
                  </span>
                  <span className="text-sm text-gray-500">{selectedLesson.duration}</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  {selectedLesson.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                  {selectedLesson.content}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="rounded-2xl bg-brand-500/5 border border-brand-500/10 p-5">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                      <Target className="w-4 h-4 text-brand-500" />
                      Practice Task
                    </h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {selectedLesson.practice}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-3">
                      <button
                        onClick={handlePrepareAiCoach}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-dark-surface border border-brand-200 dark:border-brand-500/30 text-brand-600 dark:text-brand-300 text-sm font-semibold hover:border-brand-500 transition-colors"
                      >
                        <MessageSquare className="w-4 h-4" />
                        Fill AI prompt
                      </button>
                      <button
                        onClick={handleAskAiCoach}
                        disabled={coachLoading}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-500 text-white text-sm font-semibold hover:bg-brand-600 transition-colors disabled:opacity-50"
                      >
                        <SendHorizonal className="w-4 h-4" />
                        {coachLoading ? 'Asking AI...' : 'Ask AI here'}
                      </button>
                    </div>
                  </div>
                  <div className="rounded-2xl bg-purple-500/5 border border-purple-500/10 p-5">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-purple-500" />
                      How to use this lesson well
                    </h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Read the explanation once, try the practice out loud or in code, and then mark it complete so your progress stays grounded in actual work.
                    </p>
                  </div>
                </div>

                <div className="mt-6 rounded-2xl border border-gray-200 dark:border-gray-700 p-5 bg-white/40 dark:bg-dark-surface/40">
                  <div className="flex items-center gap-2 mb-3">
                    <MessageSquare className="w-5 h-5 text-brand-500" />
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      AI Task Coach
                    </h4>
                  </div>

                  <textarea
                    value={coachPrompt}
                    onChange={(event) => setCoachPrompt(event.target.value)}
                    placeholder="Ask Gemini to explain this task, break it into steps, or give you an example."
                    className="w-full min-h-[140px] p-4 rounded-2xl bg-white/60 dark:bg-dark-surface/60 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 leading-relaxed focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none"
                  />

                  <div className="flex flex-wrap gap-3 mt-4">
                    <button
                      onClick={handlePrepareAiCoach}
                      className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:border-brand-500 transition-colors"
                    >
                      Use suggested prompt
                    </button>
                    <button
                      onClick={handleAskAiCoach}
                      disabled={coachLoading}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-500 text-white text-sm font-semibold hover:bg-brand-600 transition-colors disabled:opacity-50"
                    >
                      <SendHorizonal className="w-4 h-4" />
                      {coachLoading ? 'Asking Gemini...' : 'Send to Gemini'}
                    </button>
                  </div>

                  <div className="mt-5 space-y-4">
                    {coachMessages.length > 0 ? (
                      coachMessages.map((message, index) => (
                        <div
                          key={`${message.role}-${index}`}
                          className={`rounded-2xl p-4 whitespace-pre-wrap ${
                            message.role === 'user'
                              ? 'bg-gray-100 dark:bg-dark-surface ml-6'
                              : 'bg-brand-50 dark:bg-brand-900/10 mr-6 border border-brand-200 dark:border-brand-500/20'
                          }`}
                        >
                          <p className="text-xs uppercase tracking-wide font-semibold mb-2 text-gray-500">
                            {message.role === 'user' ? 'You' : 'AI Coach'}
                          </p>
                          <p className="text-sm text-gray-800 dark:text-gray-200">
                            {message.content}
                          </p>
                        </div>
                      ))
                    ) : (
                      <div className="rounded-2xl p-4 bg-brand-50 dark:bg-brand-900/10 border border-dashed border-brand-200 dark:border-brand-500/20 text-sm text-gray-600 dark:text-gray-400">
                        Ask a question here and this lesson will fetch a Gemini-based answer for the selected task.
                      </div>
                    )}

                    {coachLoading && (
                      <div className="rounded-2xl p-4 bg-brand-50 dark:bg-brand-900/10 mr-6 border border-brand-200 dark:border-brand-500/20">
                        <p className="text-xs uppercase tracking-wide font-semibold mb-2 text-gray-500">
                          AI Coach
                        </p>
                        <p className="text-sm text-gray-800 dark:text-gray-200">Thinking...</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            {isEnrolled && (
              <div className="glass rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-white">
                  Your Progress
                </h3>
                <div className="text-4xl font-bold text-brand-500 mb-2">
                  {progress}%
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-4">
                  <div
                    className="bg-gradient-to-r from-brand-500 to-purple-500 h-3 rounded-full"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {completedLessons} of {totalLessons} lessons completed
                </p>
              </div>
            )}

            <div className="glass rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Requirements
              </h3>
              <ul className="space-y-3">
                {course.requirements.map((req, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300"
                  >
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    {req}
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                <Award className="w-5 h-5" />
                What You Will Achieve
              </h3>
              <ul className="space-y-3">
                {course.outcomes.map((outcome, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300"
                  >
                    <div className="w-2 h-2 bg-brand-500 rounded-full mt-2 flex-shrink-0"></div>
                    {outcome}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
