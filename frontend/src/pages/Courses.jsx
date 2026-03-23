import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { PlayCircle, Star, Clock, Lock } from 'lucide-react';
import { addToCart } from '../slices/cartSlice';

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

const CourseCard = ({ course }) => {
  const dispatch = useDispatch();
  const isPremium = course.price > 0;

  const handleAddToCart = () => {
    dispatch(addToCart(course));
    alert('Course added to cart!');
  };

  const handleStartLesson = () => {
    alert('Starting lesson: ' + course.title);
  };

  return (
    <div className="glass rounded-3xl overflow-hidden flex flex-col h-full border border-gray-200 dark:border-gray-800 hover:border-brand-500 transition-colors hover:-translate-y-1 hover:shadow-lg transition-transform">
      <div className="relative h-48 overflow-hidden group">
        <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full flex items-center space-x-1 text-sm text-white">
          <Star className="w-4 h-4 text-yellow-400" />
          <span>{course.rating.toFixed(1)}</span>
        </div>
        {isPremium && (
          <div className="absolute top-4 left-4 bg-brand-600/90 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-bold uppercase tracking-wide flex items-center space-x-1">
            <Lock className="w-3 h-3" />
            <span>Premium</span>
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <span className="text-sm font-semibold text-brand-500">{course.category}</span>
          <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
            <Clock className="w-4 h-4 mr-1" /> {course.duration}
          </span>
        </div>
        
        <h3 className="text-xl font-bold mb-2 line-clamp-2 dark:text-white">{course.title}</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-2 text-sm flex-grow">
          {course.description}
        </p>
        
        <div className="flex items-center justify-between mt-auto">
          <div className="text-2xl font-black text-gray-900 dark:text-white">
            {isPremium ? `$${course.price}` : <span className="text-green-500">Free</span>}
          </div>
          <button 
            onClick={isPremium ? handleAddToCart : handleStartLesson}
            className={`p-3 rounded-full flex items-center justify-center transition-colors ${
              isPremium ? 'bg-brand-600 text-white hover:bg-brand-500 shadow-lg shadow-brand-500/30' : 'bg-gray-100 dark:bg-dark-surface dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800'
            }`}
          >
            {isPremium ? <ShoppingCartIcon className="w-5 h-5"/> : <PlayCircle className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </div>
  );
};

// Temporary ShoppingCartIcon until I import it above
const ShoppingCartIcon = ({className}) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

export const CoursesPage = ({ type }) => {
  const [filter, setFilter] = useState('All');
  
  const courses = DUMMY_COURSES.filter(c => {
    if (type === 'free' && c.price > 0) return false;
    if (type === 'paid' && c.price === 0) return false;
    if (filter !== 'All' && c.category !== filter) return false;
    return true;
  });

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-12">
        <h1 className="text-4xl lg:text-5xl font-extrabold mb-4">
          {type === 'free' ? 'Explore Free Content' : 'Premium Courses'}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          {type === 'free' 
            ? 'Start your learning journey without spending a dime.' 
            : 'Unlock exclusive advanced courses and features.'}
        </p>
      </div>

      <div className="flex space-x-4 mb-8 overflow-x-auto pb-4">
        {['All', 'Language', 'Programming'].map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              filter === cat 
                ? 'bg-brand-600 text-white shadow-md' 
                : 'glass text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-surface'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {courses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 glass rounded-3xl">
          <p className="text-2xl text-gray-500">No courses found matching this criteria.</p>
        </div>
      )}
    </div>
  );
};
