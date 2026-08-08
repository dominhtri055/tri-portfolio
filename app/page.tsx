"use client";

import ProfileCard from "@/components/ProfileCard/ProfileCard";
import SoftAurora from "@/components/SoftAurora/SoftAurora";
import TrueFocus from "@/components/TrueFocus/TrueFocus";
import GooeyNav from "@/components/GooeyNav/GooeyNav";
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
type StatusFilter = "All" | Project["status"];

const projects: Project[] = [
  {
    id: "portfolio-website",
    title: "Personal Portfolio Website",
    subtitle: "Next.js / React Developer Portfolio",
    description:
      "A responsive personal portfolio built to showcase my web, mobile, and backend projects with animated navigation, skill filtering, project details, and a modern visual design.",
    status: "Completed",
    skills: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Responsive Design",
      "Component Design",
      "UI Design",
      "Git",
    ],
    features: [
      "Animated navigation",
      "Interactive multi-skill project filtering",
      "Accordion skill groups",
      "Project detail popup modal",
      "Responsive layout",
      "Profile card integration",
      "Resume download and contact links",
    ],
    github: "https://github.com/dominhtri055/Profolio",
    demo: "https://tri-portfolio-pi.vercel.app",
  },
  {
    id: "shoppilot-mobile",
    title: "ShopPilot Mobile App",
    subtitle: "React Native Mobile App",
    description:
      "A mobile app built with React Native and Expo Router, including session checking, login redirect flow, dashboard navigation, and mobile-first screen structure.",
    status: "Completed",
    skills: [
      "React Native",
      "Expo",
      "Expo Router",
      "TypeScript",
      "AsyncStorage",
      "Mobile UI",
      "Authentication",
      "Git",
    ],
    features: [
      "Session checking",
      "Login and dashboard redirect",
      "Reusable screen structure",
      "AsyncStorage session persistence",
      "Mobile-first UI",
      "Expo Router navigation",
    ],
    github: "https://github.com/dominhtri055/shoppilot-mobile",
    demo: "https://shoppilot-mobile.vercel.app/login",
  },
  {
    id: "schedule-booker",
    title: "ScheduleBooker",
    subtitle: "Booking / Scheduling Web App",
    description:
      "A web application for managing appointments, bookings, services, and customer scheduling through a clean responsive interface.",
    status: "Completed",
    skills: [
      "Python",
      "Flask",
      "HTML",
      "CSS",
      "JavaScript",
      "Forms",
      "Validation",
      "CRUD",
      "REST API",
      "Web Deployment",
    ],
    features: [
      "Appointment scheduling",
      "Public booking flow",
      "Booking form validation",
      "Customer booking lookup",
      "Service management",
      "Responsive layout",
      "Live Render deployment",
    ],
    demo: "https://schedulebooker-web.onrender.com/",
  },
  {
    id: "hiretrack-android",
    title: "HireTrack Android App",
    subtitle: "Kotlin / Android Job Tracker",
    description:
      "An Android application concept for tracking job applications, statuses, and interview progress using a mobile-first interface.",
    status: "In Progress",
    skills: [
      "Kotlin",
      "Android",
      "Jetpack Compose",
      "Mobile UI",
      "State Management",
      "Git",
    ],
    features: [
      "Job application tracking",
      "Application status management",
      "Mobile-first UI layout",
      "Reusable Compose components",
      "Job search workflow organization",
    ],
  },
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
      "A responsive local business website demo planned for WordPress and SEO-focused web developer job applications.",
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
];

