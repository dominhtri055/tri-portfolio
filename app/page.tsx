"use client";

import Image from "next/image";
import { useState } from "react";
import {
  FiArrowDown,
  FiArrowUpRight,
  FiCheck,
  FiDownload,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiMapPin,
} from "react-icons/fi";

const shopPilotShots = [
  {
    label: "Dashboard",
    src: "/projects/shoppilot/dashboard.webp",
    alt: "ShopPilot merchant dashboard showing revenue, orders, inventory, and conversion metrics",
  },
  {
    label: "Products",
    src: "/projects/shoppilot/products.webp",
    alt: "ShopPilot product management screen with search, filters, pricing, and inventory",
  },
  {
    label: "Insights",
    src: "/projects/shoppilot/insights.webp",
    alt: "ShopPilot analytics screen showing weekly revenue and inventory risks",
  },
];

const supportingProjects = [
  {
    number: "02",
    type: "Full-stack web application",
    title: "Restaurant Event Management",
    description:
      "A database-backed event system with server-rendered views, validated forms, search by name and date, and archive-based deletion.",
    stack: ["Java", "Spring Boot", "Thymeleaf", "MySQL"],
    signals: ["MVC architecture", "Server-side validation", "Search and archive workflows"],
    github: "https://github.com/dominhtri055/restaurant-event-app",
    accent: "violet",
  },
  {
    number: "03",
    type: "Backend REST API",
    title: "License Plate Assignment API",
    description:
      "A REST API that validates VINs and manages Ontario-style plate assignment, verification, and revocation with persistent storage.",
    stack: ["Node.js", "Express", "TypeScript", "MongoDB"],
    signals: ["API-key middleware", "Validation and error handling", "Documented request workflows"],
    github: "https://github.com/dominhtri055/COMP9784-87486-Final-Project",
    accent: "blue",
  },
  {
    number: "04",
    type: "Front-end engineering",
    title: "Developer Portfolio",
    description:
      "This responsive portfolio turns project work into scannable evidence with accessible interactions, focused content, and performance-conscious media.",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    signals: ["Responsive layout", "Semantic structure", "Optimized project media"],
    github: "https://github.com/dominhtri055/tri-portfolio",
    accent: "pink",
  },
];

const capabilities = [
  {
    title: "Front end",
    description: "Interfaces that stay clear across desktop and mobile.",
    skills: ["React", "Next.js", "TypeScript", "JavaScript", "Angular", "HTML / CSS", "Tailwind CSS"],
  },
  {
    title: "Back end",
    description: "APIs and application logic built around real workflows.",
    skills: ["Node.js", "Express", "Java", "Spring Boot", "Python", "Flask", "REST APIs"],
  },
  {
    title: "Data & platform",
    description: "Practical data models, access controls, and integrations.",
    skills: ["PostgreSQL", "Supabase", "MongoDB", "MySQL", "Authentication", "Row Level Security"],
  },
  {
    title: "Mobile & workflow",
    description: "Cross-platform delivery with a disciplined toolchain.",
    skills: ["React Native", "Expo", "Kotlin", "Git", "Docker", "Postman", "Figma"],
  },
];

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Tri Do",
  url: "https://tri-portfolio-pi.vercel.app",
  jobTitle: "Junior Full-Stack Developer",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Moncton",
    addressRegion: "New Brunswick",
    addressCountry: "CA",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "New Brunswick Community College",
  },
  sameAs: [
    "https://github.com/dominhtri055",
    "https://www.linkedin.com/in/trido2908/",
  ],
  knowsAbout: ["React", "Next.js", "TypeScript", "Node.js", "React Native", "Spring Boot", "Supabase"],
};

