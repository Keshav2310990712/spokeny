import React from 'react';
import { Link } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Mic, BookOpen, Star, PlayCircle } from 'lucide-react';
import Avatar3D from '../components/Avatar3D';

// eslint-disable-next-line no-unused-vars
const FeatureCard = ({ icon: Icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    viewport={{ once: true }}
    className="p-6 rounded-2xl glass hover:-translate-y-2 transition-transform duration-300"
  >
    <div className="w-12 h-12 rounded-full bg-brand-500/20 flex items-center justify-center text-brand-500 mb-4">
      <Icon size={24} />
    </div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-500 dark:text-gray-400">{description}</p>
  </motion.div>
);

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-600/10 via-purple-600/5 to-transparent z-0 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-brand-500/10 text-brand-500 font-semibold mb-6">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-500"></span>
                </span>
                <span>Next-Gen AI Language Platform</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-6">
                Master Any Language with <span className="bg-gradient-to-r from-brand-500 to-purple-500 bg-clip-text text-transparent">AI Voice</span>
              </h1>
              
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-lg leading-relaxed">
                Spokeny fuses Udemy's structured learning with Duolingo's gamification. Chat with our Real-time AI Translator and unlock premium programming languages too.
              </p>
              
              <div className="flex flex-wrap gap-4 mt-8">
                <Link to="/free-courses">
                  <button className="px-8 py-4 rounded-full bg-brand-600 text-white font-bold text-lg hover:bg-brand-500 transition-all shadow-[0_0_20px_rgba(79,70,229,0.4)] hover:shadow-[0_0_30px_rgba(79,70,229,0.6)] hover:-translate-y-1">
                    Start Learning Free
                  </button>
                </Link>
                <Link to="/translator">
                  <button className="px-8 py-4 rounded-full border-2 border-brand-500 text-brand-500 font-bold text-lg hover:bg-brand-500/10 transition-all">
                    Try AI Translator
                  </button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative h-[500px] w-full lg:h-[600px] rounded-3xl overflow-hidden glass flex items-center justify-center p-4 group"
            >
              <div className="absolute top-4 left-4 right-4 z-20 text-center pointer-events-none">
                <p className="inline-block bg-white/10 backdrop-blur-md px-4 py-1 rounded-full text-sm font-semibold text-brand-300 border border-brand-500/30">
                  Meet Spokeny AI Assistant
                </p>
              </div>
              <Avatar3D />
              
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-black/40 backdrop-blur-lg border border-white/10 text-white transform translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                <p className="text-sm">"Hello! I'm your interactive AI tutor. Rotate me to explore, and let's start learning!"</p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white/50 dark:bg-dark-surface/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose Spokeny?</h2>
            <p className="text-xl text-gray-500">The ultimate combination of structure, fun, and AI power.</p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
             <FeatureCard 
               icon={Mic}
               title="Real-Time Translation"
               description="Speak in your language, hear the translation instantly. Powered by Web Speech API & Generative AI."
               delay={0.1}
             />
             <FeatureCard 
               icon={BookOpen}
               title="Structured Courses"
               description="From standard languages to programming languages logic. High-quality free & premium paths."
               delay={0.2}
             />
             <FeatureCard 
               icon={PlayCircle}
               title="Gamified Quizzes"
               description="Learn through interactive timer-based games that boost vocabulary retention."
               delay={0.3}
             />
             <FeatureCard 
               icon={Star}
               title="Progress & Certificates"
               description="Track your entire journey and earn shareable certificates upon premium completion."
               delay={0.4}
             />
           </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
