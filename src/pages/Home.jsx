import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Video, Shield, Award, Users, Search, Star, ArrowRight, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '../components/common/Navbar';

const Home = () => {

    // ⭐ ADDED — server status state + backend check
    const [serverStatus, setServerStatus] = useState("Checking...");

    useEffect(() => {
        fetch("http://localhost:5000/")
            .then(() => setServerStatus("Connected"))
            .catch(() => setServerStatus("Disconnected"));
    }, []);

    return (
        <div className="bg-white overflow-hidden">
            {/* Animated Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
                {/* Background Blobs */}
                <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            rotate: [0, 90, 0],
                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-50"
                    />
                    <motion.div
                        animate={{
                            translateY: [0, 100, 0],
                            translateX: [0, -50, 0],
                        }}
                        transition={{
                            duration: 15,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="absolute top-1/2 -left-24 w-72 h-72 bg-violet-100 rounded-full blur-3xl opacity-50"
                    />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >

                        {/* ⭐ THIS WAS CRASHING — NOW FIXED */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 font-semibold text-sm mb-8 animate-fade-in-up">
                            <span className={`w-2 h-2 rounded-full ${serverStatus === 'Connected' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                            Backend Status: {serverStatus}
                        </div>

                        <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight text-gray-900 mb-8 leading-tight">
                            Master any subject <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600">
                                effortlessly.
                            </span>
                        </h1>
                        <p className="max-w-2xl mx-auto text-xl md:text-2xl text-gray-500 mb-10 leading-relaxed">
                            Connect with verified experts for 1-on-1 sessions. Elevation your learning with real-time feedback and personalized plans.
                        </p>

                        <div className="flex flex-col sm:flex-row justify-center gap-5">
                            <Link to="/tutors" className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-indigo-600 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 hover:bg-indigo-700 shadow-xl hover:shadow-2xl hover:-translate-y-1">
                                Find a Tutor
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link to="/teach" className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-gray-900 transition-all duration-200 bg-white border-2 border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:bg-gray-50 hover:border-gray-300">
                                Become a Tutor
                            </Link>
                        </div>
                    </motion.div>

                    {/* Stats Dashboard Preview Mockup */}
                    <motion.div
                        initial={{ opacity: 0, y: 60 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="mt-20 relative mx-auto max-w-5xl"
                    >
                        <div className="rounded-2xl bg-gray-900 p-2 shadow-2xl ring-1 ring-gray-900/10">
                            <div className="rounded-xl bg-white overflow-hidden aspect-[16/9] relative">

                                {/* Abstract UI Representation */}
                                <div className="absolute inset-0 bg-gray-50 flex">

                                    {/* Sidebar */}
                                    <div className="w-20 bg-white border-r border-gray-100 flex flex-col items-center py-6 gap-6">
                                        <div className="w-10 h-10 rounded-xl bg-indigo-600 shadow-lg shadow-indigo-200"></div>
                                        <div className="flex-1 w-full flex flex-col items-center gap-4">
                                            {[1, 2, 3, 4].map(i => (
                                                <div key={i} className={`w-10 h-10 rounded-lg ${i === 1 ? 'bg-indigo-50 border-indigo-100' : 'bg-transparent hover:bg-gray-50'}`}></div>
                                            ))}
                                        </div>
                                        <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                                    </div>

                                    {/* Main Content */}
                                    <div className="flex-1 flex flex-col min-w-0">

                                        {/* Header */}
                                        <div className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-8">
                                            <div className="w-64 h-8 bg-gray-100 rounded-full"></div>
                                            <div className="flex gap-3">
                                                <div className="w-8 h-8 rounded-full bg-gray-100"></div>
                                                <div className="w-8 h-8 rounded-full bg-gray-100"></div>
                                            </div>
                                        </div>

                                        {/* Dashboard Grid */}
                                        <div className="p-8 grid grid-cols-12 gap-6 overflow-hidden">

                                            {/* Stats Cards */}
                                            <div className="col-span-8 grid grid-cols-2 gap-6">

                                                <div className="col-span-2 h-32 bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-center justify-between">
                                                    <div className="space-y-2">
                                                        <div className="w-32 h-4 bg-gray-100 rounded"></div>
                                                        <div className="w-48 h-8 bg-gray-900 rounded"></div>
                                                    </div>

                                                    <motion.div
                                                        animate={{ scale: [1, 1.1, 1] }}
                                                        transition={{ duration: 3, repeat: Infinity }}
                                                        className="w-16 h-16 rounded-full bg-indigo-50"
                                                    ></motion.div>
                                                </div>

                                                {/* Chart Widget */}
                                                <div className="col-span-1 h-48 bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col justify-end gap-2">
                                                    <div className="flex items-end gap-2 h-32">
                                                        {[40, 70, 45, 90, 60, 80].map((h, i) => (
                                                            <motion.div
                                                                key={i}
                                                                initial={{ height: 0 }}
                                                                animate={{ height: `${h}%` }}
                                                                transition={{ duration: 1.5, delay: i * 0.1, repeat: Infinity, repeatType: "reverse", repeatDelay: 2 }}
                                                                className="flex-1 bg-indigo-500 rounded-t-sm opacity-80"
                                                            />
                                                        ))}
                                                    </div>
                                                </div>

                                                <div className="col-span-1 h-48 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-2xl shadow-lg p-5 text-white">
                                                    <div className="w-8 h-8 bg-white/20 rounded-lg mb-4"></div>
                                                    <div className="w-full h-3 bg-white/20 rounded mb-2"></div>
                                                    <div className="w-2/3 h-3 bg-white/20 rounded"></div>
                                                </div>
                                            </div>

                                            {/* Right Column */}
                                            <div className="col-span-4 bg-white rounded-2xl shadow-sm border border-gray-100 p-5 space-y-4">
                                                <div className="w-20 h-4 bg-gray-100 rounded mb-4"></div>
                                                {[1, 2, 3].map(i => (
                                                    <div key={i} className="flex gap-3 items-center">
                                                        <div className="w-8 h-8 rounded-full bg-gray-100 flex-shrink-0"></div>
                                                        <div className="flex-1 space-y-1">
                                                            <div className="w-full h-2 bg-gray-100 rounded"></div>
                                                            <div className="w-2/3 h-2 bg-gray-50 rounded"></div>
                                                        </div>
                                                    </div>
                                                ))}

                                                {/* Floating Badge */}
                                                <motion.div
                                                    animate={{ y: [0, -10, 0] }}
                                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                                    className="mt-6 p-4 rounded-xl bg-green-50 border border-green-100 flex items-center gap-3"
                                                >
                                                    <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">✓</div>
                                                    <div>
                                                        <div className="w-16 h-3 bg-green-200 rounded mb-1"></div>
                                                        <div className="w-24 h-2 bg-green-200/50 rounded"></div>
                                                    </div>
                                                </motion.div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Overlay Text */}
                                    <div className="absolute inset-0 flex items-center justify-center bg-transparent pointer-events-none">
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.8, duration: 0.6 }}
                                            className="px-10 py-6 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-white/50 text-center max-w-lg mx-4"
                                        >
                                            <h3 className="text-4xl font-extrabold text-gray-900 mb-2 tracking-tight">Top-Tier Education</h3>
                                            <p className="text-gray-600 font-medium text-lg">Accessible to everyone, everywhere.</p>
                                        </motion.div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Trusted By Section */}
            <div className="bg-white py-12 border-y border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <p className="text-center text-sm font-semibold text-gray-400 tracking-wide uppercase mb-8">Trusted by students from</p>
                    <div className="flex justify-center flex-wrap gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                        {['Universities', 'High Schools', 'Bootcamps', 'Online Courses'].map((inst) => (
                            <div key={inst} className="flex items-center gap-2">
                                <BookOpen className="w-6 h-6 text-gray-400" />
                                <span className="text-xl font-bold text-gray-400">{inst}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <section className="py-32 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-24">
                        <h2 className="text-base text-indigo-600 font-bold tracking-wide uppercase">Why CuriousMind?</h2>
                        <h3 className="mt-2 text-4xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                            Everything you need to excel
                        </h3>
                    </div>

                    <div className="space-y-24">
                        {[
                            {
                                title: "1-on-1 Live Sessions",
                                desc: "Connect with expert tutors via high-quality video integration. Learn at your own pace with personalized attention.",
                                icon: <Video className="w-8 h-8 text-white" />,
                                color: "from-blue-400 to-blue-600",
                                bg: "bg-blue-50",
                                visual: (
                                    <div className="relative w-full h-full flex items-center justify-center p-8">
                                        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 to-white/50 opacity-50"></div>
                                        {/* Abstract Video Interface */}
                                        <div className="relative w-full aspect-video bg-white rounded-xl shadow-2xl overflow-hidden border border-blue-100 flex flex-col">
                                            <div className="h-8 bg-gray-50 border-b border-gray-100 flex items-center px-4 gap-2">
                                                <div className="w-2 h-2 rounded-full bg-red-400"></div>
                                                <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                                                <div className="w-2 h-2 rounded-full bg-green-400"></div>
                                            </div>
                                            <div className="flex-1 bg-gray-900 relative">
                                                <div className="absolute bottom-4 left-4 flex gap-2">
                                                    <motion.div
                                                        animate={{ scale: [1, 1.2, 1] }}
                                                        transition={{ duration: 2, repeat: Infinity }}
                                                        className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm border border-white/10"
                                                    />
                                                    <motion.div
                                                        animate={{ scale: [1, 1.1, 1] }}
                                                        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                                                        className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm border border-white/10"
                                                    />
                                                </div>
                                                <motion.div
                                                    initial={{ opacity: 0.8 }}
                                                    animate={{ opacity: [0.8, 1, 0.8] }}
                                                    transition={{ duration: 4, repeat: Infinity }}
                                                    className="absolute top-4 right-4 w-24 h-16 bg-gray-800 rounded-lg border border-gray-700 shadow-lg flex items-center justify-center"
                                                >
                                                    <div className="w-8 h-8 text-gray-600 flex items-center justify-center">
                                                        <Video size={16} />
                                                    </div>
                                                </motion.div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            },
                            {
                                title: "Verified & Vetted Tutors",
                                desc: "Our rigorous vetting process ensures you learn from the best. Ratings, reviews, and detailed profiles for complete transparency.",
                                icon: <Shield className="w-8 h-8 text-white" />,
                                color: "from-indigo-400 to-indigo-600",
                                bg: "bg-indigo-50",
                                reverse: true,
                                visual: (
                                    <div className="relative w-full h-full flex items-center justify-center p-8">
                                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-100/50 to-white/50 opacity-50"></div>
                                        {/* Abstract Profile Card */}
                                        <motion.div
                                            whileHover={{ rotate: 0, scale: 1.05 }}
                                            initial={{ rotate: -6 }}
                                            transition={{ type: "spring", stiffness: 300 }}
                                            className="relative w-64 bg-white rounded-2xl shadow-xl p-6 border border-indigo-50"
                                        >
                                            <div className="flex items-center gap-4 mb-4">
                                                <div className="w-12 h-12 rounded-full bg-indigo-100"></div>
                                                <div>
                                                    <div className="w-24 h-3 bg-gray-200 rounded-full mb-2"></div>
                                                    <div className="w-16 h-2 bg-gray-100 rounded-full"></div>
                                                </div>
                                            </div>
                                            <div className="space-y-2 mb-4">
                                                <div className="w-full h-2 bg-gray-100 rounded-full"></div>
                                                <div className="w-full h-2 bg-gray-100 rounded-full"></div>
                                                <div className="w-2/3 h-2 bg-gray-100 rounded-full"></div>
                                            </div>
                                            <div className="flex gap-2">
                                                <motion.div
                                                    animate={{ opacity: [0.5, 1, 0.5] }}
                                                    transition={{ duration: 2, repeat: Infinity }}
                                                    className="px-3 py-1 rounded-full bg-green-100 text-green-600 text-xs font-bold"
                                                >
                                                    Verified
                                                </motion.div>
                                                <div className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-600 text-xs font-bold">5.0 ★</div>
                                            </div>
                                            {/* Floating Badge */}
                                            <motion.div
                                                animate={{ y: [0, -5, 0] }}
                                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                                className="absolute -right-4 -top-4 w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center shadow-lg text-white"
                                            >
                                                <Shield size={20} />
                                            </motion.div>
                                        </motion.div>
                                    </div>
                                )
                            },
                            {
                                title: "Real-time Collaboration",
                                desc: "Integrated chat, file sharing, and interactive whiteboards make online learning feel just like being in the same room.",
                                icon: <Users className="w-8 h-8 text-white" />,
                                color: "from-violet-400 to-violet-600",
                                bg: "bg-violet-50",
                                visual: (
                                    <div className="relative w-full h-full flex items-center justify-center p-8">
                                        <div className="absolute inset-0 bg-gradient-to-br from-violet-100/50 to-white/50 opacity-50"></div>

                                        {/* Abstract Chat/Board Interface */}
                                        <div className="relative w-full max-w-sm bg-white rounded-xl shadow-2xl border border-violet-100 overflow-hidden">
                                            <div className="flex h-full">

                                                {/* Sidebar */}
                                                <div className="w-16 bg-gray-50 border-r border-gray-100 flex flex-col items-center py-4 gap-4">
                                                    <div className="w-8 h-8 rounded-lg bg-violet-100"></div>
                                                    <div className="w-8 h-8 rounded-lg bg-white border border-gray-200"></div>
                                                    <div className="w-8 h-8 rounded-lg bg-white border border-gray-200"></div>
                                                </div>

                                                {/* Main Area */}
                                                <div className="flex-1 p-4">
                                                    <div className="w-full h-32 bg-violet-50/50 rounded-lg border-2 border-dashed border-violet-200 mb-4 flex items-center justify-center">
                                                        <motion.div
                                                            animate={{ rotate: [0, 180, 0] }}
                                                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                                            className="w-8 h-8 rounded-full bg-violet-200 border-2 border-dashed border-violet-400"
                                                        />
                                                    </div>

                                                    <div className="space-y-3">

                                                        {/* Incoming Msg */}
                                                        <motion.div
                                                            initial={{ opacity: 0, x: -10 }}
                                                            whileInView={{ opacity: 1, x: 0 }}
                                                            transition={{ delay: 0.5 }}
                                                            className="flex gap-3"
                                                        >
                                                            <div className="w-6 h-6 rounded-full bg-gray-200 flex-shrink-0"></div>
                                                            <div className="bg-gray-100 rounded-lg rounded-tl-none p-2 w-full flex gap-1">
                                                                <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1, repeat: Infinity, delay: 0 }} className="w-1 h-1 bg-gray-400 rounded-full" />
                                                                <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1, repeat: Infinity, delay: 0.2 }} className="w-1 h-1 bg-gray-400 rounded-full" />
                                                                <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1, repeat: Infinity, delay: 0.4 }} className="w-1 h-1 bg-gray-400 rounded-full" />
                                                            </div>
                                                        </motion.div>

                                                        {/* Outgoing Msg */}
                                                        <motion.div
                                                            initial={{ opacity: 0, x: 10 }}
                                                            whileInView={{ opacity: 1, x: 0 }}
                                                            transition={{ delay: 1 }}
                                                            className="flex gap-3 flex-row-reverse"
                                                        >
                                                            <div className="w-6 h-6 rounded-full bg-indigo-100 flex-shrink-0"></div>
                                                            <div className="bg-indigo-600 rounded-lg rounded-tr-none p-2 text-[10px] text-white/50 w-2/3"></div>
                                                        </motion.div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        ].map((feature, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.7 }}
                                className={`flex flex-col md:flex-row gap-16 items-center ${feature.reverse ? 'md:flex-row-reverse' : ''}`}
                            >
                                <div className="flex-1">
                                    <div className={`inline-flex items-center justify-center p-4 rounded-2xl shadow-lg bg-gradient-to-br ${feature.color} mb-8`}>
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-3xl font-bold text-gray-900 mb-6">{feature.title}</h3>
                                    <p className="text-lg text-gray-500 leading-relaxed mb-8">{feature.desc}</p>

                                    <ul className="space-y-4">
                                        {[1, 2, 3].map((i) => (
                                            <li key={i} className="flex items-center gap-3 text-gray-700 font-medium">
                                                <CheckCircle className="w-5 h-5 text-green-500" />
                                                Benefit point description goes here.
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Right Side Visual */}
                                <div className="flex-1 w-full">
                                    <div className={`w-full aspect-[4/3] rounded-3xl ${feature.bg} relative overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 group`}>
                                        {feature.visual}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative py-32 bg-gray-900 overflow-hidden isolate">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20" />
                <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-gray-900 shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-8">
                        Ready to transform your future?
                    </h2>

                    <p className="text-indigo-200 text-xl max-w-2xl mx-auto mb-12">
                        Join thousands of students and tutors on CuriousMind today.
                        Start learning or teaching in minutes.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link
                            to="/signup"
                            className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-bold rounded-full text-indigo-600 bg-white hover:bg-indigo-50 transition-all transform hover:-translate-y-1 shadow-lg"
                        >
                            Get Started Now
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
