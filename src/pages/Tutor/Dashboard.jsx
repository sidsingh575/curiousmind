import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Users, Clock, Star, Calendar, ArrowUpRight, MessageSquare, MoreVertical, X, Check } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const earningsData = [
    { name: 'Mon', amount: 120 },
    { name: 'Tue', amount: 200 },
    { name: 'Wed', amount: 150 },
    { name: 'Thu', amount: 300 },
    { name: 'Fri', amount: 250 },
    { name: 'Sat', amount: 400 },
    { name: 'Sun', amount: 100 },
];

const TutorDashboard = () => {
    return (
        <div className="p-6 max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Tutor Dashboard</h1>
                    <p className="text-gray-500 mt-1">Manage your sessions and track your earnings.</p>
                </div>
                <button className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors shadow-lg">
                    <Calendar size={18} />
                    Availability
                </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { icon: <DollarSign className="text-green-600" />, label: 'Total Earnings', value: '$0', sub: 'Started', color: 'bg-green-50' },
                    { icon: <Users className="text-blue-600" />, label: 'Active Students', value: '0', sub: 'No students yet', color: 'bg-blue-50' },
                    { icon: <Clock className="text-orange-600" />, label: 'Teaching Hours', value: '0h', sub: 'Lifetime', color: 'bg-orange-50' },
                    { icon: <Star className="text-yellow-500" />, label: 'Rating', value: '-', sub: 'No reviews', color: 'bg-yellow-50' },
                ].map((stat, idx) => (
                    <motion.div
                        key={idx}
                        className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                                {stat.icon}
                            </div>
                            <span className="text-xs font-semibold text-gray-400 bg-gray-50 px-2 py-1 rounded-md">
                                {stat.sub}
                            </span>
                        </div>
                        <h3 className="text-3xl font-bold text-gray-900">{stat.value}</h3>
                        <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content: Earnings & Requests */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Earnings Chart - EMPTY */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-bold text-gray-900">Earnings Overview</h3>
                        </div>
                        <div className="h-72 flex flex-col items-center justify-center bg-gray-50 rounded-xl border border-dashed border-gray-200 text-gray-400">
                            <DollarSign size={48} className="mb-2 opacity-20" />
                            No earnings data to display
                        </div>
                    </div>

                    {/* Session Requests - EMPTY */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                            <h3 className="text-lg font-bold text-gray-900">Session Requests</h3>
                            <span className="bg-gray-100 text-gray-600 text-xs font-bold px-3 py-1 rounded-full">0 New</span>
                        </div>
                        <div className="p-12 text-center text-gray-500">
                            <p>No new session requests.</p>
                        </div>
                    </div>
                </div>

                {/* Sidebar: Upcoming Schedule - EMPTY */}
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm h-fit">
                    <h3 className="text-lg font-bold text-gray-900 mb-6">Upcoming Schedule</h3>
                    <div className="py-8 text-center text-gray-400 text-sm border-2 border-dashed border-gray-100 rounded-xl">
                        No upcoming sessions
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TutorDashboard;
