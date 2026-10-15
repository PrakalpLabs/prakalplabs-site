import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { connectDB } from "../config/db";
import { Project } from "../models/Project";
import { Service } from "../models/Service";
import { Admin } from "../models/Admin";

const initialServices = [
  {
    slug: "website-development",
    title: "Website Development",
    shortDescription: "High-performance, responsive websites engineered with modern frameworks, robust security, and SEO excellence.",
    description: "We build modern, fast, and accessible websites designed to convert visitors and strengthen market presence. Every web property is built using strict clean code practices, semantic structure, responsive architecture, and optimized Core Web Vitals.",
    icon: "Globe",
    capabilities: [
      "Custom responsive web engineering",
      "Headless CMS integration & architecture",
      "Technical SEO & performance optimization",
      "Interactive animations & dynamic micro-interactions",
    ],
    businessProblems: [
      "Slow loading speeds causing high bounce rates",
      "Outdated web stacks that are brittle and difficult to update",
      "Poor mobile performance and lack of responsive behavior",
    ],
    deliverables: [
      "Production-ready modern web application",
      "Component-based modular architecture",
      "Automated CI/CD deployment pipelines",
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS", "HTML5", "Vite"],
    process: [
      { step: 1, title: "Information Architecture", description: "Map user journeys, site hierarchy, and key conversion paths." },
      { step: 2, title: "Modern Prototyping", description: "Design responsive layouts with component systems and design tokens." },
      { step: 3, title: "Engineering & Optimization", description: "Implement with React, optimizing asset loading and Core Web Vitals." },
      { step: 4, title: "Deployment & Analytics", description: "Deploy to production with automated edge CDN caching and analytics." },
    ],
    order: 1,
    featured: true,
  },
  {
    slug: "custom-software-development",
    title: "Custom Software Development",
    shortDescription: "Tailored software systems built to solve specific operational challenges and scale with organizational growth.",
    description: "Off-the-shelf software rarely fits intricate operational workflows. We architect and implement bespoke software solutions, robust APIs, and backend microservices engineered around your organization's exact business logic and security standards.",
    icon: "Cpu",
    capabilities: [
      "Modular microservice & monolithic architectures",
      "RESTful and GraphQL API design and versioning",
      "Relational & NoSQL database schema design",
    ],
    businessProblems: [
      "Generic SaaS products that lack critical operational workflows",
      "Disconnected internal tools creating error-prone manual data entry",
    ],
    deliverables: [
      "Fully documented, scalable backend codebase",
      "Interactive API documentation",
      "Database migration scripts and backup policies",
    ],
    technologies: ["Node.js", "Express", "TypeScript", "MongoDB", "PostgreSQL", "Docker", "Redis"],
    process: [
      { step: 1, title: "Domain Discovery", description: "Analyze existing workflows, database schemas, and integration points." },
      { step: 2, title: "System Architecture", description: "Model data entities, write API contracts, and establish security models." },
      { step: 3, title: "Iterative Sprints", description: "Build vertical slices of functionality with continuous code reviews." },
      { step: 4, title: "Quality Assurance", description: "Execute automated integration testing, stress tests, and security audits." },
    ],
    order: 2,
    featured: true,
  },
  {
    slug: "web-application-development",
    title: "Web Application Development",
    shortDescription: "Rich, interactive web apps and single-page applications engineered for speed, reliability, and complex data.",
    description: "From internal operations portals to customer-facing SaaS dashboards, we engineer rich web applications that handle real-time state, complex user permissions, and extensive data manipulation with zero latency lag.",
    icon: "Layout",
    capabilities: [
      "Complex dashboard & real-time telemetry interfaces",
      "Role-Based Access Control (RBAC) & OAuth/SSO integration",
      "Offline-first caching and optimistic UI updates",
    ],
    businessProblems: [
      "Clunky user interfaces that hinder operational productivity",
      "Poor state management causing inconsistent data displays",
    ],
    deliverables: [
      "Secure, responsive web application portal",
      "Authenticated session handling with HTTP-only tokens",
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS", "Zustand", "Vite"],
    process: [
      { step: 1, title: "User Flow Mapping", description: "Define user roles, authorization matrices, and view hierarchies." },
      { step: 2, title: "Interface State Design", description: "Structure client-side state, form validation, and error boundaries." },
      { step: 3, title: "Feature Development", description: "Develop features in component-driven sprints with unit test verification." },
      { step: 4, title: "Hardening & Launch", description: "Audit security headers, CSP rules, performance bottlenecks, and ship." },
    ],
    order: 3,
    featured: true,
  },
  {
    slug: "ui-ux-design",
    title: "UI/UX Design",
    shortDescription: "Human-centered digital product design balancing aesthetic clarity, engineering practicality, and user delight.",
    description: "Great digital products require harmonious collaboration between user psychology, aesthetic polish, and technical viability. We design interfaces that are purposeful, accessible, and structured for frictionless front-end implementation.",
    icon: "Palette",
    capabilities: [
      "User research, persona definition, and user journey mapping",
      "High-fidelity interactive prototyping in Figma",
      "Comprehensive design systems and component specifications",
    ],
    businessProblems: [
      "High drop-off rates due to confusing user flows",
      "Inconsistent UI patterns across web and desktop platforms",
    ],
    deliverables: [
      "Production-ready design tokens",
      "Interactive clickable prototype",
      "Design system component library",
    ],
    technologies: ["Figma", "Design Tokens", "Design Systems", "WCAG 2.1"],
    process: [
      { step: 1, title: "User & Problem Research", description: "Conduct user interviews and benchmark competitive workflows." },
      { step: 2, title: "Wireframing & Information Design", description: "Establish layouts, task flows, and interface hierarchies." },
      { step: 3, title: "Visual Design & Systems", description: "Craft dark/light aesthetics, high-contrast states, and typography." },
      { step: 4, title: "Developer Alignment", description: "Deliver pixel-precise specs and tokens ready for React/CSS." },
    ],
    order: 4,
    featured: true,
  },
  {
    slug: "digital-product-development",
    title: "Digital Product Development",
    shortDescription: "End-to-end product development taking initial concepts from MVP validation to production-grade market launch.",
    description: "We help founders, product leaders, and businesses build full-lifecycle digital products. We translate strategic hypotheses into reliable, testable software that captures market feedback and establishes a sustainable technological foundation.",
    icon: "Layers",
    capabilities: [
      "Rapid MVP scoping and milestone planning",
      "Full-stack product architecture and implementation",
      "Product analytics and telemetry tracking",
    ],
    businessProblems: [
      "Protracted development cycles preventing early market validation",
      "Technical debt accrued by haphazard initial coding",
    ],
    deliverables: [
      "Market-ready Minimum Viable Product (MVP)",
      "Automated deployment infrastructure on cloud providers",
    ],
    technologies: ["React", "Express", "Node.js", "TypeScript", "MongoDB", "AWS"],
    process: [
      { step: 1, title: "Scope Rationalization", description: "Define the core value proposition and prune non-essential features." },
      { step: 2, title: "Foundation Architecture", description: "Establish repository, CI/CD, database, and auth primitives." },
      { step: 3, title: "Rapid Build Sprints", description: "Ship iterative increments with continuous demo cycles." },
      { step: 4, title: "Public Launch & Iteration", description: "Deploy product, observe production metrics, and iterate." },
    ],
    order: 5,
    featured: true,
  },
  {
    slug: "business-automation",
    title: "Business Automation",
    shortDescription: "Automate repetitive data entry, disparate system syncs, and manual operational workflows with custom software.",
    description: "Eliminate operational friction and human error. We build event-driven automation pipelines, webhook handlers, and background queue workers that connect your internal tools, CRMs, databases, and third-party services seamlessly.",
    icon: "Zap",
    capabilities: [
      "Custom webhook processing and queue-based job scheduling",
      "Third-party API integration (ERP, CRM, Billing, Logistics)",
      "Data synchronization and ETL validation pipelines",
    ],
    businessProblems: [
      "Manual copy-pasting of data between incompatible systems",
      "Delayed notification of critical business and customer events",
    ],
    deliverables: [
      "Fault-tolerant queue processing service with retry logic",
      "Automated workflow dashboard with status telemetry",
    ],
    technologies: ["BullMQ", "Redis", "Node.js", "TypeScript", "REST APIs", "Docker"],
    process: [
      { step: 1, title: "Process Audit", description: "Map human touchpoints and calculate automation ROI." },
      { step: 2, title: "Pipeline Architecture", description: "Design idempotent job queues, failure handlers, and retry policies." },
      { step: 3, title: "Integration Testing", description: "Simulate edge cases, rate limits, and network dropouts." },
      { step: 4, title: "Monitoring & Rollout", description: "Deploy with live health checks and automated anomaly alerts." },
    ],
    order: 6,
    featured: true,
  },
  {
    slug: "technology-consulting",
    title: "Technology Consulting",
    shortDescription: "Pragmatic technical advisory, architecture audits, and engineering roadmap planning for growing businesses.",
    description: "Make confident technical decisions. We review existing codebases, assess infrastructure costs, advise on stack selection, and evaluate technical feasibility before significant capital is committed.",
    icon: "Briefcase",
    capabilities: [
      "Codebase quality and architectural health audits",
      "Tech stack evaluation and cost optimization",
      "Cloud infrastructure and DevOps strategy",
    ],
    businessProblems: [
      "Uncertainty about which technology stack to invest in",
      "Ballooning cloud infrastructure bills without clear justification",
    ],
    deliverables: [
      "Detailed architectural audit and risk matrix report",
      "Concrete technical roadmap with phased milestones",
    ],
    technologies: ["AWS", "Docker", "Node.js", "MongoDB", "Architecture Design"],
    process: [
      { step: 1, title: "Diagnostic Assessment", description: "Examine repositories, cloud configurations, and pain points." },
      { step: 2, title: "Deep-Dive Technical Analysis", description: "Profile database queries, server bottlenecks, and dependency trees." },
      { step: 3, title: "Report & Recommendations", description: "Produce actionable documentation ranked by business priority." },
      { step: 4, title: "Advisory & Implementation", description: "Guide internal engineering teams during execution." },
    ],
    order: 7,
    featured: false,
  },
  {
    slug: "innovative-software-solutions",
    title: "Innovative Software Solutions",
    shortDescription: "Applied intelligence, algorithmic systems, and forward-looking software solving non-trivial computational problems.",
    description: "When standard frameworks and templates cannot solve your challenge, we engineer bespoke algorithmic software, intelligent automation pipelines, and custom computational workflows designed around domain-specific constraints.",
    icon: "Sparkles",
    capabilities: [
      "Domain-specific search and recommendation algorithms",
      "Event-driven reactive data processing",
      "Custom computational engines and mathematical models",
    ],
    businessProblems: [
      "Complex business logic exceeding capabilities of existing SaaS",
      "High-volume data streams overwhelming traditional architectures",
    ],
    deliverables: [
      "Custom algorithmic processing module with verified benchmarks",
      "Clean TypeScript API services with test suites",
    ],
    technologies: ["TypeScript", "Python", "Node.js", "Redis", "MongoDB"],
    process: [
      { step: 1, title: "Problem Formalization", description: "Define mathematical and logical constraints of the problem." },
      { step: 2, title: "Proof of Concept", description: "Build and benchmark algorithmic prototype against test datasets." },
      { step: 3, title: "Production Hardening", description: "Port prototype to high-throughput, low-latency microservice." },
      { step: 4, title: "Integration & Telemetry", description: "Deploy with automated regression checks and live accuracy tracking." },
    ],
    order: 8,
    featured: false,
  },
];

const initialProjects = [
  {
    title: "NexusCore — Cloud Orchestration & Resource Engine",
    slug: "nexuscore-orchestration-engine",
    description: "An internal cloud resource orchestration engine designed for automated multi-region deployment synchronization.",
    overview: "NexusCore is a demonstration platform engineered to showcase distributed microservice orchestration, automated container lifecycle events, and telemetry monitoring across cloud regions.",
    problemStatement: "Organizations managing multiple hybrid cloud environments often struggle with fractured deployment pipelines, configuration drift, and delayed alert propagation when containers fail silently.",
    solution: "We designed a lightweight event-driven control plane using Node.js, Redis Pub/Sub, and TypeScript that listens to container events, verifies health contracts, and executes automated rollback routines within 250 milliseconds.",
    category: "Custom Software",
    technologies: ["Node.js", "TypeScript", "Redis", "Docker", "Express", "WebSocket", "Tailwind CSS"],
    features: [
      "Real-time cluster telemetry stream via bidirectional WebSockets",
      "Automated configuration drift detection with audit diff logs",
      "Sub-second failover orchestration across multi-region pools",
    ],
    image: "/projects/nexuscore.svg",
    demoUrl: "https://demo.prakalplabs.internal/nexuscore",
    repositoryUrl: "https://github.com/prakalplabs/nexuscore-engine-demo",
    status: "published",
    featured: true,
  },
  {
    title: "ApexLogix — Intelligent Supply Chain Stream",
    slug: "apexlogix-supply-chain-stream",
    description: "A high-concurrency event stream processor that automates inventory reconciliation and order route dispatch.",
    overview: "ApexLogix serves as an engineering showcase for high-throughput transactional event processing, handling thousands of simulated inventory mutations per minute without database lock contention.",
    problemStatement: "E-commerce and logistics networks encounter significant phantom inventory discrepancies when multiple fulfillment centers decrement stock without centralized atomic locks.",
    solution: "Built on an optimistic locking architecture paired with in-memory Redis state caches and idempotent queue workers, guaranteeing zero double-allocation even during traffic spikes.",
    category: "Automation",
    technologies: ["TypeScript", "React", "Express", "PostgreSQL", "BullMQ", "Redis", "Docker"],
    features: [
      "Idempotent event ingestion pipeline supporting 8,000+ operations/sec",
      "Automated inventory discrepancy alerts dispatched via webhooks",
    ],
    image: "/projects/apexlogix.svg",
    demoUrl: "https://demo.prakalplabs.internal/apexlogix",
    repositoryUrl: "https://github.com/prakalplabs/apexlogix-stream-demo",
    status: "published",
    featured: true,
  },
  {
    title: "VelocePay — High-Throughput Payment Routing Core",
    slug: "velocepay-payment-router",
    description: "A resilient multi-provider payment orchestration gateway that dynamically routes transactions to maximize authorization rates.",
    overview: "A demonstration fintech gateway showcasing fault-tolerant external API resilience, automatic payment gateway fallback, and cryptographic idempotency validation.",
    problemStatement: "Payment processor outages and regional provider latency directly damage checkout conversion. Single-gateway architectures create a catastrophic single point of failure.",
    solution: "We engineered a smart payment router with circuit-breaker protection that scores provider health in real-time, instantly routing transactions to backup processors when anomalies occur.",
    category: "Web Application Development",
    technologies: ["React", "TypeScript", "Node.js", "MongoDB", "Tailwind CSS", "Zod"],
    features: [
      "Smart circuit breaker automatically diverting traffic from degraded gateways",
      "Cryptographic request hashing preventing duplicate debit charges",
    ],
    image: "/projects/velocepay.svg",
    demoUrl: "https://demo.prakalplabs.internal/velocepay",
    repositoryUrl: "https://github.com/prakalplabs/velocepay-routing-demo",
    status: "published",
    featured: true,
  },
];

async function seed() {
  console.log("[Seed] Connecting to MongoDB...");
  const conn = await connectDB();
  if (!conn) {
    console.error("[Seed Error] Cannot seed: MongoDB connection could not be established.");
    process.exit(1);
  }

  console.log("[Seed] Seeding Services (Idempotent)...");
  for (const srv of initialServices) {
    await Service.findOneAndUpdate(
      { slug: srv.slug },
      { $set: srv },
      { upsert: true, new: true }
    );
  }
  console.log(`[Seed] Seeded ${initialServices.length} services.`);

  console.log("[Seed] Seeding Projects (Idempotent)...");
  for (const proj of initialProjects) {
    await Project.findOneAndUpdate(
      { slug: proj.slug },
      { $set: proj },
      { upsert: true, new: true }
    );
  }
  console.log(`[Seed] Seeded ${initialProjects.length} projects.`);

  console.log("[Seed] Verifying Initial Administrator...");
  const adminEmail = "admin@prakalplabs.internal";
  const existingAdmin = await Admin.findOne({ email: adminEmail });
  if (!existingAdmin) {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash("Admin@Prakalp2026!", salt);
    await Admin.create({
      email: adminEmail,
      name: "Lead System Administrator",
      passwordHash,
      role: "superadmin",
    });
    console.log(`[Seed] Created initial administrator: ${adminEmail} (password: Admin@Prakalp2026!)`);
  } else {
    console.log(`[Seed] Administrator account ${adminEmail} already exists.`);
  }

  console.log("[Seed] Completed successfully.");
  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error("[Seed Failure]:", err);
  process.exit(1);
});
