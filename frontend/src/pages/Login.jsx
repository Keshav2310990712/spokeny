import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../slices/authSlice';
import { authAPI } from '../services/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const response = await authAPI.signin(email, password);
      dispatch(setCredentials(response.data));
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animation-blob"></div>
      <div className="absolute top-0 right-10 w-72 h-72 bg-brand-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animation-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animation-blob animation-delay-4000"></div>

      <div className="max-w-md w-full glass p-8 rounded-3xl z-10">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900 dark:text-white mb-2">
            Welcome Back!
          </h2>
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            Sign in to continue your learning journey
          </p>
        </div>
        
        {error && (
          <div className="mt-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg text-sm">
            {error}
          </div>
        )}
        <form className="mt-8 space-y-6" onSubmit={submitHandler}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email address</label>
              <input
                type="email"
                required
                className="appearance-none rounded-xl relative block w-full px-4 py-3 border border-gray-300 dark:border-gray-700 bg-white/50 dark:bg-dark-surface/50 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 sm:text-sm transition-colors"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
              <input
                type="password"
                required
                className="appearance-none rounded-xl relative block w-full px-4 py-3 border border-gray-300 dark:border-gray-700 bg-white/50 dark:bg-dark-surface/50 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 sm:text-sm transition-colors"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-brand-600 hover:bg-brand-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-all shadow-lg hover:shadow-brand-500/50 disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            New to Spokeny?{' '}
            <Link to="/signup" className="font-medium text-brand-500 hover:text-brand-400 transition-colors">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
