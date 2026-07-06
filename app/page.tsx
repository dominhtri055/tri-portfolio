"use client";

import { useMemo, useState } from "react";

type Project = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  status: "Completed" | "In Progress" | "Planned";
  skills: string[];
  features: string[];
  github?: string;
  demo?: string;
};

const projects: Project[] = [
  {
    id: "license-plate-api",
    title: "License Plate Assignment API",
    subtitle: "Backend REST API",
    description:
      "A backend API for generating, assigning, verifying, and revoking Ontario-style license plates based on valid VIN numbers.",
    status: "Completed",
    skills: [
      "Node.js",
      "Express.js",
      "TypeScript",
      "MongoDB",
      "Mongoose",
      "REST API",
      "Authentication",
      "Validation",
      "Postman",
      "Git",
    ],
    features: [
      "VIN validation",
      "License plate format validation",
      "Plate assignment and revocation",
      "API key middleware",
      "MongoDB data persistence",
      "Error handling",
    ],
    github: "https://github.com/dominhtri055/COMP9784-87486-Final-Project",
  },
  {
    id: "shoppilot-mobile",
    title: "ShopPilot Mobile App",
    subtitle: "React Native Mobile App",
    description:
      "A mobile app built with React Native and Expo Router, including session checking, login redirect flow, and dashboard navigation.",
    status: "In Progress",
    skills: [
      "React Native",
      "Expo",
      "Expo Router",
      "TypeScript",
      "AsyncStorage",
      "Mobile UI",
      "Git",
    ],
    features: [
      "Session checking",
      "Login and dashboard redirect",
      "Reusable screen structure",
      "AsyncStorage session persistence",
      "Mobile-first UI",
    ],
    github: "https://github.com/dominhtri055/shoppilot-mobile",
  },
  {
    id: "restaurant-event-app",
    title: "Restaurant Event Management App",
    subtitle: "Spring Boot Web App",
    description:
      "A web application for managing restaurant events with CRUD operations, validation, search filters, and archive logic.",
    status: "Completed",
    skills: [
      "Java",
      "Spring Boot",
      "MySQL",
      "Thymeleaf",
      "CRUD",
      "Validation",
      "MVC",
      "Git",
    ],
    features: [
      "Create, update, view, and delete events",
      "Search by event name and date range",
      "Soft-delete archive logic",
      "Server-side validation",
      "MySQL database integration",
    ],
    github: "https://github.com/dominhtri055/restaurant-event-app",
  },
  {
    id: "tax-calculator",
    title: "Tax Calculator App",
    subtitle: "Frontend JavaScript App",
    description:
      "A tax calculator that calculates federal and provincial taxes based on user income using JavaScript and DOM manipulation.",
    status: "Completed",
    skills: [
      "HTML",
      "CSS",
      "JavaScript",
      "DOM Manipulation",
      "Forms",
      "Validation",
      "Fetch API",
      "Git",
    ],
    features: [
      "Income input form",
      "Federal tax calculation",
      "Provincial tax calculation",
      "Dynamic result display",
      "Basic form validation",
    ],
    github: "https://github.com/dominhtri055/tax-calculator",
  },
  {
    id: "wordpress-business-site",
    title: "Local Business Website Demo",
    subtitle: "WordPress / SEO Project",
    description:
      "A responsive local business website demo designed for WordPress and SEO-focused web developer job applications.",
    status: "Planned",
    skills: [
      "WordPress",
      "SEO",
      "HTML",
      "CSS",
      "Responsive Design",
      "Figma",
      "Content Structure",
    ],
    features: [
      "Home page",
      "Services page",
      "Contact form",
      "Responsive layout",
      "SEO title and meta description",
      "Business-focused landing page",
    ],
  },
  {
    id: "schedule-book",
    title: "Schedule Book",
    subtitle: "Booking / Scheduling Web App",
    description:
      "A web application for managing appointments, schedules, and booking records through a clean user interface.",
    status: "Completed",
    skills: [
      "HTML",
      "CSS",
      "JavaScript",
      "Responsive Design",
      "Forms",
      "Validation",
      "CRUD",
      "Web Deployment",
    ],
    features: [
      "Appointment scheduling",
      "Booking form",
      "Schedule management",
      "Responsive layout",
      "Form validation",
      "Live web deployment",
    ],
    demo: "https://schedulebooker-web.onrender.com/",
  },
];

