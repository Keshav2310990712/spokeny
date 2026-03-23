import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { PlayCircle, CheckCircle, Award } from 'lucide-react';

const CourseDetail = () => {
  useParams();

  // Mock data for display
  const course = {
    title: 'Advanced AI Voice Agents',
    description: 'Learn how to build AI agents using generative AI.',
    progress: 40,
    lessons: [
      { id: 1, title: 'Introduction to AI Voice', completed: true, duration: '15:00' },
      { id: 2, title: 'Web Speech API Basics', completed: true, duration: '20:30' },
      { id: 3, title: 'Connecting to Generative AI', completed: false, duration: '35:00' },
      { id: 4, title: 'Building the Translator UI', completed: false, duration: '40:15' },
    ]
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="glass p-8 rounded-3xl mb-8 border border-brand-500/20">
        <div className="flex justify-between items-start flex-col md:flex-row gap-6">
          <div>
            <h1 className="text-3xl font-extrabold mb-2 dark:text-white">{course.title}</h1>
            <p className="text-gray-500 dark:text-gray-400 mb-6">{course.description}</p>
            
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 max-w-md">
                <div className="bg-brand-500 h-2.5 rounded-full" style={{ width: `${course.progress}%` }}></div>
              </div>
              <span className="text-sm font-bold text-brand-500">{course.progress}% Completed</span>
            </div>
          </div>

          <div className="flex flex-col gap-3 min-w-[200px]">
            <Link to="/quiz/1">
              <button className="w-full py-3 px-6 bg-brand-600 hover:bg-brand-500 text-white rounded-xl font-bold flex items-center justify-center space-x-2 transition-colors">
                <Award size={20}/>
                <span>Take Course Quiz</span>
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 dark:text-white">
          <PlayCircle className="text-brand-500" /> Course Curriculum
        </h2>
        
        {course.lessons.map((lesson, idx) => (
          <div key={lesson.id} className="glass p-5 rounded-2xl flex items-center justify-between hover:-translate-y-1 transition-transform group border border-transparent hover:border-brand-500/30">
            <div className="flex items-center space-x-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-inner ${
                lesson.completed ? 'bg-green-100 text-green-600 dark:bg-green-900/30' : 'bg-brand-100 text-brand-600 dark:bg-brand-900/30'
              }`}>
                {lesson.completed ? <CheckCircle size={20} /> : idx + 1}
              </div>
              <div>
                <h3 className={`font-semibold ${lesson.completed ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                  {lesson.title}
                </h3>
                <p className="text-sm text-gray-500">{lesson.duration}</p>
              </div>
            </div>
            
            <button className={`p-3 rounded-full transition-all ${
              lesson.completed 
                ? 'bg-transparent text-gray-400 hover:text-brand-500' 
                : 'bg-brand-500 text-white shadow-lg shadow-brand-500/30 group-hover:scale-110'
            }`}>
              <PlayCircle size={20} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseDetail;
