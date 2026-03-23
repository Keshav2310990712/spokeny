import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mic, BookOpen, Star, PlayCircle, ArrowRight, Clock, Users, Zap, Award } from 'lucide-react';
import { useSelector } from 'react-redux';
import Avatar3D from '../components/Avatar3D';
import Button from '../components/Button';
import SectionHeader from '../components/SectionHeader';
import CourseCard from '../components/CourseCard';
import StatCard from '../components/StatCard';

// eslint-disable-next-line no-unused-vars
const FeatureCard = ({ icon: Icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    viewport={{ once: true }}
    className="p-6 rounded-2xl glass hover:-translate-y-2 transition-transform duration-300 border border-gray-200 dark:border-gray-700 group"
  >
    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-500 to-purple-500 flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
      <Icon size={28} />
    </div>
    <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{title}</h3>
    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{description}</p>
  </motion.div>
);

const Home = () => {
  const navigate = useNavigate();
  const { enrolledCourses } = useSelector((state) => state.enrollment);
  const { userInfo } = useSelector((state) => state.auth);
  
  // Get in-progress courses (progress > 0 and < 100)
  const inProgressCourses = enrolledCourses
    .filter((c) => c.progress > 0 && c.progress < 100)
    .slice(0, 3);

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-600/5 via-purple-600/3 to-transparent pointer-events-none" />
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-brand-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute -bottom-32 left-20 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-brand-500/10 text-brand-500 font-semibold">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-500"></span>
                </span>
                <span>🎉 Next-Gen AI Learning Platform</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight">
                Master Any <span className="bg-gradient-to-r from-brand-500 to-purple-500 bg-clip-text text-transparent">Language</span> with AI Voice
              </h1>
              
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-lg leading-relaxed">
                Spokeny fuses Udemy's structured learning with Duolingo's gamification. Chat with our AI Translator and unlock premium programming languages too.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-4">
                <Link to="/free-courses">
                  <Button variant="primary" size="lg" icon={Zap}>
                    Start Learning Free
                  </Button>
                </Link>
                <Link to="/translator">
                  <Button variant="secondary" size="lg" icon={Mic}>
                    Try AI Translator
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="space-y-1">
                  <p className="text-3xl font-bold text-brand-500">50+</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Languages</p>
                </div>
                <div className="space-y-1">
                  <p className="text-3xl font-bold text-purple-500">1000+</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Courses</p>
                </div>
                <div className="space-y-1">
                  <p className="text-3xl font-bold text-orange-500">50K+</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Learners</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative h-[500px] lg:h-[600px] rounded-3xl overflow-hidden glass border border-gray-200 dark:border-gray-700 flex items-center justify-center p-4 group shadow-2xl"
            >
              <div className="absolute top-4 left-4 right-4 z-20 text-center pointer-events-none">
                <p className="inline-block bg-white/20 backdrop-blur-md px-4 py-1 rounded-full text-sm font-semibold text-brand-300 border border-brand-500/30">
                  ✨ Meet Spokeny AI Assistant
                </p>
              </div>
              <Avatar3D />
              
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-black/50 backdrop-blur-lg border border-white/10 text-white transform translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                <p className="text-sm">"Hello! I'm your interactive AI tutor. Rotate me to explore, and let's start learning!"</p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white/50 dark:bg-dark-surface/50 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            subtitle="Why Choose Spokeny?"
            title="Powerful Features for Effective Learning"
            description="Everything you need to master languages and programming - from structured courses to AI-powered assistance."
          />
           
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={Mic}
              title="Real-Time Translation"
              description="Speak in your language, hear the translation instantly. Powered by AI & Web Speech API."
              delay={0.1}
            />
            <FeatureCard 
              icon={BookOpen}
              title="Structured Courses"
              description="From languages to programming. High-quality free & premium learning paths."
              delay={0.2}
            />
            <FeatureCard 
              icon={Zap}
              title="Gamified Learning"
              description="Interactive timer-based quizzes that boost vocabulary retention and engagement."
              delay={0.3}
            />
            <FeatureCard 
              icon={Award}
              title="Earn Certificates"
              description="Get recognized certificates upon course completion to showcase your achievements."
              delay={0.4}
            />
          </div>
        </div>
      </section>

      {/* Continue Learning Section */}
      {userInfo && inProgressCourses.length > 0 && (
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end mb-12">
              <div>
                <SectionHeader
                  title="Continue Learning"
                  description="Pick up where you left off"
                  centered={false}
                />
              </div>
              <Link to="/my-learning">
                <Button variant="secondary" size="md" icon={ArrowRight}>
                  View All Courses
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {inProgressCourses.map((course, idx) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  isEnrolled={true}
                  delay={idx * 0.1}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      {!userInfo && (
        <section className="py-24 bg-gradient-to-r from-brand-600 to-purple-600 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl"></div>
          </div>
          
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-white">
                Ready to Start Your Learning Journey?
              </h2>
              <p className="text-xl text-brand-100 max-w-2xl mx-auto leading-relaxed">
                Join thousands of learners achieving fluency and mastering programming with Spokeny's AI-powered platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link to="/signup">
                  <Button variant="primary" size="lg" className="w-full sm:w-auto">
                    Create Free Account
                  </Button>
                </Link>
                <Link to="/free-courses">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto border-white text-white hover:bg-white/10 hover:border-white">
                    Explore Free Courses
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;
