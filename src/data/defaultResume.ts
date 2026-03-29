import type { ResumeData } from "../types/resume";
import { newId } from "../utils/id";

const uid = () => newId();

export const defaultResume: ResumeData = {
  name: "Koushik Chattaraj",
  tagline: "Frontend Developer | React.js | TypeScript | Micro Frontends",
  contact: {
    location: "Bengaluru, India",
    phone: "+91 8250115917",
    email: "chattarajkoushik@gmail.com",
    linkedinUrl: "https://www.linkedin.com/in/koushik-chattaraj/",
    linkedinLabel: "linkedin.com/in/koushik-chattaraj",
  },
  summary: `Results-driven **Frontend Developer** with strong experience architecting **scalable, high-performance React.js applications** for enterprise clients including **Adobe and PepsiCo**. Deep expertise in **React, TypeScript, Redux, Micro Frontend architecture**, and performance optimization. Proficient in **GenAI-assisted engineering** using Model Context Protocol (MCP), Cursor AI, and Claude. Proven track record of migrating legacy systems to modern React, building reusable component libraries, and shipping accessible UIs in Agile environments.`,
  skills: [
    {
      label: "Frontend",
      value:
        "React.js, JavaScript (ES6+), TypeScript, HTML5, CSS3/SASS, Next.js",
    },
    {
      label: "State Management",
      value: "Redux, Redux Toolkit, Redux Saga, Context API",
    },
    {
      label: "UI & Styling",
      value:
        "Responsive Design, Material UI, Styled Components, Tailwind CSS, WCAG Accessibility",
    },
    {
      label: "Performance",
      value:
        "Code Splitting, Lazy Loading, React.memo, useMemo, useCallback, Virtualization",
    },
    {
      label: "Testing",
      value: "Jest, React Testing Library, Unit & Integration Testing, TDD",
    },
    {
      label: "DevOps",
      value:
        "Git, GitHub Actions, CI/CD, AWS (S3, CloudFront), Webpack, Vite, Cursor AI, Claude",
    },
    {
      label: "Architecture",
      value:
        "Micro Frontend (Module Federation), Component-Driven Design, REST API Integration",
    },
  ],
  experience: [
    {
      id: uid(),
      company: "PwC India",
      dates: "Jan 2023 — Present",
      role: "Associate, Frontend Developer",
      bullets: [
        "Architected and shipped multiple **production React.js applications** using Hooks, TypeScript, and component-driven patterns for enterprise clients.",
        "Led a full-scale **AngularJS-to-React migration** — re-engineered legacy views into modular, reusable components, significantly reducing tech debt.",
        "Implemented **Micro Frontend architecture** using Webpack Module Federation, enabling independent teams to deploy features autonomously.",
        "Delivered measurable **page load improvements** through lazy loading, dynamic imports, code splitting, and strategic use of React memoization hooks.",
        "Engineered complex async data flows using **Redux Saga** with REST APIs, incorporating robust error handling, caching, and retry logic.",
        "Built **CI/CD pipelines** using GitHub Actions with AWS S3/CloudFront and automated Jest testing gates for reliable deployments.",
      ],
    },
    {
      id: uid(),
      company: "Ubique Systems Pvt. Ltd.",
      dates: "Dec 2021 — Jan 2023",
      role: "Junior Software Developer",
      bullets: [
        "Developed a library of **reusable, responsive UI components** in React.js with Redux state management, forming the company's internal design system.",
        "Integrated frontend with **Django REST APIs**, handling auth tokens, pagination, and async data fetching with Axios interceptors.",
        "Applied **performance best practices** including debouncing, throttling, and virtualized rendering to improve speed across user-facing pages.",
      ],
    },
  ],
  projects: [
    {
      id: uid(),
      title: "Hendrix (Adobe) — Enterprise Customer Support Tool",
      description:
        "A unified support platform providing agents with a single-pane view of customer data, interaction history, and real-time insights for faster ticket resolution.",
      bullets: [
        "Built a **scalable React component library** powering end-to-end support workflows including ticket management, escalation paths, and agent dashboards.",
        "Designed **real-time unified dashboards** aggregating data from multiple microservices via WebSocket and REST APIs for contextual agent visibility.",
        "Automated developer tasks using **Model Context Protocol (MCP)** in Cursor with Claude — generating boilerplate, API scaffolding, and test stubs.",
      ],
    },
    {
      id: uid(),
      title: "HRM (PepsiCo) — Human Resource Management Tool",
      description:
        "A full-featured HR platform centralizing employee lifecycle processes — onboarding, leave management, payroll views, and performance appraisals.",
      bullets: [
        "Built **mobile-first responsive interfaces** using React and Redux for onboarding, leave requests, payroll summaries, and appraisal workflows.",
        "Implemented **JWT-based authentication** with role-based access control (RBAC) across admin, manager, and employee tiers.",
      ],
    },
    {
      id: uid(),
      title: "Revv SEO Analytics — Search Engine Optimization Analytics Tool",
      description:
        "A data-driven analytics platform empowering marketing teams with keyword tracking, backlink analysis, and competitor benchmarking insights.",
      bullets: [
        "Developed **interactive dashboards** with dynamic D3.js charts, advanced filtering, and exportable PDF/CSV reports for SEO decision-making.",
        "Optimized data-heavy views using **React virtualization and paginated API calls**, ensuring smooth rendering on large datasets.",
      ],
    },
  ],
  education: [
    { left: "Bankura Unnayani Institute of Engineering", right: "2016 – 2020" },
    {
      left: "Bachelor of Technology in Computer Science and Engineering",
      right: "CGPA: 7.32/10",
    },
  ],
  certifications: [
    "**Career Essentials in Generative AI: Microsoft & LinkedIn (2024)**",
    "**Generative AI Career Essentials in Cybersecurity — Microsoft & LinkedIn**",
  ],
};
