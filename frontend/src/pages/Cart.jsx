import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, CreditCard, Lock } from 'lucide-react';
import { removeFromCart, clearCart } from '../slices/cartSlice';
import { orderAPI } from '../services/api';

const Cart = () => {
  const cartItems = useSelector(state => state.cart.cartItems);
  const { userInfo } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = async () => {
    if (!userInfo) {
      alert('Please sign in to continue');
      navigate('/login');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      // Create order for each item in cart
      for (const item of cartItems) {
        await orderAPI.createOrder(item.id, item.price);
      }
      
      alert('Purchase successful! Check your email for confirmation.');
      dispatch(clearCart());
      navigate('/');
    } catch (err) {
      const message = err.response?.data?.message || 'Checkout failed. Please try again.';
      setError(message);
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <h1 className="text-4xl font-extrabold mb-8 text-gray-900 dark:text-white">Shopping Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="glass p-12 rounded-3xl text-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-600 dark:text-gray-300">Your cart is empty</h2>
          <p className="mb-8 text-gray-500">Looks like you haven't added any premium courses yet.</p>
          <Link to="/paid-courses">
            <button className="px-8 py-3 bg-brand-600 text-white rounded-full font-semibold hover:bg-brand-500 transition-colors shadow-lg">
              Explore Premium
            </button>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-grow space-y-6">
            {cartItems.map((item) => (
              <div key={item._id} className="glass p-6 rounded-2xl flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-200 flex-shrink-0">
                     <img src={item.thumbnail || 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&q=80&w=200'} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold dark:text-white">{item.title}</h3>
                    <p className="text-gray-500 text-sm">{item.category}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <span className="text-2xl font-black text-brand-500">${item.price}</span>
                  <button 
                    onClick={() => removeFromCartHandler(item._id)}
                    className="p-3 text-red-500 bg-red-50 dark:bg-red-900/10 rounded-full hover:bg-red-100 transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="w-full lg:w-[400px]">
            <div className="glass p-8 rounded-3xl sticky top-24">
              <h3 className="text-2xl font-bold mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">Order Summary</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Subtotal ({cartItems.length} items)</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Discount</span>
                  <span className="text-green-500">-$0.00</span>
                </div>
                <div className="flex justify-between text-xl font-black pt-4 border-t border-gray-200 dark:border-gray-700">
                  <span>Total</span>
                  <span className="text-brand-500">${subtotal.toFixed(2)}</span>
                </div>
              </div>
              
              {error && (
                <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg text-sm">
                  {error}
                </div>
              )}
              
              <button 
                onClick={checkoutHandler}
                disabled={loading}
                className="w-full py-4 bg-gray-900 dark:bg-white dark:text-gray-900 text-white rounded-xl font-bold text-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors shadow-lg flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                <CreditCard size={20} />
                <span>{loading ? 'Processing...' : 'Checkout Now'}</span>
              </button>
              
              <p className="mt-4 text-xs text-center text-gray-500 flex items-center justify-center">
                <Lock size={12} className="mr-1" /> Secure SSL simulated payment
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
