"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, X, Zap, ArrowRight, Database, Server, Globe, Shield, Cpu, HardDrive, Activity } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState, useEffect, useMemo, useCallback } from "react";
import { EditableText } from "@/components/EditableText";

interface ProjectCardProps {
  title: string;
  description: string;
  techStack: readonly string[];
  link: string;
  className?: string;
  onDescriptionChange?: (newDescription: string) => void;
}

interface FlowNode {
  id: string;
  label: string;
  sublabel?: string;
  icon: any;
  color: string;
  position: { x: number; y: number };
  connections: string[];
  dataFlow?: string;
  step?: number;
  explanation?: string;
}

interface SystemArchitecture {
  nodes: FlowNode[];
  title: string;
  description: string;
}

const systemArchitectures: Record<string, SystemArchitecture> = {
  "TaskFlow Real-Time Workspace": {
    title: "Real-Time Collaborative SaaS Architecture",
    description: "Next.js 13 + Supabase + Socket.io with Drizzle ORM, Stripe payments, and real-time collaboration",
    nodes: [
      {
        id: "client",
        label: "Next.js 13 Client",
        sublabel: "React + Tailwind",
        icon: Globe,
        color: "bg-neo-blue",
        position: { x: 15, y: 10 },
        connections: ["middleware", "socketio"],
        dataFlow: "App Router + RSC",
        step: 1,
        explanation: "User opens the app in their browser. Next.js renders the UI and handles routing.",
      },
      {
        id: "middleware",
        label: "Auth Middleware",
        sublabel: "Supabase Auth Helpers",
        icon: Shield,
        color: "bg-[#3ECF8E]",
        position: { x: 55, y: 10 },
        connections: ["supabase"],
        dataFlow: "JWT + Session",
        step: 2,
        explanation: "Checks if user is logged in. Validates JWT token and protects private routes.",
      },
      {
        id: "socketio",
        label: "Socket.IO Server",
        sublabel: "Realtime Events",
        icon: Zap,
        color: "bg-neo-pink",
        position: { x: 15, y: 40 },
        connections: ["supabase"],
        dataFlow: "WebSockets",
        step: 3,
        explanation: "Opens WebSocket connection. Broadcasts live cursor positions and text changes to all users.",
      },
      {
        id: "supabase",
        label: "Supabase Backend",
        sublabel: "Postgres + Realtime",
        icon: Database,
        color: "bg-[#3ECF8E]",
        position: { x: 55, y: 40 },
        connections: ["drizzle"],
        dataFlow: "Row Level Security",
        step: 4,
        explanation: "PostgreSQL database with real-time subscriptions. Enforces permissions so users only see their workspaces.",
      },
      {
        id: "drizzle",
        label: "Drizzle ORM",
        sublabel: "Type-safe Queries",
        icon: Server,
        color: "bg-[#C5F74F]",
        position: { x: 85, y: 40 },
        connections: [],
        dataFlow: "Schema Migrations",
        step: 5,
        explanation: "Type-safe database queries. Prevents SQL injection and catches errors during development.",
      },
      {
        id: "stripe",
        label: "Stripe API",
        sublabel: "Payment Processing",
        icon: Cpu,
        color: "bg-[#635BFF]",
        position: { x: 55, y: 70 },
        connections: [],
        dataFlow: "Webhooks",
        step: 6,
        explanation: "Handles subscription payments. Webhooks notify app when user upgrades or cancels plan.",
      },
    ],
  },
  "CloudVault Distributed Storage": {
    title: "Microservices REST API with AWS Cloud",
    description: "Express.js backend with DynamoDB + S3, AWS Cognito auth, and Docker containerization",
    nodes: [
      {
        id: "client",
        label: "Client App",
        sublabel: "Any HTTP Client",
        icon: Globe,
        color: "bg-neo-lime",
        position: { x: 15, y: 12 },
        connections: ["cognito"],
        dataFlow: "REST API",
        step: 1,
        explanation: "User uploads a file via HTTP POST request. Could be a web app, mobile app, or CLI tool.",
      },
      {
        id: "cognito",
        label: "AWS Cognito",
        sublabel: "JWT Verification",
        icon: Shield,
        color: "bg-[#FF9900]",
        position: { x: 40, y: 12 },
        connections: ["express"],
        dataFlow: "Bearer Token",
        step: 2,
        explanation: "Validates JWT token from request header. Rejects unauthorized users before they reach the API.",
      },
      {
        id: "express",
        label: "Express Server",
        sublabel: "Node.js REST API",
        icon: Server,
        color: "bg-neo-blue",
        position: { x: 70, y: 12 },
        connections: ["dynamodb", "s3"],
        dataFlow: "Middleware Chain",
        step: 3,
        explanation: "REST API with 12+ endpoints. Routes request through validation, auth, and business logic layers.",
      },
      {
        id: "dynamodb",
        label: "DynamoDB",
        sublabel: "Fragment Metadata",
        icon: Database,
        color: "bg-[#FF9900]",
        position: { x: 40, y: 45 },
        connections: [],
        dataFlow: "Partitioned by UserId",
        step: 4,
        explanation: "Stores file metadata: name, size, type, owner. Partitioned by UserID for fast lookups.",
      },
      {
        id: "s3",
        label: "AWS S3",
        sublabel: "Binary Storage",
        icon: HardDrive,
        color: "bg-[#FF9900]",
        position: { x: 75, y: 45 },
        connections: [],
        dataFlow: "Presigned URLs",
        step: 5,
        explanation: "Stores actual file bytes. Uses presigned URLs for secure, direct browser-to-S3 uploads.",
      },
      {
        id: "docker",
        label: "Docker Container",
        sublabel: "Alpine Linux",
        icon: Server,
        color: "bg-[#2496ED]",
        position: { x: 20, y: 75 },
        connections: [],
        dataFlow: "Health Checks",
        step: 6,
        explanation: "Entire app runs in isolated container. Health checks ensure service is responsive. Easy to deploy anywhere.",
      },
    ],
  },
  "MindfulAI Journaling App": {
    title: "Full-Stack AI Mental Health Platform",
    description: "Next.js + Prisma + OpenAI GPT-4 with sentiment analysis and JWT authentication",
    nodes: [
      {
        id: "nextjs",
        label: "Next.js App",
        sublabel: "React + TypeScript",
        icon: Globe,
        color: "bg-neo-blue",
        position: { x: 15, y: 10 },
        connections: ["middleware"],
        dataFlow: "Server Actions",
        step: 1,
        explanation: "User writes a journal entry. Next.js renders the form and handles client-side validation.",
      },
      {
        id: "middleware",
        label: "Auth Middleware",
        sublabel: "JWT + Bcrypt",
        icon: Shield,
        color: "bg-neo-pink",
        position: { x: 45, y: 10 },
        connections: ["api"],
        dataFlow: "Cookie Session",
        step: 2,
        explanation: "Verifies user session from encrypted cookie. Passwords hashed with bcrypt for security.",
      },
      {
        id: "api",
        label: "API Routes",
        sublabel: "RESTful Endpoints",
        icon: Server,
        color: "bg-neo-lime",
        position: { x: 75, y: 10 },
        connections: ["prisma", "openai"],
        dataFlow: "JSON Response",
        step: 3,
        explanation: "API routes handle journal creation, mood tracking, and chat requests. Returns JSON responses.",
      },
      {
        id: "prisma",
        label: "Prisma ORM",
        sublabel: "PostgreSQL",
        icon: Database,
        color: "bg-[#5A67D8]",
        position: { x: 45, y: 42 },
        connections: [],
        dataFlow: "Migrations",
        step: 4,
        explanation: "Saves journal entry to PostgreSQL. Type-safe queries prevent bugs. Database migrations track schema changes.",
      },
      {
        id: "openai",
        label: "OpenAI GPT-4",
        sublabel: "Sentiment + Chat",
        icon: Zap,
        color: "bg-[#10A37F]",
        position: { x: 80, y: 42 },
        connections: [],
        dataFlow: "Stream Response",
        step: 5,
        explanation: "Analyzes journal text for mood (happy, sad, anxious). AI chat provides supportive responses with journal context.",
      },
      {
        id: "features",
        label: "Core Features",
        sublabel: "Journal + Goals + Chat",
        icon: Activity,
        color: "bg-purple-500",
        position: { x: 25, y: 72 },
        connections: [],
        dataFlow: "AI Insights",
        step: 6,
        explanation: "Dashboard shows mood trends over time. Set wellness goals. Chat with AI for mental health support.",
      },
    ],
  },
};

