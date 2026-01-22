"use client";

import { motion, useInView, useReducedMotion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import React from "react";

const fadeIn = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
};

// --- DATA SECTIONS (Unchanged) ---
const internshipsData = [
  {
    title: "Soar with Mentor",
    company: "Dell Technologies",
    date: "October 2025 - present",
    description: [
        "Paired with a Dell mentor for guidance on career growth and skills.",
        "Attended technical workshops to deepen knowledge and industry insights.",
        "Built professional connections with Dell professionals and peers.",
        "Enhanced leadership, technical, and industry-readiness abilities."
    ],
  },
  {
    title: "Machine Learning and Gen-AI Intern",
    company: "Ericsson AB Sweden",
    date: "May 2025 - Jul 2025",
    description: [
        "Orchestrated a 5-layer end-to-end interview automation platform, decreasing interview process times by over 50%",
        "Implemented a robust RAG pipeline to retrieve relevant Q&A pairs from vector embeddings, providing ground truth for LLM evals",
        "Developed a production-ready FastAPI backend with Poetry dependency management ensuring seamless CI/CD pipeline",
        "Managed 7 tables across PostgreSQL using SQLAlchemy ORM and Alembic migrations for schema versioning",
        "Enhanced candidate preparedness by providing 24/7 AI-powered mock interviews, leading to increased candidate confidence"
    ],
  },
  {
    title: "Participant, Google Cloud Facilitator Program '25",
    company: "Google Cloud Skills Boost",
    date: "Apr 2025 – Jun 2025",
    description: [
        "Completed intensive GCP learning through Google Arcade initiative, earning skill badges in compute, storage, AI/ML, data analytics, and security by completing 300+ labs.",
        "Applied GCP services including Compute Engine, BigQuery and Vertex AI to deploy scalable applications.",
        "Collaborated with peers and facilitators to implement cloud solutions for real-world use cases earning 90+ badges."
    ],
  },
  {
    title: "Student Intern",
    company: "Bajaj Finserv",
    date: "May 2024 – Aug 2024",
    description: [
        "Designed AI/ML models for loan repayment default prediction achieving 87% accuracy.",
        "Implemented RFC-based loan prediction model, streamlining approval process through automated decision-making.",
        "Performed feature engineering & model optimization using Python & MySQL on a dataset of 350,000+ records.",
        "Spearheaded a 3-phase development process to enhance risk management and reduce potential financial losses."
    ],
  },
];

const universityClubsData = [
    {
        company: "AI and Data Society, York University",
        roles: [
            {
                title: "Co-President",
                date: "Mar 2025 – Present | Toronto, ON",
                description: [
                    "Lead society operations, events, and partnerships as a primary representative.",
                    "Chair meetings and oversee strategic initiatives, finances, and compliance.",
                    "Organize workshops, speaker sessions, and hackathons connecting students with industry.",
                    "Mentor executive team, fostering innovation, inclusivity, and leadership.",
                    "Manage elections and transitions to ensure continuity and growth."
                ]
            },
            {
                title: "Vice President – Engineering",
                date: "Jan 2025 – Mar 2025",
                description: [
                    "Led AI and data science project teams, promoting technical growth and collaboration.",
                    "Organized brainstorming sessions and skill-development workshops.",
                    "Mentored students to ensure successful project execution and innovation."
                ]
            },
            {
                title: "Projects Team Lead – Engineering",
                date: "Oct 2024 – Jan 2025",
                description: [
                    "Led project teams in AI and data science initiatives.",
                    "Coordinated timelines and fostered teamwork and skill development."
                ]
            }
        ]
    },
    {
        company: "York Science Collective, York University",
        title: "Administrator",
        date: "Nov 2024 – Present | Toronto, ON",
        description: [
            "Supported coordination and communication of club events and initiatives.",
            "Managed meeting logistics, documentation, and executive scheduling.",
            "Assisted in science-focused programs engaging students across campus."
        ]
    },
    {
        company: "Women in Science and Engineering (WiSE), York University",
        title: "Second-Year Representative",
        date: "Sep 2024 – Present",
        description: [
            "Represented second-year students and contributed to initiatives empowering women in STEM.",
            "Organized events, workshops, and mentorship programs.",
            "Collaborated with executives to promote leadership, networking, and professional growth."
        ]
    },
    {
        company: "Lassonde Undergraduate Students Advisory Council, York University",
        title: "Member & Volunteer",
        date: "Oct 2024 – Mar 2025 | Toronto, ON",
        description: [
            "Participated in advisory meetings to provide student perspectives on academic and campus initiatives.",
            "Assisted in planning and executing events to enhance student engagement and community development."
        ]
    },
    {
        company: "Vanier Residence, York University",
        roles: [
            {
                title: "Building Representative",
                date: "Oct 2024 – Mar 2025",
                description: [
                    "Acted as a liaison between residents and community leadership.",
                    "Organized events and initiatives promoting inclusivity and engagement.",
                    "Supported resident concerns to enhance community well-being."
                ]
            },
            {
                title: "Community Engagement Committee Member",
                date: "Sep 2024 – Mar 2025",
                description: [
                    "Built an engaged residence community through events and outreach.",
                    "Collaborated with staff and peers to address student needs and strengthen community connections."
                ]
            },
            {
                title: "Sustainability Living Learning Community (LLC) Member",
                date: "Aug 2024 – Mar 2025",
                description: [
                    "Participated in sustainability-focused workshops and projects aligned with UN SDGs.",
                    "Promoted environmental awareness, resource conservation, and community impact.",
                    "Developed leadership, teamwork, and problem-solving skills through active collaboration."
                ]
            }
        ]
    }
];

