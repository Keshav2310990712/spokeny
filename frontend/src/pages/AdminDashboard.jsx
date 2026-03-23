import React, { useState } from 'react';
import { Users, FileVideo, CheckSquare, DollarSign, Activity } from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { title: 'Total Users', value: '1,245', icon: Users, color: 'text-blue-500' },
    { title: 'Active Courses', value: '42', icon: FileVideo, color: 'text-purple-500' },
    { title: 'Quizzes Taken', value: '8,901', icon: CheckSquare, color: 'text-green-500' },
    { title: 'Revenue', value: '$12,450', icon: DollarSign, color: 'text-brand-500' },
  ];

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
      
      {/* Sidebar */}
      <div className="w-full md:w-64 glass p-6 rounded-3xl h-fit">
        <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white flex items-center">
          <Activity className="mr-2 text-brand-500" /> Admin Panel
        </h2>
        <nav className="space-y-2">
          {['overview', 'users', 'courses', 'payments'].map((tab) => (
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

      {/* Main Content */}
      <div className="flex-1 space-y-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, idx) => (
                <div key={idx} className="glass p-6 rounded-2xl border border-gray-200 dark:border-gray-800">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-gray-500 font-medium">{stat.title}</h3>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <p className="text-3xl font-extrabold text-gray-900 dark:text-white">{stat.value}</p>
                </div>
              ))}
            </div>
            
            <div className="glass p-8 rounded-3xl min-h-[400px]">
              <h3 className="text-2xl font-bold mb-6">Recent Activity Analytics</h3>
              <div className="flex items-center justify-center h-64 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl">
                 <p className="text-gray-500">Charting library rendering placeholder...</p>
              </div>
            </div>
          </div>
        )}

        {activeTab !== 'overview' && (
          <div className="glass p-8 rounded-3xl min-h-[500px]">
            <h3 className="text-2xl font-bold mb-6 capitalize">{activeTab} Management</h3>
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
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">Sample Data {item}</td>
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
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
