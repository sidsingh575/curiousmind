import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import { User, BookOpen, Clock, MapPin, DollarSign, Award, ArrowRight, Check, Globe, Sparkles } from 'lucide-react';

const AVATAR_SEEDS = [
    'Felix', 'Aneka', 'Zoe', 'Midnight', 'Coco', 'Jack',
    'Simba', 'Tigger', 'Misty', 'Leo', 'Willow', 'Bear'
].map(seed => `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}&backgroundColor=c0aede,b6e3f4`);

const Onboarding = () => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const role = localStorage.getItem('preferredRole') || currentUser?.role || 'student';

    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        // Basic
        name: currentUser?.displayName || '',
        classGrade: '', // Student
        qualification: '', // Tutor
        location: '', // City
        languages: [], // Tutor

        // Learning (Student)
        studentSubjects: [],
        learningMode: 'online', // 'online', 'offline', 'both'
        availability: '',

        // Teaching (Tutor)
        subject: '', // Primary subject
        teachingLevels: [],
        experience: '',
        hourlyRate: '',
        bio: '',

        // Character
        avatar: currentUser?.photoURL || AVATAR_SEEDS[0] // Default first avatar
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleArrayChange = (name, value) => {
        const array = value.split(',').map(item => item.trim());
        setFormData(prev => ({ ...prev, [name]: array }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const token = await currentUser.getIdToken();
            const response = await fetch('/api/auth/sync', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    email: currentUser.email,
                    firebaseUid: currentUser.uid,
                    role: role,
                    ...formData,
                    tags: role === 'tutor' ? (formData.subject ? [formData.subject] : []) : []
                })
            });

            if (response.ok) {
                if (role === 'student') navigate('/student/dashboard');
                else navigate('/tutor/dashboard');
            } else {
                console.error("Failed to save profile");
            }
        } catch (error) {
            console.error("Error saving profile:", error);
        } finally {
            setLoading(false);
        }
    };

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    // --- Steps ---

    const Step1_BasicInfo = () => (
        <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800">Basic Information</h3>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <div className="relative">
                    <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all"
                        placeholder="Your Full Name"
                        required
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all"
                        placeholder="e.g. New York"
                        required
                    />
                </div>
            </div>

            {role === 'student' ? (
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Class / Grade</label>
                    <select
                        name="classGrade"
                        value={formData.classGrade}
                        onChange={handleInputChange}
                        className="block w-full px-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all"
                        required
                    >
                        <option value="">Select Grade</option>
                        <option value="K-5">Kindergarten - 5th Grade</option>
                        <option value="6-8">6th - 8th Grade</option>
                        <option value="9-12">High School (9-12)</option>
                        <option value="College">College / University</option>
                        <option value="Adult">Adult Learner</option>
                    </select>
                </div>
            ) : (
                <>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Highest Qualification</label>
                        <div className="relative">
                            <Award className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                name="qualification"
                                value={formData.qualification}
                                onChange={handleInputChange}
                                className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all"
                                placeholder="e.g. PhD in Mathematics"
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Languages you teach in</label>
                        <div className="relative">
                            <Globe className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                onChange={(e) => handleArrayChange('languages', e.target.value)}
                                className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all"
                                placeholder="English, Spanish, Hindi (comma separated)"
                                required
                            />
                        </div>
                    </div>
                </>
            )}
        </div>
    );

    const Step2_Details = () => (
        <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800">
                {role === 'student' ? 'Learning Details' : 'Teaching Details'}
            </h3>

            {role === 'student' ? (
                // Student Details
                <>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Subjects Needed</label>
                        <div className="relative">
                            <BookOpen className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                onChange={(e) => handleArrayChange('studentSubjects', e.target.value)}
                                className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all"
                                placeholder="Math, Science (comma separated)"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">Learning Mode</label>
                        <div className="flex gap-4">
                            {['online', 'offline', 'both'].map(mode => (
                                <label key={mode} className={`flex-1 border rounded-xl p-3 cursor-pointer transition-all ${formData.learningMode === mode ? 'border-indigo-500 bg-indigo-50 ring-1 ring-indigo-500' : 'border-gray-200 hover:bg-gray-50'}`}>
                                    <input
                                        type="radio"
                                        name="learningMode"
                                        value={mode}
                                        checked={formData.learningMode === mode}
                                        onChange={handleInputChange}
                                        className="sr-only"
                                    />
                                    <div className="text-center capitalize font-medium text-gray-700">{mode}</div>
                                </label>
                            ))}
                        </div>
                    </div>
                </>
            ) : (
                // Tutor Details
                <>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Primary Subjects to Teach</label>
                        <div className="relative">
                            <BookOpen className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                name="subject"
                                value={formData.subject}
                                onChange={handleInputChange}
                                className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all"
                                placeholder="e.g. Mathematics, Physics"
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Class Levels to Teach</label>
                        <input
                            type="text"
                            onChange={(e) => handleArrayChange('teachingLevels', e.target.value)}
                            className="block w-full px-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all"
                            placeholder="High School, College (comma separated)"
                            required
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Years Experience</label>
                            <input
                                type="text"
                                name="experience"
                                value={formData.experience}
                                onChange={handleInputChange}
                                className="block w-full px-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all"
                                placeholder="e.g. 5 Years"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Hourly Rate</label>
                            <div className="relative">
                                <DollarSign className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                <input
                                    type="text"
                                    name="hourlyRate"
                                    value={formData.hourlyRate}
                                    onChange={handleInputChange}
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all"
                                    placeholder="e.g. $40"
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Short Bio (2-3 lines)</label>
                        <textarea
                            name="bio"
                            value={formData.bio}
                            onChange={handleInputChange}
                            className="block w-full px-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all"
                            placeholder="Tell students about your teaching style..."
                            rows="2"
                            required
                        />
                    </div>
                </>
            )}

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Availability Time</label>
                <div className="relative">
                    <Clock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                        type="text"
                        name="availability"
                        value={formData.availability}
                        onChange={handleInputChange}
                        className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all"
                        placeholder="e.g. Mon-Fri 4pm - 8pm"
                        required
                    />
                </div>
            </div>
        </div>
    );

    const Step3_Character = () => (
        <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800 text-center">Choose Your Character</h3>
            <p className="text-center text-gray-600 mb-6">Select an avatar that represents you on CuriousMind.</p>

            <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 max-h-96 overflow-y-auto p-2">
                {AVATAR_SEEDS.map((url, index) => (
                    <motion.div
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setFormData(prev => ({ ...prev, avatar: url }))}
                        className={`cursor-pointer rounded-2xl p-2 border-2 transition-all ${formData.avatar === url
                                ? 'border-indigo-500 bg-indigo-50 ring-2 ring-indigo-300'
                                : 'border-gray-200 hover:border-indigo-200'
                            }`}
                    >
                        <img src={url} alt="Avatar" className="w-full h-auto rounded-xl" />
                        {formData.avatar === url && (
                            <div className="mt-2 flex justify-center">
                                <span className="bg-indigo-600 text-white text-xs px-2 py-0.5 rounded-full">Selected</span>
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl w-full space-y-8 bg-white p-8 sm:p-10 rounded-2xl shadow-xl"
            >
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <div className="p-3 bg-indigo-100 rounded-full">
                            <Sparkles className="w-8 h-8 text-indigo-600" />
                        </div>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">
                        {role === 'tutor' ? 'Tutor Profile' : 'Student Profile'}
                    </h2>
                    <p className="mt-2 text-gray-600">
                        Step {step} of 3
                    </p>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-100 rounded-full h-2 mb-8 overflow-hidden">
                    <div
                        className="bg-indigo-600 h-2 rounded-full transition-all duration-300 ease-in-out"
                        style={{ width: `${(step / 3) * 100}%` }}
                    />
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>

                    <motion.div
                        key={step}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        {step === 1 && <Step1_BasicInfo />}
                        {step === 2 && <Step2_Details />}
                        {step === 3 && <Step3_Character />}
                    </motion.div>

                    <div className="flex gap-4 pt-8 border-t border-gray-100 mt-8">
                        {step > 1 && (
                            <button
                                type="button"
                                onClick={prevStep}
                                className="flex-1 py-3 px-6 border border-gray-300 rounded-xl text-md font-semibold text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                            >
                                Back
                            </button>
                        )}

                        {step < 3 ? (
                            <button
                                type="button"
                                onClick={nextStep}
                                className="flex-1 flex justify-center items-center py-3 px-6 border border-transparent rounded-xl text-md font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all hover:scale-[1.02]"
                            >
                                Next Step <ArrowRight className="ml-2 w-5 h-5" />
                            </button>
                        ) : (
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 flex justify-center items-center py-3 px-6 border border-transparent rounded-xl text-md font-bold text-white bg-green-600 hover:bg-green-700 shadow-lg shadow-green-200 transition-all hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Saving Profile...' : 'Complete Profile'}
                                {!loading && <Check className="ml-2 w-5 h-5" />}
                            </button>
                        )}
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default Onboarding;