const hobbiesData = [
    {
        title: "Content Creator – YouTube & Instagram",
        description: [
            "Started my journey as a content creator sharing authentic, creative, and value-driven content on technology, student life, and creativity.",
            "Experiment with formats like day-in-the-life videos, tech explainers, and behind-the-scenes glimpses.",
            "Develop skills in scripting, editing, and audience engagement.",
            "Learn strategies for building a personal brand and creating consistent, meaningful content."
        ],
    },
    {
        title: "Photography",
        description: [
            "Passionate about capturing moments and telling stories through visual media.",
            "Explore different styles such as portrait, landscape, and candid photography.",
            "Share work to inspire others and document meaningful experiences."
        ],
    }
];

type Role = {
  title: string;
  date: string;
  description: string[];
};

type TimelineItem = {
  company?: string;
  title?: string;
  date?: string;
  description?: string | string[];
  roles?: Role[];
};

const ImprovedTimeline = ({ 
    data, 
    expandedRoles, 
    toggleExpanded 
}: { 
    data: TimelineItem[]; 
    expandedRoles: Record<string, boolean>;
    toggleExpanded: (company: string) => void;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [lineHeight, setLineHeight] = useState(0);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    // "Move a little faster": 
    // Offset adjusted so line animation is more sensitive to the scroll.
    offset: ["start 70%", "end 80%"], 
  });

  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // Add a small delay to ensure expanded content is fully rendered
    const timer = setTimeout(() => {
      if (itemsRef.current.length > 0) {
        const firstItem = itemsRef.current[0];
        const lastItem = itemsRef.current[data.length - 1];
        
        if (firstItem && lastItem) {
          // Calculate distance from first dot to the BOTTOM of the last item text
          const startTop = firstItem.offsetTop;
          const endTop = lastItem.offsetTop + lastItem.offsetHeight; // "Go up to the end line of the last position"
          
          // We subtract a small buffer (e.g., 20px) so it aligns visually with text bottom, not box bottom margin
          setLineHeight(endTop - startTop - 24);
        }
      }
    }, 350); // Wait for animation to complete (300ms animation + 50ms buffer)
    
    return () => clearTimeout(timer);
  }, [data, expandedRoles]);

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, lineHeight]);

  const renderDescription = (description: string | string[] | undefined) => {
    if (!description) return null;
    if (Array.isArray(description)) {
      return (
        <ul className="mt-3 text-dutch-white/80 list-disc list-outside pl-5 space-y-1 !mt-2 sm:!mt-3 !pl-4 sm:!pl-5 !text-sm sm:!text-base">
          {description.map((point, i) => (
            <li key={i}>{point}</li>
          ))}
        </ul>
      );
    }
    return <p className="mt-3 text-dutch-white/80 !mt-2 sm:!mt-3 !text-sm sm:!text-base">{description}</p>;
  };

  const renderRole = (role: Role) => (
    <>
      <p className="text-sm font-medium text-dutch-white/70 mb-1 !text-xs sm:!text-sm">{role.date}</p>
      <h3 className="text-xl font-semibold text-white !text-base sm:!text-xl">{role.title}</h3>
      {renderDescription(role.description)}
    </>
  );

  return (
    <div ref={containerRef} className="relative mt-8">
        
      {/* Gray Background Line (Track) */}
      <div 
        className="absolute bg-dutch-white/20 -translate-x-1/2"
        style={{ 
            left: '12px', 
            width: '0.5px',
            // Starts at center of the new larger dot (24px / 2 + top margin)
            // Item top padding is complex, but let's align with visual dot center
            top: '18px', 
            height: `${lineHeight}px`
        }} 
      />
      
      {/* Active Animated Fill Line */}
      <motion.div
        className="absolute bg-dutch-white -translate-x-1/2"
        style={{
          left: '12px',
          width: '0.5px',
          top: '18px',
          height: prefersReducedMotion ? lineHeight : heightTransform,
          maxHeight: lineHeight, 
        }}
      />
      
      {data.map((item, index) => (
        <TimelineItemRow 
            key={index} 
            index={index} 
            item={item} 
            setRef={(el: HTMLDivElement | null) => (itemsRef.current[index] = el)}
            expandedRoles={expandedRoles}
            toggleExpanded={toggleExpanded}
            renderRole={renderRole}
            renderDescription={renderDescription}
        />
      ))}
    </div>
  );
};

