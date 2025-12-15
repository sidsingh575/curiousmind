import React from 'react';
import { Outlet } from 'react-router-dom';

const TutorLayout = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <header className="p-4 bg-white shadow-sm">
                <h1 className="text-xl font-bold text-green-600">CuriousMind Tutor</h1>
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default TutorLayout;
