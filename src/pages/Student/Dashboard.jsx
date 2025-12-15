import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Book, Calendar, TrendingUp, Search, Star, Video } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Mon', hours: 2 },
    { name: 'Tue', hours: 1 },
    { name: 'Wed', hours: 3 },
    { name: 'Thu', hours: 1.5 },
    { name: 'Fri', hours: 2 },
    { name: 'Sat', hours: 4 },
    { name: 'Sun', hours: 1 },
];

const StudentDashboard = () => {
    return (
        <div className="p-6 max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Welcome back, Alex! 👋</h1>
                    <p className="text-gray-500 mt-1">Here's what's happening with your learning journey.</p>
                </div>
                <div className="flex gap-4">
                    <button className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl font-medium hover:bg-indigo-100 transition-colors">
                        <Search size={20} />
                        Find Tutors
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { icon: <Clock className="text-blue-600" />, label: 'Hours Learned', value: '0', color: 'bg-blue-50' },
                    { icon: <Book className="text-violet-600" />, label: 'Sessions Completed', value: '0', color: 'bg-violet-50' },
                    { icon: <Calendar className="text-pink-600" />, label: 'Upcoming', value: '0', color: 'bg-pink-50' },
                    { icon: <TrendingUp className="text-green-600" />, label: 'Avg. Score', value: '-', color: 'bg-green-50' },
                ].map((stat, idx) => (
                    <motion.div
                        key={idx}
                        className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
                    >
                        <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
                            {stat.icon}
                        </div>
                        <h3 className="text-3xl font-bold text-gray-900">{stat.value}</h3>
                        <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content: Upcoming & Learning Chart */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Upcoming Session Card - EMPTY STATE */}
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center py-16">
                        <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mb-4 text-indigo-500">
                            <Calendar size={32} />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 mb-2">No Upcoming Sessions</h2>
                        <p className="text-gray-500 mb-6">Book your first session to get started.</p>
                        <button className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors">
                            Find a Tutor
                        </button>
                    </div>

                    {/* Activity Chart - EMPTY STATE */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <h3 className="text-lg font-bold text-gray-900 mb-6">Weekly Learning Activity</h3>
                        <div className="h-64 flex items-center justify-center text-gray-400 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                            No activity data available yet
                        </div>
                    </div>
                </div>

                {/* Sidebar: Recommended Tutors */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm h-full">
                        <h3 className="text-lg font-bold text-gray-900 mb-6">Recommended Tutors</h3>
                        <div className="text-center py-8 text-gray-500">
                            <p>Discover tutors to help you learn.</p>
                            <button className="w-full mt-4 py-3 bg-indigo-50 text-indigo-600 rounded-xl font-medium hover:bg-indigo-100 transition-colors text-sm">
                                View All Tutors
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;