export function ProjectCardDetailed({ title, description, techStack, link, className, onDescriptionChange }: ProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeNodes, setActiveNodes] = useState<Set<string>>(new Set());
  const [dataFlowAnimations, setDataFlowAnimations] = useState<Set<string>>(new Set());
  
  // Memoize architecture lookup to prevent recreation
  const architecture = useMemo(() => systemArchitectures[title], [title]);

  const openExpanded = useCallback(() => {
    setIsExpanded(true);
  }, []);

  const closeExpanded = useCallback(() => {
    setIsExpanded(false);
  }, []);

  // Keyboard support for closing modal
  useEffect(() => {
    if (!isExpanded) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeExpanded();
      }
    };

    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isExpanded, closeExpanded]);

  // Simulate live data flow with logical request-response pattern
  useEffect(() => {
    if (!isExpanded || !architecture) return;

    let timeoutId: NodeJS.Timeout;
    
    // Build dependency graph for logical flow
    const buildFlowSequence = () => {
      const sequence: string[] = [];
      const visited = new Set<string>();
      
      // Start from nodes with no incoming connections (entry points)
      const entryNodes = architecture.nodes.filter(node => 
        !architecture.nodes.some(n => n.connections.includes(node.id))
      );
      
      const traverse = (nodeId: string) => {
        if (visited.has(nodeId)) return;
        visited.add(nodeId);
        sequence.push(nodeId);
        
        const node = architecture.nodes.find(n => n.id === nodeId);
        if (node) {
          node.connections.forEach(connId => traverse(connId));
        }
      };
      
      entryNodes.forEach(node => traverse(node.id));
      
      // Add any remaining nodes not in flow
      architecture.nodes.forEach(node => {
        if (!visited.has(node.id)) sequence.push(node.id);
      });
      
      return sequence;
    };

    const flowSequence = buildFlowSequence();
    let currentStep = 0;

    const runAnimation = () => {
      const currentNodeId = flowSequence[currentStep % flowSequence.length];
      const currentNode = architecture.nodes.find(n => n.id === currentNodeId);
      
      if (!currentNode) {
        currentStep++;
        timeoutId = setTimeout(runAnimation, 2500);
        return;
      }
      
      // Activate current node
      setActiveNodes(prev => new Set(prev).add(currentNode.id));
      
      // Animate outgoing connections
      currentNode.connections.forEach((connId: string) => {
        const key = `${currentNode.id}-${connId}`;
        setDataFlowAnimations(prev => new Set(prev).add(key));
        
        // Clean up animation
        setTimeout(() => {
          setDataFlowAnimations(prev => {
            const next = new Set(prev);
            next.delete(key);
            return next;
          });
        }, 2000);
      });

      // Deactivate node
      setTimeout(() => {
        setActiveNodes(prev => {
          const next = new Set(prev);
          next.delete(currentNode.id);
          return next;
        });
      }, 2200);

      currentStep++;
      timeoutId = setTimeout(runAnimation, 2500); // Smoother timing
    };

    // Start animation loop
    timeoutId = setTimeout(runAnimation, 500);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      setActiveNodes(new Set());
      setDataFlowAnimations(new Set());
    };
  }, [isExpanded, architecture]);

  return (
    <>
      <motion.div
        whileHover={{ y: -4 }}
        className={cn(
          "group relative flex flex-col justify-between border-3 border-neo-black bg-white p-6 shadow-neo transition-all hover:shadow-neo-lg cursor-pointer will-change-transform",
          className
        )}
        onClick={openExpanded}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openExpanded();
          }
        }}
        role="button"
        tabIndex={0}
        aria-label={`View ${title} project details and architecture`}
      >
        {/* Glitch effect decorative element */}
        <div className="absolute -right-2 -top-2 h-full w-full border-3 border-neo-blue opacity-0 transition-opacity group-hover:opacity-100" style={{ zIndex: -1 }} />
        
        <div>
          <div className="mb-4 flex items-start justify-between">
            <h3 className="font-sans text-2xl font-bold leading-tight uppercase">{title}</h3>
            <div className="flex gap-2">
              {link && (
                <Link 
                  href={link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="z-10 flex h-11 w-11 items-center justify-center rounded-none border-2 border-neo-black bg-neo-lime transition-transform hover:bg-neo-pink hover:text-white focus:outline-none focus:ring-2 focus:ring-neo-pink focus:ring-offset-2 group/link"
                  aria-label={`View ${title} project on GitHub (opens in new tab)`}
                  title="Opens in new tab"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink className="h-5 w-5 group-hover/link:scale-110 transition-transform" strokeWidth={3} aria-hidden="true" />
                </Link>
              )}
              <button
                className={cn(
                  "z-10 flex h-11 w-11 items-center justify-center rounded-none border-2 border-neo-black text-white transition-all focus:outline-none focus:ring-2 focus:ring-neo-blue focus:ring-offset-2",
                  architecture 
                    ? "bg-neo-pink hover:bg-neo-blue hover:scale-110 cursor-pointer" 
                    : "bg-gray-400 cursor-not-allowed opacity-50"
                )}
                aria-label={architecture ? "View system architecture diagram" : "Architecture diagram not available"}
                onClick={(e) => {
                  e.stopPropagation();
                  if (architecture) {
                    openExpanded();
                  }
                }}
                disabled={!architecture}
              >
                <Zap className="h-5 w-5" strokeWidth={3} aria-hidden="true" />
              </button>
            </div>
          </div>
          <div className="mb-6 font-mono text-sm leading-relaxed">
            {onDescriptionChange ? (
                <EditableText 
                    value={description} 
                    onSave={onDescriptionChange} 
                    multiline 
                    as="span"
                    className="block"
                />
            ) : (
                <p>{description}</p>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="border-2 border-neo-black bg-concrete px-2 py-1 text-xs font-bold shadow-[2px_2px_0px_0px_#000]"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Hint to click */}
        <div className="mt-4 pt-4 border-t-2 border-neo-black/10">
          <p className="text-xs font-mono font-bold text-neo-blue uppercase flex items-center gap-2">
            <Zap className="h-3 w-3" />
            Understand the System Architecture
          </p>
        </div>
      </motion.div>

      {/* Architecture Diagram Modal */}
      <AnimatePresence mode="wait">
        {isExpanded && architecture && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-neo-black/95 backdrop-blur-md"
            onClick={closeExpanded}
            role="dialog"
            aria-modal="true"
            aria-labelledby="architecture-title"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-7xl w-full max-h-[95vh] overflow-hidden border-4 border-neo-lime bg-neo-black shadow-[0_0_50px_rgba(190,242,100,0.5)]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="border-b-4 border-neo-lime bg-neo-black p-6 flex items-center justify-between">
                <div>
                  <h2 id="architecture-title" className="font-sans text-3xl font-black uppercase tracking-tighter text-neo-lime">{title}</h2>
                  <p className="font-mono text-sm font-bold mt-2 text-neo-lime/70">{architecture.title}</p>
                  <p className="font-mono text-xs mt-1 text-white/60">{architecture.description}</p>
                </div>
                <button
                  onClick={closeExpanded}
                  className="flex h-12 w-12 items-center justify-center border-3 border-neo-lime bg-neo-lime text-neo-black hover:bg-neo-pink hover:border-neo-pink hover:text-white transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-neo-lime focus:ring-offset-2 focus:ring-offset-neo-black"
                  aria-label="Close architecture diagram (press Escape)"
                  autoFocus
                >
                  <X className="h-6 w-6" strokeWidth={3} />
                </button>
              </div>

              {/* Flow Diagram */}
              <div className="p-8 overflow-auto max-h-[calc(95vh-200px)] bg-gradient-to-br from-neo-black via-neo-dark-grey to-neo-black">
                <div className="relative min-h-[700px] w-full">
                  {/* Connection Lines */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
                    {architecture.nodes.map((node: FlowNode) =>
                      node.connections.map((targetId: string) => {
                        const target = architecture.nodes.find((n: FlowNode) => n.id === targetId);
                        if (!target) return null;
                        
                        const startX = node.position.x;
                        const startY = node.position.y + 8;
                        const endX = target.position.x;
                        const endY = target.position.y + 8;
                        
                        const key = `${node.id}-${targetId}`;
                        const isAnimating = dataFlowAnimations.has(key);

                        return (
                          <g key={key}>
                            {/* Main line */}
                            <line
                              x1={`${startX}%`}
                              y1={`${startY}%`}
                              x2={`${endX}%`}
                              y2={`${endY}%`}
                              stroke="#BEF264"
                              strokeWidth="3"
                              strokeDasharray="8,4"
                              className="opacity-30"
                            />
                            {/* Animated data flow */}
                            {isAnimating && (
                              <>
                                {/* Data packet moving along line - use cx/cy instead of offsetDistance */}
                                <motion.circle
                                  r="6"
                                  fill="#BEF264"
                                  initial={{
                                    cx: `${startX}%`,
                                    cy: `${startY}%`,
                                    opacity: 1
                                  }}
                                  animate={{ 
                                    cx: `${endX}%`,
                                    cy: `${endY}%`,
                                    opacity: [1, 1, 0]
                                  }}
                                  transition={{ duration: 2, ease: "linear" }}
                                />
                                {/* Glowing trail */}
                                <motion.line
                                  x1={`${startX}%`}
                                  y1={`${startY}%`}
                                  x2={`${endX}%`}
                                  y2={`${endY}%`}
                                  stroke="#BEF264"
                                  strokeWidth="4"
                                  initial={{ pathLength: 0, opacity: 1 }}
                                  animate={{ pathLength: 1, opacity: [1, 1, 0.3] }}
                                  transition={{ duration: 2, ease: "easeInOut" }}
                                />
                              </>
                            )}
                            {/* Arrow */}
                            <motion.circle
                              cx={`${endX}%`}
                              cy={`${endY}%`}
                              r="4"
                              fill="#BEF264"
                              className={isAnimating ? "opacity-100" : "opacity-30"}
                            />
                          </g>
                        );
                      })
                    )}
                  </svg>

                  {/* Nodes */}
                  {architecture.nodes.map((node: FlowNode, idx: number) => {
                    const Icon = node.icon;
                    const isActive = activeNodes.has(node.id);
                    
                    return (
                      <motion.div
                        key={node.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.1 }}
                        className="absolute"
                        style={{
                          left: `${node.position.x}%`,
                          top: `${node.position.y}%`,
                          transform: "translate(-50%, -50%)",
                          zIndex: 10,
                        }}
                      >
                        <motion.div
                          animate={{
                            scale: isActive ? 1.05 : 1,
                            boxShadow: isActive
                              ? "0 0 30px rgba(190, 242, 100, 0.6)"
                              : "0 0 10px rgba(190, 242, 100, 0.2)",
                          }}
                          className={cn(
                            "border-4 border-neo-black p-3 min-w-[200px] max-w-[220px] relative",
                            node.color,
                            isActive ? "ring-4 ring-neo-lime" : ""
                          )}
                        >
                          {/* Step Number Badge */}
                          {node.step && (
                            <div className="absolute -top-3 -left-3 h-8 w-8 bg-neo-black border-3 border-neo-lime flex items-center justify-center z-10">
                              <span className="font-mono text-sm font-black text-neo-lime">{node.step}</span>
                            </div>
                          )}
                          
                          {/* Corner decorations */}
                          <div className="absolute -top-1 -right-1 w-2 h-2 bg-neo-lime border border-neo-black" />
                          <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-neo-lime border border-neo-black" />
                          <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-neo-lime border border-neo-black" />

                          <div className="flex items-center gap-3 mb-2">
                            <div className={cn(
                              "h-10 w-10 border-3 border-neo-black flex items-center justify-center shrink-0",
                              node.color === "bg-neo-lime" || node.color.includes("00ED64") || node.color.includes("FF9900")
                                ? "text-neo-black"
                                : "text-white"
                            )}>
                              <Icon className="h-5 w-5" strokeWidth={3} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-sans text-sm font-black uppercase text-neo-black leading-tight">
                                {node.label}
                              </h4>
                              <p className="font-mono text-xs text-neo-black/70">{node.sublabel}</p>
                            </div>
                          </div>

                          {/* Explanation */}
                          {node.explanation && (
                            <div className="mt-2 pt-2 border-t-2 border-neo-black/20">
                              <p className="font-mono text-[10px] leading-snug text-neo-black font-medium">
                                {node.explanation}
                              </p>
                            </div>
                          )}

                          {node.dataFlow && (
                            <div className="mt-2 pt-2 border-t-2 border-neo-black/20">
                              <div className="flex items-center gap-2">
                                <Activity className="h-3 w-3 text-neo-black/60" />
                                <p className="font-mono text-xs font-bold text-neo-black/80">
                                  {node.dataFlow}
                                </p>
                              </div>
                            </div>
                          )}

                          {/* Live indicator - contained inside box */}
                          {isActive && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute top-2 right-2 h-3 w-3 bg-neo-lime border-2 border-neo-black rounded-full"
                            >
                              <motion.div
                                animate={{ 
                                  opacity: [1, 0.3, 1] 
                                }}
                                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                                className="absolute inset-0 bg-neo-lime rounded-full"
                              />
                            </motion.div>
                          )}
                        </motion.div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Legend */}
                <div className="mt-8 flex flex-col items-center justify-center gap-4">
                  <div className="flex items-center gap-6 font-mono text-xs text-white/60">
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 bg-neo-black border-2 border-neo-lime flex items-center justify-center">
                        <span className="text-neo-lime font-bold text-xs">1</span>
                      </div>
                      <span>STEP NUMBER</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 bg-neo-lime border border-neo-black rounded-full" />
                      <span>ACTIVE NODE</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ArrowRight className="h-3 w-3" strokeWidth={3} />
                      <span>DATA FLOW</span>
                    </div>
                  </div>
                  <p className="text-white/40 font-mono text-xs max-w-2xl text-center">
                    Watch the flow animate step-by-step. Each numbered node shows what happens in sequence when a user interacts with the system.
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="border-t-4 border-neo-lime bg-neo-black p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 bg-neo-lime rounded-full animate-pulse" />
                  <p className="font-mono text-xs font-bold text-neo-lime">
                    SYSTEM_STATUS: <span className="text-white">LIVE_TRAFFIC_SIMULATION</span>
                  </p>
                </div>
                <Link href="#contact">
                  <button
                    className="border-3 border-neo-lime bg-neo-lime text-neo-black px-4 py-2 font-bold text-sm uppercase hover:bg-neo-pink hover:border-neo-pink hover:text-white transition-colors"
                    onClick={closeExpanded}
                  >
                    Discuss This Stack
                  </button>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