const TimelineItemRow = ({ 
    index, 
    item, 
    setRef, 
    expandedRoles, 
    toggleExpanded,
    renderRole,
    renderDescription
}: any) => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { margin: "-10% 0px -10% 0px", amount: 0.2 });

    return (
        <motion.div
            ref={(el) => {
                if (ref.current !== el) {
                    ref.current = el;
                }
                setRef(el);
            }}
            className="relative !pl-8 sm:!pl-12 !mb-8 sm:!mb-12"
            style={{ paddingLeft: '48px', marginBottom: '48px' }}
            initial={{ opacity: 0.2 }}
            animate={{ opacity: isInView ? 1 : 0.2 }}
            transition={{ duration: 0.5 }}
        >
            {/* THE DOT */}
            <motion.div
                className="absolute -translate-x-1/2 flex items-center justify-center bg-wine-red !w-5 !h-5 sm:!w-6 sm:!h-6"
                style={{ 
                    left: '12px', 
                    top: '6px', 
                    zIndex: 10,
                    // 1. Thicker rings, smaller center
                    width: '24px', 
                    height: '24px',
                    borderRadius: '50%',
                    // 2. Less faded ring color (0.8 opacity)
                    border: '6px solid rgba(239, 219, 214, 0.8)' 
                }}
                initial={{ scale: 0 }}
                animate={{ scale: isInView ? 1 : 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />
          
            {/* Content */}
            {item.roles && item.roles.length > 0 ? (
                <>
                    <h3 className="text-2xl font-bold text-white mb-4 !text-lg sm:!text-2xl !mb-3 sm:!mb-4">{item.company}</h3>
                    <div className="mt-2">{renderRole(item.roles[0])}</div>
                    {item.roles.length > 1 && (
                        <div className="w-full mt-4">
                            {/* 5. "Show X more roles" - removed outline, added italics */}
                            <button
                                onClick={() => toggleExpanded(item.company || '')}
                                className="text-sm text-dutch-white/80 italic hover:text-dutch-white hover:underline transition-colors duration-300 !text-xs sm:!text-sm"
                            >
                                {expandedRoles[item.company || ''] 
                                ? `Hide ${item.roles.length - 1} older role${item.roles.length - 1 > 1 ? 's' : ''}`
                                : `Show ${item.roles.length - 1} more role${item.roles.length - 1 > 1 ? 's' : ''}`
                                }
                            </button>
                            <AnimatePresence>
                                {expandedRoles[item.company || ''] && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="overflow-hidden"
                                >
                                    <div className="space-y-8 pt-6 border-t border-dutch-white/20 mt-4 !space-y-4 sm:!space-y-8 !pt-4 sm:!pt-6 !mt-3 sm:!mt-4">
                                    {item.roles.slice(1).map((role: any, roleIndex: number) => (
                                        <motion.div 
                                            key={roleIndex}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: roleIndex * 0.1 }}
                                        >
                                            {renderRole(role)}
                                        </motion.div>
                                    ))}
                                    </div>
                                </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    )}
                </>
            ) : (
                <div className="mt-2 !mt-1 sm:!mt-2">
                    <p className="text-sm font-medium text-dutch-white/80 mb-1 !text-xs sm:!text-sm">{item.date}</p>
                    <h3 className="text-xl font-semibold text-white flex items-center flex-wrap !text-base sm:!text-xl">
                        {item.title} 
                        {item.company && (
                            <>
                                <span 
                                    className="text-dutch-white/50"
                                    style={{ margin: '0 16px' }}
                                >
                                    |
                                </span> 
                                {item.company}
                            </>
                        )}
                    </h3>
                    {renderDescription(item.description)}
                </div>
            )}
        </motion.div>
    );
};

