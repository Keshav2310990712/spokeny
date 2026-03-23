import React, { useState } from 'react';
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
} from 'lucide-react';
import { enrollCourse, updateProgress } from '../slices/enrollmentSlice';
import { addToCart } from '../slices/cartSlice';

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enrolledCourses } = useSelector((state) => state.enrollment);
  const { userInfo } = useSelector((state) => state.auth);
  const [successMessage, setSuccessMessage] = useState('');

  // Mock data for display
  const course = {
    id: id || '1',
    title: 'Advanced AI Voice Agents',
    description:
      'Learn how to build sophisticated AI agents using generative AI and voice recognition. This comprehensive course covers everything from basic concepts to advanced implementation.',
    category: 'Technology',
    price: 49.99,
    rating: 4.8,
    reviews: 2341,
    students: 15234,
    instructor: 'Dr. Sarah Anderson',
    thumbnail:
      'https://images.unsplash.com/photo-1677442d019cecf567452e16303d5f5a6e6ad7a14?auto=format&fit=crop&q=80&w=1000',
    progress: 40,
    lessons: [
      {
        id: 1,
        title: 'Introduction to AI Voice',
        completed: true,
        duration: '15:00',
      },
      {
        id: 2,
        title: 'Web Speech API Basics',
        completed: true,
        duration: '20:30',
      },
      {
        id: 3,
        title: 'Connecting to Generative AI',
        completed: false,
        duration: '35:00',
      },
      {
        id: 4,
        title: 'Building the Translator UI',
        completed: false,
        duration: '40:15',
      },
      {
        id: 5,
        title: 'Deployment and Optimization',
        completed: false,
        duration: '50:00',
      },
    ],
    requirements: [
      'Basic JavaScript knowledge',
      'Understanding of API concepts',
      'Familiarity with HTML/CSS',
    ],
    benefits: [
      'Build production-ready AI voice agents',
      'Master modern generative AI APIs',
      'Gain industry-recognized certification',
      'Access to lifetime course materials',
    ],
  };

  const isEnrolled = enrolledCourses.some((c) => c.id === course.id);

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
        duration: '5h 00m',
        category: course.category,
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
    alert('Course added to cart!');
  };

  const completedLessons = course.lessons.filter((l) => l.completed).length;
  const totalLessons = course.lessons.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-dark-bg dark:to-dark-surface">
      {/* Header with backdrop */}
      <div className="relative h-80 overflow-hidden">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 bg-white/90 dark:bg-dark-surface/90 backdrop-blur-md rounded-full hover:bg-white dark:hover:bg-dark-surface transition-colors z-10"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
        {/* Course Header Card */}
        <div className="glass rounded-3xl p-8 mb-12 border border-brand-500/20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-4 py-2 bg-brand-500/20 text-brand-600 dark:text-brand-400 rounded-full text-sm font-semibold">
                  {course.category}
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

              <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-brand-500" />
                  <span>{course.students.toLocaleString()} students</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-brand-500" />
                  <span>5 hours total</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-brand-500" />
                  <span>By {course.instructor}</span>
                </div>
              </div>
            </div>

            {/* Enrollment Card */}
            <div className="bg-gradient-to-br from-brand-500 to-purple-600 rounded-2xl p-8 text-white h-fit sticky top-32">
              <div className="text-4xl font-bold mb-2">${course.price}</div>
              <p className="text-brand-100 mb-6">All-access pass</p>

              {successMessage && (
                <div className="mb-4 p-3 bg-green-400 text-green-900 rounded-lg text-sm font-semibold">
                  {successMessage}
                </div>
              )}

              {isEnrolled ? (
                <div className="space-y-3">
                  <div className="p-3 bg-white/20 rounded-lg text-center">
                    <p className="text-sm font-semibold">Already Enrolled ✓</p>
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
                    Enroll Now
                  </button>
                  <button
                    onClick={handleAddToCart}
                    className="w-full px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </button>
                </div>
              )}

              <button className="w-full mt-4 p-2 rounded-lg hover:bg-white/10 transition-colors flex items-center justify-center gap-2 text-sm">
                <Share2 className="w-4 h-4" />
                Share
              </button>
            </div>
          </div>
        </div>

        {/* Course Structure */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Curriculum */}
          <div className="lg:col-span-2">
            <div className="glass rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-900 dark:text-white">
                <PlayCircle className="text-brand-500" /> Course Curriculum
              </h2>

              <div className="space-y-3">
                {course.lessons.map((lesson, idx) => (
                  <div
                    key={lesson.id}
                    className="glass p-5 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-brand-500/50 transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-inner ${
                            lesson.completed
                              ? 'bg-green-100 text-green-600 dark:bg-green-900/30'
                              : 'bg-brand-100 text-brand-600 dark:bg-brand-900/30'
                          }`}
                        >
                          {lesson.completed ? (
                            <CheckCircle size={20} />
                          ) : (
                            idx + 1
                          )}
                        </div>
                        <div>
                          <h3
                            className={`font-semibold ${
                              lesson.completed
                                ? 'text-gray-900 dark:text-white'
                                : 'text-gray-700 dark:text-gray-300'
                            }`}
                          >
                            {lesson.title}
                          </h3>
                          <p className="text-sm text-gray-500">{lesson.duration}</p>
                        </div>
                      </div>

                      <button
                        className={`p-3 rounded-full transition-all ${
                          lesson.completed
                            ? 'bg-transparent text-gray-400'
                            : 'bg-brand-500 text-white shadow-lg shadow-brand-500/30 group-hover:scale-110'
                        }`}
                      >
                        <PlayCircle size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progress */}
            {isEnrolled && (
              <div className="glass rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-white">
                  Your Progress
                </h3>
                <div className="text-4xl font-bold text-brand-500 mb-2">
                  {course.progress}%
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-4">
                  <div
                    className="bg-gradient-to-r from-brand-500 to-purple-500 h-3 rounded-full"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {completedLessons} of {totalLessons} lessons completed
                </p>
              </div>
            )}

            {/* Requirements */}
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

            {/* Benefits */}
            <div className="glass rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                <Award className="w-5 h-5" />
                Benefits
              </h3>
              <ul className="space-y-3">
                {course.benefits.map((benefit, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300"
                  >
                    <div className="w-2 h-2 bg-brand-500 rounded-full mt-2 flex-shrink-0"></div>
                    {benefit}
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
