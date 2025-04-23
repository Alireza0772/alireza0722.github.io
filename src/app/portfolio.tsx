'use client'
// src/components/PortfolioRetroEnhanced.jsx
import React, { useCallback, useState, useEffect } from 'react';
// --- Animation Libraries ---
import { TypeAnimation } from 'react-type-animation'; // For typewriter effect
import { Fade, Slide } from "react-awesome-reveal"; // For scroll animations

// --- Particle Engine ---
import Particles from "react-particles";
import type { Container, Engine, ISourceOptions } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim"; // Load the slim engine
import { ReactNode } from 'react';

// --- Import Icons ---
import {
    FaTerminal, FaUserSecret, FaShieldAlt, FaProjectDiagram, FaNetworkWired,
    FaCogs, FaTools, FaFlask, FaLightbulb, FaUserAstronaut, FaGamepad, FaRocket, FaCodeBranch, FaDatabase, FaCode, FaDesktop, FaMobileAlt, FaBrain, FaChessKnight, FaInfoCircle
} from 'react-icons/fa';
import { SiDotnet, SiReact, SiRider, SiXcode, SiSqlite, SiPython } from 'react-icons/si';
import { DiVisualstudio } from "react-icons/di";
import { BiLogoVisualStudio } from "react-icons/bi";
import { FaBookOpen } from "react-icons/fa";

// --- Interfaces ---
interface SectionProps { children: ReactNode; id: string; }
interface SectionHeadingProps { title: string; icon: React.ComponentType<{ className?: string }>; }
interface InfoBlockProps { title: string; icon: React.ComponentType<{ className?: string }>; children: ReactNode; }
interface KeywordProps { children: ReactNode; }

// --- SuperpositionText Animation ---
const SYMBOLS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=~[]{}|;:,.<>?";

interface SuperpositionTextProps {
  text: string;
  className?: string;
}

const SuperpositionText: React.FC<SuperpositionTextProps> = ({ text, className }) => {
  const [display, setDisplay] = useState<string[]>(() => Array.from(text).map(() => ""));
  useEffect(() => {
    let frame = 0;
    let raf: number;
    const maxFrames = 30; // duration of animation per character
    const collapseDelay = 10; // frames to wait before collapsing next char
    function animate() {
      let next = [...display];
      let done = true;
      for (let i = 0; i < text.length; i++) {
        if (frame < i * collapseDelay) {
          next[i] = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
          done = false;
        } else if (frame < i * collapseDelay + maxFrames) {
          next[i] = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
          done = false;
        } else {
          next[i] = text[i];
        }
      }
      setDisplay(next);
      frame++;
      if (!done) raf = requestAnimationFrame(animate);
    }
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line
  }, [text]);
  return (
    <span className={className} style={{ fontFamily: 'monospace', letterSpacing: '0.1em', display: 'inline-block' }}>
      {display.map((c, i) => (
        <span key={i}>{c}</span>
      ))}
    </span>
  );
};

