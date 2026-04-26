// ============================================
// KARTIK RAWAT KA REAL DATA - AI KNOWLEDGE BASE
// Resume se liya gaya actual data
// ============================================

const portfolioData = {

  // Personal Info
  personal: {
    name: "Kartik Rawat",
    role: "Full Stack Developer (Fresher)",
    tagline: "Building the web, one line at a time 🚀",
    email: "kartikrawat1333@gmail.com",
    phone: "9389690052",
    location: "Delhi, New Delhi",
    portfolio: "bekartikrawat.vercel.app",
    available: true,
  },

  // Technical Skills
  skills: {
    frontend: ["HTML5", "CSS3", "JavaScript", "React.js (Basics)"],
    backend: ["Node.js (Basics)", "Express.js"],
    databases: ["SQL (Basics)", "MongoDB"],
    concepts: [
      "Client-Server Architecture",
      "Responsive Design",
      "Web Development Workflow",
      "CRUD Operations",
    ],
    tools: ["VS Code", "Git", "GitHub"],
    soft: [
      "Quick Learner",
      "Problem Solving",
      "Communication",
      "Teamwork",
      "Time Management",
    ],
  },

  // Education
  education: [
    {
      degree: "Diploma in Computer Science & Engineering",
      institute: "Government Polytechnic Beeronkhal, Pauri Garhwal, Uttarakhand",
      year: "2022 - 2025",
      status: "Pursuing",
    },
    {
      degree: "Senior Secondary (12th)",
      board: "NIOS Board",
      percentage: "60%",
    },
    {
      degree: "Secondary (10th)",
      board: "Uttarakhand Board",
      percentage: "75%",
    },
  ],

  // Projects
  projects: [
    {
      name: "Personal Portfolio Website",
      description:
        "Showcases projects, skills, and contact details. Built with modern UI and responsive design.",
      tech: ["HTML", "CSS", "JavaScript"],
      status: "Completed",
      link: "https://bekartikrawat.vercel.app",
    },
    {
      name: "Responsive Web Pages",
      description:
        "Designed and developed multiple responsive web pages using HTML, CSS, and JavaScript.",
      tech: ["HTML", "CSS", "JavaScript"],
      status: "Completed",
      link: "#",
    },
    {
      name: "Backend Projects",
      description:
        "Implemented basic backend features using Node.js and Express.js with CRUD operations.",
      tech: ["Node.js", "Express.js", "MongoDB", "SQL"],
      status: "Completed",
      link: "#",
    },
  ],

  // Experience
  experience: [
    {
      title: "Fresher - Full Stack Developer",
      type: "Self-Taught / Academic Projects",
      duration: "2022 - Present",
      description:
        "Currently seeking internships and entry-level opportunities in full stack development. Built multiple projects using frontend and backend technologies.",
    },
  ],

  // Goals
  goals: {
    objective:
      "Motivated and detail-oriented Full Stack Developer fresher with practical knowledge of frontend and backend web technologies.",
    shortTerm:
      "Secure an entry-level role or internship in full stack development",
    longTerm:
      "Become a skilled Full Stack and AI Developer, building scalable and efficient web applications",
    dream: "Build products that help people and contribute to the tech industry",
  },

  // Strengths
  strengths: [
    "Strong interest in web development",
    "Passionate about learning new technologies",
    "Self-motivated and adaptable",
    "Quick learner with problem solving skills",
  ],

  // Social Links
  social: {
    github: "https://github.com/bekartikrawat",
    linkedin: "https://linkedin.com/in/bekartikrawat",
    portfolio: "https://bekartikrawat.vercel.app",
    email: "kartikrawat1333@gmail.com",
  },
};

// ============================================
// RAG FUNCTION - User ke message se relevant
// data dhundta hai (Retrieval Augmented Generation)
// ============================================
const getRelevantData = (userMessage) => {
  const msg = userMessage.toLowerCase();
  let relevantData = {};

  // Skills related
  if (
    msg.includes("skill") ||
    msg.includes("technology") ||
    msg.includes("tech") ||
    msg.includes("know") ||
    msg.includes("language") ||
    msg.includes("framework") ||
    msg.includes("database")
  ) {
    relevantData.skills = portfolioData.skills;
  }

  // Projects related
  if (
    msg.includes("project") ||
    msg.includes("work") ||
    msg.includes("built") ||
    msg.includes("made") ||
    msg.includes("portfolio") ||
    msg.includes("website")
  ) {
    relevantData.projects = portfolioData.projects;
  }

  // Goals related
  if (
    msg.includes("goal") ||
    msg.includes("future") ||
    msg.includes("plan") ||
    msg.includes("dream") ||
    msg.includes("objective") ||
    msg.includes("aspir")
  ) {
    relevantData.goals = portfolioData.goals;
  }

  // Contact related
  if (
    msg.includes("contact") ||
    msg.includes("email") ||
    msg.includes("reach") ||
    msg.includes("hire") ||
    msg.includes("phone") ||
    msg.includes("number")
  ) {
    relevantData.personal = portfolioData.personal;
    relevantData.social = portfolioData.social;
  }

  // Education related
  if (
    msg.includes("education") ||
    msg.includes("college") ||
    msg.includes("study") ||
    msg.includes("degree") ||
    msg.includes("diploma") ||
    msg.includes("school") ||
    msg.includes("qualification")
  ) {
    relevantData.education = portfolioData.education;
  }

  // Experience related
  if (
    msg.includes("experience") ||
    msg.includes("background") ||
    msg.includes("intern") ||
    msg.includes("job") ||
    msg.includes("work")
  ) {
    relevantData.experience = portfolioData.experience;
    relevantData.goals = portfolioData.goals;
  }

  // About/intro related
  if (
    msg.includes("name") ||
    msg.includes("who") ||
    msg.includes("about") ||
    msg.includes("tell") ||
    msg.includes("introduce") ||
    msg.includes("kartik")
  ) {
    relevantData.personal = portfolioData.personal;
    relevantData.goals = portfolioData.goals;
    relevantData.strengths = portfolioData.strengths;
  }

  // Strengths related
  if (
    msg.includes("strength") ||
    msg.includes("passion") ||
    msg.includes("interest") ||
    msg.includes("soft skill")
  ) {
    relevantData.strengths = portfolioData.strengths;
    relevantData.skills = portfolioData.skills;
  }

  // Agar koi match nahi mila - basic info do
  if (Object.keys(relevantData).length === 0) {
    relevantData.personal = portfolioData.personal;
    relevantData.skills = portfolioData.skills;
    relevantData.goals = portfolioData.goals;
  }

  return relevantData;
};

module.exports = { portfolioData, getRelevantData };