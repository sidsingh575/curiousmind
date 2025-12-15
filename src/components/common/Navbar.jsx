import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, BookOpen } from 'lucide-react';

import { useAuth } from '../../context/AuthContext';
import { LogOut, LayoutDashboard } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate(); // Make sure to import useNavigate too if not present, checking imports...

    // ... imports check: we need useNavigate from react-router-dom

    // Let's assume standard imports are below, putting logic here:

    const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error("Failed to log out", error);
        }
    };

    if (isAuthPage) return null;

    return (
        <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/" className="flex items-center gap-2">
                            <BookOpen className="h-8 w-8 text-indigo-600" />
                            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
                                CuriousMind
                            </span>
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">Home</Link>
                        <Link to="/tutors" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">Find Tutors</Link>

                        {!currentUser ? (
                            <>
                                <Link to="/login" state={{ role: 'tutor' }} className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">Become a Tutor</Link>
                                <div className="flex items-center space-x-4 ml-4">
                                    <Link to="/login" className="text-indigo-600 font-semibold hover:text-indigo-700 px-4 py-2">
                                        Log in
                                    </Link>
                                    <Link to="/signup" className="bg-indigo-600 text-white px-5 py-2.5 rounded-full font-medium hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                                        Sign up
                                    </Link>
                                </div>
                            </>
                        ) : (
                            <div className="flex items-center space-x-4 ml-4">
                                <Link to="/student/dashboard" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors flex items-center gap-2">
                                    <LayoutDashboard className="w-4 h-4" /> Dashboard
                                </Link>
                                <button onClick={handleLogout} className="text-gray-500 hover:text-red-600 font-medium transition-colors flex items-center gap-2 ml-4">
                                    <LogOut className="w-4 h-4" /> Logout
                                </button>
                                <div className="w-8 h-8 rounded-full bg-indigo-100 border border-indigo-200 flex items-center justify-center text-indigo-700 font-bold text-xs">
                                    {currentUser.email ? currentUser.email[0].toUpperCase() : 'U'}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 hover:text-indigo-600 p-2">
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white/95 backdrop-blur-md border-b border-gray-100 absolute w-full">
                    <div className="px-4 pt-2 pb-6 space-y-2">
                        <Link to="/" className="block px-3 py-2 text-gray-700 hover:text-indigo-600 font-medium">Home</Link>
                        <Link to="/tutors" className="block px-3 py-2 text-gray-700 hover:text-indigo-600 font-medium">Find Tutors</Link>
                        {!currentUser ? (
                            <>
                                <Link to="/login" state={{ role: 'tutor' }} className="block px-3 py-2 text-gray-700 hover:text-indigo-600 font-medium">Become a Tutor</Link>
                                <div className="pt-4 space-y-2">
                                    <Link to="/login" className="block w-full text-center px-4 py-2 border border-indigo-600 text-indigo-600 rounded-lg font-medium hover:bg-indigo-50">
                                        Log in
                                    </Link>
                                    <Link to="/signup" className="block w-full text-center px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700">
                                        Sign up
                                    </Link>
                                </div>
                            </>
                        ) : (
                            <div className="pt-4 space-y-2 border-t border-gray-100 mt-2">
                                <Link to="/student/dashboard" className="block w-full text-left px-4 py-2 text-gray-700 font-medium hover:bg-gray-50">
                                    Dashboard
                                </Link>
                                <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-red-600 font-medium hover:bg-red-50">
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
