import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../slices/authSlice';
import { authAPI } from '../services/api';
import { motion } from 'framer-motion';
import { User, Mail, Lock, ArrowRight, Globe, CheckCircle } from 'lucide-react';
import Button from '../components/Button';
import InputField from '../components/InputField';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    setLoading(true);
    try {
      const response = await authAPI.signup(name, email, password);
      dispatch(setCredentials(response.data));
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-brand-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
      <div className="absolute -bottom-32 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full space-y-8 z-10"
      >
        {/* Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center space-x-2 mb-6">
            <Globe className="h-8 w-8 text-brand-500" />
            <span className="font-bold text-2xl tracking-tight bg-gradient-to-r from-brand-500 to-purple-500 bg-clip-text text-transparent">
              Spokeny
            </span>
          </Link>
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white">
            Join Spokeny
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Unlock your language learning potential
          </p>
        </div>

        {/* Form Card */}
        <motion.form
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={submitHandler}
          className="glass p-8 rounded-3xl space-y-6"
        >
          {/* Error Alert */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-sm font-medium"
            >
              {error}
            </motion.div>
          )}

          {/* Name Field */}
          <InputField
            label="Full name"
            type="text"
            placeholder="John Doe"
            icon={User}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          {/* Email Field */}
          <InputField
            label="Email address"
            type="email"
            placeholder="you@example.com"
            icon={Mail}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Password Field */}
          <InputField
            label="Password"
            type="password"
            placeholder="••••••••"
            icon={Lock}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            error={password && password.length < 6 ? 'At least 6 characters' : ''}
          />

          {/* Submit Button */}
          <Button
            variant="primary"
            size="lg"
            type="submit"
            loading={loading}
            disabled={loading}
            className="w-full"
            icon={ArrowRight}
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </Button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-dark-bg text-gray-600 dark:text-gray-400">
                Already have an account?
              </span>
            </div>
          </div>

          {/* Sign In Link */}
          <Link to="/login" className="w-full">
            <Button variant="secondary" size="lg" className="w-full">
              Sign In Instead
            </Button>
          </Link>
        </motion.form>

        {/* Benefits */}
        <div className="glass rounded-2xl p-6 space-y-3">
          <p className="text-sm font-semibold text-gray-900 dark:text-white mb-4">What you get:</p>
          <div className="space-y-2">
            <div className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
              <span>Access to 1000+ free courses</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
              <span>AI-powered translation tool</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
              <span>Track your progress instantly</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-600 dark:text-gray-400">
          By signing up, you agree to our{' '}
          <a href="#" className="font-medium text-brand-500 hover:text-brand-600 transition-colors">
            Terms of Service
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;
