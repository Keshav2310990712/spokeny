import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { CoursesPage } from './pages/Courses';
import VoiceTranslator from './pages/VoiceTranslator';
import Cart from './pages/Cart';
import CourseDetail from './pages/CourseDetail';
import Quiz from './pages/Quiz';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/free-courses" element={<CoursesPage type="free" />} />
          <Route path="/paid-courses" element={<CoursesPage type="paid" />} />
          <Route path="/course/:id" element={<CourseDetail />} />
          <Route path="/quiz/:id" element={<Quiz />} />
          <Route path="/translator" element={<VoiceTranslator />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
