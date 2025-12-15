import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Star, MapPin, BookOpen, Filter, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '../components/common/Navbar';
import { useSocket } from '../context/SocketContext';

const Tutors = () => {
    const navigate = useNavigate();

    // Filter States
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedSubject, setSelectedSubject] = useState("All");
    const [selectedGrade, setSelectedGrade] = useState("All");
    const [selectedStatus, setSelectedStatus] = useState("All");
    const [location, setLocation] = useState("");

    const [tutors, setTutors] = useState([]);
    const [loading, setLoading] = useState(true);

    const { socket } = useSocket();

    // Fetch tutors with filters
    const fetchTutors = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            if (searchTerm) params.append('search', searchTerm);
            if (selectedSubject !== "All") params.append('subject', selectedSubject);
            if (selectedGrade !== "All") params.append('classGrade', selectedGrade);
            if (selectedStatus === "Online") params.append('isOnline', 'true');
            if (location) params.append('location', location);

            const res = await fetch(`/api/auth/tutors?${params.toString()}`);
            if (res.ok) {
                const data = await res.json();
                setTutors(data);
            }
        } catch (err) {
            console.error("Failed to fetch tutors", err);
        } finally {
            setLoading(false);
        }
    };

    // Refetch when filters change
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            fetchTutors();
        }, 500); // Debounce search
        return () => clearTimeout(timeoutId);
    }, [searchTerm, selectedSubject, selectedGrade, selectedStatus, location]);

    useEffect(() => {
        if (!socket) return;

        const handleStatusChange = ({ userId, isOnline }) => {
            setTutors(prevTutors => prevTutors.map(tutor =>
                tutor._id === userId ? { ...tutor, isOnline } : tutor
            ));
        };

        socket.on('user_status_changed', handleStatusChange);

        return () => {
            socket.off('user_status_changed', handleStatusChange);
        };
    }, [socket]);

    const handleViewProfile = (tutorId) => {
        // navigate(`/tutor/${tutorId}`);
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            {/* Helper spacing for fixed navbar */}
            <div className="h-20 md:h-24"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
                        Find your perfect <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">tutor</span>.
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Connect with top-tier educators from around the world. Verified, reviewed, and ready to help you excel.
                    </p>
                </div>

                {/* Search and Filters Container */}
                <div className="bg-white rounded-2xl shadow-xl p-6 mb-16 border border-gray-100 space-y-4">

                    {/* Top Row: Search + Location */}
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-[2]">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search by name, subject, or keyword..."
                                className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all font-medium"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="relative flex-1">
                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Location (e.g. NY)"
                                className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all font-medium"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Bottom Row: Filters */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <select
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 bg-white font-medium cursor-pointer"
                            value={selectedSubject}
                            onChange={(e) => setSelectedSubject(e.target.value)}
                        >
                            <option value="All">All Subjects</option>
                            <option value="Physics">Physics</option>
                            <option value="Calculus">Calculus</option>
                            <option value="Python">Python</option>
                            <option value="English">English</option>
                            <option value="Mathematics">Mathematics</option>
                            <option value="Chemistry">Chemistry</option>
                        </select>

                        <select
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 bg-white font-medium cursor-pointer"
                            value={selectedGrade}
                            onChange={(e) => setSelectedGrade(e.target.value)}
                        >
                            <option value="All">All Levels</option>
                            <option value="K-12">K-12</option>
                            <option value="College">College</option>
                            <option value="Professional">Professional</option>
                        </select>

                        <select
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 bg-white font-medium cursor-pointer"
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                        >
                            <option value="All">Any Status</option>
                            <option value="Online">Online Now</option>
                        </select>

                        <button
                            onClick={() => {
                                setSearchTerm("");
                                setSelectedSubject("All");
                                setSelectedGrade("All");
                                setSelectedStatus("All");
                                setLocation("");
                            }}
                            className="w-full px-6 py-3 bg-gray-100 text-gray-600 rounded-xl font-bold hover:bg-gray-200 transition-colors"
                        >
                            Reset Filters
                        </button>
                    </div>
                </div>

                {/* Tutors Grid */}
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {tutors.length > 0 ? (
                            tutors.map((tutor) => (
                                <motion.div
                                    key={tutor._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    whileHover={{ y: -5 }}
                                    className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:border-indigo-100 transition-all duration-300 relative overflow-hidden"
                                >
                                    <div className="flex items-start justify-between mb-6">
                                        <div className="relative">
                                            {tutor.avatar ? (
                                                <img
                                                    src={tutor.avatar}
                                                    alt={tutor.name}
                                                    className="w-16 h-16 rounded-2xl object-cover border border-gray-100"
                                                />
                                            ) : (
                                                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold bg-indigo-100 text-indigo-600">
                                                    {tutor.name.charAt(0)}
                                                </div>
                                            )}
                                            {tutor.isOnline && (
                                                <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
                                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                                    <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500 border-2 border-white"></span>
                                                </span>
                                            )}
                                        </div>

                                        <div className="flex flex-col items-end">
                                            <span className="text-lg font-bold text-gray-900">{tutor.hourlyRate || '$30'}<span className="text-gray-400 text-sm font-normal">/hr</span></span>
                                            <div className="flex items-center gap-1 text-amber-400 text-sm font-bold mt-1">
                                                <Star size={14} fill="currentColor" />
                                                <span>{tutor.rating ? tutor.rating.toFixed(1) : "New"}</span>
                                                <span className="text-gray-400 font-medium">({tutor.reviewsCount || 0})</span>
                                            </div>
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-bold text-gray-900 mb-1 flex items-center gap-2">
                                        {tutor.name}
                                        {tutor.isVerified && (
                                            <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                        )}
                                    </h3>
                                    <p className="text-indigo-600 font-medium text-sm mb-4">{tutor.subject} {tutor.classGrade && `• ${tutor.classGrade}`}</p>

                                    {tutor.location && (
                                        <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                                            <MapPin size={16} />
                                            <span>{tutor.location}</span>
                                        </div>
                                    )}

                                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
                                        <BookOpen size={16} />
                                        <span>{tutor.university}</span>
                                        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                        <span>{tutor.experience} exp</span>
                                    </div>

                                    <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-2">
                                        {tutor.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {tutor.tags && tutor.tags.map((tag, i) => (
                                            <span key={i} className="px-3 py-1 bg-gray-50 text-gray-600 rounded-lg text-xs font-semibold">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <button
                                        onClick={() => handleViewProfile(tutor._id)}
                                        className="w-full py-3 bg-white border-2 border-indigo-600 text-indigo-600 rounded-xl font-bold hover:bg-indigo-600 hover:text-white transition-all duration-300 flex items-center justify-center gap-2 group"
                                    >
                                        View Profile
                                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </motion.div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-20">
                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                                    <Search size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">No tutors found</h3>
                                <p className="text-gray-500">Try adjusting your search terms or filters.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Tutors;
