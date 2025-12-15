import React from 'react';
import { motion } from 'framer-motion';
import { Users, BookOpen, DollarSign, AlertCircle, TrendingUp, MoreHorizontal, ShieldCheck, ShieldAlert } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, LineChart, Line, XAxis, CartesianGrid } from 'recharts';

const userGrowthData = [
    { name: 'Jan', users: 400 },
    { name: 'Feb', users: 600 },
    { name: 'Mar', users: 1200 },
    { name: 'Apr', users: 1000 },
    { name: 'May', users: 1800 },
    { name: 'Jun', users: 2400 },
];

const sessionsData = [
    { name: 'Active', value: 400, color: '#4F46E5' },
    { name: 'Completed', value: 300, color: '#10B981' },
    { name: 'Cancelled', value: 50, color: '#EF4444' },
];

const AdminDashboard = () => {
    return (
        <div className="p-6 max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Admin Overview</h1>
                    <p className="text-gray-500 mt-1">Platform performance and user management.</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2 bg-white text-gray-700 border border-gray-200 rounded-xl font-medium hover:bg-gray-50"> Download Report</button>
                    <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 shadow-md"> Settings</button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { icon: <Users />, label: 'Total Users', value: '4', color: 'text-indigo-600', trend: '-' },
                    { icon: <BookOpen />, label: 'Total Sessions', value: '0', color: 'text-green-600', trend: '-' },
                    { icon: <DollarSign />, label: 'Revenue', value: '$0', color: 'text-violet-600', trend: '-' },
                    { icon: <AlertCircle />, label: 'Pending Verifications', value: '0', color: 'text-orange-600', trend: '-', trendColor: 'text-gray-600' },
                ].map((stat, idx) => (
                    <motion.div
                        key={idx}
                        className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-xl bg-gray-50 ${stat.color}`}>
                                {stat.icon}
                            </div>
                            <span className={`text-sm font-bold ${stat.trendColor || 'text-green-600'}`}>{stat.trend}</span>
                        </div>
                        <h3 className="text-3xl font-bold text-gray-900">{stat.value}</h3>
                        <p className="text-gray-500 font-medium">{stat.label}</p>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* User Growth Chart - EMPTY */}
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <h3 className="text-lg font-bold text-gray-900 mb-6">User Growth</h3>
                    <div className="h-64 flex items-center justify-center bg-gray-50 rounded-xl border border-dashed border-gray-200 text-gray-400">
                        Gathering data...
                    </div>
                </div>

                {/* Sessions Pie Chart - EMPTY */}
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col">
                    <h3 className="text-lg font-bold text-gray-900 mb-6">Session Status</h3>
                    <div className="h-64 flex items-center justify-center bg-gray-50 rounded-xl border border-dashed border-gray-200 text-gray-400">
                        No session data
                    </div>
                </div>
            </div>

            {/* Verification Table - EMPTY */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="text-lg font-bold text-gray-900">Pending Tutor Verifications</h3>
                    <span className="text-sm text-gray-500">0 Pending</span>
                </div>
                <div className="p-12 text-center text-gray-500">
                    No pending verifications. All caught up!
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
