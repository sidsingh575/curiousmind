import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import Home from '../pages/Home';
import Login from '../pages/Auth/Login';
import Signup from '../pages/Auth/Signup';
import Onboarding from '../pages/Auth/Onboarding';
import Tutors from '../pages/Tutors';
import StudentLayout from '../layouts/StudentLayout';
import StudentDashboard from '../pages/Student/Dashboard';
import TutorLayout from '../layouts/TutorLayout';
import TutorDashboard from '../pages/Tutor/Dashboard';
import AdminLayout from '../layouts/AdminLayout';
import AdminDashboard from '../pages/Admin/Dashboard';

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <div className="min-h-screen flex flex-col">
                <main className="flex-grow">
                    <Routes>
                        {/* Public Routes */}
                        <Route path="/" element={<Home />} />
                        <Route path="/tutors" element={<Tutors />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/onboarding" element={<Onboarding />} />

                        {/* Student Routes */}
                        <Route path="/student" element={<StudentLayout />}>
                            <Route index element={<Navigate to="/student/dashboard" replace />} />
                            <Route path="dashboard" element={<StudentDashboard />} />
                        </Route>

                        {/* Tutor Routes */}
                        <Route path="/tutor" element={<TutorLayout />}>
                            <Route index element={<Navigate to="/tutor/dashboard" replace />} />
                            <Route path="dashboard" element={<TutorDashboard />} />
                        </Route>

                        {/* Admin Routes */}
                        <Route path="/admin" element={<AdminLayout />}>
                            <Route index element={<Navigate to="/admin/dashboard" replace />} />
                            <Route path="dashboard" element={<AdminDashboard />} />
                        </Route>
                    </Routes>
                </main>
                <Footer />
            </div>
        </BrowserRouter>
    );
};

export default AppRouter;