const skillGroups = [
  {
    title: "Backend",
    skills: [
      "Node.js",
      "Express.js",
      "TypeScript",
      "MongoDB",
      "Mongoose",
      "REST API",
      "Authentication",
      "Java",
      "Spring Boot",
      "MySQL",
    ],
  },
  {
    title: "Frontend",
    skills: [
      "HTML",
      "CSS",
      "JavaScript",
      "DOM Manipulation",
      "Forms",
      "Fetch API",
      "Responsive Design",
      "Thymeleaf",
    ],
  },
  {
    title: "Mobile",
    skills: [
      "React Native",
      "Expo",
      "Expo Router",
      "AsyncStorage",
      "Mobile UI",
    ],
  },
  {
    title: "Tools / Workflow",
    skills: ["Git", "Postman", "Validation", "MVC", "CRUD", "SEO", "Figma"],
  },
];

const labelClass =
  "text-sm font-semibold uppercase tracking-[0.25em] text-fuchsia-300 drop-shadow-[0_0_10px_rgba(217,70,239,0.35)]";

const cardClass =
  "rounded-3xl border border-fuchsia-300/15 bg-slate-950/55 p-6 shadow-[0_0_35px_rgba(168,85,247,0.13)] backdrop-blur";

const primaryButtonClass =
  "rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 px-5 py-3 font-semibold text-white shadow-[0_0_20px_rgba(168,85,247,0.35)] transition hover:from-purple-500 hover:to-fuchsia-500 hover:shadow-[0_0_28px_rgba(217,70,239,0.45)]";

const outlineButtonClass =
  "rounded-xl border border-fuchsia-300/25 bg-slate-950/40 px-5 py-3 font-semibold text-slate-100 transition hover:border-fuchsia-300 hover:text-fuchsia-200 hover:shadow-[0_0_18px_rgba(168,85,247,0.25)]";

