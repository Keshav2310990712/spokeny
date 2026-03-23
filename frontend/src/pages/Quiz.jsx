import React, { useState, useEffect, useCallback } from 'react';
import { Trophy, Clock, ArrowRight, RefreshCcw } from 'lucide-react';
import { Link } from 'react-router-dom';

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);

  const quizData = [
    {
      question: "Which hook is used to manage state in React?",
      options: ["useEffect", "useState", "useContext", "useReducer"],
      answer: "useState"
    },
    {
      question: "What does HTML stand for?",
      options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language", "Hyper Text Makeup Language"],
      answer: "Hyper Text Markup Language"
    },
    {
      question: "In what language is Spokeny's backend built?",
      options: ["Python", "Java", "Node.js/Express", "Ruby"],
      answer: "Node.js/Express"
    }
  ];

  const handleAnswerOptionClick = useCallback((isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizData.length) {
      setCurrentQuestion(nextQuestion);
      setTimeLeft(30);
    } else {
      setShowScore(true);
    }
  }, [score, currentQuestion, quizData.length]);

  useEffect(() => {
    if (timeLeft > 0 && !showScore) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    } else if (timeLeft === 0 && !showScore) {
      handleAnswerOptionClick(false);
    }
  }, [timeLeft, showScore, handleAnswerOptionClick]);

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-10 right-20 w-72 h-72 bg-brand-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animation-blob"></div>
      
      <div className="max-w-3xl w-full glass p-8 md:p-12 rounded-[2.5rem] z-10 shadow-2xl border border-white/20">
        {showScore ? (
          <div className="text-center">
            <Trophy className="w-24 h-24 mx-auto text-yellow-400 mb-6 drop-shadow-lg" />
            <h2 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-brand-500 to-purple-500 bg-clip-text text-transparent">
              Quiz Completed!
            </h2>
            <p className="text-2xl text-gray-700 dark:text-gray-300 mb-8">
              You scored <span className="font-bold text-brand-500">{score}</span> out of {quizData.length}
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button 
                onClick={() => {
                  setCurrentQuestion(0);
                  setScore(0);
                  setShowScore(false);
                  setTimeLeft(30);
                }}
                className="px-8 py-4 bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-brand-200 dark:hover:bg-brand-900/50 transition-colors"
               >
                <RefreshCcw size={20} /> Retry Quiz
              </button>
              <Link to="/paid-courses">
                <button className="px-8 py-4 bg-brand-600 text-white rounded-full font-bold flex items-center justify-center gap-2 shadow-lg shadow-brand-500/30 hover:bg-brand-500 transition-colors">
                  Next Lesson <ArrowRight size={20} />
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex justify-between items-end mb-8 border-b border-gray-200 dark:border-gray-700 pb-4">
               <div>
                 <span className="text-sm font-semibold text-brand-500 uppercase tracking-wider">Question {currentQuestion + 1} / {quizData.length}</span>
                 <h2 className="text-2xl md:text-3xl font-bold mt-2 text-gray-900 dark:text-white leading-tight">
                   {quizData[currentQuestion].question}
                 </h2>
               </div>
               <div className="flex items-center gap-2 px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full font-bold shrink-0">
                 <Clock size={18} /> {timeLeft}s
               </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quizData[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerOptionClick(option === quizData[currentQuestion].answer)}
                  className="p-6 text-left glass hover:-translate-y-1 transition-all rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-brand-500 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-brand-500 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-gray-800 dark:text-gray-200 font-medium text-lg">{option}</span>
                    <span className="w-8 h-8 rounded-full border-2 border-gray-300 dark:border-gray-600 flex items-center justify-center text-transparent group-hover:border-brand-500 group-hover:bg-brand-50 transition-colors">✓</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
