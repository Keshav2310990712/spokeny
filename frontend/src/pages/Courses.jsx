import React, { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Search, Filter, X, Zap } from 'lucide-react';
import { addToCart } from '../slices/cartSlice';
import { enrollCourse } from '../slices/enrollmentSlice';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import CourseCard from '../components/CourseCard';
import Button from '../components/Button';
import SectionHeader from '../components/SectionHeader';
import InputField from '../components/InputField';

const LANGUAGES = [
  'Spanish', 'French', 'German', 'Italian', 'Portuguese', 'Russian', 'Japanese', 'Korean', 'Mandarin Chinese', 'Arabic',
  'Hindi', 'Bengali', 'Urdu', 'Indonesian', 'Turkish', 'Vietnamese', 'Thai', 'Dutch', 'Polish', 'Greek',
  'Czech', 'Swedish', 'Danish', 'Finnish', 'Norwegian', 'Hungarian', 'Romanian', 'Bulgarian', 'Serbian', 'Croatian',
  'Slovak', 'Slovenian', 'Lithuanian', 'Latvian', 'Estonian', 'Hebrew', 'Persian (Farsi)', 'Swahili', 'Amharic', 'Yoruba',
  'Zulu', 'Afrikaans', 'Tagalog', 'Malay', 'Tamil', 'Telugu', 'Marathi', 'Gujarati', 'Punjabi', 'Kannada'
];

const PROGRAMMING = [
  'JavaScript', 'Python', 'Java', 'C++', 'C#', 'Ruby', 'PHP', 'Swift', 'Kotlin', 'Go',
  'Rust', 'TypeScript', 'SQL', 'HTML/CSS', 'Bash/Shell', 'R', 'MATLAB', 'Scala', 'Perl', 'Haskell'
];

const DUMMY_COURSES = [
  // --- FREE TIER LANGUAGES ---
  ...LANGUAGES.map((lang, index) => ({
    id: `free_lang_${index + 1}`,
    title: `${lang} for Beginners`,
    description: `Learn basic conversational phrases in ${lang} completely free.`,
    category: 'Language',
    price: 0,
    thumbnail: `https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&q=80&w=500&sig=${index}`,
    duration: '5h 00m',
    rating: Number((Math.random() * (4.8 - 4.2) + 4.2).toFixed(1)),
  })),

  // --- PREMIUM TIER LANGUAGES ---
  ...LANGUAGES.map((lang, index) => ({
    id: `premium_lang_${index + 1}`,
    title: `Advanced ${lang} Masterclass`,
    description: `Achieve full fluency and cultural nuances in ${lang} with premium AI coaching.`,
    category: 'Language',
    price: 49.99,
    thumbnail: `https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&q=80&w=500&sig=${index + 100}`,
    duration: '35h 00m',
    rating: Number((Math.random() * (5.0 - 4.6) + 4.6).toFixed(1)),
  })),

  // --- FREE TIER PROGRAMMING ---
  ...PROGRAMMING.map((prog, index) => ({
    id: `free_prog_${index + 1}`,
    title: `Introduction to ${prog}`,
    description: `A free crash course into the syntax and basics of ${prog}.`,
    category: 'Programming',
    price: 0,
    thumbnail: `https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?auto=format&fit=crop&q=80&w=500&sig=${index + 200}`,
    duration: '8h 30m',
    rating: Number((Math.random() * (4.7 - 4.1) + 4.1).toFixed(1)),
  })),

  // --- PREMIUM TIER PROGRAMMING ---
  ...PROGRAMMING.map((prog, index) => ({
    id: `premium_prog_${index + 1}`,
    title: `Full-Stack ${prog} Engineering`,
    description: `Enterprise-level system design and advanced paradigms in ${prog}.`,
    category: 'Programming',
    price: 99.99,
    thumbnail: `https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=500&sig=${index + 300}`,
    duration: '60h 00m',
    rating: Number((Math.random() * (5.0 - 4.7) + 4.7).toFixed(1)),
  }))
];

export const CoursesPage = ({ type }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const { enrolledCourses } = useSelector((state) => state.enrollment);

  // Filter courses
  const filteredCourses = useMemo(() => {
    return DUMMY_COURSES.filter((course) => {
      // Filter by type
      if (type === 'free' && course.price > 0) return false;
      if (type === 'paid' && course.price === 0) return false;

      // Filter by category
      if (selectedCategory !== 'All' && course.category !== selectedCategory) return false;

      // Filter by search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        return (
          course.title.toLowerCase().includes(query) ||
          course.description.toLowerCase().includes(query)
        );
      }

      return true;
    });
  }, [type, selectedCategory, searchQuery]);

  const handleEnroll = (course) => {
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
      })
    );
  };

  const handleAddToCart = (course) => {
    dispatch(addToCart(course));
  };

  const categories = ['All', 'Language', 'Programming'];

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <section className="relative pt-20 pb-12 bg-gradient-to-br from-brand-600/5 via-purple-600/3 to-transparent border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-brand-500/10 text-brand-500 font-semibold">
              <span className="relative flex h-2 w-2">
                <span className="animate-pulse absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
              </span>
              <span className="text-sm">{type === 'free' ? '🎓 Free Learning' : '⭐ Premium Courses'}</span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white">
              {type === 'free' ? 'Explore Free Content' : 'Premium Courses'}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl">
              {type === 'free'
                ? 'Start your learning journey with high-quality free courses. No credit card required.'
                : 'Unlock advanced courses with AI coaching, personalized learning paths, and certifications.'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters & Search Section */}
      <section className="sticky top-16 z-40 bg-white dark:bg-dark-bg/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          {/* Search Bar */}
          <div className="flex gap-4 items-center">
            <div className="flex-1">
              <InputField
                placeholder="Search courses..."
                icon={Search}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <motion.button
                key={cat}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-brand-600 to-brand-500 text-white shadow-lg shadow-brand-500/30'
                    : 'glass text-gray-700 dark:text-gray-300 hover:border-brand-500 border-2 border-transparent'
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>

          {/* Results Count */}
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''} found
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            {filteredCourses.length > 0 ? (
              <motion.div
                key="courses"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredCourses.map((course, idx) => {
                  const isEnrolled = enrolledCourses.some((c) => c.id === course.id);
                  return (
                    <CourseCard
                      key={course.id}
                      course={course}
                      isEnrolled={isEnrolled}
                      isPremium={course.price > 0}
                      onEnroll={() => handleEnroll(course)}
                      onAddToCart={() => handleAddToCart(course)}
                      delay={idx * 0.05}
                    />
                  );
                })}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="text-center py-20"
              >
                <div className="glass rounded-3xl p-12 max-w-md mx-auto">
                  <Search className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    No courses found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Try adjusting your search or filters
                  </p>
                  <Button
                    variant="primary"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('All');
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
};

export default CoursesPage;