export default function HomePage() {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = useMemo(() => {
    if (!selectedSkill) return projects;

    return projects.filter((project) => project.skills.includes(selectedSkill));
  }, [selectedSkill]);

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#050816] bg-[radial-gradient(circle_at_top_left,rgba(126,34,206,0.58)_0%,transparent_34%),radial-gradient(circle_at_top_right,rgba(217,70,239,0.18)_0%,transparent_30%),linear-gradient(180deg,#070918_0%,#16072f_48%,#050816_100%)] text-slate-100">
      <Navbar />

      <section className="mx-auto flex max-w-6xl flex-col gap-10 px-5 py-20 md:flex-row md:items-center md:justify-between">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-fuchsia-300 drop-shadow-[0_0_10px_rgba(217,70,239,0.35)]">
            Software Developer Portfolio
          </p>

          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white drop-shadow-[0_0_18px_rgba(216,180,254,0.28)] md:text-6xl">
            Hi, I&apos;m Tri Do.
            <span className="block bg-gradient-to-r from-purple-200 via-fuchsia-200 to-sky-200 bg-clip-text text-transparent drop-shadow-[0_0_22px_rgba(168,85,247,0.4)]">
              I build web, backend, and mobile projects.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Recent Software Development graduate based in Moncton, NB, focused
            on full-stack development, backend APIs, mobile applications, and
            practical project-based learning.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#skills" className={primaryButtonClass}>
              View Skills
            </a>

            <a href="#projects" className={outlineButtonClass}>
              View Projects
            </a>

            <a
              href="/resume.pdf"
              download="Tri-Do-Resume.pdf"
              className={outlineButtonClass}
            >
              Download Resume
            </a>
          </div>
        </div>

        <div className="rounded-3xl border border-fuchsia-300/20 bg-slate-950/45 p-6 shadow-[0_0_35px_rgba(168,85,247,0.18)] backdrop-blur">
          <p className="text-sm text-slate-400">Portfolio concept</p>
          <h2 className="mt-2 text-2xl font-bold text-white drop-shadow-[0_0_12px_rgba(216,180,254,0.25)]">
            Skills in Action
          </h2>
          <p className="mt-4 max-w-sm text-slate-300">
            Every technical skill links directly to projects where I used it.
            Recruiters can see not only what I know, but what I have built.
          </p>
        </div>
      </section>

      <section
        id="about"
        className="border-y border-fuchsia-300/10 bg-slate-950/25 backdrop-blur"
      >
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-16 md:grid-cols-3">
          <div>
            <p className={labelClass}>About</p>
            <h2 className="mt-3 text-3xl font-bold text-white drop-shadow-[0_0_12px_rgba(216,180,254,0.2)]">
              About Me
            </h2>
          </div>

          <div className="md:col-span-2">
            <p className="text-lg leading-8 text-slate-300">
              I am a recent Software Development graduate with hands-on
              experience building backend APIs, full-stack web applications,
              mobile apps, and database-driven projects. During my backend
              internship at Beetech Solution LTD, I worked on server-side
              features, CRUD functionality, and application logic.
            </p>
          </div>
        </div>
      </section>

      <section id="skills" className="mx-auto max-w-6xl px-5 py-16">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className={labelClass}>Skills</p>
            <h2 className="mt-3 text-3xl font-bold text-white drop-shadow-[0_0_12px_rgba(216,180,254,0.2)]">
              Skills in Action
            </h2>
            <p className="mt-3 max-w-2xl text-slate-400">
              Click a skill to see which projects prove that skill.
            </p>
          </div>

          <div className="rounded-2xl border border-fuchsia-300/20 bg-slate-950/50 px-5 py-4 shadow-[0_0_25px_rgba(168,85,247,0.12)] backdrop-blur">
            <p className="text-sm text-slate-400">Selected skill</p>
            <p className="text-xl font-bold text-fuchsia-300 drop-shadow-[0_0_10px_rgba(217,70,239,0.35)]">
              {selectedSkill ?? "None"}
            </p>

            {selectedSkill && (
              <button
                type="button"
                onClick={() => setSelectedSkill(null)}
                className="mt-3 text-sm font-semibold text-slate-300 transition hover:text-fuchsia-200"
              >
                Show all projects
              </button>
            )}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {skillGroups.map((group) => (
            <div key={group.title} className={cardClass}>
              <h3 className="text-xl font-bold text-white drop-shadow-[0_0_10px_rgba(216,180,254,0.2)]">
                {group.title}
              </h3>

              <div className="mt-5 flex flex-wrap gap-3">
                {group.skills.map((skill) => (
                  <button
                    key={skill}
                    onClick={() => setSelectedSkill(skill)}
                    className={`rounded-full border px-3 py-2 text-sm font-medium transition ${
                      selectedSkill === skill
                        ? "border-fuchsia-300 bg-purple-600 text-white shadow-[0_0_18px_rgba(168,85,247,0.55)]"
                        : "border-fuchsia-300/15 bg-slate-950/65 text-slate-300 hover:border-fuchsia-300 hover:text-fuchsia-200 hover:shadow-[0_0_14px_rgba(168,85,247,0.25)]"
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div
          id="projects"
          className="mt-12 rounded-3xl border border-fuchsia-300/20 bg-slate-950/55 p-6 shadow-[0_0_38px_rgba(168,85,247,0.18)] backdrop-blur"
        >
          <h3 className="text-2xl font-bold text-white drop-shadow-[0_0_12px_rgba(216,180,254,0.22)]">
            {!selectedSkill ? (
              "All my projects"
            ) : (
              <>
                Projects using{" "}
                <span className="text-fuchsia-300 drop-shadow-[0_0_10px_rgba(217,70,239,0.35)]">
                  {selectedSkill}
                </span>
              </>
            )}
          </h3>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {filteredProjects.map((project) => (
              <ProjectMiniCard
                key={project.id}
                project={project}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="experience" className="mx-auto max-w-6xl px-5 py-16">
        <div className="mb-10">
          <p className={labelClass}>Experience</p>
          <h2 className="mt-3 text-3xl font-bold text-white drop-shadow-[0_0_12px_rgba(216,180,254,0.2)]">
            Work Experience
          </h2>
        </div>

        <div className={cardClass}>
          <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
            <div>
              <h3 className="text-2xl font-bold text-white">
                Backend Developer Intern
              </h3>
              <p className="mt-1 text-fuchsia-300">Beetech Solution LTD</p>
            </div>

            <p className="text-slate-400">Apr 2026 — Jun 2026</p>
          </div>

          <ul className="mt-6 list-inside list-disc space-y-3 text-slate-300">
            <li>Worked on backend features and server-side application logic.</li>
            <li>Built and supported CRUD functionality for web applications.</li>
            <li>Collaborated with supervisor and team members on assigned tasks.</li>
            <li>Practiced API, database, and backend development workflow.</li>
          </ul>
        </div>
      </section>

      <section
        id="contact"
        className="border-t border-fuchsia-300/10 bg-slate-950/25 backdrop-blur"
      >
        <div className="mx-auto max-w-6xl px-5 py-16">
          <div className="rounded-3xl border border-fuchsia-300/20 bg-slate-950/60 p-8 shadow-[0_0_38px_rgba(168,85,247,0.16)] backdrop-blur">
            <p className={labelClass}>Contact</p>

            <h2 className="mt-3 text-3xl font-bold text-white drop-shadow-[0_0_12px_rgba(216,180,254,0.2)]">
              Let&apos;s connect
            </h2>

            <p className="mt-4 max-w-2xl text-slate-300">
              I am open to junior web developer, backend developer, full-stack
              developer, WordPress developer, and software developer
              opportunities.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a href="mailto:dominhtri055@gmail.com" className={primaryButtonClass}>
                Email Me
              </a>

              <a
                href="https://github.com/dominhtri055"
                target="_blank"
                rel="noreferrer"
                className={outlineButtonClass}
              >
                GitHub
              </a>

              <a
                href="https://www.linkedin.com/in/trido2908/"
                target="_blank"
                rel="noreferrer"
                className={outlineButtonClass}
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>

      {selectedProject && (
        <ProjectDetailsModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      <footer className="px-5 py-8 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} Tri Do. Built with Next.js, TypeScript, and
        Tailwind CSS.
      </footer>
    </main>
  );
}

function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-fuchsia-300/15 bg-slate-950/75 shadow-[0_0_25px_rgba(88,28,135,0.35)] backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <a href="#" className="text-lg font-bold text-white">
          Tri
          <span className="text-fuchsia-300 drop-shadow-[0_0_10px_rgba(217,70,239,0.45)]">
            Do
          </span>
        </a>

        <div className="hidden gap-6 text-sm text-slate-300 md:flex">
          <a href="#about" className="transition hover:text-fuchsia-200">
            About
          </a>
          <a href="#skills" className="transition hover:text-fuchsia-200">
            Skills
          </a>
          <a href="#projects" className="transition hover:text-fuchsia-200">
            Projects
          </a>
          <a href="#experience" className="transition hover:text-fuchsia-200">
            Experience
          </a>
          <a href="#contact" className="transition hover:text-fuchsia-200">
            Contact
          </a>
        </div>
      </nav>
    </header>
  );
}

function ProjectMiniCard({
  project,
  onClick,
}: {
  project: Project;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full rounded-2xl border border-fuchsia-300/15 bg-slate-950/75 p-5 text-left shadow-[0_0_22px_rgba(15,23,42,0.8)] transition hover:border-fuchsia-300/70 hover:bg-slate-950 hover:shadow-[0_0_24px_rgba(168,85,247,0.28)]"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h4 className="font-bold text-white drop-shadow-[0_0_10px_rgba(216,180,254,0.2)]">
            {project.title}
          </h4>
          <p className="mt-1 text-sm text-slate-400">{project.subtitle}</p>
        </div>

        <StatusBadge status={project.status} />
      </div>

      <p className="mt-4 text-sm leading-6 text-slate-300">
        {project.description}
      </p>

      <p className="mt-4 text-sm font-semibold text-fuchsia-300 drop-shadow-[0_0_8px_rgba(217,70,239,0.35)]">
        Click to view details
      </p>
    </button>
  );
}

function ProjectDetailsModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 px-5 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-fuchsia-300/35 bg-slate-950 p-6 shadow-[0_0_45px_rgba(168,85,247,0.35)]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="text-2xl font-bold text-white">{project.title}</h3>
              <StatusBadge status={project.status} />
            </div>

            <p className="mt-2 text-fuchsia-300">{project.subtitle}</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-fuchsia-300/25 bg-slate-950/60 px-3 py-2 text-sm font-semibold text-slate-300 transition hover:border-fuchsia-300 hover:text-fuchsia-200"
          >
            Close
          </button>
        </div>

        <p className="mt-5 leading-7 text-slate-300">{project.description}</p>

        <div className="mt-6">
          <h4 className="font-semibold text-slate-100">Skills demonstrated</h4>

          <div className="mt-3 flex flex-wrap gap-2">
            {project.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-fuchsia-300/15 bg-slate-950/70 px-3 py-1.5 text-sm text-slate-300"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <h4 className="font-semibold text-slate-100">Key features</h4>

          <ul className="mt-3 grid gap-2 text-slate-300 md:grid-cols-2">
            {project.features.map((feature) => (
              <li key={feature} className="flex gap-2">
                <span className="text-fuchsia-300">•</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className={outlineButtonClass}
            >
              GitHub
            </a>
          )}

          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              className={primaryButtonClass}
            >
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: Project["status"] }) {
  const className =
    status === "Completed"
      ? "border-emerald-300/40 bg-emerald-400/10 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.15)]"
      : status === "In Progress"
        ? "border-yellow-300/40 bg-yellow-400/10 text-yellow-300 shadow-[0_0_12px_rgba(250,204,21,0.15)]"
        : "border-fuchsia-300/25 bg-fuchsia-400/10 text-fuchsia-200 shadow-[0_0_12px_rgba(217,70,239,0.15)]";

  return (
    <span
      className={`rounded-full border px-3 py-1 text-xs font-semibold ${className}`}
    >
      {status}
    </span>
  );
}