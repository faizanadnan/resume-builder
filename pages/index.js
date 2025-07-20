import { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Zap,
    Brain,
    Rocket,
    Shield,
    Eye,
    Download,
    Code,
    Globe,
    ChevronRight,
    Star,
    Users,
    Trophy,
    Target
} from 'lucide-react';

export default function Home() {
    const [currentText, setCurrentText] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    const heroTexts = [
        "Build Your Future",
        "Create Your Legacy",
        "Design Your Success",
        "Craft Your Story"
    ];

    useEffect(() => {
        setIsVisible(true);
        const interval = setInterval(() => {
            setCurrentText((prev) => (prev + 1) % heroTexts.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const features = [
        {
            icon: <Brain className="w-8 h-8" />,
            title: "AI-Powered Design",
            description: "Advanced algorithms optimize your resume layout for maximum impact",
            color: "from-cyan-400 to-blue-500"
        },
        {
            icon: <Zap className="w-8 h-8" />,
            title: "Lightning Fast",
            description: "Build professional resumes in under 5 minutes with real-time preview",
            color: "from-yellow-400 to-orange-500"
        },
        {
            icon: <Shield className="w-8 h-8" />,
            title: "ATS Optimized",
            description: "Guaranteed to pass through Applicant Tracking Systems",
            color: "from-green-400 to-emerald-500"
        },
        {
            icon: <Eye className="w-8 h-8" />,
            title: "Live Preview",
            description: "See changes instantly with our real-time preview technology",
            color: "from-purple-400 to-pink-500"
        },
        {
            icon: <Download className="w-8 h-8" />,
            title: "Instant Export",
            description: "Download high-quality PDFs ready for any job application",
            color: "from-indigo-400 to-purple-500"
        },
        {
            icon: <Globe className="w-8 h-8" />,
            title: "Global Ready",
            description: "Multi-language support and international formatting",
            color: "from-pink-400 to-red-500"
        }
    ];

    const stats = [
        { number: "10K+", label: "Resumes Created", icon: <Users /> },
        { number: "95%", label: "Success Rate", icon: <Trophy /> },
        { number: "50+", label: "Industries", icon: <Target /> },
        { number: "4.9★", label: "User Rating", icon: <Star /> }
    ];

    const MatrixRain = () => {
        return (
            <div className="fixed inset-0 pointer-events-none opacity-20">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute text-neon-blue text-xs font-mono animate-matrix"
                        style={{
                            left: `${i * 5}%`,
                            animationDelay: `${i * 0.5}s`,
                            animationDuration: `${10 + (i % 5)}s`
                        }}
                    >
                        {String.fromCharCode(65 + Math.random() * 26)}
                    </div>
                ))}
            </div>
        );
    };

    return (
        <>
            <Head>
                <title>Future Resume Builder - Create Tomorrow's CV Today</title>
                <meta name="description" content="Revolutionary AI-powered resume builder with futuristic design and instant PDF export" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden">
                <MatrixRain />

                {/* Cyber grid background */}
                <div className="absolute inset-0 cyber-grid opacity-30"></div>

                {/* Animated background elements */}
                <div className="absolute inset-0">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-neon-blue opacity-10 rounded-full blur-3xl animate-pulse-slow"></div>
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-neon-pink opacity-10 rounded-full blur-3xl animate-pulse-slow"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-neon-green opacity-5 rounded-full blur-3xl animate-float"></div>
                </div>

                {/* Navigation */}
                <nav className="relative z-50 p-6">
                    <div className="max-w-7xl mx-auto flex justify-between items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center space-x-3"
                        >
                            <div className="w-10 h-10 bg-gradient-to-r from-neon-blue to-neon-pink rounded-lg flex items-center justify-center">
                                <Code className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-2xl font-bold neon-text">Resume Builder</span>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="hidden md:flex space-x-8"
                        >
                            <Link href="/faizan" className="text-cyan-300 hover:text-neon-blue transition-colors">
                                About Developer
                            </Link>
                            <Link href="/builder" className="text-cyan-300 hover:text-neon-blue transition-colors">
                                Get Started
                            </Link>
                        </motion.div>
                    </div>
                </nav>

                {/* Hero Section */}
                <div className="relative z-40 max-w-7xl mx-auto px-6 pt-20 pb-32">
                    <div className="text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h1 className="text-6xl md:text-8xl font-bold mb-6">
                                <span className="block text-white">Welcome to the</span>
                                <AnimatePresence mode="wait">
                                    <motion.span
                                        key={currentText}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.5 }}
                                        className="block neon-text typing-effect"
                                    >
                                        {heroTexts[currentText]}
                                    </motion.span>
                                </AnimatePresence>
                                <span className="block bg-gradient-to-r from-neon-blue via-neon-pink to-neon-green bg-clip-text text-transparent">
                  of Resumes
                </span>
                            </h1>

                            <p className="text-xl md:text-2xl text-cyan-200 mb-12 max-w-4xl mx-auto leading-relaxed">
                                Experience the next generation of resume building with AI-powered design,
                                real-time optimization, and futuristic templates that make you stand out.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
                        >
                            <Link href="/builder">
                                <motion.button
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="cyber-button px-10 py-4 text-xl font-bold rounded-lg flex items-center gap-3 neon-glow"
                                >
                                    <Rocket className="w-6 h-6" />
                                    Launch Builder
                                    <ChevronRight className="w-5 h-5" />
                                </motion.button>
                            </Link>

                            <Link href="/faizan">
                                <motion.button
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="glass-morphism border border-cyan-400 text-cyan-300 px-10 py-4 text-xl font-bold rounded-lg flex items-center gap-3 hover:bg-cyan-400/10 transition-all"
                                >
                                    <Eye className="w-6 h-6" />
                                    View Demo
                                </motion.button>
                            </Link>
                        </motion.div>

                        {/* Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
                        >
                            {stats.map((stat, index) => (
                                <div key={index} className="hologram rounded-xl p-6 text-center">
                                    <div className="text-neon-blue mb-2">{stat.icon}</div>
                                    <div className="text-3xl font-bold text-white mb-1">{stat.number}</div>
                                    <div className="text-cyan-300 text-sm">{stat.label}</div>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>

                {/* Features Section */}
                <div className="relative z-40 py-20 bg-black/20 backdrop-blur-sm">
                    <div className="max-w-7xl mx-auto px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-center mb-16"
                        >
                            <h2 className="text-5xl md:text-6xl font-bold mb-6">
                                <span className="neon-text">Quantum-Powered</span>
                                <span className="block text-white">Features</span>
                            </h2>
                            <p className="text-xl text-cyan-200 max-w-3xl mx-auto">
                                Experience resume building like never before with our cutting-edge technology
                            </p>
                        </motion.div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1, duration: 0.6 }}
                                    whileHover={{ y: -10, scale: 1.02 }}
                                    className="hologram rounded-xl p-8 relative overflow-hidden group"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                                         style={{background: `linear-gradient(45deg, ${feature.color.split(' ')[1]}, ${feature.color.split(' ')[3]})`}}></div>

                                    <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center mb-6 text-white`}>
                                        {feature.icon}
                                    </div>

                                    <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                                    <p className="text-cyan-200 leading-relaxed">{feature.description}</p>

                                    <div className="absolute top-4 right-4 w-2 h-2 bg-neon-green rounded-full animate-pulse"></div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="relative z-40 py-20">
                    <div className="max-w-4xl mx-auto px-6 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="hologram rounded-2xl p-12 relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/10 to-neon-pink/10"></div>

                            <h2 className="text-4xl md:text-5xl font-bold mb-6">
                                <span className="text-white">Ready to </span>
                                <span className="neon-text">Revolutionize</span>
                                <span className="text-white"> Your Career?</span>
                            </h2>

                            <p className="text-xl text-cyan-200 mb-8 max-w-2xl mx-auto">
                                Join thousands of professionals who've transformed their careers with our AI-powered resume builder.
                            </p>

                            <Link href="/builder">
                                <motion.button
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="cyber-button px-12 py-5 text-2xl font-bold rounded-xl flex items-center gap-4 mx-auto neon-glow"
                                >
                                    <Zap className="w-8 h-8" />
                                    Start Building Now
                                    <ChevronRight className="w-6 h-6" />
                                </motion.button>
                            </Link>

                            <p className="text-cyan-400 text-sm mt-6">
                                ✨ No signup required • 🚀 Instant results • 💎 Professional quality
                            </p>
                        </motion.div>
                    </div>
                </div>

                {/* Footer */}
                <footer className="relative z-40 border-t border-cyan-800/30 py-12">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="flex flex-col md:flex-row justify-between items-center">
                            <div className="flex items-center space-x-3 mb-4 md:mb-0">
                                <div className="w-8 h-8 bg-gradient-to-r from-neon-blue to-neon-pink rounded-lg flex items-center justify-center">
                                    <Code className="w-5 h-5 text-white" />
                                </div>
                                <span className="text-xl font-bold neon-text">Mohammad Faizan</span>
                            </div>

                            <div className="flex space-x-8 text-cyan-300">
                                <Link href="/faizan" className="hover:text-neon-blue transition-colors">Sample</Link>
                                <Link href="/builder" className="hover:text-neon-blue transition-colors">Builder</Link>
                                <Link href="/preview" className="hover:text-neon-blue transition-colors">Preview</Link>
                            </div>
                        </div>

                        <div className="border-t border-cyan-800/30 mt-8 pt-8 text-center">
                            <p className="text-cyan-400">© 2024 Mohammad Faizan. Built for the future of careers.</p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}