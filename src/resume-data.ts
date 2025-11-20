import { Github, Linkedin } from "lucide-react";

export const RESUME_DATA = {
  name: "Kabir Narula",
  initials: "KN",
  location: "Toronto, ON",
  locationLink: "https://www.google.com/maps/place/Toronto,+ON",
  about: "Full-stack Software Developer building production-ready web applications with modern frameworks and cloud infrastructure. Passionate about clean architecture, performance optimization, and shipping features that users love.",
  summary: "Full-stack Software Developer with hands-on experience building scalable web applications using modern JavaScript frameworks, backend APIs, and cloud services. Proven track record shipping features across the full development lifecycle—from requirements gathering and system design to deployment and monitoring. Skilled at writing clean, maintainable code and collaborating with cross-functional teams to deliver products that solve real user problems.",
  avatarUrl: "https://avatars.githubusercontent.com/u/1234567?v=4",
  personalWebsiteUrl: "https://github.com/Kabir-Narula",
  contact: {
    email: "Kabirnar10@gmail.com",
    tel: "(647) 410-6699",
    social: [
      {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/kabir-narula-19b129260/",
        icon: Linkedin,
      },
      {
        name: "GitHub",
        url: "https://github.com/Kabir-Narula",
        icon: Github,
      },
    ],
  },
  education: [
    {
      school: "Seneca Polytechnic",
      degree: "Honours Bachelor of Technology – Software Development",
      start: "Expected",
      end: "Aug 2026",
      description: "Relevant Coursework: Databases (SQL), Data Structures & Algorithms, Software Engineering & SDLC, Software Requirements & QA, Operating Systems, Object-Oriented Programming, Discrete Mathematics.",
    },
  ],
  work: [
    {
      company: "Project Human City",
      link: "https://example.com",
      badges: ["Full-Stack", "React", "Node.js", "PostgreSQL"],
      title: "Software Developer Intern",
      start: "May 2025",
      end: "Sep 2025",
      description:
        "Engineered production-ready full-stack features for a 10K+ user community platform, shipping secure authentication systems, real-time WebSocket notifications, and comprehensive admin dashboards that cut support workload by 30%—all built with React, Node.js, and PostgreSQL.",
      cardDescription:
        "Built full-stack features for a community platform serving 10K+ users, shipping authentication systems, real-time notifications, and admin tools using React, Node.js, and PostgreSQL",
    },
    {
      company: "Seneca Polytechnic",
      link: "https://senecapolytechnic.ca",
      badges: ["Technical Support", "DevOps", "Automation"],
      title: "Technical Infrastructure Specialist",
      start: "Aug 2025",
      end: "Oct 2025",
      description:
        "Transformed infrastructure operations for 30+ hybrid learning spaces by building PowerShell automation that slashed deployment times by 40%, while serving as the primary escalation point for complex network issues and training 15+ staff members on emerging technologies.",
      cardDescription:
        "Managed technical infrastructure for 30+ hybrid classrooms, automated deployments with PowerShell slashing setup time by 40%, and trained staff on new systems",
    },
    {
      company: "Three Of Cups – Social Safety Platform",
      link: "https://example.com",
      badges: ["Contract", "ASP.NET", "MSSQL"],
      title: "Software Developer (Contract)",
      start: "Mar 2024",
      end: "May 2024",
      description:
        "Architected mission-critical backend infrastructure for a social safety platform using ASP.NET Web API and MSSQL, delivering high-performance authentication endpoints and optimized data access layers that ensured sub-second response times for life-saving user workflows.",
      cardDescription:
        "Built secure backend infrastructure for a social safety app using ASP.NET and SQL Server, optimizing queries and designing scalable APIs for authentication and critical safety features",
    },
  ],
  skills: [
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "PostgreSQL",
    "MongoDB",
    "Docker",
    "AWS",
    "Git/GitHub",
    "REST APIs",
  ],
  projects: [
    {
      title: "TaskFlow Real-Time Workspace",
      techStack: ["Next.js 13", "Supabase", "Socket.io", "Drizzle ORM", "Stripe"],
      description: "Real-time collaborative SaaS platform with live cursors, WebSocket multiplayer editing, Supabase real-time subscriptions, and Stripe payment integration. Features row-level security and type-safe database queries.",
      link: {
        label: "github.com/Treminy",
        href: "https://github.com/Kabir-Narula/Treminy",
      },
    },
    {
      title: "CloudVault Distributed Storage",
      techStack: ["Express.js", "AWS DynamoDB", "AWS S3", "AWS Cognito", "Docker"],
      description: "Microservice REST API with 12+ endpoints for cloud file storage. JWT authentication via AWS Cognito, metadata in DynamoDB, binary storage in S3 with presigned URLs. Dockerized with health checks and LocalStack for local dev.",
      link: {
        label: "github.com/fragments",
        href: "https://github.com/Kabir-Narula/fragments",
      },
    },
    {
      title: "MindfulAI Journaling App",
      techStack: ["Next.js", "Prisma", "PostgreSQL", "OpenAI GPT-4", "TypeScript"],
      description: "Full-stack mental health platform with AI-powered sentiment analysis and chat support. Features JWT authentication, journal entries with mood tracking, OpenAI integration for emotional insights, and PostgreSQL database with Prisma ORM.",
      link: {
        label: "github.com/Mindful_Ai_DPS",
        href: "https://github.com/Kabir-Narula/Mindful_Ai_DPS",
      },
    },
  ],
  achievements: [
    {
      title: "OVH Cloud Computing Challenge",
      rank: "2nd Place",
      description: "Awarded among 200+ participants for designing a scalable microservices architecture.",
      date: "2024",
    },
    {
      title: "Merit-Based Scholarship",
      rank: "Winner",
      description: "Awarded $4,000 recognizing academic excellence in Software Development.",
      date: "2024",
    },
  ]
} as const;