export default function HomePage() {
  const [activeShot, setActiveShot] = useState(0);
  const selectedShot = shopPilotShots[activeShot];

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      <header className="site-header">
        <nav className="nav-shell" aria-label="Primary navigation">
          <a className="brand" href="#top" aria-label="Tri Do, back to top">
            <span className="brand-mark">TD</span>
            <span>Tri Do</span>
          </a>

          <div className="nav-links">
            <a href="#work">Work</a>
            <a href="#experience">Experience</a>
            <a href="#skills">Skills</a>
            <a href="#about">About</a>
          </div>

          <a className="nav-resume" href="/resume.pdf" target="_blank" rel="noreferrer">
            Résumé <FiArrowUpRight aria-hidden="true" />
          </a>
        </nav>
      </header>

      <section className="hero section-shell" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span /> Junior Full-Stack Developer · Moncton, NB</p>
          <h1>I build reliable products from <em>interface</em> to database.</h1>
          <p className="hero-lede">
            Recent NBCC Software Development graduate with hands-on experience building
            React and Next.js interfaces, mobile apps, typed APIs, authentication, and
            database-backed workflows.
          </p>

          <div className="hero-actions">
            <a className="button button-primary" href="#featured-project">
              View ShopPilot <FiArrowDown aria-hidden="true" />
            </a>
            <a className="button button-secondary" href="/resume.pdf" target="_blank" rel="noreferrer">
              <FiDownload aria-hidden="true" /> Download résumé
            </a>
          </div>

          <div className="hero-meta" aria-label="Availability and location">
            <span><FiMapPin aria-hidden="true" /> Based in Moncton, Canada</span>
            <span><i /> Open to junior roles across Canada</span>
          </div>
        </div>

        <aside className="hero-proof" aria-label="Featured engineering snapshot">
          <div className="proof-topline">
            <span>Currently shipping</span>
            <span className="live-pill"><i /> Active project</span>
          </div>
          <div className="proof-title">
            <span className="project-monogram">SP</span>
            <div>
              <p>Flagship project</p>
              <h2>ShopPilot</h2>
            </div>
          </div>
          <p className="proof-description">
            Merchant operations across products, inventory, orders, storage, and analytics.
          </p>
          <div className="proof-grid">
            <div><strong>100+</strong><span>Git commits</span></div>
            <div><strong>3</strong><span>Platforms</span></div>
            <div><strong>RLS</strong><span>Data isolation</span></div>
          </div>
          <div className="proof-stack">
            <span>React Native</span><span>TypeScript</span><span>Supabase</span>
          </div>
          <a href="https://github.com/dominhtri055/shoppilot-mobile" target="_blank" rel="noreferrer">
            Read the engineering case study <FiArrowUpRight aria-hidden="true" />
          </a>
        </aside>
      </section>

      <section className="signal-strip" aria-label="Portfolio highlights">
        <div className="section-shell signal-grid">
          <div><strong>01</strong><span>Professional internship</span></div>
          <div><strong>04</strong><span>Selected projects</span></div>
          <div><strong>Web · Mobile · API</strong><span>End-to-end product experience</span></div>
        </div>
      </section>

      <section className="work section-shell" id="work">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Selected work</p>
            <h2>Evidence over buzzwords.</h2>
          </div>
          <p>
            A focused set of projects showing product thinking, implementation depth,
            and the ability to finish practical software.
          </p>
        </div>

        <article className="featured-project" id="featured-project">
          <div className="featured-copy">
            <div className="project-heading-row">
              <span className="project-number">01</span>
              <span className="featured-label">Flagship project</span>
            </div>
            <p className="project-type">Cross-platform merchant operations</p>
            <h3>ShopPilot</h3>
            <p className="project-summary">
              A production-style merchant dashboard for managing products, inventory,
              orders, store settings, images, and performance analytics from one responsive app.
            </p>

            <div className="project-links">
              <a className="button button-primary" href="https://shoppilot-mobile.vercel.app/login" target="_blank" rel="noreferrer">
                Open live app <FiArrowUpRight aria-hidden="true" />
              </a>
              <a className="button button-secondary" href="https://github.com/dominhtri055/shoppilot-mobile" target="_blank" rel="noreferrer">
                <FiGithub aria-hidden="true" /> View source
              </a>
            </div>

            <div className="engineering-list">
              <div><FiCheck aria-hidden="true" /><span>Supabase authentication, protected routes, and session recovery</span></div>
              <div><FiCheck aria-hidden="true" /><span>PostgreSQL Row Level Security for merchant-owned data and files</span></div>
              <div><FiCheck aria-hidden="true" /><span>Product CRUD, inventory filters, image upload, orders, and refunds</span></div>
              <div><FiCheck aria-hidden="true" /><span>Typed data access with revenue, conversion, and product analytics</span></div>
            </div>
          </div>

          <div className="product-showcase">
            <div className="browser-frame">
              <div className="browser-bar" aria-hidden="true">
                <span /><span /><span /><p>shoppilot / {selectedShot.label.toLowerCase()}</p>
              </div>
              <Image
                key={selectedShot.src}
                src={selectedShot.src}
                alt={selectedShot.alt}
                width={1400}
                height={690}
                sizes="(max-width: 900px) 100vw, 58vw"
                priority
              />
            </div>
            <div className="shot-tabs" role="tablist" aria-label="ShopPilot screenshots">
              {shopPilotShots.map((shot, index) => (
                <button
                  key={shot.label}
                  type="button"
                  role="tab"
                  aria-selected={activeShot === index}
                  className={activeShot === index ? "active" : ""}
                  onClick={() => setActiveShot(index)}
                >
                  <span>0{index + 1}</span>{shot.label}
                </button>
              ))}
            </div>
          </div>
        </article>

        <div className="project-grid">
          {supportingProjects.map((project) => (
            <article className={`project-card ${project.accent}`} key={project.title}>
              <div className="project-card-top">
                <span>{project.number}</span>
                <a href={project.github} target="_blank" rel="noreferrer" aria-label={`View ${project.title} on GitHub`}>
                  <FiGithub aria-hidden="true" /><FiArrowUpRight aria-hidden="true" />
                </a>
              </div>
              <p className="project-type">{project.type}</p>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="signal-list">
                {project.signals.map((signal) => <span key={signal}><FiCheck aria-hidden="true" />{signal}</span>)}
              </div>
              <div className="tag-list">
                {project.stack.map((item) => <span key={item}>{item}</span>)}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="career" id="experience">
        <div className="section-shell">
          <div className="section-heading">
            <div>
              <p className="section-kicker">Experience & education</p>
              <h2>Built on real delivery.</h2>
            </div>
          </div>

          <div className="career-grid">
            <article className="career-card primary-career">
              <div className="career-meta"><span>Experience</span><time>Apr 2026 — Jun 2026</time></div>
              <h3>Backend Developer Intern</h3>
              <p className="organization">Beetech Solution LTD</p>
              <ul>
                <li>Developed and supported server-side application logic and CRUD workflows for web applications.</li>
                <li>Worked with API, database, validation, debugging, and feature-testing workflows.</li>
                <li>Collaborated with a supervisor and development team to complete assigned features reliably.</li>
              </ul>
            </article>

            <article className="career-card">
              <div className="career-meta"><span>Education</span><time>2024 — 2026</time></div>
              <h3>Information Technology: Software Development</h3>
              <p className="organization">New Brunswick Community College · Moncton</p>
              <p>
                Diploma program covering full-stack web development, databases, APIs,
                mobile development, testing, and collaborative software delivery.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="skills section-shell" id="skills">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Capabilities</p>
            <h2>Tools connected to outcomes.</h2>
          </div>
          <p>
            The stack is broad, but the focus is consistent: clear interfaces,
            dependable application logic, and maintainable data flows.
          </p>
        </div>

        <div className="capability-grid">
          {capabilities.map((group, index) => (
            <article key={group.title}>
              <span className="capability-number">0{index + 1}</span>
              <h3>{group.title}</h3>
              <p>{group.description}</p>
              <div className="tag-list">
                {group.skills.map((skill) => <span key={skill}>{skill}</span>)}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="about section-shell" id="about">
        <div className="about-copy">
          <p className="section-kicker">About</p>
          <h2>I like the complete build process.</h2>
          <p>
            I&apos;m Tri, a recent Software Development graduate who enjoys moving from an
            unclear problem to a working product: shaping the interface, defining the data,
            building the workflow, and testing the result.
          </p>
          <p>
            I&apos;m looking for a junior team where I can contribute to real products,
            learn from experienced developers, and keep growing into a dependable software engineer.
          </p>
        </div>

        <aside className="contact-card">
          <p className="section-kicker">Let&apos;s work together</p>
          <h2>Open to junior opportunities across Canada.</h2>
          <p>Front-end, full-stack, and software development roles are the best fit.</p>
          <div className="contact-actions">
            <a className="button button-primary" href="mailto:dominhtri055@gmail.com">
              <FiMail aria-hidden="true" /> Email me
            </a>
            <a className="icon-link" href="https://github.com/dominhtri055" target="_blank" rel="noreferrer" aria-label="GitHub profile">
              <FiGithub aria-hidden="true" />
            </a>
            <a className="icon-link" href="https://www.linkedin.com/in/trido2908/" target="_blank" rel="noreferrer" aria-label="LinkedIn profile">
              <FiLinkedin aria-hidden="true" />
            </a>
          </div>
        </aside>
      </section>

      <footer>
        <div className="section-shell footer-inner">
          <span>© {new Date().getFullYear()} Tri Do</span>
          <span>Built with Next.js, TypeScript, and intention.</span>
          <a href="#top">Back to top <FiArrowUpRight aria-hidden="true" /></a>
        </div>
      </footer>
    </main>
  );
}
