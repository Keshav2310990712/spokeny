import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Trash2, Play, Clock, BarChart3, Award, Search, Filter } from 'lucide-react';
import { unenrollCourse } from '../slices/enrollmentSlice';

const MyLearning = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { enrolledCourses } = useSelector((state) => state.enrollment);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); // all, in-progress, completed

  if (!userInfo) {
    navigate('/login');
    return null;
  }

  const filteredCourses = enrolledCourses.filter((course) => {
    const matchesSearch = course.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === 'all' ||
      (filterStatus === 'in-progress' && course.progress < 100) ||
      (filterStatus === 'completed' && course.progress === 100);

    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: enrolledCourses.length,
    inProgress: enrolledCourses.filter((c) => c.progress > 0 && c.progress < 100)
      .length,
    completed: enrolledCourses.filter((c) => c.progress === 100).length,
    totalHours: enrolledCourses.reduce((acc, c) => {
      const hours = parseInt(c.duration) || 0;
      return acc + hours;
    }, 0),
  };

  const handleContinueLearning = (courseId) => {
    navigate(`/course/${courseId}`);
  };

  const handleRemoveEnrollment = (courseId) => {
    if (
      window.confirm(
        'Are you sure you want to unenroll from this course? This action cannot be undone.'
      )
    ) {
      dispatch(unenrollCourse(courseId));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-dark-bg dark:to-dark-surface py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            My Learning Dashboard
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Track your progress and continue learning
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="glass rounded-2xl p-6 border border-brand-500/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Total Courses
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {stats.total}
                </p>
              </div>
              <BookOpen className="w-12 h-12 text-brand-500 opacity-20" />
            </div>
          </div>

          <div className="glass rounded-2xl p-6 border border-purple-500/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  In Progress
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {stats.inProgress}
                </p>
              </div>
              <Play className="w-12 h-12 text-purple-500 opacity-20" />
            </div>
          </div>

          <div className="glass rounded-2xl p-6 border border-green-500/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Completed
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {stats.completed}
                </p>
              </div>
              <Award className="w-12 h-12 text-green-500 opacity-20" />
            </div>
          </div>

          <div className="glass rounded-2xl p-6 border border-orange-500/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Hours Learned
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {stats.totalHours}h
                </p>
              </div>
              <Clock className="w-12 h-12 text-orange-500 opacity-20" />
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-4 py-3 rounded-xl font-semibold transition-all ${
                filterStatus === 'all'
                  ? 'bg-brand-500 text-white'
                  : 'glass text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-surface'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterStatus('in-progress')}
              className={`px-4 py-3 rounded-xl font-semibold transition-all ${
                filterStatus === 'in-progress'
                  ? 'bg-purple-500 text-white'
                  : 'glass text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-surface'
              }`}
            >
              In Progress
            </button>
            <button
              onClick={() => setFilterStatus('completed')}
              className={`px-4 py-3 rounded-xl font-semibold transition-all ${
                filterStatus === 'completed'
                  ? 'bg-green-500 text-white'
                  : 'glass text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-surface'
              }`}
            >
              Completed
            </button>
          </div>
        </div>

        {/* Courses Grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="glass rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-brand-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-brand-500/10 group"
              >
                {/* Course Thumbnail */}
                <div className="relative h-40 bg-gradient-to-br from-brand-500 to-purple-500 overflow-hidden">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors"></div>

                  {/* Progress Badge */}
                  <div className="absolute top-3 right-3 bg-brand-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {course.progress}%
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                    {course.title}
                  </h3>

                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-4">
                    <Clock className="w-4 h-4 mr-2" />
                    {course.duration}
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                        Progress
                      </span>
                      <span className="text-xs font-bold text-brand-500">
                        {course.progress}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-brand-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="mb-4">
                    {course.progress === 100 ? (
                      <div className="flex items-center space-x-2 text-green-600 dark:text-green-400 text-sm font-semibold">
                        <Award className="w-4 h-4" />
                        <span>Completed</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2 text-purple-600 dark:text-purple-400 text-sm font-semibold">
                        <Play className="w-4 h-4" />
                        <span>In Progress</span>
                      </div>
                    )}
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleContinueLearning(course.id)}
                      className="flex-1 px-3 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-lg font-semibold transition-colors text-sm"
                    >
                      Continue Learning
                    </button>
                    <button
                      onClick={() => handleRemoveEnrollment(course.id)}
                      className="px-3 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <BookOpen className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No courses found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {enrolledCourses.length === 0
                ? "You haven't enrolled in any courses yet. Start learning today!"
                : 'No courses match your search criteria.'}
            </p>
            {enrolledCourses.length === 0 && (
              <button
                onClick={() => navigate('/free-courses')}
                className="px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white rounded-lg font-semibold transition-colors"
              >
                Explore Courses
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyLearning;
