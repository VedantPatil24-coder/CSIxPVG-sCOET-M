'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { FiArrowRight, FiGithub, FiLinkedin, FiCalendar, FiMapPin, FiCheck, FiCpu, FiUsers, FiZap, FiTarget, FiMail, FiInstagram, FiMaximize2, FiX } from 'react-icons/fi';
import Loader from '@/components/Loader';
import NetworkGlobe from '@/components/NetworkGlobe';

// Interfaces
interface TeamMember {
  _id: string;
  name: string;
  designation: string;
  category: string;
  department: string;
  year: string;
  photoUrl: string;
  linkedinUrl?: string;
  githubUrl?: string;
}

interface EventItem {
  _id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  imageUrl?: string;
  registrationLink?: string;
  registrationCount?: number;
}

interface NewsItem {
  _id: string;
  title: string;
  content: string;
  imageUrl?: string;
  createdAt: string;
}

interface TestimonialItem {
  _id: string;
  name: string;
  role: string;
  message: string;
  avatarUrl?: string;
}

const BACKEND_URL = 'http://localhost:5000';

const FALLBACK_TEAM: TeamMember[] = [
  {
    _id: 'team_002',
    name: 'Prof. U. M. Kalshetti',
    designation: 'HOD (Computer Department)',
    category: 'coordinator',
    department: 'Computer Department',
    year: 'Staff',
    photoUrl: '/team/page_4_img_2.jpeg',
    linkedinUrl: 'https://www.linkedin.com/in/urmila-kalshetti-3507669a/'
  },
  {
    _id: 'team_001',
    name: 'Prof. Aakanksha Mishra Tripathi',
    designation: 'Faculty Coordinator',
    category: 'coordinator',
    department: 'Computer Department',
    year: 'Staff',
    photoUrl: '/team/page_4_img_1.jpeg',
    linkedinUrl: 'https://www.linkedin.com/in/akansha-mishra-22783825/'
  },
  {
    _id: 'team_003',
    name: 'Gauri Kharad',
    designation: 'President',
    category: 'president',
    department: 'Computer Department',
    year: 'B.E',
    photoUrl: '/team/page_3_img_1.jpeg',
    linkedinUrl: 'https://www.linkedin.com/in/gauri-kharad-136365298/',
    githubUrl: 'https://github.com'
  },
  {
    _id: 'team_004',
    name: 'Pratika Bankar',
    designation: 'Vice President',
    category: 'vice-president',
    department: 'Computer Department',
    year: 'T.E',
    photoUrl: '/team/page_5_img_1.jpeg',
    linkedinUrl: 'https://www.linkedin.com/in/pratikabankar/',
    githubUrl: 'https://github.com'
  },
  {
    _id: 'team_005',
    name: 'Nehal Rawool',
    designation: 'Technical Head',
    category: 'technical',
    department: 'Computer Department',
    year: 'S.Y Btech',
    photoUrl: '/team/page_6_img_1.jpeg',
    linkedinUrl: ' https://www.linkedin.com/in/nehal-rawool-461602417/',
    githubUrl: 'https://github.com/nehalrawool'
  },
  {
    _id: 'team_006',
    name: 'Vedant Patil',
    designation: 'Technical Head',
    category: 'technical',
    department: 'Computer Department',
    year: 'S.Y Btech',
    photoUrl: '/team/page_6_img_2.jpeg',
    linkedinUrl: 'https://www.linkedin.com/in/vedant-patil-286944382/',
    githubUrl: 'https://github.com/VedantPatil24-coder'
  },
  {
    _id: 'team_007',
    name: 'Shreyasi Jadhav',
    designation: 'Design Head',
    category: 'design',
    department: 'Computer Department',
    year: 'S.Y Btech',
    photoUrl: '/team/page_2_img_1.jpeg',
    linkedinUrl: 'https://www.linkedin.com/in/shreyasi-jadhao-167427384/',
    githubUrl: 'https://github.com/shreyaasijadhao'
  },
  {
    _id: 'team_008',
    name: 'Sharvee Kulkarni',
    designation: 'Design Head',
    category: 'design',
    department: 'Computer Department',
    year: 'S.Y Btech',
    photoUrl: '/team/page_2_img_2.jpeg',
    linkedinUrl: 'https://www.linkedin.com/in/sharvee-kulkarni-635a5a391/',
    githubUrl: 'https://github.com/SharveeK10'
  },
  {
    _id: 'team_009',
    name: 'Salil Bokil',
    designation: 'Event & Publicity Head',
    category: 'publicity',
    department: 'Computer Department',
    year: 'S.Y Btech',
    photoUrl: '/team/page_1_img_1.jpeg',
    linkedinUrl: 'https://www.linkedin.com/in/bsalil/',
    githubUrl: 'https://github.com/bs4lil'
  },
  {
    _id: 'team_010',
    name: 'Bhumika Gote',
    designation: 'Event & Publicity Head',
    category: 'publicity',
    department: 'Computer Department',
    year: 'S.Y Btech',
    photoUrl: '/team/page_1_img_2.jpeg',
    linkedinUrl: ' https://www.linkedin.com/in/bhumika-gote-455030386/',
    githubUrl: 'https://github.com/Bhumika257'
  },
  {
    _id: 'team_011',
    name: 'Meet Shrishrimal',
    designation: 'Finance Head',
    category: 'finance',
    department: 'Computer Department',
    year: 'S.Y Btech',
    photoUrl: '/team/page_7_img_1.jpeg',
    linkedinUrl: ' https://www.linkedin.com/in/meet-shrishrimal-237a8441a/',
    githubUrl: 'https://github.com/meetshrishrimal70-afk'
  },
  {
    _id: 'team_012',
    name: 'Om Kashid',
    designation: 'Finance Head',
    category: 'finance',
    department: 'Computer Department',
    year: 'S.Y Btech',
    photoUrl: '/team/page_7_img_2.jpeg',
    linkedinUrl: 'https://www.linkedin.com/in/om-kashid-880935397/',
    githubUrl: 'https://github.com/omkashid96'
  }
];

