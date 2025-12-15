import React from 'react';
import { BookOpen, Github, Twitter, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <BookOpen className="h-6 w-6 text-indigo-600" />
                            <span className="text-xl font-bold text-gray-900">CuriousMind</span>
                        </div>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            Empowering students and connecting them with expert tutors worldwide for a better learning experience.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold text-gray-900 mb-4">Platform</h3>
                        <ul className="space-y-3 text-sm text-gray-500">
                            <li><Link to="/tutors" className="hover:text-indigo-600 transition-colors">Find Tutors</Link></li>
                            <li><Link to="/teach" className="hover:text-indigo-600 transition-colors">Become a Tutor</Link></li>
                            <li><Link to="/pricing" className="hover:text-indigo-600 transition-colors">Pricing</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
                        <ul className="space-y-3 text-sm text-gray-500">
                            <li><Link to="/about" className="hover:text-indigo-600 transition-colors">About Us</Link></li>
                            <li><Link to="/careers" className="hover:text-indigo-600 transition-colors">Careers</Link></li>
                            <li><Link to="/blog" className="hover:text-indigo-600 transition-colors">Blog</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-gray-900 mb-4">Connect</h3>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-indigo-600 transition-colors"><Github className="h-5 w-5" /></a>
                            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors"><Twitter className="h-5 w-5" /></a>
                            <a href="#" className="text-gray-400 hover:text-blue-700 transition-colors"><Linkedin className="h-5 w-5" /></a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-xs text-gray-400">© 2025 CuriousMind. All rights reserved.</p>
                    <div className="flex space-x-6 text-xs text-gray-400 mt-4 md:mt-0">
                        <a href="#" className="hover:text-gray-600">Privacy Policy</a>
                        <a href="#" className="hover:text-gray-600">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