const skillGroups = [
  {
    title: "Frontend",
    skills: [
      "HTML",
      "CSS",
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Tailwind CSS",
      "DOM Manipulation",
      "Forms",
      "Fetch API",
      "Responsive Design",
      "Component Design",
      "UI Design",
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
      "Kotlin",
      "Android",
      "Jetpack Compose",
      "Mobile UI",
      "State Management",
    ],
  },
  {
    title: "Backend",
    skills: [
      "Node.js",
      "Express.js",
      "Python",
      "Flask",
      "Java",
      "Spring Boot",
      "MongoDB",
      "Mongoose",
      "MySQL",
      "REST API",
      "Authentication",
      "Validation",
      "CRUD",
      "MVC",
    ],
  },
  {
    title: "Tools / Workflow",
    skills: [
      "Git",
      "Postman",
      "Web Deployment",
      "SEO",
      "Figma",
      "Content Structure",
    ],
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

const navItems = [
  { label: "Home", href: "#" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
  { label: "Resume", href: "/resume.pdf" },
];

export default function HomePage() {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [openSkillGroup, setOpenSkillGroup] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");

  const toggleSkill = (skill: string) => {
    setSelectedSkills((currentSkills) =>
      currentSkills.includes(skill)
        ? currentSkills.filter((item) => item !== skill)
        : [...currentSkills, skill],
    );
  };

  const clearSelectedSkills = () => {
    setSelectedSkills([]);
  };

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSkills =
        selectedSkills.length === 0 ||
        selectedSkills.every((skill) => project.skills.includes(skill));

      const matchesStatus =
        statusFilter === "All" || project.status === statusFilter;

      return matchesSkills && matchesStatus;
    });
  }, [selectedSkills, statusFilter]);

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#050816] bg-[radial-gradient(circle_at_20%_10%,rgba(88,28,135,0.62)_0%,transparent_32%),radial-gradient(circle_at_80%_20%,rgba(126,34,206,0.28)_0%,transparent_30%),radial-gradient(circle_at_50%_55%,rgba(59,7,100,0.34)_0%,transparent_42%),linear-gradient(180deg,#050816_0%,#120721_35%,#1e0b3d_62%,#050816_100%)] text-slate-100">
      <header className="fixed left-1/2 top-5 z-[99] flex w-[min(94%,980px)] -translate-x-1/2 items-center justify-between gap-4 rounded-2xl border border-fuchsia-300/20 bg-slate-950/80 px-3 py-2 shadow-[0_0_35px_rgba(168,85,247,0.25)] backdrop-blur-xl">
        <a
          href="#"
          className="hidden shrink-0 px-2 text-sm font-extrabold text-white drop-shadow-[0_0_10px_rgba(217,70,239,0.35)] sm:inline-flex"
          aria-label="Go to top"
        >
          Tri Do
        </a>

        <div className="min-w-0 flex-1 overflow-hidden sm:flex sm:justify-end">
          <GooeyNav
            items={navItems}
            particleCount={15}
            particleDistances={[74, 12]}
            particleR={92}
            initialActiveIndex={0}
            animationTime={560}
            timeVariance={260}
            colors={[1, 2, 3, 1, 2, 4, 3, 1]}
          />
        </div>
      </header>

      <section className="relative isolate overflow-hidden px-5 pb-20 pt-32">
        <SoftAurora
          speed={0.35}
          scale={1.35}
          brightness={0.75}
          color1="#a855f7"
          color2="#e879f9"
          noiseFrequency={2.2}
          noiseAmplitude={0.75}
          bandHeight={0.42}
          bandSpread={0.85}
          octaveDecay={0.16}
          layerOffset={0.35}
          colorSpeed={0.55}
          enableMouseInteraction={true}
          mouseInfluence={0.08}
        />

        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(168,85,247,0.2),transparent_34%),linear-gradient(180deg,rgba(5,8,22,0.35)_0%,rgba(5,8,22,0.78)_100%)]" />

        <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-12 md:flex-row md:items-center md:justify-between">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-fuchsia-300 drop-shadow-[0_0_10px_rgba(217,70,239,0.35)]">
              Web & Mobile Developer Portfolio
            </p>

            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white drop-shadow-[0_0_18px_rgba(216,180,254,0.28)] md:text-6xl">
              Hi, I&apos;m Tri Do.
            </h1>

            <div className="mt-4 max-w-3xl">
              <TrueFocus
                sentence="I build web and mobile applications."
                manualMode={false}
                blurAmount={0}
                borderColor="#e879f9"
                glowColor="rgba(232, 121, 249, 0.68)"
                animationDuration={0.45}
                pauseBetweenAnimations={0.45}
                className="focus-container--hero"
              />
            </div>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Recent Software Development graduate based in Moncton, NB, focused
              on web and mobile application development, with hands-on
              experience building backend APIs and database-driven projects.
            </p>
          </div>

          <div className="relative mx-auto flex w-full max-w-sm justify-center md:mx-0">
            <ProfileCard
              name="Tri Do"
              title="Web & Mobile Developer"
              handle="trido2908"
              status="Open to Work"
              contactText="Contact"
              avatarUrl="/profile.jpeg"
              miniAvatarUrl="/profile.jpeg"
              showUserInfo={true}
              enableTilt={true}
              enableMobileTilt={false}
              onContactClick={() => {
                window.location.href = "mailto:dominhtri055@gmail.com";
              }}
              behindGlowEnabled={true}
              behindGlowColor="rgba(217, 70, 239, 0.55)"
              behindGlowSize="55%"
              className="portfolio-profile-card"
              innerGradient="linear-gradient(160deg, rgba(18,18,30,0.95) 0%, rgba(88,28,135,0.55) 50%, rgba(15,23,42,0.92) 100%)"
            />
          </div>
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
              experience building web applications, mobile apps, backend APIs,
              and database-driven projects. During my backend internship at
              Beetech Solution LTD, I worked on server-side features, CRUD
              functionality, and application logic.
            </p>
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
            <li>
              Worked on backend features and server-side application logic.
            </li>
            <li>
              Built and supported CRUD functionality for web applications.
            </li>
            <li>
              Collaborated with supervisor and team members on assigned tasks.
            </li>
            <li>Practiced API, database, and backend development workflow.</li>
          </ul>
        </div>
      </section>

      <section id="skills" className="mx-auto max-w-7xl px-5 py-16">
        <div className="mb-10">
          <p className={labelClass}>Skills</p>
          <h2 className="mt-3 text-3xl font-bold text-white drop-shadow-[0_0_12px_rgba(216,180,254,0.2)]">
            Skills in Action
          </h2>
          <p className="mt-3 max-w-2xl text-slate-400">
            Select one or more skills to filter projects on the right.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-12">
          <aside className="lg:col-span-4">
            <div className="sticky top-28 space-y-5">
              <div className="rounded-3xl border border-fuchsia-300/20 bg-slate-950/55 p-4 shadow-[0_0_35px_rgba(168,85,247,0.13)] backdrop-blur">
                <p className="text-sm text-slate-400">Selected skills</p>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  {selectedSkills.length === 0 ? (
                    <p className="text-xl font-bold text-fuchsia-300 drop-shadow-[0_0_10px_rgba(217,70,239,0.35)]">
                      None
                    </p>
                  ) : (
                    selectedSkills.map((skill) => (
                      <button
                        key={skill}
                        type="button"
                        onClick={() => toggleSkill(skill)}
                        className="rounded-full border border-fuchsia-300 bg-purple-700 px-3 py-1.5 text-xs font-semibold text-white shadow-[0_0_14px_rgba(168,85,247,0.45)]"
                      >
                        {skill} ×
                      </button>
                    ))
                  )}

                  {selectedSkills.length > 0 && (
                    <button
                      type="button"
                      onClick={clearSelectedSkills}
                      className="rounded-full border border-fuchsia-300/20 bg-slate-950/70 px-3 py-1.5 text-xs font-semibold text-slate-300 transition hover:border-fuchsia-300 hover:text-fuchsia-200"
                    >
                      Clear all
                    </button>
                  )}
                </div>
              </div>

              <div className="rounded-3xl border border-fuchsia-300/20 bg-slate-950/55 p-4 shadow-[0_0_35px_rgba(168,85,247,0.13)] backdrop-blur">
                <h3 className="text-xl font-bold text-white">Skill Filters</h3>

                <div className="mt-4 space-y-3">
                  {skillGroups.map((group) => {
                    const isOpen = openSkillGroup === group.title;

                    return (
                      <div
                        key={group.title}
                        className="rounded-2xl border border-fuchsia-300/15 bg-slate-950/55 shadow-[0_0_18px_rgba(88,28,135,0.16)]"
                      >
                        <button
                          type="button"
                          onClick={() =>
                            setOpenSkillGroup(isOpen ? null : group.title)
                          }
                          className="flex w-full items-center justify-between px-4 py-3 text-left transition hover:text-fuchsia-200"
                        >
                          <span className="text-base font-bold text-white drop-shadow-[0_0_10px_rgba(216,180,254,0.18)]">
                            {group.title}
                          </span>

                          <span className="rounded-full border border-fuchsia-300/20 bg-slate-950/70 px-2.5 py-1 text-xs font-bold text-fuchsia-300">
                            {isOpen ? "−" : "+"}
                          </span>
                        </button>

                        {isOpen && (
                          <div className="flex flex-wrap gap-2 border-t border-fuchsia-300/10 px-4 pb-4 pt-3">
                            {group.skills.map((skill) => (
                              <button
                                key={skill}
                                type="button"
                                onClick={() => toggleSkill(skill)}
                                className={`rounded-full border px-2.5 py-1.5 text-xs font-medium transition ${
                                  selectedSkills.includes(skill)
                                    ? "border-fuchsia-300 bg-purple-700 text-white shadow-[0_0_14px_rgba(168,85,247,0.45)]"
                                    : "border-fuchsia-300/15 bg-slate-950/65 text-slate-300 hover:border-fuchsia-300 hover:text-fuchsia-200 hover:shadow-[0_0_12px_rgba(168,85,247,0.22)]"
                                }`}
                              >
                                {skill}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </aside>

          <section id="projects" className="lg:col-span-8">
            <div className="rounded-3xl border border-fuchsia-300/20 bg-slate-950/55 p-6 shadow-[0_0_38px_rgba(168,85,247,0.18)] backdrop-blur">
              <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className={labelClass}>Projects</p>

                  <h3 className="mt-3 text-3xl font-bold text-white drop-shadow-[0_0_12px_rgba(216,180,254,0.22)]">
                    {selectedSkills.length === 0 ? (
                      "All my projects"
                    ) : (
                      <>
                        Projects using{" "}
                        <span className="text-fuchsia-300 drop-shadow-[0_0_10px_rgba(217,70,239,0.35)]">
                          {selectedSkills.join(" + ")}
                        </span>
                      </>
                    )}
                  </h3>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {(
                    [
                      "All",
                      "Completed",
                      "In Progress",
                      "Planned",
                    ] as StatusFilter[]
                  ).map((status) => (
                    <button
                      key={status}
                      type="button"
                      onClick={() => setStatusFilter(status)}
                      className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                        statusFilter === status
                          ? "border-fuchsia-300 bg-purple-700 text-white shadow-[0_0_14px_rgba(168,85,247,0.45)]"
                          : "border-fuchsia-300/15 bg-slate-950/65 text-slate-300 hover:border-fuchsia-300 hover:text-fuchsia-200"
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
                <p className="text-sm text-slate-400">
                  {filteredProjects.length} project
                  {filteredProjects.length !== 1 ? "s" : ""}
                </p>
              </div>

              {filteredProjects.length === 0 ? (
                <div className="mt-6 rounded-2xl border border-fuchsia-300/15 bg-slate-950/60 p-6 text-slate-300">
                  No projects match all selected skills. Try removing one skill
                  or click Clear all.
                </div>
              ) : (
                <div className="relative mt-6">
                  <div className="project-scroll max-h-[640px] overflow-y-auto overscroll-contain pr-0">
                    <div className="grid gap-5">
                      {filteredProjects.map((project) => (
                        <ProjectMiniCard
                          key={project.id}
                          project={project}
                          onClick={() => setSelectedProject(project)}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-950/90 to-transparent" />
                </div>
              )}
            </div>
          </section>
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
              I am open to junior web developer, mobile developer, full-stack
              developer, WordPress developer, and software developer
              opportunities.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="mailto:dominhtri055@gmail.com"
                className={primaryButtonClass}
              >
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
        © {new Date().getFullYear()} Tri Do.
      </footer>
    </main>
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
