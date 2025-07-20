import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronLeft,
    ChevronRight,
    Save,
    Eye,
    Plus,
    Trash2,
    Zap,
    CheckCircle,
    Circle
} from 'lucide-react';
import { defaultResumeTemplate, formSections } from '../lib/resumeData';

export default function Builder() {
    const router = useRouter();
    const [currentSection, setCurrentSection] = useState(0);
    const [resumeData, setResumeData] = useState(defaultResumeTemplate);
    const [completedSections, setCompletedSections] = useState(new Set());

    useEffect(() => {
        // Load saved data from localStorage
        const savedData = localStorage.getItem('resumeData');
        if (savedData) {
            setResumeData(JSON.parse(savedData));
        }
    }, []);

    useEffect(() => {
        // Auto-save to localStorage
        localStorage.setItem('resumeData', JSON.stringify(resumeData));
    }, [resumeData]);

    const updateResumeData = (section, field, value) => {
        setResumeData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }));
    };

    const updateArrayData = (section, index, field, value) => {
        setResumeData(prev => ({
            ...prev,
            [section]: prev[section].map((item, i) =>
                i === index ? { ...item, [field]: value } : item
            )
        }));
    };

    const addArrayItem = (section, template = {}) => {
        setResumeData(prev => ({
            ...prev,
            [section]: [...prev[section], template]
        }));
    };

    const removeArrayItem = (section, index) => {
        setResumeData(prev => ({
            ...prev,
            [section]: prev[section].filter((_, i) => i !== index)
        }));
    };

    const addSkillCategory = () => {
        const categoryName = prompt('Enter skill category name:');
        if (categoryName && categoryName.trim()) {
            setResumeData(prev => ({
                ...prev,
                skills: {
                    ...prev.skills,
                    [categoryName.trim()]: []
                }
            }));
        }
    };

    const updateSkillCategory = (category, skills) => {
        setResumeData(prev => ({
            ...prev,
            skills: {
                ...prev.skills,
                [category]: skills.split(',').map(s => s.trim()).filter(s => s)
            }
        }));
    };

    const removeSkillCategory = (category) => {
        setResumeData(prev => {
            const newSkills = { ...prev.skills };
            delete newSkills[category];
            return { ...prev, skills: newSkills };
        });
    };

    const validateSection = (sectionId) => {
        const section = formSections.find(s => s.id === sectionId);
        if (!section) return false;

        switch (sectionId) {
            case 'personal':
                return resumeData.personalInfo.name &&
                    resumeData.personalInfo.email &&
                    resumeData.personalInfo.phone;
            case 'summary':
                return resumeData.summary && resumeData.summary.length > 50;
            case 'experience':
                return resumeData.experience.length > 0;
            case 'skills':
                return Object.keys(resumeData.skills).length > 0;
            case 'education':
                return resumeData.education.length > 0;
            default:
                return true;
        }
    };

    const handleNext = () => {
        const currentSectionId = formSections[currentSection].id;
        if (validateSection(currentSectionId)) {
            setCompletedSections(prev => new Set([...prev, currentSectionId]));
        }

        if (currentSection < formSections.length - 1) {
            setCurrentSection(currentSection + 1);
        } else {
            // Save and redirect to preview
            localStorage.setItem('resumeData', JSON.stringify(resumeData));
            router.push('/preview');
        }
    };

    const handlePrevious = () => {
        if (currentSection > 0) {
            setCurrentSection(currentSection - 1);
        }
    };

    const handlePreview = () => {
        localStorage.setItem('resumeData', JSON.stringify(resumeData));
        router.push('/preview');
    };

    const renderPersonalInfo = () => {
        const section = formSections.find(s => s.id === 'personal');

        return (
            <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                    {section.fields.map((field) => (
                        <div key={field.name} className="space-y-2">
                            <label className="block text-sm font-medium text-cyan-300">
                                {field.label} {field.required && <span className="text-red-400">*</span>}
                            </label>
                            <input
                                type={field.type}
                                value={resumeData.personalInfo[field.name] || ''}
                                onChange={(e) => updateResumeData('personalInfo', field.name, e.target.value)}
                                placeholder={field.placeholder}
                                className="cyber-input w-full px-4 py-3 rounded-lg"
                                required={field.required}
                            />
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const renderSummary = () => (
        <div className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-cyan-300 mb-2">
                    Professional Summary <span className="text-red-400">*</span>
                </label>
                <textarea
                    value={resumeData.summary}
                    onChange={(e) => setResumeData(prev => ({ ...prev, summary: e.target.value }))}
                    placeholder="Write a compelling summary of your professional experience, skills, and achievements..."
                    className="cyber-input w-full px-4 py-3 rounded-lg h-40 resize-none"
                    required
                />
                <p className="text-xs text-cyan-400 mt-2">
                    {resumeData.summary.length}/500 characters (minimum 50 recommended)
                </p>
            </div>
        </div>
    );

    const renderExperience = () => (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-white">Work Experience</h3>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => addArrayItem('experience', {
                        title: '',
                        company: '',
                        duration: '',
                        location: '',
                        description: '',
                        achievements: []
                    })}
                    className="cyber-button px-4 py-2 text-sm flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" />
                    Add Experience
                </motion.button>
            </div>

            {resumeData.experience.map((exp, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="hologram rounded-xl p-6 space-y-4"
                >
                    <div className="flex justify-between items-center">
                        <h4 className="text-lg font-medium text-white">Experience {index + 1}</h4>
                        <button
                            onClick={() => removeArrayItem('experience', index)}
                            className="text-red-400 hover:text-red-300 transition-colors"
                        >
                            <Trash2 className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-cyan-300 mb-2">Job Title *</label>
                            <input
                                type="text"
                                value={exp.title}
                                onChange={(e) => updateArrayData('experience', index, 'title', e.target.value)}
                                placeholder="e.g., Senior Software Engineer"
                                className="cyber-input w-full px-4 py-3 rounded-lg"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-cyan-300 mb-2">Company *</label>
                            <input
                                type="text"
                                value={exp.company}
                                onChange={(e) => updateArrayData('experience', index, 'company', e.target.value)}
                                placeholder="Company Name"
                                className="cyber-input w-full px-4 py-3 rounded-lg"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-cyan-300 mb-2">Duration *</label>
                            <input
                                type="text"
                                value={exp.duration}
                                onChange={(e) => updateArrayData('experience', index, 'duration', e.target.value)}
                                placeholder="e.g., Jan 2020 - Present"
                                className="cyber-input w-full px-4 py-3 rounded-lg"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-cyan-300 mb-2">Location *</label>
                            <input
                                type="text"
                                value={exp.location}
                                onChange={(e) => updateArrayData('experience', index, 'location', e.target.value)}
                                placeholder="City, Country"
                                className="cyber-input w-full px-4 py-3 rounded-lg"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-cyan-300 mb-2">Company Description *</label>
                        <textarea
                            value={exp.description}
                            onChange={(e) => updateArrayData('experience', index, 'description', e.target.value)}
                            placeholder="Brief description of the company..."
                            className="cyber-input w-full px-4 py-3 rounded-lg h-20 resize-none"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-cyan-300 mb-2">Key Achievements</label>
                        <textarea
                            value={exp.achievements ? exp.achievements.join('\n') : ''}
                            onChange={(e) => updateArrayData('experience', index, 'achievements',
                                e.target.value.split('\n').filter(line => line.trim())
                            )}
                            placeholder="• Achievement 1&#10;• Achievement 2&#10;• Achievement 3"
                            className="cyber-input w-full px-4 py-3 rounded-lg h-32 resize-none"
                        />
                        <p className="text-xs text-cyan-400 mt-1">One achievement per line</p>
                    </div>
                </motion.div>
            ))}

            {resumeData.experience.length === 0 && (
                <div className="text-center py-12 text-cyan-400">
                    <p>No work experience added yet. Click "Add Experience" to get started.</p>
                </div>
            )}
        </div>
    );

    const renderSkills = () => (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-white">Technical Skills</h3>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={addSkillCategory}
                    className="cyber-button px-4 py-2 text-sm flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" />
                    Add Category
                </motion.button>
            </div>

            {Object.entries(resumeData.skills).map(([category, skills]) => (
                <motion.div
                    key={category}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="hologram rounded-xl p-6 space-y-4"
                >
                    <div className="flex justify-between items-center">
                        <h4 className="text-lg font-medium text-white">{category}</h4>
                        <button
                            onClick={() => removeSkillCategory(category)}
                            className="text-red-400 hover:text-red-300 transition-colors"
                        >
                            <Trash2 className="w-5 h-5" />
                        </button>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-cyan-300 mb-2">
                            Skills (comma-separated)
                        </label>
                        <input
                            type="text"
                            value={skills.join(', ')}
                            onChange={(e) => updateSkillCategory(category, e.target.value)}
                            placeholder="e.g., JavaScript, React, Node.js"
                            className="cyber-input w-full px-4 py-3 rounded-lg"
                        />
                    </div>
                </motion.div>
            ))}

            {Object.keys(resumeData.skills).length === 0 && (
                <div className="text-center py-12 text-cyan-400">
                    <p>No skill categories added yet. Click "Add Category" to get started.</p>
                </div>
            )}
        </div>
    );

    const renderEducation = () => (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-white">Education</h3>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => addArrayItem('education', {
                        degree: '',
                        school: '',
                        year: '',
                        location: '',
                        grade: ''
                    })}
                    className="cyber-button px-4 py-2 text-sm flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" />
                    Add Education
                </motion.button>
            </div>

            {resumeData.education.map((edu, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="hologram rounded-xl p-6 space-y-4"
                >
                    <div className="flex justify-between items-center">
                        <h4 className="text-lg font-medium text-white">Education {index + 1}</h4>
                        <button
                            onClick={() => removeArrayItem('education', index)}
                            className="text-red-400 hover:text-red-300 transition-colors"
                        >
                            <Trash2 className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-cyan-300 mb-2">Degree *</label>
                            <input
                                type="text"
                                value={edu.degree}
                                onChange={(e) => updateArrayData('education', index, 'degree', e.target.value)}
                                placeholder="e.g., Bachelor of Computer Science"
                                className="cyber-input w-full px-4 py-3 rounded-lg"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-cyan-300 mb-2">Institution *</label>
                            <input
                                type="text"
                                value={edu.school}
                                onChange={(e) => updateArrayData('education', index, 'school', e.target.value)}
                                placeholder="University/College Name"
                                className="cyber-input w-full px-4 py-3 rounded-lg"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-cyan-300 mb-2">Year *</label>
                            <input
                                type="text"
                                value={edu.year}
                                onChange={(e) => updateArrayData('education', index, 'year', e.target.value)}
                                placeholder="e.g., 2018 - 2022"
                                className="cyber-input w-full px-4 py-3 rounded-lg"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-cyan-300 mb-2">Location</label>
                            <input
                                type="text"
                                value={edu.location}
                                onChange={(e) => updateArrayData('education', index, 'location', e.target.value)}
                                placeholder="City, Country"
                                className="cyber-input w-full px-4 py-3 rounded-lg"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-cyan-300 mb-2">Grade/CGPA</label>
                        <input
                            type="text"
                            value={edu.grade}
                            onChange={(e) => updateArrayData('education', index, 'grade', e.target.value)}
                            placeholder="e.g., 3.8/4.0 or First Class"
                            className="cyber-input w-full px-4 py-3 rounded-lg"
                        />
                    </div>
                </motion.div>
            ))}
        </div>
    );

    const renderProjects = () => (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-white">Projects</h3>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => addArrayItem('projects', {
                        name: '',
                        year: '',
                        description: '',
                        technologies: []
                    })}
                    className="cyber-button px-4 py-2 text-sm flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" />
                    Add Project
                </motion.button>
            </div>

            {resumeData.projects.map((project, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="hologram rounded-xl p-6 space-y-4"
                >
                    <div className="flex justify-between items-center">
                        <h4 className="text-lg font-medium text-white">Project {index + 1}</h4>
                        <button
                            onClick={() => removeArrayItem('projects', index)}
                            className="text-red-400 hover:text-red-300 transition-colors"
                        >
                            <Trash2 className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-cyan-300 mb-2">Project Name *</label>
                            <input
                                type="text"
                                value={project.name}
                                onChange={(e) => updateArrayData('projects', index, 'name', e.target.value)}
                                placeholder="Project Name"
                                className="cyber-input w-full px-4 py-3 rounded-lg"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-cyan-300 mb-2">Year *</label>
                            <input
                                type="text"
                                value={project.year}
                                onChange={(e) => updateArrayData('projects', index, 'year', e.target.value)}
                                placeholder="e.g., 2023"
                                className="cyber-input w-full px-4 py-3 rounded-lg"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-cyan-300 mb-2">Description *</label>
                        <textarea
                            value={project.description}
                            onChange={(e) => updateArrayData('projects', index, 'description', e.target.value)}
                            placeholder="Describe your project..."
                            className="cyber-input w-full px-4 py-3 rounded-lg h-24 resize-none"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-cyan-300 mb-2">Technologies Used</label>
                        <input
                            type="text"
                            value={project.technologies ? project.technologies.join(', ') : ''}
                            onChange={(e) => updateArrayData('projects', index, 'technologies',
                                e.target.value.split(',').map(s => s.trim()).filter(s => s)
                            )}
                            placeholder="React, Node.js, MongoDB"
                            className="cyber-input w-full px-4 py-3 rounded-lg"
                        />
                    </div>
                </motion.div>
            ))}
        </div>
    );

    const renderCertifications = () => (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-white">Certifications</h3>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => addArrayItem('certifications', {
                        name: '',
                        description: '',
                        year: ''
                    })}
                    className="cyber-button px-4 py-2 text-sm flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" />
                    Add Certification
                </motion.button>
            </div>

            {resumeData.certifications.map((cert, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="hologram rounded-xl p-6 space-y-4"
                >
                    <div className="flex justify-between items-center">
                        <h4 className="text-lg font-medium text-white">Certification {index + 1}</h4>
                        <button
                            onClick={() => removeArrayItem('certifications', index)}
                            className="text-red-400 hover:text-red-300 transition-colors"
                        >
                            <Trash2 className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-cyan-300 mb-2">Certification Name *</label>
                            <input
                                type="text"
                                value={cert.name}
                                onChange={(e) => updateArrayData('certifications', index, 'name', e.target.value)}
                                placeholder="Certification Name"
                                className="cyber-input w-full px-4 py-3 rounded-lg"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-cyan-300 mb-2">Year</label>
                            <input
                                type="text"
                                value={cert.year}
                                onChange={(e) => updateArrayData('certifications', index, 'year', e.target.value)}
                                placeholder="e.g., 2023"
                                className="cyber-input w-full px-4 py-3 rounded-lg"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-cyan-300 mb-2">Description *</label>
                        <textarea
                            value={cert.description}
                            onChange={(e) => updateArrayData('certifications', index, 'description', e.target.value)}
                            placeholder="Brief description..."
                            className="cyber-input w-full px-4 py-3 rounded-lg h-20 resize-none"
                            required
                        />
                    </div>
                </motion.div>
            ))}
        </div>
    );

    const renderAdditional = () => (
        <div className="space-y-8">
            {/* Achievements */}
            <div>
                <label className="block text-sm font-medium text-cyan-300 mb-2">Key Achievements</label>
                <textarea
                    value={resumeData.achievements ? resumeData.achievements.join('\n') : ''}
                    onChange={(e) => setResumeData(prev => ({
                        ...prev,
                        achievements: e.target.value.split('\n').filter(line => line.trim())
                    }))}
                    placeholder="• Founded successful startup&#10;• Led team of 10+ developers&#10;• Reduced costs by 40%"
                    className="cyber-input w-full px-4 py-3 rounded-lg h-32 resize-none"
                />
                <p className="text-xs text-cyan-400 mt-1">One achievement per line</p>
            </div>

            {/* Languages */}
            <div>
                <div className="flex justify-between items-center mb-4">
                    <label className="block text-sm font-medium text-cyan-300">Languages</label>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => addArrayItem('languages', { name: '', level: 'Conversational' })}
                        className="cyber-button px-3 py-1 text-xs flex items-center gap-2"
                    >
                        <Plus className="w-3 h-3" />
                        Add Language
                    </motion.button>
                </div>

                {resumeData.languages && resumeData.languages.map((lang, index) => (
                    <div key={index} className="grid grid-cols-2 gap-4 mb-4">
                        <input
                            type="text"
                            value={lang.name}
                            onChange={(e) => updateArrayData('languages', index, 'name', e.target.value)}
                            placeholder="Language name"
                            className="cyber-input px-3 py-2 rounded-lg"
                        />
                        <select
                            value={lang.level}
                            onChange={(e) => updateArrayData('languages', index, 'level', e.target.value)}
                            className="cyber-input px-3 py-2 rounded-lg"
                        >
                            <option value="Native">Native</option>
                            <option value="Fluent">Fluent</option>
                            <option value="Conversational">Conversational</option>
                            <option value="Basic">Basic</option>
                        </select>
                    </div>
                ))}
            </div>

            {/* Core Competencies */}
            <div>
                <label className="block text-sm font-medium text-cyan-300 mb-2">Core Competencies</label>
                <input
                    type="text"
                    value={resumeData.competencies ? resumeData.competencies.join(', ') : ''}
                    onChange={(e) => setResumeData(prev => ({
                        ...prev,
                        competencies: e.target.value.split(',').map(s => s.trim()).filter(s => s)
                    }))}
                    placeholder="Leadership, Problem Solving, Team Management"
                    className="cyber-input w-full px-4 py-3 rounded-lg"
                />
            </div>
        </div>
    );

    const renderCurrentSection = () => {
        const section = formSections[currentSection];

        switch (section.id) {
            case 'personal':
                return renderPersonalInfo();
            case 'summary':
                return renderSummary();
            case 'experience':
                return renderExperience();
            case 'skills':
                return renderSkills();
            case 'education':
                return renderEducation();
            case 'projects':
                return renderProjects();
            case 'certifications':
                return renderCertifications();
            case 'additional':
                return renderAdditional();
            default:
                return null;
        }
    };

    const currentSectionData = formSections[currentSection];
    const progress = ((currentSection + 1) / formSections.length) * 100;

    return (
        <>
            <Head>
                <title>Resume Builder - Create Your Professional Resume</title>
                <meta name="description" content="Build your professional resume with our advanced form builder" />
            </Head>

            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden">
                {/* Background effects */}
                <div className="absolute inset-0 cyber-grid opacity-20"></div>

                {/* Header */}
                <div className="relative z-40 border-b border-cyan-800/30 backdrop-blur-sm">
                    <div className="max-w-7xl mx-auto px-6 py-4">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-4">
                                <button
                                    onClick={() => router.push('/')}
                                    className="text-cyan-300 hover:text-white transition-colors"
                                >
                                    <ChevronLeft className="w-6 h-6" />
                                </button>
                                <h1 className="text-2xl font-bold neon-text">Resume Builder</h1>
                            </div>

                            <div className="flex items-center space-x-4">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handlePreview}
                                    className="glass-morphism border border-cyan-400 text-cyan-300 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-cyan-400/10 transition-all"
                                >
                                    <Eye className="w-5 h-5" />
                                    Preview
                                </motion.button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Progress bar */}
                <div className="relative z-40 bg-black/20 backdrop-blur-sm">
                    <div className="max-w-7xl mx-auto px-6 py-4">
                        <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-medium text-cyan-300">
                Step {currentSection + 1} of {formSections.length}
              </span>
                            <span className="text-sm font-medium text-cyan-300">
                {Math.round(progress)}% Complete
              </span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                            <motion.div
                                className="bg-gradient-to-r from-neon-blue to-neon-pink h-2 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 0.5 }}
                            />
                        </div>

                        {/* Section navigation */}
                        <div className="flex justify-center mt-6 space-x-2 overflow-x-auto">
                            {formSections.map((section, index) => (
                                <button
                                    key={section.id}
                                    onClick={() => setCurrentSection(index)}
                                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm whitespace-nowrap transition-all ${
                                        index === currentSection
                                            ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500'
                                            : index < currentSection || completedSections.has(section.id)
                                                ? 'bg-green-500/20 text-green-300 border border-green-500'
                                                : 'bg-gray-700/50 text-gray-400 border border-gray-600'
                                    }`}
                                >
                                    <span className="text-lg">{section.icon}</span>
                                    <span>{section.title}</span>
                                    {(index < currentSection || completedSections.has(section.id)) && (
                                        <CheckCircle className="w-4 h-4" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Main content */}
                <div className="relative z-40 max-w-4xl mx-auto px-6 py-8">
                    <motion.div
                        key={currentSection}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="hologram rounded-2xl p-8"
                    >
                        <div className="mb-8">
                            <div className="flex items-center space-x-3 mb-4">
                                <span className="text-3xl">{currentSectionData.icon}</span>
                                <h2 className="text-3xl font-bold text-white">{currentSectionData.title}</h2>
                            </div>
                            <div className="w-16 h-1 bg-gradient-to-r from-neon-blue to-neon-pink rounded-full"></div>
                        </div>

                        {renderCurrentSection()}

                        {/* Navigation buttons */}
                        <div className="flex justify-between items-center mt-12 pt-8 border-t border-cyan-800/30">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handlePrevious}
                                disabled={currentSection === 0}
                                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                                    currentSection === 0
                                        ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                                        : 'glass-morphism border border-cyan-400 text-cyan-300 hover:bg-cyan-400/10'
                                }`}
                            >
                                <ChevronLeft className="w-5 h-5" />
                                Previous
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleNext}
                                className={`flex items-center gap-2 px-8 py-3 rounded-lg font-bold transition-all ${
                                    currentSection === formSections.length - 1
                                        ? 'cyber-button neon-glow'
                                        : 'cyber-button'
                                }`}
                            >
                                {currentSection === formSections.length - 1 ? (
                                    <>
                                        <Zap className="w-5 h-5" />
                                        Complete Resume
                                    </>
                                ) : (
                                    <>
                                        Next Step
                                        <ChevronRight className="w-5 h-5" />
                                    </>
                                )}
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </>
    );
}