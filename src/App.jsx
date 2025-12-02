import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import {
    Users,
    Award,
    BookOpen,
    Briefcase,
    Mail,
    Phone,
    Linkedin,
    Menu,
    X,
    ChevronRight,
    GraduationCap,
    Globe,
    CheckCircle2,
    Target,
    MessageCircle,
    Quote,
    Camera
} from 'lucide-react';

const Portfolio = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Typewriter State
    const [currentText, setCurrentText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(50);

    // State for form data
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    // EmailJS State
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

    // Phrases derived from your sentence
    const phrases = [
        "L&D Manager & Corporate Trainer.",
        "Specialized in Verbal Ability.",
        "Expert in Soft Skills.",
        "Teacher Training Specialist.",
        "Helping Institutions Bridge the Gap.",
        "Connecting Campus to Corporate."
    ];

    useEffect(() => {
        const handleType = () => {
            const i = loopNum % phrases.length;
            const fullText = phrases[i];

            setCurrentText(isDeleting
                ? fullText.substring(0, currentText.length - 1)
                : fullText.substring(0, currentText.length + 1)
            );

            // Determine speed based on action
            let typeSpeed = 100; // Slower typing speed for softness

            if (isDeleting) {
                typeSpeed = 50; // Slower deleting speed
            }

            if (!isDeleting && currentText === fullText) {
                typeSpeed = 2000; // Pause at end of sentence
                setIsDeleting(true);
            } else if (isDeleting && currentText === '') {
                setIsDeleting(false);
                setLoopNum(loopNum + 1);
                typeSpeed = 500; // Pause before starting new sentence
            }

            setTypingSpeed(typeSpeed);
        };

        const timer = setTimeout(handleType, typingSpeed);
        return () => clearTimeout(timer);
    }, [currentText, isDeleting, loopNum, typingSpeed, phrases]);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id) => {
        setIsMenuOpen(false);
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        // TODO: Replace with your actual EmailJS credentials
        // Sign up at https://www.emailjs.com/
        const serviceId = 'service_5xv0dlj';
        const templateId = 'template_rjfc9zb';
        const publicKey = 'AoPFoZvSVVLK6twCK';

        const templateParams = {
            from_name: formData.name,
            from_email: formData.email,
            phone: formData.phone,
            message: formData.message,
            to_name: 'Balaji H K',
        };

        try {
            // Only attempt to send if keys are not placeholders (basic check)
            if (serviceId === 'YOUR_SERVICE_ID') {
                throw new Error('Please configure EmailJS credentials in src/App.jsx');
            }

            await emailjs.send(serviceId, templateId, templateParams, publicKey);
            setSubmitStatus('success');
            setFormData({ name: '', email: '', phone: '', message: '' });
        } catch (error) {
            console.error('EmailJS Error:', error);
            setSubmitStatus('error');
            // For demo purposes, if it fails due to invalid keys, we might still want to show what happened
            if (error.message.includes('credentials')) {
                alert(error.message);
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const openWhatsApp = () => {
        const message = "Hi Balaji, I'm interested in your training programs.";
        // Replace with Balaji's actual number if different from resume
        window.open(`https://wa.me/918121780321?text=${encodeURIComponent(message)}`, '_blank');
    };

    // Data based on Resume
    const expertise = [
        { title: "Corporate Training", icon: <Briefcase className="w-6 h-6" />, desc: "Campus to Corporate transition programs." },
        { title: "Verbal Ability", icon: <BookOpen className="w-6 h-6" />, desc: "Master Trainer for Cambridge Linguaskill & IELTS." },
        { title: "Leadership Development", icon: <Users className="w-6 h-6" />, desc: "Training 300+ Trainers (TOT) & Faculty Development." },
        { title: "Soft Skills", icon: <Award className="w-6 h-6" />, desc: "Personality development, conflict resolution, & communication." }
    ];

    const stats = [
        { label: "Graduates Trained", value: "50,000+" },
        { label: "Trainers Mentored", value: "300+" },
        { label: "Years Experience", value: "12+" }, // Estimated based on senior roles
        { label: "Institutions Served", value: "40+" }
    ];

    const testimonials = [
        {
            name: "Principal",
            role: "Engineering College, AP",
            text: "Balaji's training sessions transformed our students' confidence levels. His approach to verbal ability is unique and highly effective."
        },
        {
            name: "HR Manager",
            role: "Corporate Partner",
            text: "The transition from campus to corporate is often difficult, but students trained by Balaji adapt remarkably fast. Highly recommended."
        },
        {
            name: "Student",
            role: "Vignan University",
            text: "I was terrified of interviews until I attended Balaji Sir's workshop. His tips on soft skills helped me crack my dream job."
        }
    ];

    // Extended Milestones Data
    const milestones = [
        {
            role: "Head of Verbal Ability",
            org: "G. Pullaiah Group of Institutions",
            desc: "Conceptualizing and developing customized training activities for students and management."
        },
        {
            role: "District Coordinator",
            org: "Cambridge Launchpad Career Labs",
            desc: "Collaborated with Commissioner & Directorate of Municipal Administration, A.P. for large-scale implementations."
        },
        {
            role: "Master Trainer",
            org: "Cambridge Linguaskill",
            desc: "Certified C2 Level trainer. Conducted assessments and training for thousands of students."
        },
        {
            role: "Program Manager",
            org: "Municipal Schools Project",
            desc: "Organized, assessed, and implemented integrated communication skills training for 3,000+ Govt Teachers & Headmasters."
        },
        {
            role: "Content Developer",
            org: "Municipal Department, A.P.",
            desc: "Responsible for creating e-learning, offline, and online learning materials for state-wide education initiatives."
        },
        {
            role: "Academic Coordinator",
            org: "C&DMA Schools, Andhra Pradesh",
            desc: "Oversaw academic implementation and quality standards across municipal administration schools."
        },
        {
            role: "Freelance Trainer",
            org: "Various Organizations",
            desc: "Specialized in Soft Skills, Communicative English, and Verbal Communication for diverse educational institutions."
        }
    ];

    // Comprehensive Clients List with Domains
    const clients = [
        // Major Brands/Govt
        { name: "Cambridge Assessment", domain: "cambridgeenglish.org" },
        { name: "Infosys", domain: "infosys.com" },
        { name: "Wipro", domain: "wipro.com" },
        { name: "Govt. of Andhra Pradesh", domain: "ap.gov.in" },
        { name: "MEPMA", domain: "mepma.ap.gov.in" },

        // Universities
        { name: "Vignan University", domain: "vignan.ac.in" },
        { name: "KL University", domain: "kluniversity.in" },
        { name: "Sharnbasava University", domain: "sharnbasavauniversity.edu.in" },
        { name: "Sri Venkateswara University", domain: "svuniversity.edu.in" },
        { name: "Sri Padmavathi Mahila Visvavidyalayam", domain: "spmvv.ac.in" },

        // Institutes & Colleges
        { name: "Nitte Meenakshi", domain: "nmit.ac.in" },
        { name: "CBIT", domain: "cbit.ac.in" },
        { name: "Vasavi Institute", domain: "vasavi.ac.in" },
        { name: "Annamacharya Institute", domain: "aitsrajampet.ac.in" },
        { name: "Malla Reddy College", domain: "mrem.ac.in" },
        { name: "KSRM College", domain: "ksrmce.ac.in" },
        { name: "Jayamukhi Institute", domain: "jits.in" },
        { name: "Vaageswari College", domain: "vgsek.ac.in" },
        { name: "Chalapathi Institute", domain: "chalapathiengg.ac.in" },
        { name: "Swarna Bharathi", domain: "sbit.ac.in" },
        { name: "Mittapalli Institute", domain: "mittapalli.ac.in" },
        { name: "Malineni College", domain: "malineni.ac.in" },
        { name: "National Engg College", domain: "nec.edu.in" },
        { name: "DBS Institute", domain: "dbsinstitute.com" },
        { name: "Alphores", domain: "alphores.ac.in" },
        { name: "Krishnaveni College", domain: "kcw.ac.in" },
        { name: "Samuel George Institute", domain: "sgit.ac.in" },
        { name: "Khammam Institute", domain: "kits.ac.in" },
        { name: "Kavitha Memorial", domain: "kavithacollege.com" },
        { name: "Kodad Institute", domain: "kits-kodad.ac.in" },
        { name: "Sri Govindaraja Swamy", domain: "sgsc.edu.in" },
        { name: "Vijaya College", domain: "vcet.ac.in" },

        // Fallbacks (Might default to text if no specific domain logo found)
        { name: "S.N. Vidya Bhavan", domain: "snvidyabhavan.com" },
        { name: "St. Vincent ICSE", domain: "stvincentpallotti.org" },
        { name: "Galaxy High School", domain: "galaxyeducation.org" }
    ];

    return (
        <div className="font-sans text-slate-800 bg-slate-50 antialiased selection:bg-blue-900 selection:text-white relative">

            {/* Navigation */}
            <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'}`}>
                <div className="container mx-auto px-6 flex justify-between items-center">
                    <div className="text-2xl font-bold tracking-tighter text-slate-900 flex items-center gap-2">
                        <span className="bg-blue-900 text-white w-10 h-10 flex items-center justify-center rounded-lg">B</span>
                        <span>Balaji H K</span>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex gap-8 font-medium text-slate-600">
                        {['About', 'Expertise', 'Impact', 'Clients', 'Testimonials', 'Contact'].map((item) => (
                            <button
                                key={item}
                                onClick={() => scrollToSection(item.toLowerCase())}
                                className="hover:text-blue-900 transition-colors"
                            >
                                {item}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={() => scrollToSection('contact')}
                        className="hidden md:block bg-blue-900 hover:bg-blue-800 text-white px-6 py-2.5 rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg shadow-blue-900/20"
                    >
                        Book Consultation
                    </button>

                    {/* Mobile Menu Toggle */}
                    <button className="md:hidden text-slate-800" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>

                {/* Mobile Dropdown */}
                {isMenuOpen && (
                    <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t">
                        <div className="flex flex-col p-6 gap-4">
                            {['About', 'Expertise', 'Impact', 'Clients', 'Testimonials', 'Contact'].map((item) => (
                                <button
                                    key={item}
                                    onClick={() => scrollToSection(item.toLowerCase())}
                                    className="text-left text-lg font-medium text-slate-700 py-2 border-b border-slate-100"
                                >
                                    {item}
                                </button>
                            ))}
                            <button className="bg-blue-900 text-white py-3 rounded-lg font-bold mt-2">
                                Book Consultation
                            </button>
                        </div>
                    </div>
                )}
            </nav>

            {/* Hero Section */}
            <header className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
                {/* Background Decorative Elements */}
                <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-50/50 -skew-x-12 transform origin-top-right z-0" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-100 rounded-full blur-3xl opacity-50 z-0" />

                <div className="container mx-auto px-6 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-12">
                        <div className="lg:w-1/2 space-y-8">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-bold tracking-wide uppercase">
                                <Award size={16} /> Certified Master Trainer
                            </div>
                            <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 leading-tight">
                                Empowering Minds, <br />
                                <span className="text-blue-900">Enhancing Careers.</span>
                            </h1>

                            {/* Typewriter Animation Container */}
                            <div className="min-h-[6rem] lg:min-h-[5rem] flex items-center justify-center w-full">
                                <p className="text-2xl text-amber-500 leading-relaxed font-bold tracking-wide drop-shadow-md text-center">
                                    {currentText}
                                    <span className="animate-pulse text-amber-600 ml-1">|</span>
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <button
                                    onClick={() => scrollToSection('contact')}
                                    className="bg-blue-900 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-800 transition-all shadow-xl shadow-blue-900/20 flex items-center justify-center gap-2"
                                >
                                    Partner With Me <ChevronRight size={20} />
                                </button>
                                <button
                                    onClick={() => scrollToSection('impact')}
                                    className="bg-white text-slate-800 border-2 border-slate-200 px-8 py-4 rounded-lg font-bold text-lg hover:border-blue-900 hover:text-blue-900 transition-all flex items-center justify-center"
                                >
                                    View Track Record
                                </button>
                            </div>
                        </div>

                        <div className="lg:w-1/2 relative">
                            <div className="relative w-full max-w-md mx-auto aspect-[4/5] bg-gradient-to-br from-slate-200 to-slate-300 rounded-2xl overflow-hidden shadow-2xl border-8 border-white">
                                {/* Image Placeholder */}
                                <img
                                    src="/profile_pic.png"
                                    alt="Balaji H K"
                                    className="object-cover w-full h-full hover:scale-105 transition-all duration-500"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.style.display = 'none';
                                        e.target.parentNode.classList.add('flex', 'items-center', 'justify-center', 'bg-slate-200');
                                        e.target.parentNode.innerHTML = '<div class="text-center p-8"><div class="text-6xl mb-4">👨‍🏫</div><div class="text-slate-500 font-bold">Balaji H K</div><div class="text-sm text-slate-400">Please add profile.jpg<br/>to public folder</div></div>';
                                    }}
                                />

                                {/* Floating Badge */}
                                <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-slate-100">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-green-100 p-2 rounded-full text-green-600">
                                            <CheckCircle2 size={24} />
                                        </div>
                                        <div>
                                            <p className="text-sm text-slate-500 font-semibold uppercase">Cambridge Certified</p>
                                            <p className="text-slate-900 font-bold">C2 Level Proficiency</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Decorative dots grid */}
                            <div className="absolute -z-10 -bottom-10 -right-10 w-40 h-40 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiMwZjE3MmEiIGZpbGwtb3BhY2l0eT0iMC4xIi8+PC9zdmc+')]"></div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Stats Bar */}
            <section className="bg-blue-900 py-12 text-white">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-blue-800/50">
                        {stats.map((stat, idx) => (
                            <div key={idx} className="px-4">
                                <div className="text-4xl lg:text-5xl font-bold mb-2 text-amber-400">{stat.value}</div>
                                <div className="text-blue-200 font-medium text-sm lg:text-base uppercase tracking-wider">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* About / Objective Section */}
            <section id="about" className="py-20 bg-white border-b border-slate-100">
                <div className="container mx-auto px-6 max-w-4xl text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-900 text-sm font-bold tracking-wide uppercase mb-6">
                        <Target size={16} /> Professional Objective
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 leading-tight">
                        Driving Excellence in <br /><span className="text-amber-500">Campus Recruitment Training</span>
                    </h2>
                    <p className="text-lg md:text-xl text-slate-600 leading-relaxed mb-8">
                        An enthusiastic and results-driven professional with a profound commitment to enhancing students' career development.
                        My unique communicative teaching approach has garnered recognition for excellence in
                        <span className="font-semibold text-blue-900"> verbal ability</span>,
                        <span className="font-semibold text-blue-900"> soft skills</span>, and
                        <span className="font-semibold text-blue-900"> life skills</span> training.
                    </p>
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 inline-block max-w-3xl">
                        <p className="text-slate-700 italic font-medium">
                            "Renowned for conducting engaging training modules for undergraduate and postgraduate students, offering interactive sessions and regular workshops as a Certified Master Trainer."
                        </p>
                    </div>
                </div>
            </section>

            {/* Expertise Grid */}
            <section id="expertise" className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-amber-600 font-bold tracking-widest uppercase text-sm mb-3">Core Competencies</h2>
                        <h3 className="text-4xl font-bold text-slate-900 mb-6">Mastering the Art of Communication</h3>
                        <p className="text-slate-600">With a unique communicative teaching approach, I help individuals and organizations unlock their full potential.</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {expertise.map((item, idx) => (
                            <div key={idx} className="group bg-slate-50 p-8 rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-blue-100">
                                <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center text-blue-900 mb-6 group-hover:bg-blue-900 group-hover:text-white transition-colors">
                                    {item.icon}
                                </div>
                                <h4 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h4>
                                <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Impact / Experience - Vertical Scrolling Marquee */}
            <section id="impact" className="py-24 bg-slate-50 relative overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row gap-12 md:gap-20 items-start">
                        <div className="md:w-1/3 md:sticky top-32 z-10 bg-slate-50/90 backdrop-blur-sm p-4 rounded-xl">
                            <h2 className="text-4xl font-bold text-slate-900 mb-6">A Legacy of <br /><span className="text-blue-900">Impact.</span></h2>
                            <p className="text-slate-600 mb-8">
                                From government initiatives to private university excellence, my career has been defined by large-scale transformation in Learning & Development.
                            </p>
                            <a
                                href="/Balaji_HK_Resume.pdf"
                                download="Balaji_HK_Resume.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-900 font-bold flex items-center justify-center md:justify-start gap-2 hover:gap-4 transition-all w-full md:w-fit cursor-pointer bg-white md:bg-transparent p-4 md:p-0 rounded-lg shadow-sm md:shadow-none border md:border-none border-slate-200"
                            >
                                Download Full Profile <ChevronRight size={18} />
                            </a>
                        </div>

                        <div className="md:w-2/3 h-[600px] overflow-hidden relative group">
                            {/* Vertical Gradient Fades for Smooth Scroll Appearance */}
                            <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-slate-50 to-transparent z-10"></div>
                            <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-slate-50 to-transparent z-10"></div>

                            {/* Scrolling Container */}
                            <div className="space-y-6 animate-scroll-vertical group-hover:pause">
                                {/* First Set */}
                                {milestones.map((milestone, idx) => (
                                    <div key={`m1-${idx}`} className="bg-white p-8 rounded-2xl shadow-sm border-l-4 border-blue-900 hover:shadow-md transition-shadow">
                                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
                                            <h4 className="text-xl font-bold text-slate-900">{milestone.role}</h4>
                                            <span className="text-sm font-semibold text-blue-900 bg-blue-50 px-3 py-1 rounded-full mt-2 sm:mt-0 w-fit">
                                                {milestone.org}
                                            </span>
                                        </div>
                                        <p className="text-slate-600">{milestone.desc}</p>
                                    </div>
                                ))}

                                {/* Duplicate Set for Seamless Loop */}
                                {milestones.map((milestone, idx) => (
                                    <div key={`m2-${idx}`} className="bg-white p-8 rounded-2xl shadow-sm border-l-4 border-blue-900 hover:shadow-md transition-shadow">
                                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
                                            <h4 className="text-xl font-bold text-slate-900">{milestone.role}</h4>
                                            <span className="text-sm font-semibold text-blue-900 bg-blue-50 px-3 py-1 rounded-full mt-2 sm:mt-0 w-fit">
                                                {milestone.org}
                                            </span>
                                        </div>
                                        <p className="text-slate-600">{milestone.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Style for Animations */}
                <style>{`
          @keyframes scroll-vertical {
            0% { transform: translateY(0); }
            100% { transform: translateY(-50%); }
          }
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-scroll-vertical {
            animation: scroll-vertical 45s linear infinite;
          }
          .animate-scroll {
            animation: scroll 80s linear infinite;
          }
          .pause {
            animation-play-state: paused;
          }
        `}</style>
            </section>

            {/* Clients Ticker */}
            <section id="clients" className="py-16 bg-white border-y border-slate-100 overflow-hidden">
                <div className="container mx-auto px-6 mb-10">
                    <p className="text-center text-slate-400 font-semibold uppercase tracking-widest text-sm">Trusted By 40+ Leading Institutions</p>
                </div>

                <div className="relative w-full overflow-hidden group">
                    <div className="flex w-max animate-scroll group-hover:pause items-center">
                        {/* First Set of Logos */}
                        <div className="flex gap-16 px-8 items-center">
                            {clients.map((client, idx) => (
                                <div key={`a-${idx}`} className="flex items-center gap-4 group/item">
                                    {/* Logo Image */}
                                    <img
                                        src={`https://logo.clearbit.com/${client.domain}`}
                                        alt={client.name}
                                        className="h-10 w-auto object-contain transition-all duration-300 hover:scale-110"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                        }}
                                    />
                                    {/* Text Name - Always Visible */}
                                    <span className="text-lg font-bold text-slate-700 whitespace-nowrap opacity-70 group-hover/item:opacity-100 group-hover/item:text-blue-900 transition-all cursor-default">
                                        {client.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                        {/* Duplicate Set for Seamless Loop */}
                        <div className="flex gap-16 px-8 items-center">
                            {clients.map((client, idx) => (
                                <div key={`b-${idx}`} className="flex items-center gap-4 group/item">
                                    {/* Logo Image */}
                                    <img
                                        src={`https://logo.clearbit.com/${client.domain}`}
                                        alt={client.name}
                                        className="h-10 w-auto object-contain transition-all duration-300 hover:scale-110"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                        }}
                                    />
                                    {/* Text Name - Always Visible */}
                                    <span className="text-lg font-bold text-slate-700 whitespace-nowrap opacity-70 group-hover/item:opacity-100 group-hover/item:text-blue-900 transition-all cursor-default">
                                        {client.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* NEW SECTION: Testimonials & Gallery */}
            <section id="testimonials" className="py-24 bg-slate-50 border-t border-slate-100">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-amber-600 font-bold tracking-widest uppercase text-sm mb-3">Testimonials & Gallery</h2>
                        <h3 className="text-4xl font-bold text-slate-900">Voices of Success</h3>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 mb-20">
                        {testimonials.map((t, idx) => (
                            <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 relative">
                                <Quote className="absolute top-6 right-6 text-blue-100 w-10 h-10" />
                                <p className="text-slate-600 mb-6 relative z-10 leading-relaxed">"{t.text}"</p>
                                <div>
                                    <p className="font-bold text-slate-900">{t.name}</p>
                                    <p className="text-sm text-blue-900 font-semibold">{t.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Gallery Placeholder */}
                    <div className="bg-white rounded-3xl p-8 border border-slate-100 text-center">
                        <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50">
                            <Camera className="w-12 h-12 text-slate-300 mb-4" />
                            <h4 className="text-xl font-bold text-slate-400">Training Gallery</h4>
                            <p className="text-slate-400 text-sm mt-2">Add photos of your workshops and sessions here</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA / Contact */}
            <section id="contact" className="py-24 bg-blue-900 text-white relative overflow-hidden">
                {/* Abstract Shapes */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-800 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
                <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-indigo-800 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/10">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Elevate Your Institution?</h2>
                            <p className="text-blue-100 text-lg">Whether you need faculty development, student training, or corporate soft skills workshops, I am here to help.</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-12">
                            <div className="space-y-6">
                                <h3 className="text-xl font-bold border-b border-blue-700 pb-4">Contact Information</h3>
                                <div className="flex items-center gap-4 text-blue-100 hover:text-white transition-colors">
                                    <div className="bg-blue-800 p-3 rounded-full"><Phone size={20} /></div>
                                    <span className="text-lg">+91 81217 80321</span>
                                </div>
                                <div className="flex items-center gap-4 text-blue-100 hover:text-white transition-colors">
                                    <div className="bg-blue-800 p-3 rounded-full"><Mail size={20} /></div>
                                    <span className="text-lg">balajisoftskills@gmail.com</span>
                                </div>
                                <a href="https://www.linkedin.com/in/balaji-hk-m-a-a383a8116" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-blue-100 hover:text-white transition-colors">
                                    <div className="bg-blue-800 p-3 rounded-full"><Linkedin size={20} /></div>
                                    <span className="text-lg">Connect on LinkedIn</span>
                                </a>
                                <div className="flex items-center gap-4 text-blue-100 hover:text-white transition-colors">
                                    <div className="bg-blue-800 p-3 rounded-full"><GraduationCap size={20} /></div>
                                    <span className="text-lg">Kurnool, Andhra Pradesh</span>
                                </div>
                            </div>

                            <form className="space-y-4" onSubmit={handleFormSubmit}>
                                <div>
                                    <label className="block text-sm font-medium text-blue-200 mb-1">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 rounded-lg bg-blue-800/50 border border-blue-700 focus:border-amber-400 focus:outline-none text-white placeholder-blue-300 transition-colors"
                                        placeholder="Your Name"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-blue-200 mb-1">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 rounded-lg bg-blue-800/50 border border-blue-700 focus:border-amber-400 focus:outline-none text-white placeholder-blue-300 transition-colors"
                                        placeholder="name@institution.edu"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-blue-200 mb-1">Phone Number</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 rounded-lg bg-blue-800/50 border border-blue-700 focus:border-amber-400 focus:outline-none text-white placeholder-blue-300 transition-colors"
                                        placeholder="+91 99999 99999"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-blue-200 mb-1">Message</label>
                                    <textarea
                                        rows="3"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 rounded-lg bg-blue-800/50 border border-blue-700 focus:border-amber-400 focus:outline-none text-white placeholder-blue-300 transition-colors"
                                        placeholder="How can I assist you?"
                                        required
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`w-full font-bold py-4 rounded-lg shadow-lg shadow-amber-900/20 transition-all transform hover:-translate-y-1 ${isSubmitting ? 'bg-slate-400 cursor-not-allowed' : 'bg-amber-500 hover:bg-amber-600 text-white'}`}
                                >
                                    {isSubmitting ? 'Sending...' : 'Send Message'}
                                </button>
                                {submitStatus === 'success' && (
                                    <div className="p-4 bg-green-100 text-green-700 rounded-lg text-center font-medium">
                                        Message sent successfully! I'll get back to you soon.
                                    </div>
                                )}
                                {submitStatus === 'error' && (
                                    <div className="p-4 bg-red-100 text-red-700 rounded-lg text-center font-medium">
                                        Failed to send message. Please try again or contact via WhatsApp.
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-slate-900 text-slate-500 py-8 text-center text-sm border-t border-slate-800">
                <p>&copy; {new Date().getFullYear()} Balaji H K. All Rights Reserved.</p>
            </footer>

            {/* Floating WhatsApp Button */}
            <button
                onClick={openWhatsApp}
                className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 transition-all transform hover:scale-110 flex items-center justify-center group"
            >
                <MessageCircle size={28} />
                <span className="absolute right-full mr-4 bg-slate-900 text-white text-xs font-bold py-2 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Chat on WhatsApp
                </span>
            </button>
        </div>
    );
};

export default Portfolio;