export default function ExperienceSection() {
    const [activeTab, setActiveTab] = useState('internships');
    const [expandedRoles, setExpandedRoles] = useState<Record<string, boolean>>({});

    const toggleExpanded = (company: string) => {
        setExpandedRoles(prev => ({
            ...prev,
            [company]: !prev[company]
        }));
    };

    const tabData = {
        internships: internshipsData,
        clubs: universityClubsData,
        hobbies: hobbiesData
    };

    const TabButton = ({ id, label, isActive, onClick }: { 
        id: string; 
        label: string; 
        isActive: boolean; 
        onClick: () => void; 
    }) => (
        <button
            onClick={onClick}
            className={`py-3 font-medium transition-all duration-300 relative !py-2 sm:!py-3 !text-sm sm:!text-base ${
                isActive 
                    ? 'text-dutch-white' 
                    : 'text-dutch-white/60 hover:text-dutch-white'
            }`}
        >
            {label}
            {isActive && (
                <motion.div 
                    layoutId="activeJourneyTab"
                    className="absolute bottom-0 left-0 right-0 bg-dutch-white"
                    style={{ height: '2px' }} 
                />
            )}
        </button>
    );

    return (
        <motion.section
            id="experience"
            className="min-h-screen w-full flex flex-col justify-center items-center bg-wine-red px-4 sm:px-6 lg:px-8 !py-12 sm:!py-[96px] md:!py-[128px]"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.1 }}
        >
            <div className="w-full max-w-4xl mx-auto text-center">
                <motion.div 
                    variants={fadeIn}
                    transition={{ duration: 0.7 }}
                >
                    <h2 
                        className="text-5xl sm:text-6xl font-bold text-white !text-3xl sm:!text-5xl md:!text-6xl !mb-6 sm:!mb-8"
                        style={{ marginBottom: '32px' }}
                    >
                        Journey
                    </h2>
                    
                    <div 
                        className="w-full grid !mb-8 sm:!mb-12"
                        style={{ 
                            display: 'grid', 
                            gridTemplateColumns: 'repeat(3, 1fr)',
                            gap: '1rem', 
                            // 3. Add distance between Tabs and descriptions
                            marginBottom: '48px' 
                        }}
                    >
                        <TabButton 
                            id="internships" 
                            label="Internships" 
                            isActive={activeTab === 'internships'} 
                            onClick={() => setActiveTab('internships')} 
                        />
                        <TabButton 
                            id="clubs" 
                            label="University Clubs" 
                            isActive={activeTab === 'clubs'} 
                            onClick={() => setActiveTab('clubs')} 
                        />
                        <TabButton 
                            id="hobbies" 
                            label="Hobbies" 
                            isActive={activeTab === 'hobbies'} 
                            onClick={() => setActiveTab('hobbies')} 
                        />
                    </div>
                </motion.div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="w-full max-w-4xl mx-auto text-left"
                    >
                        <ImprovedTimeline 
                            data={tabData[activeTab as keyof typeof tabData]} 
                            expandedRoles={expandedRoles}
                            toggleExpanded={toggleExpanded}
                        />
                    </motion.div>
                </AnimatePresence>
            </div>
        </motion.section>
    );
}