const FALLBACK_NEWS: NewsItem[] = [
  {
    _id: 'news_001',
    title: 'CSI Student Chapter Inauguration Ceremony',
    content: 'We cordially invite you to the official Inauguration Ceremony of the Computer Society of India (CSI) Student Chapter at PVG\'s College of Engineering Technology and Management. Join us to celebrate the launch of our student chapter dedicated to innovation, inspiration, and integration in the field of computing.',
    imageUrl: '/inauguration_invite.png',
    createdAt: '2026-08-24T00:00:00.000Z'
  }
];

const FALLBACK_EVENTS: EventItem[] = [
  {
    _id: 'event_001',
    title: 'Syntax Sweep',
    description: 'SYNTAX SWEEP, CSI\'s first event, participants will be given buggy code. Find the errors, fix them, and get your code running — all within given time!',
    date: '2026-10-16T10:00:00.000Z',
    location: 'PVG Lab',
    imageUrl: '/syntax_sweep.png',
    registrationCount: 0
  }
];

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);

  // Dynamic state loaded from backend with robust local fallbacks
  const [team, setTeam] = useState<TeamMember[]>(FALLBACK_TEAM);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);

  // Registration feedback status map: { eventId: boolean }
  const [registeredEvents, setRegisteredEvents] = useState<{ [key: string]: boolean }>({});

  // Lightbox Image Popup Modal State
  const [activeModalImage, setActiveModalImage] = useState<{ src: string; title?: string } | null>(null);

  // Close modal on Escape key and lock background scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveModalImage(null);
      }
    };

    if (activeModalImage) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeModalImage]);

  const { scrollY } = useScroll();
  const yBgGrid = useTransform(scrollY, [0, 3000], [0, -400]);
  const yGlobe = useTransform(scrollY, [0, 1000], [0, 180]);
  const yAbout = useTransform(scrollY, [0, 2000], [0, -100]);
  const yNews = useTransform(scrollY, [200, 2500], [0, -80]);
  const yEvents = useTransform(scrollY, [500, 3000], [0, -60]);
  const yTestimonials = useTransform(scrollY, [800, 3500], [0, -50]);
  const yTeam = useTransform(scrollY, [1200, 4500], [0, -40]);

  // Extraordinary Parallax scroll-linked effects
  const scaleHero = useTransform(scrollY, [0, 1000], [1, 0.90]);
  const opacityHero = useTransform(scrollY, [0, 350], [1, 0]);

  const scaleAbout = useTransform(scrollY, [100, 1500], [0.98, 1.02]);
  const opacityAbout = useTransform(scrollY, [200, 450], [0, 1]);

  const scaleNews = useTransform(scrollY, [200, 2000], [0.97, 1.01]);
  const rotateNews = useTransform(scrollY, [200, 2000], [1, -0.5]);

  useEffect(() => {
    // Fetch data from backend
    const fetchData = async () => {
      try {
        const teamRes = await fetch(`${BACKEND_URL}/api/public/team`);
        if (teamRes.ok) {
          const teamData = await teamRes.json();
          if (Array.isArray(teamData) && teamData.length > 0) {
            setTeam(teamData);
          }
        }

        const eventsRes = await fetch(`${BACKEND_URL}/api/public/events`);
        if (eventsRes.ok) setEvents(await eventsRes.json());

        const newsRes = await fetch(`${BACKEND_URL}/api/public/news`);
        if (newsRes.ok) setNews(await newsRes.json());

        const testRes = await fetch(`${BACKEND_URL}/api/public/testimonials`);
        if (testRes.ok) setTestimonials(await testRes.json());
      } catch (e) {
        console.warn('Backend server fallback trigger.');
      }
    };
    fetchData();
  }, []);

  const handleRegisterEvent = async (eventId: string) => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/public/events/${eventId}/register`, {
        method: 'POST'
      });
      if (res.ok) {
        setRegisteredEvents(prev => ({ ...prev, [eventId]: true }));
        const eventsRes = await fetch(`${BACKEND_URL}/api/public/events`);
        if (eventsRes.ok) setEvents(await eventsRes.json());
      }
    } catch (e) {
      setRegisteredEvents(prev => ({ ...prev, [eventId]: true }));
    }
  };

  // Renders a card with custom 3D mouse tilt simulation
  const TeamCard = ({ member }: { member: TeamMember }) => {
    const cardRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
      const card = cardRef.current;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const tiltX = (y / rect.height) * -20;
      const tiltY = (x / rect.width) * 20;

      card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.05, 1.05, 1.05)`;
    };

    const handleMouseLeave = () => {
      const card = cardRef.current;
      if (!card) return;
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    };

    return (
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="glass-panel p-6 rounded-2xl border border-white/5 flex flex-col items-center text-center transition-all duration-300 ease-out group hover:border-cyan-500/30 hover:shadow-[0_0_30px_rgba(0,240,255,0.15)] relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-cyan-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />

        {/* Avatar wrap */}
        <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-cyan-500/30 mb-4 bg-black/40 p-0.5 group-hover:border-cyan-400 transition-colors duration-300">
          <img
            src={member.photoUrl}
            alt={member.name}
            className="w-full h-full rounded-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/placeholder.png';
            }}
          />
        </div>

        <h4 className="cyber-font text-white font-bold text-base tracking-wider uppercase">
          {member.name}
        </h4>
        <p className="text-cyan-400 text-sm font-mono mb-2">{member.designation}</p>
        <p className="text-gray-300 text-sm font-sans">
          {member.department} • {member.year}
        </p>

        {/* Social interactions */}
        <div className="flex gap-4 mt-4">
          {member.linkedinUrl && (
            <a
              href={member.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-cyan-400 transition-colors"
            >
              <FiLinkedin className="w-5 h-5" />
            </a>
          )}
          {member.githubUrl && (
            <a
              href={member.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-cyan-400 transition-colors"
            >
              <FiGithub className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>
    );
  };

  // Group members into categories
  const coordinators = team.filter((m) => m.category === 'coordinator');
  const presidents = team.filter((m) => m.category === 'president');
  const vicePresidents = team.filter((m) => m.category === 'vice-president');
  const technicalHeads = team.filter((m) => m.category === 'technical');
  const designHeads = team.filter((m) => m.category === 'design');
  const eventHeads = team.filter((m) => m.category === 'publicity');
  const financeHeads = team.filter((m) => m.category === 'finance');

  return (
    <>
      {showIntro ? (
        <Loader onComplete={() => setShowIntro(false)} />
      ) : (
        <main className="min-h-screen relative overflow-hidden bg-[#030303]">

          {/* Cyber backgrounds */}
          <motion.div style={{ y: yBgGrid }} className="absolute inset-0 cyber-grid-bg opacity-30 z-0 pointer-events-none" />

          {/* Ambient Glow Orbs */}
          <div className="glow-aura w-[500px] h-[500px] bg-cyan-500/10 top-[-10%] left-[-10%]" />
          <div className="glow-aura w-[600px] h-[600px] bg-purple-500/10 bottom-[20%] right-[-10%]" />

          {/* 1. HERO SECTION */}
          <section className="relative min-h-screen flex flex-col items-center justify-center z-10 px-6 pt-24 md:pt-28 pb-12 overflow-hidden bg-[#030303]">
            <motion.div style={{ y: yGlobe }} className="absolute inset-0 z-0 pointer-events-none">
              <NetworkGlobe />
            </motion.div>

            {/* Top Flyer Badges */}
            <motion.div
              style={{ y: yGlobe, opacity: opacityHero }}
              className="flex justify-between items-center w-full max-w-6xl mt-2 md:mt-3 mb-6 px-4 relative z-20"
            >
              {/* PVG Badge */}
              <div className="w-16 h-16 md:w-24 md:h-24 rounded-full overflow-hidden border border-white/20 flex items-center justify-center bg-white shadow-[0_0_15px_rgba(255,255,255,0.15)]">
                <img src="/logo.png" alt="PVG Seal" className="w-[82%] h-[82%] object-contain rounded-full" />
              </div>
              {/* CSI Badge */}
              <div className="w-16 h-16 md:w-24 md:h-24 rounded-full overflow-hidden border border-cyan-500/30 flex items-center justify-center bg-white shadow-[0_0_15px_rgba(0,240,255,0.25)]">
                <img src="/csi_logo.png" alt="CSI Logo" className="w-[82%] h-[82%] object-contain rounded-full" />
              </div>
            </motion.div>

            {/* Parallax Animating Wrapper */}
            <motion.div
              style={{
                y: yGlobe,
                scale: scaleHero,
                opacity: opacityHero
              }}
              className="max-w-5xl mx-auto text-center relative z-20 flex flex-col items-center"
            >
              <h1 className="cyber-font text-3xl sm:text-5xl md:text-6xl font-black tracking-wider leading-none text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-200 to-cyan-300 pb-2">
                PUNE VIDYARTHI GRIHA&apos;S
              </h1>

              <h2 className="text-sm sm:text-base md:text-lg font-bold text-white tracking-[0.2em] mt-2 mb-1 max-w-3xl uppercase font-sans">
                College of Engineering, Technology & Management, Pune
              </h2>

              <p className="text-[10px] sm:text-xs text-cyan-300/80 font-mono tracking-wider italic mb-8 max-w-2xl px-4">
                (An Autonomous Institute Affiliated to Savitribai Phule Pune University, NAAC Grade &apos;A&apos; Cycle-3)
              </p>

              {/* Glowing High-Tech Border Box */}
              <div className="my-6 px-8 py-4 rounded-2xl border-2 border-cyan-500/40 bg-cyan-950/20 backdrop-blur-md shadow-[0_0_25px_rgba(0,240,255,0.25),inset_0_0_15px_rgba(0,240,255,0.1)] relative">
                <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-4 bg-cyan-400 rounded-r" />
                <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-4 bg-cyan-400 rounded-l" />
                <h3 className="cyber-font text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-[0.2em] text-white">
                  CSI STUDENT CHAPTER
                </h3>
                <p className="text-[10px] md:text-xs text-cyan-400 tracking-[0.4em] font-mono mt-1.5 uppercase">
                  — PVG COET&M —
                </p>
              </div>

              {/* Tagline */}
              <div className="flex gap-4 sm:gap-6 justify-center items-center font-mono font-black tracking-[0.3em] text-xs sm:text-sm md:text-base mt-6 mb-2">
                <span className="text-purple-400 hover:text-purple-300 transition-colors">CODE.</span>
                <span className="text-cyan-400 hover:text-cyan-300 transition-colors">CONNECT.</span>
                <span className="text-blue-400 hover:text-blue-300 transition-colors">CREATE.</span>
              </div>

              {/* Core Values Row */}
              <div className="flex flex-wrap justify-center items-center gap-y-3 gap-x-4 md:gap-x-8 mt-6 py-4 px-6 border-t border-b border-white/5 max-w-4xl w-full">
                <div className="flex items-center gap-2 text-xs md:text-sm font-mono tracking-widest text-cyan-300 hover:text-cyan-200 transition-colors">
                  <FiCpu className="text-cyan-400 w-4 h-4 animate-pulse" /> INNOVATE
                </div>
                <div className="hidden sm:block w-[1px] h-4 bg-white/10" />
                <div className="flex items-center gap-2 text-xs md:text-sm font-mono tracking-widest text-purple-300 hover:text-purple-200 transition-colors">
                  <FiUsers className="text-purple-400 w-4 h-4" /> COLLABORATE
                </div>
                <div className="hidden sm:block w-[1px] h-4 bg-white/10" />
                <div className="flex items-center gap-2 text-xs md:text-sm font-mono tracking-widest text-pink-300 hover:text-pink-200 transition-colors">
                  <FiZap className="text-pink-400 w-4 h-4" /> INSPIRE
                </div>
                <div className="hidden sm:block w-[1px] h-4 bg-white/10" />
                <div className="flex items-center gap-2 text-xs md:text-sm font-mono tracking-widest text-yellow-400 hover:text-yellow-300 transition-colors">
                  <FiTarget className="text-yellow-500 w-4 h-4" /> IMPACT
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="mt-10 flex flex-wrap gap-4 justify-center">
                <a
                  href="#events"
                  className="px-8 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-medium rounded-full shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_30px_rgba(0,240,255,0.5)] transition-all duration-300 transform hover:scale-105 flex items-center gap-2 text-base cyber-font"
                >
                  Explore Events <FiArrowRight />
                </a>
                <a
                  href="#about"
                  className="px-8 py-3.5 bg-white/5 hover:bg-white/10 text-white font-medium rounded-full border border-white/10 hover:border-white/20 transition-all duration-300 text-base cyber-font"
                >
                  Explore Chapter
                </a>
              </div>

              {/* Scroll Indicator */}
              <div className="mt-8 animate-bounce opacity-65 flex flex-col items-center">
                <span className="text-xs text-gray-500 uppercase tracking-widest font-mono mb-1">Scroll to Travel</span>
                <div className="w-1 h-6 bg-gradient-to-b from-cyan-400 to-purple-500 rounded-full" />
              </div>
            </motion.div>
          </section>

          {/* 2. ABOUT US SECTION */}
          <motion.section
            id="about"
            style={{
              y: yAbout,
              scale: scaleAbout,
              opacity: opacityAbout
            }}
            className="relative z-10 py-24 px-6 max-w-7xl mx-auto"
          >
            {/* Holographic Scroll Tunnel Visuals */}
            <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[300px] border border-cyan-500/5 rounded-full pointer-events-none skew-y-12 animate-pulse" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-cyan-400 font-mono text-sm uppercase tracking-widest block mb-2"></span>
                <h2 className="cyber-font text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-wide mb-6">
                  ABOUT CSI & PVG's COET&M
                </h2>
                <div className="space-y-6 text-gray-300 text-base sm:text-lg lg:text-[19px] leading-relaxed font-sans font-normal">
                  <p>
                    Established in July 2026 under the department of Computer Engineering, the CSI PVG Student Chapter is the official digital epicentre of technology engineering and creation in PVG&apos;s College of Engineering and Technology, Pune.
                  </p>
                  <p>
                    Our charter is straightforward: to transition traditional textbook engineering into dynamic technology leadership. We orchestrate intense bootcamps, high-stakes hackathons, deep coding encounters, and industrial collaborations, preparing over 150 student members to lead the future tech workspace.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-6 mt-10">
                  <div className="glass-panel p-5 rounded-xl border border-white/5">
                    <h5 className="cyber-font text-cyan-400 text-sm sm:text-base uppercase font-bold tracking-wider mb-2">Our Vision</h5>
                    <p className="text-gray-300 text-sm sm:text-base font-sans">To empower students to become leaders in computing technologies and drive global innovations.</p>
                  </div>
                  <div className="glass-panel p-5 rounded-xl border border-white/5">
                    <h5 className="cyber-font text-purple-400 text-sm sm:text-base uppercase font-bold tracking-wider mb-2">Our Mission</h5>
                    <p className="text-gray-300 text-sm sm:text-base font-sans">Creating meaningful avenues for skill-development, continuous training, research support, and industrial connect.</p>
                  </div>
                </div>
              </div>

              {/* Timeline / Highlights */}
              <div className="glass-panel p-8 rounded-2xl border border-white/5 relative">
                <h3 className="cyber-font text-white text-lg sm:text-xl uppercase tracking-wider mb-6 font-bold">Timeline & Milestones</h3>
                <div className="space-y-6 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[1px] before:bg-cyan-500/20">
                  <div className="relative pl-8">
                    <div className="absolute left-[3px] top-1.5 w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f0ff]" />
                    <span className="text-xs sm:text-sm text-cyan-400 font-mono">August 2026</span>
                    <h4 className="text-base sm:text-lg font-bold text-white mt-0.5">Chapter Inauguration</h4>
                    <p className="text-sm sm:text-base text-gray-400 mt-1.5">Officially establishing the student chapter with 150+ founding members under Department of Computer Engineering guidance.</p>
                  </div>
                  <div className="relative pl-8">
                    <div className="absolute left-[3px] top-1.5 w-2.5 h-2.5 rounded-full bg-purple-400 shadow-[0_0_8px_#bd00ff]" />
                    <span className="text-xs sm:text-sm text-purple-400 font-mono">September 2026</span>
                    <h4 className="text-base sm:text-lg font-bold text-white mt-0.5">Syntax Sweep</h4>
                    <p className="text-sm sm:text-base text-gray-400 mt-1.5">250 lines of broken code. One ticking clock. Zero mercy.
Hunt the bugs, patch the chaos, and ship it clean before time runs out. Only the sharpest debuggers walk away champions.</p>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/5 text-center">
                  <a
                    href="#events"
                    className="inline-flex items-center gap-1.5 text-sm sm:text-base text-cyan-400 hover:text-cyan-300 font-mono uppercase tracking-widest hover:underline"
                  >
                    Explore Upcoming Events <FiArrowRight />
                  </a>
                </div>
              </div>
            </div>
          </motion.section>

          {/* 3. RECENT NEWS SECTION */}
          <motion.section
            id="news"
            style={{
              y: yNews,
              scale: scaleNews,
              rotate: rotateNews
            }}
            className="relative z-10 py-24 px-6 max-w-7xl mx-auto"
          >
            <div className="text-center mb-16">
              <span className="text-cyan-400 font-mono text-sm uppercase tracking-widest block mb-2"></span>
              <h2 className="cyber-font text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-wide">
                RECENT NEWS
              </h2>
            </div>

            {(() => {
              const displayNews = news.length > 0 ? news : FALLBACK_NEWS;
              return (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {displayNews.map((item) => {
                    // Fallback items use local paths, backend items use full URL
                    const imgSrc = item.imageUrl
                      ? item.imageUrl.startsWith('/')
                        ? item.imageUrl
                        : `${BACKEND_URL}${item.imageUrl}`
                      : null;
                    return (
                      <div
                        key={item._id}
                        className="glass-panel p-6 rounded-2xl border border-white/5 flex flex-col justify-between group hover:border-cyan-500/30 transition-all duration-300"
                      >
                        <div>
                          {imgSrc && (
                            <div
                              onClick={() => setActiveModalImage({ src: imgSrc, title: item.title })}
                              className="w-full h-44 rounded-xl overflow-hidden mb-4 cursor-pointer group/img"
                            >
                              <img
                                src={imgSrc}
                                alt={item.title}
                                className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
                              />
                            </div>
                          )}
                          <span className="text-xs text-cyan-400 font-mono block mb-2">
                            {new Date(item.createdAt).toLocaleDateString()}
                          </span>
                          <h4 className="cyber-font text-white font-bold text-base tracking-wide mb-3">
                            {item.title}
                          </h4>
                          <p className="text-gray-300 text-sm leading-relaxed line-clamp-4">
                            {item.content}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })()}
          </motion.section>

          {/* 4. EVENTS SECTION */}
          <motion.section id="events" style={{ y: yEvents }} className="relative z-10 py-24 px-6 bg-black/40">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <span className="text-purple-400 font-mono text-sm uppercase tracking-widest block mb-2"></span>
                <h2 className="cyber-font text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-wide">
                  UPCOMING EVENTS
                </h2>
              </div>

              {(() => {
                const displayEvents = events.length > 0 ? events : FALLBACK_EVENTS;
                return (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {displayEvents.map((evt) => {
                      const imgSrc = evt.imageUrl
                        ? evt.imageUrl.startsWith('/')
                          ? evt.imageUrl
                          : `${BACKEND_URL}${evt.imageUrl}`
                        : null;
                      return (
                        <div
                          key={evt._id}
                          className="glass-panel p-8 rounded-2xl border border-white/5 flex flex-col justify-between group hover:border-cyan-500/20 transition-all duration-300 relative overflow-hidden"
                        >
                          <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-400/5 rounded-full filter blur-xl" />

                          <div>
                            {imgSrc && (
                              <div
                                onClick={() => setActiveModalImage({ src: imgSrc, title: evt.title })}
                                className="w-full h-48 rounded-xl overflow-hidden mb-4 cursor-pointer group/img"
                              >
                                <img
                                  src={imgSrc}
                                  alt={evt.title}
                                  className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
                                />
                              </div>
                            )}
                            <h4 className="cyber-font text-white font-bold text-lg tracking-wide mb-3">
                              {evt.title}
                            </h4>
                            <p className="text-gray-300 text-sm leading-relaxed mb-6">
                              {evt.description}
                            </p>

                            <div className="space-y-2 text-sm font-mono text-gray-400 mb-6">
                              <div className="flex items-center gap-2">
                                <FiCalendar className="text-cyan-400" />
                                {new Date(evt.date).toLocaleDateString()}
                              </div>
                              <div className="flex items-center gap-2">
                                <FiMapPin className="text-purple-400" />
                                {evt.location}
                              </div>
                            </div>
                          </div>


                        </div>
                      );
                    })}
                  </div>
                );
              })()}
            </div>
          </motion.section>

          {/* 5. TESTIMONIALS SECTION */}
          <motion.section id="testimonials" style={{ y: yTestimonials }} className="relative z-10 py-24 px-6 max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-cyan-400 font-mono text-sm uppercase tracking-widest block mb-2">Chapter Milestones</span>
              <h2 className="cyber-font text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-wide">
                TESTIMONIALS
              </h2>
            </div>

            {/* Inauguration Highlight Card */}
            <div className="max-w-5xl mx-auto mb-12">
              <div className="group glass-panel rounded-3xl border border-white/10 hover:border-cyan-500/40 transition-all duration-500 hover:shadow-[0_0_60px_rgba(0,240,255,0.15)] relative overflow-hidden">
                {/* Top accent bar */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 z-20" />

                <div className="relative z-10 p-6 md:p-10">
                  {/* Header badge */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center shadow-[0_0_15px_rgba(0,240,255,0.4)]">
                      <span className="text-white text-lg font-black">✦</span>
                    </div>
                    <div>
                      <h3 className="cyber-font text-white font-extrabold text-lg tracking-wider uppercase">Chapter Inauguration</h3>
                      <p className="text-cyan-400 font-mono text-xs tracking-widest">August 2026 · PVG COET&M, Pune</p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-sans max-w-3xl">
                    The inauguration of the <strong className="text-white font-bold">CSI-PVG Student Chapter</strong> was more than just an event; it was the beginning of a vision, a community, and a journey filled with endless possibilities. It marked the coming together of curious minds, passionate innovators, and aspiring technologists with a shared dream of learning, building, and creating an impact. Being a part of this milestone was a proud and memorable experience, reminding us that every great journey begins with a small step and every meaningful change begins with a group of people who dare to dream. With this inauguration, we laid the foundation for a community where ideas turn into innovation, collaboration leads to growth, and challenges become opportunities. <strong className="text-cyan-300">CSI-PVG is not just a student chapter; it is a promise to innovate, inspire, and grow together.</strong> The beginning has been beautiful, but the journey ahead is what will make this legacy truly unforgettable.
                  </p>

                  {/* Slide-down Gallery Container on Hover */}
                  <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-700 ease-in-out">
                    <div className="overflow-hidden">
                      <div className="pt-8 mt-6 border-t border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-150">
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                          {[
                            '/inaugration_image_1.jpeg',
                            '/inaugration_image_2.jpeg',
                            '/inaugration_image_3.jpeg',
                            '/inaugration_image_4.jpeg'
                          ].map((src, i) => (
                            <div
                              key={i}
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveModalImage({ src, title: `Chapter Inauguration — Moment ${i + 1}` });
                              }}
                              className="h-32 sm:h-40 rounded-xl overflow-hidden border border-white/20 hover:border-cyan-400 shadow-lg cursor-pointer transition-all duration-300 group/photo relative bg-black/40"
                            >
                              <img
                                src={src}
                                alt={`Inauguration moment ${i + 1}`}
                                className="w-full h-full object-cover group-hover/photo:scale-110 transition-transform duration-500"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Dynamic backend testimonials if available */}
            {testimonials.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-8">
                {testimonials.map((test) => (
                  <div
                    key={test._id}
                    className="glass-panel p-6 rounded-2xl border border-white/5 flex flex-col justify-between"
                  >
                    <p className="text-gray-300 italic text-sm leading-relaxed mb-6 font-sans">
                      &ldquo;{test.message}&rdquo;
                    </p>
                    <div className="flex items-center gap-3">
                      <div
                        onClick={() => setActiveModalImage({ src: test.avatarUrl || '/placeholder.png', title: `${test.name} — ${test.role}` })}
                        className="w-10 h-10 rounded-full overflow-hidden border border-cyan-500/30 bg-black/40 cursor-pointer hover:border-cyan-400 transition-colors"
                        title="Click to view full photo"
                      >
                        <img
                          src={test.avatarUrl || '/placeholder.png'}
                          alt={test.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/placeholder.png';
                          }}
                        />
                      </div>
                      <div>
                        <h5 className="cyber-font text-white text-sm font-bold">{test.name}</h5>
                        <p className="text-gray-500 text-xs font-mono">{test.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.section>

          {/* 6. TEAM SECTION (Moved to last as requested) */}
          <motion.section id="team" style={{ y: yTeam }} className="relative z-10 py-24 px-6 bg-black/40">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <span className="text-purple-400 font-mono text-sm uppercase tracking-widest block mb-2"></span>
                <h2 className="cyber-font text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-wide">
                  MEET THE LEADERSHIP
                </h2>
                <p className="text-gray-400 text-base mt-3 max-w-xl mx-auto">
                  Our student chapter is managed by visionary guides and a dynamic core team of student heads.
                </p>
              </div>

              {/* A. Faculty Coordinators */}
              {coordinators.length > 0 && (
                <div className="mb-16">
                  <h3 className="cyber-font text-base uppercase text-cyan-400 tracking-widest text-center mb-8 border-b border-cyan-500/10 pb-2 max-w-md mx-auto">
                    Faculty Coordinators
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 max-w-2xl mx-auto">
                    {coordinators.map((member) => (
                      <TeamCard key={member._id} member={member} />
                    ))}
                  </div>
                </div>
              )}

              {/* B. Executive Chairs (President & Vice President) */}
              {(presidents.length > 0 || vicePresidents.length > 0) && (
                <div className="mb-16">
                  <h3 className="cyber-font text-base uppercase text-cyan-400 tracking-widest text-center mb-8 border-b border-cyan-500/10 pb-2 max-w-md mx-auto">
                    Executive Officers
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-2xl mx-auto">
                    {presidents.map((member) => (
                      <TeamCard key={member._id} member={member} />
                    ))}
                    {vicePresidents.map((member) => (
                      <TeamCard key={member._id} member={member} />
                    ))}
                  </div>
                </div>
              )}

              {/* C. Technical Heads (Rendered Side-By-Side) */}
              {technicalHeads.length > 0 && (
                <div className="mb-16">
                  <h3 className="cyber-font text-base uppercase text-cyan-400 tracking-widest text-center mb-8 border-b border-cyan-500/10 pb-2 max-w-md mx-auto">
                    Technical Heads
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-2xl mx-auto">
                    {technicalHeads.map((member) => (
                      <TeamCard key={member._id} member={member} />
                    ))}
                  </div>
                </div>
              )}

              {/* D. Other Heads (Design, Publicity, Finance in separate section blocks) */}
              <div className="space-y-16 mt-16">
                {/* Design Heads */}
                {designHeads.length > 0 && (
                  <div>
                    <h3 className="cyber-font text-base uppercase text-cyan-400 tracking-widest text-center mb-8 border-b border-cyan-500/10 pb-2 max-w-md mx-auto">
                      Design Heads
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-2xl mx-auto">
                      {designHeads.map((member) => (
                        <TeamCard key={member._id} member={member} />
                      ))}
                    </div>
                  </div>
                )}

                {/* Event & Publicity Heads */}
                {eventHeads.length > 0 && (
                  <div>
                    <h3 className="cyber-font text-base uppercase text-cyan-400 tracking-widest text-center mb-8 border-b border-cyan-500/10 pb-2 max-w-md mx-auto">
                      Event & Publicity Heads
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-2xl mx-auto">
                      {eventHeads.map((member) => (
                        <TeamCard key={member._id} member={member} />
                      ))}
                    </div>
                  </div>
                )}

                {/* Finance Heads */}
                {financeHeads.length > 0 && (
                  <div>
                    <h3 className="cyber-font text-base uppercase text-cyan-400 tracking-widest text-center mb-8 border-b border-cyan-500/10 pb-2 max-w-md mx-auto">
                      Finance Heads
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-2xl mx-auto">
                      {financeHeads.map((member) => (
                        <TeamCard key={member._id} member={member} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.section>

          {/* FOOTER */}
          <footer className="relative z-10 border-t border-white/10 bg-black/80 backdrop-blur-md pt-16 pb-12 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
              {/* Left Column: About Us */}
              <div>
                <h3 className="cyber-font text-xl font-bold text-cyan-400 tracking-wider uppercase mb-4">
                  About Us
                </h3>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-sans">
                  Established in July 2026 under the department of Computer Engineering, the CSI PVG Student Chapter is the official digital epicentre of technology engineering and creation in PVG&apos;s College of Engineering and Technology, Pune. Our charter is straightforward: to transition traditional textbook engineering into dynamic technology leadership. We orchestrate intense bootcamps, high-stakes hackathons, deep coding encounters, and industrial collaborations, preparing over 150 student members to lead the future tech workspace.
                </p>
              </div>

              {/* Right Column: Contact */}
              <div>
                <h3 className="cyber-font text-xl font-bold text-cyan-400 tracking-wider uppercase mb-4">
                  Contact
                </h3>
                <div className="space-y-4 text-gray-300 text-sm sm:text-base font-sans">
                  <div className="flex items-start gap-3">
                    <FiMapPin className="text-cyan-400 w-5 h-5 mt-1 shrink-0" />
                    <span className="leading-relaxed">
                      Pune Vidhyarthi Griha&apos;s College Of Engineering And Technology, 44, Shiv Darshan Rd, Parvati, Nirmal Baug Colony, Vidya Nagari, Parvati Paytha, Pune, Maharashtra 411009
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <FiMail className="text-cyan-400 w-5 h-5 shrink-0" />
                    <a href="mailto:csi_pvg@pvgcoet.ac.in" className="hover:text-cyan-400 transition-colors">
                      csi_pvg@pvgcoet.ac.in
                    </a>
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <a
                      href="https://www.instagram.com/csi_pvg/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-pink-400 hover:text-pink-300 transition-colors font-mono text-sm"
                    >
                      <FiInstagram className="w-5 h-5" />
                      <span>@csi_pvg</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Copyright / Bottom Bar */}
            <div className="border-t border-white/5 pt-8 text-center">
              <p className="cyber-font text-cyan-400 text-neon-cyan text-base font-bold tracking-wider mb-2">
                COMPUTER SOCIETY OF INDIA PVG COET&M
              </p>
              <p className="text-xs text-gray-500 font-mono uppercase tracking-widest">
                © 2026 CSI PVG COET&M. Crafted by CSI PVG Tech Heads.
              </p>
            </div>
          </footer>

          {/* Lightbox Image Popup Modal */}
          <AnimatePresence>
            {activeModalImage && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setActiveModalImage(null)}
                className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/85 backdrop-blur-md cursor-zoom-out"
              >
                {/* Modal Container */}
                <motion.div
                  initial={{ scale: 0.85, opacity: 0, y: 15 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.85, opacity: 0, y: 15 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 320 }}
                  onClick={(e) => e.stopPropagation()}
                  className="relative max-w-4xl max-h-[90vh] flex flex-col items-center bg-[#0a0d14]/95 border-2 border-cyan-500/50 rounded-2xl shadow-[0_0_60px_rgba(0,240,255,0.35)] overflow-hidden cursor-default"
                >
                  {/* Top glowing accent bar */}
                  <div className="w-full h-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 shrink-0" />

                  {/* Close button */}
                  <button
                    onClick={() => setActiveModalImage(null)}
                    className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-black/70 border border-white/20 hover:border-cyan-400 hover:text-cyan-400 text-white flex items-center justify-center transition-all duration-200 shadow-lg cursor-pointer"
                    aria-label="Close image popup"
                  >
                    <FiX className="w-5 h-5" />
                  </button>

                  {/* Image container */}
                  <div className="p-3 sm:p-5 max-h-[76vh] flex items-center justify-center overflow-hidden">
                    <img
                      src={activeModalImage.src}
                      alt={activeModalImage.title || 'Expanded view'}
                      className="max-h-[70vh] max-w-full w-auto h-auto object-contain rounded-xl shadow-2xl border border-white/10"
                    />
                  </div>

                  {/* Caption / Footer bar */}
                  <div className="w-full px-5 py-3 bg-black/70 border-t border-white/10 flex items-center justify-between gap-4 shrink-0">
                    <span className="cyber-font text-white text-xs sm:text-sm font-semibold tracking-wide truncate">
                      {activeModalImage.title || 'Image Preview'}
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono tracking-wider shrink-0 hidden sm:inline">
                      Press ESC or click outside to close
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      )}
    </>
  );
}
