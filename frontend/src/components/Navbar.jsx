import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Globe, ShoppingCart, User as UserIcon } from 'lucide-react';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

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

          <div className="hidden md:flex space-x-8 items-center">
            <Link to="/free-courses" className="hover:text-brand-500 transition-colors">Free Courses</Link>
            <Link to="/paid-courses" className="hover:text-brand-500 transition-colors">Premium</Link>
            <Link to="/translator" className="hover:text-brand-500 transition-colors">AI Translator</Link>
            
            <Link to="/cart" className="relative hover:text-brand-500 transition-colors">
              <ShoppingCart className="h-6 w-6" />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold">
                  {cartItems.length}
                </span>
              )}
            </Link>

            {userInfo ? (
              <div className="flex items-center space-x-2">
                <UserIcon className="h-6 w-6" />
                <span>{userInfo.name}</span>
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

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-500 hover:text-gray-900 focus:outline-none">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden glass absolute top-16 left-0 w-full border-t border-gray-200 dark:border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/free-courses" className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-dark-surface">Free Courses</Link>
            <Link to="/paid-courses" className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-dark-surface">Premium</Link>
            <Link to="/translator" className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-dark-surface">AI Translator</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