const PortfolioRetroEnhanced = () => {
    const name = "Alireza Senobari";
    const title = "Full-Stack Developer // System Architect";
    const [currentDate, setCurrentDate] = useState("");
    const [headerReady, setHeaderReady] = useState(false); // State to delay status line

    useEffect(() => { setCurrentDate(new Date().toISOString()); }, []);

    const particlesInit = useCallback(async (engine: Engine) => {
        console.log("Particles engine init");
        await loadSlim(engine);
    }, []);

    const particlesLoaded = useCallback(async (container: Container | undefined) => {
        await console.log("Particles container loaded:", container);
    }, []);

    // --- Particle Configuration (Added Interactivity) ---
    const particlesOptions: ISourceOptions = {
        fpsLimit: 60,
        particles: {
            number: {
                value: 300, // Slightly reduced for performance with animations
                density: {
                    enable: true,
                    area: 800,
                },
            },
            color: { value: ["#00ffff", "#00ff00", "#444444"] },
            shape: { type: ["square", "line"] },
            opacity: {
                value: { min: 0.1, max: 0.4 }, // Randomized opacity
                 animation: { // Subtle opacity pulse
                    enable: true,
                    speed: 0.5,
                    sync: false,
                    minimumValue: 0.1
                }
            },
            size: {
                value: { min: 1, max: 3 }, // Randomized size
            },
            links: { enable: true, distance: 110, color: "#225555", opacity: 0.2, width: 1 },
            move: {
                enable: true,
                speed: 1, // Slightly increased speed
                direction: "none",
                random: true,
                straight: false,
                outModes: { default: "out" },
                attract: { enable: false, rotate: { x: 600, y: 600 } }
            },
        },
        interactivity: {
            events: {
                 onHover: {
                    enable: true, // Enable hover interaction
                    mode: "bubble", // Effect on hover
                 },
                onClick: { enable: false }, // Keep click disabled unless needed
                resize: true
            },
             modes: {
                bubble: { // Configure bubble effect
                    distance: 150,
                    size: 6,
                    duration: 2,
                    opacity: 0.8,
                    // speed: 3 // Optional: speed of bubble effect
                },
            }
        },
        detectRetina: true,
    };

    // --- Helper Components (with Animation Enhancements) ---
    const Section = ({ children, id }: SectionProps) => (
        // Added Fade animation from react-awesome-reveal
        <Fade direction="up" duration={800} triggerOnce fraction={0.1}>
            <section id={id} className="mb-12 md:mb-16 border-2 border-cyan-500/40 bg-black/60 backdrop-blur-sm p-4 md:p-6 shadow-lg relative overflow-hidden group">
                {/* Corner Elements with subtle animation */}
                <span className="absolute top-0 left-0 w-2 h-2 bg-cyan-500 animate-[pulse_4s_cubic-bezier(0.4,0,0.6,1)_infinite]"></span>
                <span className="absolute top-0 right-0 w-2 h-2 bg-cyan-500 animate-[pulse_4.5s_cubic-bezier(0.4,0,0.6,1)_infinite]"></span>
                <span className="absolute bottom-0 left-0 w-2 h-2 bg-cyan-500 animate-[pulse_5s_cubic-bezier(0.4,0,0.6,1)_infinite]"></span>
                <span className="absolute bottom-0 right-0 w-2 h-2 bg-cyan-500 animate-[pulse_3.5s_cubic-bezier(0.4,0,0.6,1)_infinite]"></span>
                 {/* Subtle background glow on hover */}
                 <div className="absolute inset-0 bg-cyan-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-[-1]"></div>
                {children}
            </section>
        </Fade>
    );

    const SectionHeading = ({ title, icon }: SectionHeadingProps) => (
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-cyan-400 font-mono uppercase tracking-wider flex items-center border-b-2 border-cyan-700/50 pb-2">
            {/* Added hover effect to icon */}
            {icon && React.createElement(icon, { className: "mr-3 text-3xl text-cyan-400 transition-transform duration-300 group-hover:scale-110" })}
            {/* Simple character reveal potential (could use a library for better effect) */}
            <span className="inline-block transition-all duration-300 hover:tracking-widest">
                {title}
            </span>
        </h2>
    );

    const InfoBlock = ({ title, icon, children }: InfoBlockProps) => (
         // Adding group for icon hover effect within the block
        <div className="border border-green-500/50 bg-gray-900/70 p-4 hover:bg-gray-800/80 transition-all duration-300 backdrop-blur-sm group hover:border-green-400 hover:shadow-md hover:shadow-green-500/20">
            <h3 className="text-lg font-semibold mb-3 text-green-400 flex items-center font-mono">
                {/* Added hover effect to icon */}
                {icon && React.createElement(icon, { className: "mr-2 text-xl text-green-400 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[5deg]" })}
                {title}
            </h3>
            <div className="text-gray-300 space-y-2 text-sm md:text-base">
                {children}
            </div>
        </div>
    );

    const Keyword = ({ children }: KeywordProps) => (
        // Enhanced keyword style with hover effect
        <span className="text-yellow-400 font-semibold transition-all duration-200 hover:text-yellow-300 hover:bg-yellow-900/50 px-1 py-0.5 rounded-sm cursor-default">
            {children}
        </span>
    );

    // --- Component Render ---
    return (
        <div className="bg-black text-gray-300 font-mono leading-normal min-h-screen relative overflow-x-hidden">

            {/* --- tsParticles Component --- */}
            <Particles
                id="tsparticles"
                init={particlesInit}
                loaded={particlesLoaded}
                options={particlesOptions}
                className="absolute inset-0 z-0" // Ensure particles are behind content
            />

            {/* --- CRT Scanline Effect Overlay --- */}
            <div
                className="absolute inset-0 z-[5] pointer-events-none" // Ensure overlay is above particles, below content
                style={{
                    backgroundImage: 'linear-gradient(rgba(18, 18, 18, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.04), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.04))',
                    backgroundSize: '100% 4px, 8px 100%',
                    opacity: 0.3,
                    // Optional: Add a subtle flicker animation
                    // animation: 'crtFlicker 0.15s infinite',
                }}
            ></div>
            {/* Optional: Keyframes for flicker (add to global CSS or a style tag) */}
            {/* <style jsx global>{`
                @keyframes crtFlicker {
                    0% { opacity: 0.28; }
                    50% { opacity: 0.32; }
                    100% { opacity: 0.28; }
                }
            `}</style> */}


            {/* --- Main Content Container --- */}
            <div className="container mx-auto px-4 py-8 md:px-8 lg:px-16 relative z-10"> {/* Ensure content is above particles and overlay */}

                {/* --- Header / Command Center --- */}
                <header className="text-center mb-12 md:mb-16 border-4 border-cyan-600 bg-black/70 backdrop-blur-sm p-6 shadow-xl relative">
                    {/* Corners with pulse animation */}
                    <span className="absolute -top-1 -left-1 w-3 h-3 bg-yellow-400 animate-pulse"></span>
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 animate-[pulse_1.5s_ease-in-out_infinite]"></span>
                    <span className="absolute -bottom-1 -left-1 w-3 h-3 bg-yellow-400 animate-[pulse_1.7s_ease-in-out_infinite]"></span>
                    <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-yellow-400 animate-pulse"></span>

                    <SuperpositionText
                        text={name}
                        className="text-4xl md:text-5xl font-bold mb-2 text-green-400 uppercase tracking-widest overflow-hidden whitespace-nowrap border-r-4 border-green-400 pr-2"
                    />
                    {headerReady && ( // Only show title animation after name is typed
                        <TypeAnimation
                            sequence={[
                                `// ${title}`, // Type title
                                5000, // Keep title visible
                            ]}
                            wrapper="p"
                            speed={50}
                            className="text-lg md:text-xl text-cyan-400"
                            cursor={true}
                            repeat={Infinity} // Keep repeating the title animation
                            style={{ minHeight: '28px' }} // Prevent layout shift
                        />
                    )}
                    {!headerReady && <p className="text-lg md:text-xl text-cyan-400" style={{ minHeight: '28px' }}><SuperpositionText text='// Full-Stack Developer // System Architect' /></p>} {/* Placeholder */}

                    {/* Fade in for status line */}
                    <Fade delay={2500} triggerOnce>
                         <div className="mt-4 text-sm text-gray-400">// Status: Online | Systems Nominal | BG Particles: Active</div>
                    </Fade>
                </header>

                {/* --- Main Content Grid --- */}
                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* --- Left Column --- */}
                    <div className="lg:col-span-2 space-y-12 md:space-y-16">
                        {/* Sections already wrapped in <Fade> */}
                        <Section id="briefing">
                            <SectionHeading title="Mission Briefing" icon={FaInfoCircle} />
                            <div className="space-y-4 text-base md:text-lg">
                                <p>Passionate full-stack developer engaged in mastering advanced <Keyword>.NET</Keyword> development and expanding technical horizons. Extensive field experience in <Keyword>ASP.NET MVC</Keyword>, <Keyword>Blazor</Keyword>, <Keyword>WPF</Keyword>, and Python-driven <Keyword>Machine Learning</Keyword> yields a versatile tactical skillset.</p>
                                <p>Operational approach involves deconstructing concepts to <Keyword>low-level fundamentals</Keyword> before constructing advanced, minimalistic implementations. Dedicated to continuous improvement, intricate problem-solving, and contributing intelligence to the <Keyword>open-source</Keyword> collective.</p>
                                <p>Excels in environments merging theoretical strategy with hands-on execution, frequently correlating computational challenges with concepts in <Keyword>mathematics</Keyword>, <Keyword>physics</Keyword>, or <Keyword>computational geometry</Keyword>.</p>
                            </div>
                        </Section>

                        <Section id="arsenal">
                            <SectionHeading title="Technical Arsenal" icon={FaCogs} />
                            {/* Use Slide for individual blocks for a different effect */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Slide direction="left" duration={600} triggerOnce cascade damping={0.2}>
                                    <InfoBlock title="Core Programming / Frameworks" icon={FaCode}>
                                        <p>Expertise across front-end & back-end ops. .NET proficiency: <Keyword>ASP.NET MVC</Keyword>, <Keyword>Blazor</Keyword>, <Keyword>WPF</Keyword>. Versatile in <Keyword>Python</Keyword> for ML tasks.</p>
                                        <div className="flex space-x-3 mt-2 text-xl text-gray-400"> <SiDotnet title=".NET" className="transition-transform hover:scale-110"/> <SiPython title="Python" className="transition-transform hover:scale-110"/> <FaCode title="General Programming" className="transition-transform hover:scale-110"/> </div>
                                    </InfoBlock>
                                </Slide>
                                <Slide direction="right" duration={600} triggerOnce cascade damping={0.2}>
                                    <InfoBlock title="Development Environment" icon={FaTools}>
                                        <p>Utilizing <Keyword>Visual Studio</Keyword> (Debugging), <Keyword>Rider</Keyword> (DB Ops, Scaffolding), <Keyword>VS Code</Keyword>, & <Keyword>Xcode</Keyword> for optimized cross-platform development.</p>
                                        <div className="flex space-x-3 mt-2 text-xl text-gray-400"> <DiVisualstudio title="Visual Studio" className="transition-transform hover:scale-110"/> <SiRider title="Rider" className="transition-transform hover:scale-110"/> <BiLogoVisualStudio title="VS Code" className="transition-transform hover:scale-110"/> <SiXcode title="Xcode" className="transition-transform hover:scale-110"/> </div>
                                    </InfoBlock>
                                </Slide>
                                <Slide direction="left" duration={600} triggerOnce cascade damping={0.2} delay={100}>
                                     <InfoBlock title="Architectural Doctrine" icon={FaProjectDiagram}>
                                        <p>Advocating <Keyword>Scalability</Keyword>, <Keyword>Security</Keyword>, <Keyword>Minimalism</Keyword>. Rooted in <Keyword>DDD</Keyword>, employing <Keyword>CQRS</Keyword>, <Keyword>MVVM</Keyword>, <Keyword>Repository</Keyword> patterns. Focus on multi-tenant systems, extensible RBAC, modular frameworks. Real-world constraints (<Keyword>SQLite</Keyword> limits, solo ops) considered.</p>
                                    </InfoBlock>
                                </Slide>
                                <Slide direction="right" duration={600} triggerOnce cascade damping={0.2} delay={100}>
                                     <InfoBlock title="Advanced Tactics / Theory" icon={FaBrain}>
                                        <p>Deep-diving into <Keyword>algorithmic layers</Keyword>. Analyzing problems via mathematical or computational geometry principles. Designing from <Keyword>first principles</Keyword>. Tackling complex security/DB optimization with low-level craft & high-level strategy.</p>
                                    </InfoBlock>
                                </Slide>
                                <Slide direction="left" duration={600} triggerOnce cascade damping={0.2}>
                                    <InfoBlock title="ML/AI Projects & Achievements" icon={FaBrain}>
                                        <p>Developed and deployed end-to-end <Keyword>machine learning</Keyword> and <Keyword>AI</Keyword> solutions for real-world applications. Experience includes:</p>
                                        <ul className="list-disc list-inside ml-4 mt-2 space-y-1 text-sm">
                                            <li>Built <Keyword>classification</Keyword> and <Keyword>regression</Keyword> models for business analytics and automation.</li>
                                            <li>Implemented <Keyword>clustering</Keyword> and <Keyword>dimensionality reduction</Keyword> for data exploration and visualization.</li>
                                            <li>Worked on <Keyword>natural language processing</Keyword> (NLP) tasks: text classification, sentiment analysis, and chatbots.</li>
                                            <li>Integrated <Keyword>TensorFlow</Keyword>, <Keyword>PyTorch</Keyword>, and <Keyword>scikit-learn</Keyword> models into production systems.</li>
                                            <li>Optimized ML pipelines for performance and scalability in both <Keyword>Python</Keyword> and <Keyword>.NET</Keyword> environments.</li>
                                        </ul>
                                        <div className="flex space-x-3 mt-2 text-xl text-gray-400">
                                            <SiPython title="Python" className="transition-transform hover:scale-110"/>
                                            <FaBrain title="AI/ML" className="transition-transform hover:scale-110"/>
                                            <SiDotnet title=".NET" className="transition-transform hover:scale-110"/>
                                        </div>
                                    </InfoBlock>
                                </Slide>
                            </div>
                        </Section>

                        <Section id="philosophy">
                            <SectionHeading title="Design Philosophy / Battle Plans" icon={FaChessKnight} />
                            <div className="space-y-6">
                                {/* Using Fade with cascade for these blocks */}
                                <Fade direction="up" duration={500} triggerOnce cascade damping={0.3}>
                                    <InfoBlock title="Fundamentals -> Advanced Constructs" icon={FaCodeBranch}> <p>Methodology begins with foundational analysis, leading to elegant, efficient implementations. Avoiding over-reliance on third-party libraries in critical systems for deeper internal insight.</p> </InfoBlock>
                                    <InfoBlock title="Minimalistic & Scalable Architecture" icon={FaNetworkWired}> <p>Proponent of lightweight yet robust components. Ambition to produce adaptable tools/libraries akin to <Keyword>Manim</Keyword>, geared for evolving requirements.</p> </InfoBlock>
                                    <InfoBlock title="Scenario-Based Implementations" icon={FaShieldAlt}>
                                        <p>Proficiency demonstrated in:</p>
                                        <ul className="list-disc list-inside ml-4 mt-2 space-y-1 text-sm">
                                            <li><Keyword>Multi-Tenancy:</Keyword> Isolated, integral client systems.</li>
                                            <li><Keyword>Role-Based Access Control:</Keyword> Flexible, precise security frameworks.</li>
                                            <li><Keyword>Advanced Security:</Keyword> Custom encryption, token auth, modular policies.</li>
                                        </ul>
                                    </InfoBlock>
                                </Fade>
                            </div>
                        </Section>
                    </div>

                    {/* --- Right Sidebar --- */}
                    <div className="lg:col-span-1 space-y-12 md:space-y-16">
                         {/* Sections already wrapped in <Fade> */}
                        <Section id="profile">
                            <SectionHeading title="Pilot Profile" icon={FaUserAstronaut} />
                            <Fade direction="up" duration={500} triggerOnce cascade damping={0.3}>
                                <div className="space-y-6">
                                    <InfoBlock title="Lifelong Learning & Resilience" icon={FaBookOpen}> <p>Despite occasional focus modulations (ADHD), determination for growth remains constant. Resilience fuels quest for excellence and tackling complex solo missions.</p> </InfoBlock>
                                    <InfoBlock title="Core Interests / Hobbies" icon={FaGamepad}> <p>Innate fascination with <Keyword>game development</Keyword>, <Keyword>computational geometry</Keyword>, advanced visualization. Exploring intersections of math, physics, and software enriches problem-solving.</p> </InfoBlock>
                                    <InfoBlock title="Toolset Preference" icon={FaTools}> <p>Strategic tool selection is key. <Keyword>Rider</Keyword> for DB-centric tasks, <Keyword>Visual Studio</Keyword> for debugging, harmonizing productivity and quality.</p> </InfoBlock>
                                </div>
                            </Fade>
                        </Section>
                        <Section id="vision">
                            <SectionHeading title="Future Trajectory" icon={FaRocket} />
                             <Fade direction="up" duration={500} triggerOnce cascade damping={0.3}>
                                <div className="space-y-4">
                                    <p>Driven to leave a substantial mark via scalable software libraries with enterprise/real-world focus, echoing the impact of projects like <Keyword>Manim</Keyword>.</p>
                                    <p>Designing innovative solutions addressing modern software challenges, balancing <Keyword>aesthetic minimalism</Keyword> with <Keyword>high-performance functionality</Keyword>.</p>
                                </div>
                            </Fade>
                        </Section>
                        <Section id="contact">
                            <SectionHeading title="Establish Comms Link" icon={FaMobileAlt} />
                            <Fade direction="up" duration={500} triggerOnce cascade damping={0.3}>
                                <p className="text-center text-gray-400">// Contact details or form integration pending //</p>
                                <div className="mt-4 text-center space-x-4">
                                    {/* Added hover glow to buttons */}
                                    <a href="#" className="text-green-400 hover:text-yellow-400 border border-green-500 px-3 py-1 hover:border-yellow-400 transition-all duration-200 hover:shadow-md hover:shadow-yellow-500/30">GitHub</a>
                                    <a href="#" className="text-green-400 hover:text-yellow-400 border border-green-500 px-3 py-1 hover:border-yellow-400 transition-all duration-200 hover:shadow-md hover:shadow-yellow-500/30">LinkedIn</a>
                                </div>
                            </Fade>
                        </Section>
                    </div>
                </div>

                {/* --- Footer / System Shutdown --- */}
                <footer className="mt-16 pt-6 border-t-2 border-cyan-700/50 text-center text-xs text-gray-500">
                    {/* Staggered fade-in for footer lines */}
                    <Fade direction="up" duration={600} triggerOnce cascade damping={0.5}>
                         <p>&gt; Session End: {currentDate || "Initializing..."}</p>
                        <p>&gt; Copyright © {new Date().getFullYear()} {name}. All rights reserved.</p>
                        <p>&gt; System Integrity: Nominal. Powering down interface...</p>
                    </Fade>
                </footer>
            </div>
        </div>
    );
};

export default PortfolioRetroEnhanced;