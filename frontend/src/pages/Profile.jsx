import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LogOut, Mail, User, Calendar, Edit2 } from 'lucide-react';
import { logout } from '../slices/authSlice';

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: userInfo?.name || '',
    email: userInfo?.email || '',
  });

  // Redirect to login if not authenticated
  if (!userInfo) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    // TODO: Add API call to update user profile
    setIsEditing(false);
  };

  const joinedDate = userInfo?.createdAt
    ? new Date(userInfo.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'Recently';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-dark-bg dark:to-dark-surface py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Profile Card */}
        <div className="glass rounded-3xl overflow-hidden shadow-xl">
          {/* Header Background */}
          <div className="h-32 bg-gradient-to-r from-brand-500 to-purple-500"></div>

          {/* Profile Content */}
          <div className="px-6 py-8 sm:px-8">
            {/* Avatar and Basic Info */}
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 -mt-20 mb-8 relative z-10">
              <div className="w-32 h-32 rounded-full bg-gray-200 dark:bg-gray-700 border-4 border-white dark:border-dark-surface flex items-center justify-center">
                <User className="w-16 h-16 text-gray-400" />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {userInfo?.name}
                </h1>
                <p className="text-gray-600 dark:text-gray-400">Student</p>
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center gap-2 px-4 py-2 bg-brand-500 text-white rounded-full hover:bg-brand-600 transition-colors"
              >
                <Edit2 className="w-4 h-4" />
                Edit Profile
              </button>
            </div>

            {/* User Details */}
            {!isEditing ? (
              <div className="space-y-6 mb-8">
                {/* Email */}
                <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-dark-surface rounded-2xl">
                  <Mail className="w-6 h-6 text-brand-500 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Email Address</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      {userInfo?.email}
                    </p>
                  </div>
                </div>

                {/* Joined Date */}
                <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-dark-surface rounded-2xl">
                  <Calendar className="w-6 h-6 text-brand-500 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Member Since</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      {joinedDate}
                    </p>
                  </div>
                </div>

                {/* Role */}
                <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-dark-surface rounded-2xl">
                  <User className="w-6 h-6 text-brand-500 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Account Type</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      {userInfo?.role || 'Student'}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              /* Edit Form */
              <div className="space-y-6 mb-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-2xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled
                    className="w-full px-4 py-3 rounded-2xl border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white cursor-not-allowed opacity-60"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Email cannot be changed
                  </p>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={handleSaveChanges}
                    className="flex-1 px-4 py-3 bg-brand-500 text-white rounded-full hover:bg-brand-600 transition-colors font-semibold"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-full hover:bg-gray-100 dark:hover:bg-dark-surface transition-colors font-semibold"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors font-semibold"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>

        {/* Gamification Stats */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          <div className="glass rounded-2xl p-4 sm:p-6 text-center border-t-4 border-orange-500 shadow-md">
            <p className="text-2xl sm:text-3xl font-bold text-orange-500 flex items-center justify-center gap-2">
              🔥 {userInfo?.streak || 0}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Day Streak</p>
          </div>
          <div className="glass rounded-2xl p-4 sm:p-6 text-center border-t-4 border-brand-500 shadow-md">
            <p className="text-2xl sm:text-3xl font-bold text-brand-500">{userInfo?.xp || 0}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Total XP</p>
          </div>
          <div className="glass rounded-2xl p-4 sm:p-6 text-center border-t-4 border-purple-500 shadow-md">
            <p className="text-2xl sm:text-3xl font-bold text-purple-500">{Math.floor((userInfo?.studyTime || 0) / 60)}h {(userInfo?.studyTime || 0) % 60}m</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Study Time</p>
          </div>
          <div className="glass rounded-2xl p-4 sm:p-6 text-center border-t-4 border-pink-500 shadow-md">
            <p className="text-2xl sm:text-3xl font-bold text-pink-500">{userInfo?.badges?.length || 0}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Badges</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
