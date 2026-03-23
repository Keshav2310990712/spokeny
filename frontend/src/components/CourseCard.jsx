import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { PlayCircle, Star, Clock, Users, Lock, ShoppingCart, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Badge from './Badge';
import Button from './Button';

const CourseCard = ({ 
  course, 
  onEnroll, 
  onAddToCart,
  isEnrolled = false,
  isPremium = false,
  showStats = true,
  delay = 0,
}) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      onClick={() => navigate(`/course/${course.id}`)}
      className="glass rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-brand-500/50 transition-all duration-300 group cursor-pointer"
    >
      {/* Thumbnail Section */}
      <div className="relative h-48 bg-gradient-to-br from-brand-500 to-purple-500 overflow-hidden">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1516534775068-bb57102d3898?auto=format&fit=crop&q=80&w=500';
          }}
        />
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300"></div>

        {/* Badge Section */}
        <div className="absolute top-4 left-4 right-4 flex gap-2 flex-wrap">
          {isPremium && (
            <Badge variant="warning" size="sm" className="flex items-center gap-1">
              <Lock className="w-3 h-3" />
              Premium
            </Badge>
          )}
          {isEnrolled && (
            <Badge variant="success" size="sm" className="flex items-center gap-1">
              <CheckCircle className="w-3 h-3" />
              Enrolled
            </Badge>
          )}
        </div>

        {/* Price Badge */}
        {course.price > 0 ? (
          <div className="absolute bottom-3 right-3 bg-white/95 dark:bg-gray-900/95 rounded-lg px-3 py-2 font-bold text-brand-600 dark:text-brand-400">
            ${course.price.toFixed(2)}
          </div>
        ) : (
          <div className="absolute bottom-3 right-3 bg-green-500/90 rounded-lg px-3 py-2 font-bold text-white text-sm">
            Free
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col h-full">
        {/* Title */}
        <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-brand-500 transition-colors">
          {course.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 flex-shrink-0">
          {course.description}
        </p>

        {/* Stats Row */}
        {showStats && (
          <div className="flex flex-wrap gap-4 mb-4 text-xs text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{course.duration}</span>
            </div>
            {course.rating && (
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>{course.rating}</span>
              </div>
            )}
            {course.students && (
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>{course.students}</span>
              </div>
            )}
          </div>
        )}

        {/* Progress Bar (if enrolled) */}
        {isEnrolled && course.progress !== undefined && (
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">Progress</span>
              <span className="text-xs font-bold text-brand-500">{course.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${course.progress}%` }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="bg-gradient-to-r from-brand-500 to-purple-500 h-2 rounded-full"
              />
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 pt-4 border-t border-gray-200 dark:border-gray-700 mt-auto">
          {isEnrolled ? (
            <Button
              variant="primary"
              size="sm"
              className="flex-1 text-sm"
              icon={PlayCircle}
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/course/${course.id}`);
              }}
            >
              Continue
            </Button>
          ) : isPremium ? (
            <Button
              variant="secondary"
              size="sm"
              className="flex-1 text-sm"
              icon={ShoppingCart}
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart?.(course);
              }}
            >
              Add to Cart
            </Button>
          ) : (
            <Button
              variant="primary"
              size="sm"
              className="flex-1 text-sm"
              onClick={(e) => {
                e.stopPropagation();
                onEnroll?.(course);
              }}
            >
              Enroll Free
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default CourseCard;
