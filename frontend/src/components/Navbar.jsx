import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Globe, ShoppingCart, User as UserIcon, LogOut, BookOpen } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../slices/authSlice';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    setIsProfileOpen(false);
    navigate('/');
  };

  return (
    <nav className="fixed w-full z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Globe className="h-8 w-8 text-brand-500" />
              <span className="font-bold text-2xl tracking-tight bg-gradient-to-r from-brand-500 to-purple-500 bg-clip-text text-transparent">
                Spokeny
              </span>
            </Link>
          </div>

          <div className="hidden md:flex space-x-1 items-center">
            <Link to="/free-courses" className="px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-surface hover:text-brand-500 transition-colors font-medium">Free Courses</Link>
            <Link to="/paid-courses" className="px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-surface hover:text-brand-500 transition-colors font-medium">Premium</Link>
            <Link to="/translator" className="px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-surface hover:text-brand-500 transition-colors font-medium">AI Translator</Link>
            
            {userInfo && (
              <Link to="/my-learning" className="px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-surface hover:text-brand-500 transition-colors font-medium flex items-center gap-1">
                <BookOpen className="w-4 h-4" />
                My Learning
              </Link>
            )}
            
            <Link to="/cart" className="relative hover:text-brand-500 transition-colors">
              <ShoppingCart className="h-6 w-6" />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold">
                  {cartItems.length}
                </span>
              )}
            </Link>

            {userInfo ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 hover:text-brand-500 transition-colors"
                >
                  <UserIcon className="h-6 w-6" />
                  <span>{userInfo.name}</span>
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 glass rounded-2xl shadow-lg z-50 overflow-hidden">
                    <Link
                      to="/profile"
                      className="block px-4 py-3 hover:bg-gray-100 dark:hover:bg-dark-surface transition-colors border-b border-gray-200 dark:border-gray-700"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <span className="flex items-center space-x-2">
                        <UserIcon className="h-5 w-5" />
                        <span>My Profile</span>
                      </span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 transition-colors flex items-center space-x-2"
                    >
                      <LogOut className="h-5 w-5" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex space-x-4">
                <Link to="/login" className="px-4 py-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-surface transition-colors">
                  Login
                </Link>
                <Link to="/signup" className="px-4 py-2 rounded-full bg-brand-600 text-white hover:bg-brand-500 transition-colors shadow-lg shadow-brand-500/30">
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          <div className="md:hidden flex items-center gap-4">
            <Link to="/cart" className="relative hover:text-brand-500 transition-colors">
              <ShoppingCart className="h-6 w-6" />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold">
                  {cartItems.length}
                </span>
              )}
            </Link>
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-500 hover:text-gray-900 dark:hover:text-white focus:outline-none">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden glass border-t border-gray-200 dark:border-gray-700">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/free-courses" className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-dark-surface text-gray-700 dark:text-gray-300 hover:text-brand-500 transition-colors font-medium" onClick={() => setIsOpen(false)}>Free Courses</Link>
            <Link to="/paid-courses" className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-dark-surface text-gray-700 dark:text-gray-300 hover:text-brand-500 transition-colors font-medium" onClick={() => setIsOpen(false)}>Premium</Link>
            <Link to="/translator" className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-dark-surface text-gray-700 dark:text-gray-300 hover:text-brand-500 transition-colors font-medium" onClick={() => setIsOpen(false)}>AI Translator</Link>
            {userInfo && (
              <Link to="/my-learning" className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-dark-surface text-gray-700 dark:text-gray-300 hover:text-brand-500 transition-colors font-medium flex items-center gap-2" onClick={() => setIsOpen(false)}>
                <BookOpen className="w-4 h-4" />
                My Learning
              </Link>
            )}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-2 mt-2">
              {userInfo ? (
                <>
                  <Link
                    to="/profile"
                    className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-dark-surface text-gray-700 dark:text-gray-300 hover:text-brand-500 transition-colors font-medium flex items-center gap-2"
                    onClick={() => setIsOpen(false)}
                  >
                    <UserIcon className="h-5 w-5" />
                    My Profile
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-md hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 transition-colors flex items-center gap-2 font-medium"
                  >
                    <LogOut className="h-5 w-5" />
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link to="/login" className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-dark-surface text-gray-700 dark:text-gray-300 hover:text-brand-500 transition-colors font-medium text-center" onClick={() => setIsOpen(false)}>
                    Login
                  </Link>
                  <Link to="/signup" className="block px-3 py-2 rounded-md bg-brand-600 text-white hover:bg-brand-500 transition-colors font-medium text-center" onClick={() => setIsOpen(false)}>
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
