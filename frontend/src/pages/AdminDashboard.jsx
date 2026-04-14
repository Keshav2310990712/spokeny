import React, { useMemo, useState } from 'react';
import {
  Users,
  FileVideo,
  DollarSign,
  Activity,
  ShoppingCart,
  Trophy,
} from 'lucide-react';
import { useSelector } from 'react-redux';
import { COURSE_CATALOG } from '../data/courseCatalog';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { enrolledCourses } = useSelector((state) => state.enrollment);
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const overviewStats = useMemo(() => {
    const totalRevenue = enrolledCourses.reduce((sum, enrolledCourse) => {
      const course = COURSE_CATALOG.find((item) => item.id === enrolledCourse.id);
      return sum + (course?.price || 0);
    }, 0);

    const completedCourses = enrolledCourses.filter((course) => course.progress === 100).length;
    const inProgressCourses = enrolledCourses.filter(
      (course) => course.progress > 0 && course.progress < 100
    ).length;

    return [
      {
        title: 'Active Learners',
        value: enrolledCourses.length,
        icon: Users,
        color: 'text-blue-500',
      },
      {
        title: 'Courses In Catalog',
        value: COURSE_CATALOG.length,
        icon: FileVideo,
        color: 'text-purple-500',
      },
      {
        title: 'Completed Courses',
        value: completedCourses,
        icon: Trophy,
        color: 'text-green-500',
      },
      {
        title: 'Tracked Revenue',
        value: `$${totalRevenue.toFixed(2)}`,
        icon: DollarSign,
        color: 'text-brand-500',
      },
      {
        title: 'In Progress',
        value: inProgressCourses,
        icon: Activity,
        color: 'text-orange-500',
      },
      {
        title: 'Cart Items',
        value: cartItems.length,
        icon: ShoppingCart,
        color: 'text-pink-500',
      },
    ];
  }, [cartItems.length, enrolledCourses]);

  const categorySummary = useMemo(() => {
    const byCategory = COURSE_CATALOG.reduce((acc, course) => {
      const entry = acc[course.category] || {
        category: course.category,
        totalCourses: 0,
        totalEnrollments: 0,
        avgProgress: 0,
      };

      entry.totalCourses += 1;
      acc[course.category] = entry;
      return acc;
    }, {});

    enrolledCourses.forEach((enrolledCourse) => {
      const sourceCourse = COURSE_CATALOG.find((course) => course.id === enrolledCourse.id);
      if (!sourceCourse) {
        return;
      }

      byCategory[sourceCourse.category].totalEnrollments += 1;
      byCategory[sourceCourse.category].avgProgress += enrolledCourse.progress;
    });

    return Object.values(byCategory).map((entry) => ({
      ...entry,
      avgProgress:
        entry.totalEnrollments > 0
          ? Math.round(entry.avgProgress / entry.totalEnrollments)
          : 0,
    }));
  }, [enrolledCourses]);

  const topCourses = useMemo(() => {
    return COURSE_CATALOG.map((course) => {
      const enrollments = enrolledCourses.filter((item) => item.id === course.id);
      const avgProgress =
        enrollments.length > 0
          ? Math.round(
              enrollments.reduce((sum, item) => sum + item.progress, 0) / enrollments.length
            )
          : 0;

      return {
        id: course.id,
        title: course.title,
        category: course.category,
        price: course.price,
        enrollments: enrollments.length,
        avgProgress,
      };
    })
      .sort((a, b) => b.enrollments - a.enrollments || b.avgProgress - a.avgProgress)
      .slice(0, 6);
  }, [enrolledCourses]);

  const tabs = ['overview', 'users', 'courses', 'payments'];

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
      <div className="w-full md:w-72 glass p-6 rounded-3xl h-fit">
        <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white flex items-center">
          <Activity className="mr-2 text-brand-500" /> Admin Panel
        </h2>
        <nav className="space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`w-full text-left px-4 py-3 rounded-xl capitalize font-medium transition-colors ${
                activeTab === tab
                  ? 'bg-brand-500 text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-surface'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      <div className="flex-1 space-y-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {overviewStats.map((stat) => (
                <div
                  key={stat.title}
                  className="glass p-6 rounded-2xl border border-gray-200 dark:border-gray-800"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-gray-500 font-medium">{stat.title}</h3>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <p className="text-3xl font-extrabold text-gray-900 dark:text-white">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              <div className="glass p-8 rounded-3xl border border-gray-200 dark:border-gray-800">
                <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                  Category Snapshot
                </h3>
                <div className="space-y-4">
                  {categorySummary.map((entry) => (
                    <div
                      key={entry.category}
                      className="rounded-2xl p-4 bg-white/50 dark:bg-dark-surface/50"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {entry.category}
                        </p>
                        <p className="text-sm text-gray-500">
                          {entry.totalCourses} courses
                        </p>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                        <span>{entry.totalEnrollments} enrollments</span>
                        <span>{entry.avgProgress}% avg progress</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-brand-500 to-purple-500 h-2 rounded-full"
                          style={{ width: `${entry.avgProgress}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass p-8 rounded-3xl border border-gray-200 dark:border-gray-800">
                <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                  Top Performing Courses
                </h3>
                <div className="space-y-4">
                  {topCourses.map((course, index) => (
                    <div
                      key={course.id}
                      className="flex items-center justify-between gap-4 rounded-2xl p-4 bg-white/50 dark:bg-dark-surface/50"
                    >
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {index + 1}. {course.title}
                        </p>
                        <p className="text-sm text-gray-500">
                          {course.category} . {course.price > 0 ? `$${course.price}` : 'Free'}
                        </p>
                      </div>
                      <div className="text-right text-sm">
                        <p className="font-semibold text-brand-500">
                          {course.enrollments} enrollments
                        </p>
                        <p className="text-gray-500">{course.avgProgress}% avg progress</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab !== 'overview' && (
          <div className="glass p-8 rounded-3xl min-h-[500px] border border-gray-200 dark:border-gray-800">
            <h3 className="text-2xl font-bold mb-6 capitalize text-gray-900 dark:text-white">
              {activeTab} Management
            </h3>
            <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-dark-surface">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name/Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white/50 dark:bg-dark-surface/50 divide-y divide-gray-200 dark:divide-gray-700">
                  {[1, 2, 3].map((item) => (
                    <tr key={item} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">#{item}2345</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        Sample Data {item}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                          Active
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-brand-500 hover:text-brand-700">Edit</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {userInfo && (
              <p className="text-sm text-gray-500 mt-4">
                Signed in as {userInfo.name || userInfo.email || 'Admin user'}.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
