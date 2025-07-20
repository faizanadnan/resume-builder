import { useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    Download,
    ArrowLeft,
    Mail,
    Phone,
    MapPin,
    Linkedin,
    Github,
    Globe,
    ExternalLink,
    Rocket,
    Brain,
    Code,
    Award
} from 'lucide-react';
import { faizanResumeData } from '../lib/resumeData';

export default function FaizanResume() {
    const resumeRef = useRef(null);

    const handleDownloadPDF = () => {
        const printWindow = window.open('', '_blank');
        const resumeContent = resumeRef.current.innerHTML;

        const compactPrintStyles = `
      <style>
        /* Reset and base styles */
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
          font-family: 'Segoe UI', sans-serif; 
          line-height: 1.3; 
          color: #333; 
          background: white; 
          font-size: 11px; 
        }
        
        /* Container */
        .resume-container { 
          max-width: 100%; 
          margin: 0; 
          padding: 0; 
        }
        
        /* Header */
        .resume-header { 
          background: linear-gradient(135deg, #1a1a2e, #16213e); 
          color: white; 
          padding: 20px 15px; 
          text-align: center; 
        }
        .name { font-size: 2em; font-weight: 700; margin-bottom: 6px; }
        .title { font-size: 1em; margin-bottom: 12px; }
        .contact-info { 
          display: flex; 
          justify-content: center; 
          flex-wrap: wrap; 
          gap: 12px; 
          font-size: 0.8em; 
        }
        .contact-item { display: flex; align-items: center; gap: 4px; }
        
        /* Layout */
        .main-content { display: grid; grid-template-columns: 1fr 250px; gap: 0; }
        .left-column { padding: 15px 20px; }
        .right-column { 
          background: #f8f9fa; 
          padding: 15px; 
          border-left: 1px solid #ddd; 
        }
        
        /* Sections */
        .section { margin-bottom: 16px; }
        .section-title { 
          font-size: 1.1em; 
          font-weight: 700; 
          color: #2a5298; 
          margin-bottom: 10px; 
          padding-bottom: 4px; 
          border-bottom: 2px solid #667eea; 
        }
        
        /* Summary */
        .summary { font-size: 0.9em; line-height: 1.4; color: #555; }
        .summary p { margin-bottom: 6px; }
        
        /* Experience */
        .experience-item { 
          margin-bottom: 14px; 
          padding: 12px; 
          background: white; 
          border-left: 3px solid #667eea; 
          border-radius: 4px;
        }
        .experience-title { font-size: 1em; font-weight: 600; color: #2a5298; margin-bottom: 3px; }
        .company-name { font-size: 0.9em; font-weight: 600; margin-bottom: 4px; }
        .experience-meta { font-size: 0.75em; color: #666; margin-bottom: 8px; }
        .company-description { font-style: italic; color: #666; margin-bottom: 8px; font-size: 0.8em; }
        
        /* Achievement lists */
        .achievement-list { list-style: none; }
        .achievement-list li { 
          margin-bottom: 4px; 
          padding-left: 12px; 
          position: relative; 
          font-size: 0.8em; 
          line-height: 1.3; 
        }
        .achievement-list li::before { 
          content: '▶'; 
          position: absolute; 
          left: 0; 
          color: #667eea; 
          font-size: 0.7em; 
        }
        
        /* Projects */
        .project-item { 
          margin-bottom: 12px; 
          padding: 10px; 
          background: white; 
          border-left: 3px solid #28a745; 
          border-radius: 4px;
        }
        .project-category { 
          background: #007bff; 
          color: white; 
          padding: 1px 6px; 
          border-radius: 6px; 
          font-size: 0.6em; 
          margin-bottom: 6px; 
          display: inline-block; 
        }
        .project-name { font-weight: 600; color: #2a5298; margin-bottom: 3px; font-size: 0.9em; }
        .project-year { color: #666; font-size: 0.75em; margin-bottom: 6px; }
        .project-description { color: #555; font-size: 0.8em; line-height: 1.3; margin-bottom: 8px; }
        
        /* Tags */
        .tech-tag, .highlight-tag { 
          padding: 1px 4px; 
          border-radius: 4px; 
          font-size: 0.6em; 
          margin-right: 2px; 
          margin-bottom: 2px; 
          display: inline-block; 
        }
        .tech-tag { background: #e9ecef; color: #495057; }
        .highlight-tag { background: #d4edda; color: #155724; }
        
        /* Skills */
        .skill-category { margin-bottom: 12px; }
        .skill-category-title { font-size: 0.85em; font-weight: 600; color: #2a5298; margin-bottom: 6px; }
        .skill-tags { display: flex; flex-wrap: wrap; gap: 3px; }
        .skill-tag { 
          background: #667eea; 
          color: white; 
          padding: 2px 6px; 
          border-radius: 8px; 
          font-size: 0.65em; 
        }
        
        /* Education & Certifications */
        .education-item, .certification-item { 
          margin-bottom: 10px; 
          padding: 8px; 
          background: white; 
          border-radius: 4px; 
        }
        .education-degree, .certification-name { 
          font-weight: 600; 
          color: #2a5298; 
          margin-bottom: 3px; 
          font-size: 0.85em; 
        }
        .education-school { font-weight: 500; margin-bottom: 3px; font-size: 0.8em; }
        .education-year { color: #666; font-size: 0.7em; }
        .certification-description { color: #555; font-size: 0.75em; line-height: 1.3; }
        
        /* Print optimizations */
        @media print {
          body { print-color-adjust: exact; -webkit-print-color-adjust: exact; }
          .main-content { grid-template-columns: 1fr; }
          .right-column { border-left: none; border-top: 1px solid #ddd; }
          .section { page-break-inside: avoid; margin-bottom: 12px; }
          .experience-item, .project-item { page-break-inside: avoid; }
        }
      </style>
    `;

        printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${faizanResumeData.personalInfo.name} - Resume</title>
          ${compactPrintStyles}
        </head>
        <body>
          ${resumeContent}
        </body>
      </html>
    `);

        printWindow.document.close();
        setTimeout(() => {
            printWindow.print();
            printWindow.close();
        }, 250);
    };

    const formatSummary = (text) => {
        return text.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-4 last:mb-0">
                {paragraph.split(/(\d+\+|AWS|Java|Scala|Python|Machine Learning|AI-powered|microservices architecture|cloud infrastructure optimization|Agile methodologies|25-30%|11\+|ML|TensorFlow|data-driven|MLOps)/).map((text, i) => {
                    const highlights = ['11+', 'AWS', 'Java', 'Scala', 'Python', 'Machine Learning', 'AI-powered', 'microservices architecture', 'cloud infrastructure optimization', 'Agile methodologies', '25-30%', 'ML', 'TensorFlow', 'data-driven', 'MLOps'];
                    return highlights.some(h => text.includes(h)) ? (
                        <span key={i} className="highlight bg-gradient-to-r from-blue-100 to-pink-100 px-2 py-1 rounded font-semibold">
              {text}
            </span>
                    ) : text;
                })}
            </p>
        ));
    };

    const getProjectCategoryColor = (category) => {
        const colors = {
            'Machine Learning': 'bg-purple-600',
            'Full-Stack + ML': 'bg-blue-600',
            'AI/NLP': 'bg-green-600',
            'Computer Vision': 'bg-red-600',
            'Data Science': 'bg-yellow-600',
            'Recommendation System': 'bg-indigo-600',
            'NLP': 'bg-teal-600',
            'Web Development': 'bg-gray-600'
        };
        return colors[category] || 'bg-blue-600';
    };

    return (
        <>
            <Head>
                <title>Mohammad Faizan - Senior Software Engineer & ML Engineer Resume</title>
                <meta name="description" content="Professional resume of Mohammad Faizan - Senior Software Engineer & ML Engineer with 11+ years of experience in software development and machine learning" />
                <meta name="keywords" content="Mohammad Faizan, Software Engineer, ML Engineer, Machine Learning, Resume, Amazon, TechSocket, React, Java, Python, TensorFlow" />
            </Head>

            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden">
                {/* Background effects */}
                <div className="absolute inset-0 cyber-grid opacity-20"></div>

                {/* Header */}
                <div className="relative z-50 border-b border-cyan-800/30 backdrop-blur-sm">
                    <div className="max-w-7xl mx-auto px-6 py-4">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-4">
                                <Link href="/" className="text-cyan-300 hover:text-white transition-colors">
                                    <ArrowLeft className="w-6 h-6" />
                                </Link>
                                <h1 className="text-2xl font-bold neon-text">Faizan's Resume</h1>
                            </div>

                            <div className="flex items-center space-x-4">
                                <Link href="/builder">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="glass-morphism border border-cyan-400 text-cyan-300 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-cyan-400/10 transition-all"
                                    >
                                        <Rocket className="w-5 h-5" />
                                        Build Your Own
                                    </motion.button>
                                </Link>

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleDownloadPDF}
                                    className="cyber-button px-6 py-2 flex items-center gap-2 neon-glow"
                                >
                                    <Download className="w-5 h-5" />
                                    Download PDF
                                </motion.button>
                            </div>
                        </div>

                        <div className="text-sm text-cyan-400 mt-2 flex items-center gap-4">
                            <span>🌟 <strong>Enhanced Resume:</strong> Mohammad Faizan's professional resume with ML expertise and project skills.</span>
                            <div className="flex items-center gap-2">
                                <Brain className="w-4 h-4" />
                                <span>Senior Engineer</span>
                                <Code className="w-4 h-4" />
                                <span>11+ Years</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Resume Container */}
                <div className="relative z-40 max-w-5xl mx-auto p-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        ref={resumeRef}
                        className="resume-container bg-white rounded-2xl shadow-2xl overflow-hidden"
                    >
                        {/* Header */}
                        <div className="resume-header bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 text-white p-10 text-center relative overflow-hidden">
                            <div className="absolute inset-0 opacity-20">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent transform -skew-y-6"></div>
                            </div>
                            <div className="relative z-10">
                                <h1 className="name text-5xl font-bold mb-3">{faizanResumeData.personalInfo.name}</h1>
                                <p className="title text-xl opacity-90 mb-6">{faizanResumeData.personalInfo.title}</p>

                                <div className="contact-info flex justify-center flex-wrap gap-6 text-sm">
                                    <div className="contact-item flex items-center gap-2">
                                        <Phone className="w-4 h-4" />
                                        <span>{faizanResumeData.personalInfo.phone}</span>
                                    </div>
                                    <div className="contact-item flex items-center gap-2">
                                        <Mail className="w-4 h-4" />
                                        <span>{faizanResumeData.personalInfo.email}</span>
                                    </div>
                                    <div className="contact-item flex items-center gap-2">
                                        <Linkedin className="w-4 h-4" />
                                        <span>linkedin.com/in/mfaizaan</span>
                                    </div>
                                    <div className="contact-item flex items-center gap-2">
                                        <Github className="w-4 h-4" />
                                        <span>github.com/mfaizaan</span>
                                    </div>
                                    <div className="contact-item flex items-center gap-2">
                                        <MapPin className="w-4 h-4" />
                                        <span>{faizanResumeData.personalInfo.location}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="main-content grid lg:grid-cols-3 gap-0">
                            {/* Left Column */}
                            <div className="lg:col-span-2 left-column p-10">
                                {/* Professional Summary */}
                                <section className="section mb-10">
                                    <h2 className="section-title text-2xl font-bold text-blue-800 mb-6 pb-3 border-b-4 border-blue-600 relative">
                                        Professional Summary
                                    </h2>
                                    <div className="summary text-lg leading-relaxed text-gray-700">
                                        {formatSummary(faizanResumeData.summary)}
                                    </div>
                                </section>

                                {/* Professional Experience */}
                                <section className="section mb-10">
                                    <h2 className="section-title text-2xl font-bold text-blue-800 mb-6 pb-3 border-b-4 border-blue-600 relative">
                                        Professional Experience
                                    </h2>

                                    {faizanResumeData.experience.map((exp, index) => (
                                        <div key={index} className="experience-item mb-8 p-6 bg-gray-50 rounded-xl border-l-4 border-blue-600 hover:shadow-lg transition-shadow">
                                            <div className="mb-4">
                                                <h3 className="experience-title text-xl font-semibold text-blue-800 mb-2">{exp.title}</h3>
                                                <h4 className="company-name text-lg font-medium text-gray-800 mb-2">{exp.company}</h4>
                                                <div className="experience-meta flex gap-4 text-gray-600 text-sm mb-4">
                                                    <span>{exp.duration}</span>
                                                    <span>{exp.location}</span>
                                                </div>
                                            </div>

                                            <p className="company-description italic text-gray-600 mb-4">{exp.description}</p>

                                            <ul className="achievement-list">
                                                {exp.achievements.map((achievement, achIndex) => (
                                                    <li key={achIndex} className="mb-2 pl-5 relative text-gray-700">
                                                        <span className="absolute left-0 text-blue-600">▶</span>
                                                        {achievement}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </section>

                                {/* Notable Projects */}
                                <section className="section mb-10">
                                    <h2 className="section-title text-2xl font-bold text-blue-800 mb-6 pb-3 border-b-4 border-blue-600 relative">
                                        Notable Projects
                                    </h2>

                                    {faizanResumeData.projects.map((project, index) => (
                                        <div key={index} className="project-item mb-8 p-6 bg-gray-50 rounded-xl border-l-4 border-green-600">
                                            <div className="flex justify-between items-start mb-4">
                                                <div className="flex-1">
                                                    {project.category && (
                                                        <span className={`project-category ${getProjectCategoryColor(project.category)} text-white px-3 py-1 rounded-full text-xs font-medium mb-3 inline-block`}>
                              {project.category}
                            </span>
                                                    )}
                                                    <h3 className="project-name text-xl font-semibold text-blue-800 mb-2">{project.name}</h3>
                                                    <p className="project-year text-gray-600 text-sm mb-3">{project.year}</p>
                                                </div>
                                            </div>

                                            <p className="project-description text-gray-700 leading-relaxed mb-4">{project.description}</p>

                                            {project.technologies && project.technologies.length > 0 && (
                                                <div className="project-technologies mb-4">
                                                    <h4 className="text-sm font-semibold text-gray-800 mb-2">Technologies & Skills:</h4>
                                                    <div className="flex flex-wrap gap-2">
                                                        {project.technologies.map((tech, techIndex) => (
                                                            <span key={techIndex} className="tech-tag bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                                {tech}
                              </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {project.highlights && project.highlights.length > 0 && (
                                                <div className="project-highlights">
                                                    <h4 className="text-sm font-semibold text-gray-800 mb-2">Key Highlights:</h4>
                                                    <div className="flex flex-wrap gap-2">
                                                        {project.highlights.map((highlight, highlightIndex) => (
                                                            <span key={highlightIndex} className="highlight-tag bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                                {highlight}
                              </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </section>

                                {/* Key Achievements */}
                                <section className="section">
                                    <h2 className="section-title text-2xl font-bold text-blue-800 mb-6 pb-3 border-b-4 border-blue-600 relative">
                                        Key Achievements
                                    </h2>
                                    <ul className="achievement-list">
                                        {faizanResumeData.achievements.map((achievement, index) => (
                                            <li key={index} className="mb-2 pl-5 relative text-gray-700">
                                                <span className="absolute left-0 text-blue-600">▶</span>
                                                {achievement}
                                            </li>
                                        ))}
                                    </ul>
                                </section>
                            </div>

                            {/* Right Column */}
                            <div className="right-column bg-gray-50 p-8 border-l border-gray-200">
                                {/* Technical Skills */}
                                <section className="section mb-8">
                                    <h2 className="section-title text-xl font-bold text-blue-800 mb-6 pb-2 border-b-2 border-blue-600">
                                        Technical Skills
                                    </h2>

                                    {Object.entries(faizanResumeData.skills).map(([category, skills]) => (
                                        <div key={category} className="skill-category mb-6">
                                            <h3 className="skill-category-title font-semibold text-blue-700 mb-3">
                                                {category.includes('ML') || category.includes('Machine Learning') || category.includes('AI') || category.includes('Data Science') ? (
                                                    <span className="flex items-center gap-2">
                            <Brain className="w-4 h-4" />
                                                        {category}
                          </span>
                                                ) : (
                                                    category
                                                )}
                                            </h3>
                                            <div className="skill-tags flex flex-wrap gap-2">
                                                {skills.map((skill, index) => (
                                                    <span key={index} className={`skill-tag text-white px-3 py-1 rounded-full text-sm font-medium ${
                                                        category.includes('ML') || category.includes('Machine Learning') || category.includes('AI') || category.includes('Data Science')
                                                            ? 'bg-gradient-to-r from-purple-600 to-pink-600'
                                                            : 'bg-gradient-to-r from-blue-600 to-purple-600'
                                                    }`}>
                            {skill}
                          </span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </section>

                                {/* Education */}
                                <section className="section mb-8">
                                    <h2 className="section-title text-xl font-bold text-blue-800 mb-6 pb-2 border-b-2 border-blue-600">
                                        Education
                                    </h2>

                                    {faizanResumeData.education.map((edu, index) => (
                                        <div key={index} className="education-item mb-6 p-4 bg-white rounded-lg shadow-sm">
                                            <h3 className="education-degree font-semibold text-blue-700 mb-1">{edu.degree}</h3>
                                            <h4 className="education-school font-medium text-gray-800 mb-1">{edu.school}</h4>
                                            <p className="education-year text-gray-600 text-sm">
                                                {edu.year} | {edu.location}
                                            </p>
                                            <p className="text-gray-600 text-sm mt-1">{edu.grade}</p>
                                            {edu.relevantCourses && edu.relevantCourses.length > 0 && (
                                                <div className="mt-3">
                                                    <h5 className="text-xs font-semibold text-gray-700 mb-1">Relevant Courses:</h5>
                                                    <div className="flex flex-wrap gap-1">
                                                        {edu.relevantCourses.map((course, courseIndex) => (
                                                            <span key={courseIndex} className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs">
                                {course}
                              </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </section>

                                {/* Certifications & Awards */}
                                <section className="section mb-8">
                                    <h2 className="section-title text-xl font-bold text-blue-800 mb-6 pb-2 border-b-2 border-blue-600">
                                        Certifications & Awards
                                    </h2>

                                    {faizanResumeData.certifications.map((cert, index) => (
                                        <div key={index} className="certification-item mb-4 p-4 bg-white rounded-lg shadow-sm">
                                            <h3 className="certification-name font-semibold text-blue-700 mb-1 flex items-center gap-2">
                                                {cert.name.includes('ML') || cert.name.includes('Machine Learning') || cert.name.includes('TensorFlow') || cert.name.includes('Deep Learning') ? (
                                                    <Brain className="w-4 h-4" />
                                                ) : (
                                                    <Award className="w-4 h-4" />
                                                )}
                                                {cert.name}
                                            </h3>
                                            <p className="certification-description text-gray-600 text-sm">{cert.description}</p>
                                            {cert.year && (
                                                <p className="text-gray-500 text-xs mt-1">{cert.year}</p>
                                            )}
                                        </div>
                                    ))}
                                </section>

                                {/* Languages */}
                                <section className="section mb-8">
                                    <h2 className="section-title text-xl font-bold text-blue-800 mb-6 pb-2 border-b-2 border-blue-600">
                                        Languages
                                    </h2>

                                    {faizanResumeData.languages.map((lang, index) => (
                                        <div key={index} className="flex justify-between items-center mb-2">
                                            <span className="text-gray-800 font-medium">{lang.name}</span>
                                            <span className="text-gray-600 text-sm">{lang.level}</span>
                                        </div>
                                    ))}
                                </section>

                                {/* Core Competencies */}
                                <section className="section">
                                    <h2 className="section-title text-xl font-bold text-blue-800 mb-6 pb-2 border-b-2 border-blue-600">
                                        Core Competencies
                                    </h2>

                                    <div className="skill-tags flex flex-wrap gap-2">
                                        {faizanResumeData.competencies.map((competency, index) => (
                                            <span key={index} className={`skill-tag text-white px-3 py-1 rounded-full text-sm font-medium ${
                                                competency.includes('ML') || competency.includes('Machine Learning') || competency.includes('AI') || competency.includes('Data')
                                                    ? 'bg-gradient-to-r from-purple-500 to-pink-600'
                                                    : 'bg-gradient-to-r from-pink-500 to-purple-600'
                                            }`}>
                        {competency}
                      </span>
                                        ))}
                                    </div>
                                </section>
                            </div>
                        </div>
                    </motion.div>

                    {/* CTA Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="mt-8 hologram rounded-xl p-8 text-center"
                    >
                        <h3 className="text-3xl font-bold text-white mb-4">🚀 Ready to Create Your ML-Enhanced Resume?</h3>
                        <p className="text-cyan-200 mb-6 max-w-2xl mx-auto text-lg">
                            This enhanced resume showcases Mohammad Faizan's software engineering and machine learning expertise.
                            Build your own professional resume with our advanced AI-powered tools!
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/builder">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="cyber-button px-10 py-4 text-xl font-bold flex items-center gap-3 neon-glow"
                                >
                                    <Rocket className="w-7 h-7" />
                                    Start Building Now
                                    <ExternalLink className="w-5 h-5" />
                                </motion.button>
                            </Link>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleDownloadPDF}
                                className="glass-morphism border border-cyan-400 text-cyan-300 px-10 py-4 text-xl font-bold rounded-lg hover:bg-cyan-400/10 transition-all"
                            >
                                <Download className="w-7 h-7 inline mr-3" />
                                Download This Resume
                            </motion.button>
                        </div>

                        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6 text-sm">
                            <div className="bg-black/20 rounded-lg p-4">
                                <div className="text-purple-400 text-2xl mb-2"><Brain /></div>
                                <div className="text-cyan-300 font-semibold">ML Engineering</div>
                                <div className="text-cyan-400">Advanced ML projects</div>
                            </div>
                            <div className="bg-black/20 rounded-lg p-4">
                                <div className="text-blue-400 text-2xl mb-2"><Code /></div>
                                <div className="text-cyan-300 font-semibold">11+ Years</div>
                                <div className="text-cyan-400">Software development</div>
                            </div>
                            <div className="bg-black/20 rounded-lg p-4">
                                <div className="text-green-400 text-2xl mb-2">🎯</div>
                                <div className="text-cyan-300 font-semibold">Project Skills</div>
                                <div className="text-cyan-400">Tech stack for each project</div>
                            </div>
                            <div className="bg-black/20 rounded-lg p-4">
                                <div className="text-pink-400 text-2xl mb-2">📊</div>
                                <div className="text-cyan-300 font-semibold">Data-Driven</div>
                                <div className="text-cyan-400">ML model deployment</div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </>
    );
}