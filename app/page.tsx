"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import TrueFocus from "@/components/TrueFocus/TrueFocus";
import { translations, type Language } from "./content";
import {
  FiArrowDown,
  FiArrowUpRight,
  FiCheck,
  FiDownload,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiMapPin,
  FiGlobe,
  FiMoon,
  FiSun,
} from "react-icons/fi";

const shotSources = [
  "/projects/shoppilot/dashboard.webp",
  "/projects/shoppilot/products.webp",
  "/projects/shoppilot/insights.webp",
] as const;

const supportingProjects = [
  {
    number: "02",
    stack: ["Java", "Spring Boot", "Thymeleaf", "MySQL"],
    github: "https://github.com/dominhtri055/restaurant-event-app",
    accent: "violet",
  },
  {
    number: "03",
    stack: ["Node.js", "Express", "TypeScript", "MongoDB"],
    github: "https://github.com/dominhtri055/COMP9784-87486-Final-Project",
    accent: "blue",
  },
  {
    number: "04",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    github: "https://github.com/dominhtri055/tri-portfolio",
    accent: "pink",
  },
];

const capabilitySkills = [
  ["React", "Next.js", "TypeScript", "JavaScript", "Angular", "HTML / CSS", "Tailwind CSS"],
  ["Node.js", "Express", "Java", "Spring Boot", "Python", "Flask", "REST APIs"],
  ["PostgreSQL", "Supabase", "MongoDB", "MySQL", "Authentication", "Row Level Security"],
  ["React Native", "Expo", "Kotlin", "Git", "Docker", "Postman", "Figma"],
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
  const [language, setLanguage] = useState<Language>("en");
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [preferencesLoaded, setPreferencesLoaded] = useState(false);
  const t = translations[language];
  const selectedShot = { ...t.shots[activeShot], src: shotSources[activeShot] };

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem("tri-language") as Language | null;
    const savedTheme = window.localStorage.getItem("tri-theme") as "light" | "dark" | null;
    const preferredTheme = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";

    if (savedLanguage && savedLanguage in translations) setLanguage(savedLanguage);
    setTheme(savedTheme === "light" || savedTheme === "dark" ? savedTheme : preferredTheme);
    setPreferencesLoaded(true);
  }, []);

  useEffect(() => {
    if (!preferencesLoaded) return;
    document.documentElement.lang = language;
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("tri-language", language);
    window.localStorage.setItem("tri-theme", theme);
  }, [language, theme, preferencesLoaded]);

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      <header className="site-header">
        <nav className="nav-shell" aria-label={t.nav.aria}>
          <a className="brand" href="#top" aria-label={t.nav.top}>
            <span className="brand-mark">TD</span>
            <span>Tri Do</span>
          </a>

          <div className="nav-links">
            <a href="#work">{t.nav.work}</a>
            <a href="#experience">{t.nav.experience}</a>
            <a href="#skills">{t.nav.skills}</a>
            <a href="#about">{t.nav.about}</a>
          </div>

          <div className="nav-actions">
            <label className="language-control">
              <FiGlobe aria-hidden="true" />
              <span className="sr-only">{t.controls.language}</span>
              <select
                value={language}
                onChange={(event) => setLanguage(event.target.value as Language)}
                aria-label={t.controls.language}
              >
                <option value="en">EN</option>
                <option value="fr">FR</option>
                <option value="vi">VI</option>
              </select>
            </label>
            <button
              className="theme-toggle"
              type="button"
              onClick={() => setTheme((current) => current === "dark" ? "light" : "dark")}
              aria-label={theme === "dark" ? t.controls.light : t.controls.dark}
              title={theme === "dark" ? t.controls.light : t.controls.dark}
            >
              {theme === "dark" ? <FiSun aria-hidden="true" /> : <FiMoon aria-hidden="true" />}
            </button>
            <a className="nav-resume" href="/resume.pdf" target="_blank" rel="noreferrer">
              <span className="resume-label">{t.nav.resume}</span> <FiArrowUpRight aria-hidden="true" />
            </a>
          </div>
        </nav>
      </header>

      <section className="hero section-shell" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span /> {t.hero.eyebrow}</p>
          <TrueFocus
            key={language}
            sentence={t.hero.title}
            manualMode={false}
            blurAmount={0}
            borderColor="#c7a3ff"
            glowColor="rgba(199, 163, 255, 0.6)"
            animationDuration={0.45}
            pauseBetweenAnimations={0.45}
            className={`focus-container--hero hero-title hero-title-${language}`}
            headingLevel={1}
          />
          <p className="hero-lede">{t.hero.lede}</p>

          <div className="hero-actions">
            <a className="button button-primary" href="#featured-project">
              {t.hero.view} <FiArrowDown aria-hidden="true" />
            </a>
            <a className="button button-secondary" href="/resume.pdf" target="_blank" rel="noreferrer">
              <FiDownload aria-hidden="true" /> {t.hero.download}
            </a>
          </div>

          <div className="hero-meta" aria-label={t.hero.locationAria}>
            <span><FiMapPin aria-hidden="true" /> {t.hero.location}</span>
            <span><i /> {t.hero.availability}</span>
          </div>
        </div>

        <aside className="hero-proof" aria-label={t.proof.aria}>
          <div className="proof-topline">
            <span>{t.proof.shipping}</span>
            <span className="live-pill"><i /> {t.proof.active}</span>
          </div>
          <div className="proof-title">
            <span className="project-monogram">SP</span>
            <div>
              <p>{t.proof.flagship}</p>
              <h2>ShopPilot</h2>
            </div>
          </div>
          <p className="proof-description">{t.proof.description}</p>
          <div className="proof-grid">
            <div><strong>100+</strong><span>{t.proof.commits}</span></div>
            <div><strong>3</strong><span>{t.proof.platforms}</span></div>
            <div><strong>RLS</strong><span>{t.proof.isolation}</span></div>
          </div>
          <div className="proof-stack">
            <span>React Native</span><span>TypeScript</span><span>Supabase</span>
          </div>
          <a href="https://github.com/dominhtri055/shoppilot-mobile" target="_blank" rel="noreferrer">
            {t.proof.caseStudy} <FiArrowUpRight aria-hidden="true" />
          </a>
        </aside>
      </section>

      <section className="signal-strip" aria-label={t.highlights.aria}>
        <div className="section-shell signal-grid">
          <div><strong>01</strong><span>{t.highlights.internship}</span></div>
          <div><strong>04</strong><span>{t.highlights.projects}</span></div>
          <div><strong>Web · Mobile · API</strong><span>{t.highlights.experience}</span></div>
        </div>
      </section>

      <section className="work section-shell" id="work">
        <div className="section-heading">
          <div>
            <p className="section-kicker">{t.work.kicker}</p>
            <h2>{t.work.title}</h2>
          </div>
          <p>{t.work.intro}</p>
        </div>

        <article className="featured-project" id="featured-project">
          <div className="featured-copy">
            <div className="project-heading-row">
              <span className="project-number">01</span>
              <span className="featured-label">{t.work.featured}</span>
            </div>
            <p className="project-type">{t.work.type}</p>
            <h3>ShopPilot</h3>
            <p className="project-summary">{t.work.summary}</p>

            <div className="project-links">
              <a className="button button-primary" href="https://shoppilot-mobile.vercel.app/login" target="_blank" rel="noreferrer">
                {t.work.live} <FiArrowUpRight aria-hidden="true" />
              </a>
              <a className="button button-secondary" href="https://github.com/dominhtri055/shoppilot-mobile" target="_blank" rel="noreferrer">
                <FiGithub aria-hidden="true" /> {t.work.source}
              </a>
            </div>

            <div className="engineering-list">
              {t.work.engineering.map((item) => (
                <div key={item}><FiCheck aria-hidden="true" /><span>{item}</span></div>
              ))}
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
            <div className="shot-tabs" role="tablist" aria-label={t.work.screenshotsAria}>
              {t.shots.map((shot, index) => (
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
          {supportingProjects.map((project, index) => {
            const copy = t.projects[index];
            return (
            <article className={`project-card ${project.accent}`} key={copy.title}>
              <div className="project-card-top">
                <span>{project.number}</span>
                <a href={project.github} target="_blank" rel="noreferrer" aria-label={t.work.viewGithub.replace("{title}", copy.title)}>
                  <FiGithub aria-hidden="true" /><FiArrowUpRight aria-hidden="true" />
                </a>
              </div>
              <p className="project-type">{copy.type}</p>
              <h3>{copy.title}</h3>
              <p>{copy.description}</p>
              <div className="signal-list">
                {copy.signals.map((signal) => <span key={signal}><FiCheck aria-hidden="true" />{signal}</span>)}
              </div>
              <div className="tag-list">
                {project.stack.map((item) => <span key={item}>{item}</span>)}
              </div>
            </article>
          )})}
        </div>
      </section>

      <section className="career" id="experience">
        <div className="section-shell">
          <div className="section-heading">
            <div>
              <p className="section-kicker">{t.career.kicker}</p>
              <h2>{t.career.title}</h2>
            </div>
          </div>

          <div className="career-grid">
            <article className="career-card primary-career">
              <div className="career-meta"><span>{t.career.experience}</span><time>Apr 2026 — Jun 2026</time></div>
              <h3>{t.career.internTitle}</h3>
              <p className="organization">Beetech Solution LTD</p>
              <ul>
                {t.career.internPoints.map((point) => <li key={point}>{point}</li>)}
              </ul>
            </article>

            <article className="career-card">
              <div className="career-meta"><span>{t.career.education}</span><time>2024 — 2026</time></div>
              <h3>{t.career.diploma}</h3>
              <p className="organization">{t.career.college}</p>
              <p>{t.career.educationText}</p>
            </article>
          </div>
        </div>
      </section>

      <section className="skills section-shell" id="skills">
        <div className="section-heading">
          <div>
            <p className="section-kicker">{t.skills.kicker}</p>
            <h2>{t.skills.title}</h2>
          </div>
          <p>{t.skills.intro}</p>
        </div>

        <div className="capability-grid">
          {t.skills.groups.map((group, index) => (
            <article key={group.title}>
              <span className="capability-number">0{index + 1}</span>
              <h3>{group.title}</h3>
              <p>{group.description}</p>
              <div className="tag-list">
                {capabilitySkills[index].map((skill) => <span key={skill}>{skill}</span>)}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="about section-shell" id="about">
        <div className="about-copy">
          <p className="section-kicker">{t.about.kicker}</p>
          <h2>{t.about.title}</h2>
          <p>{t.about.first}</p>
          <p>{t.about.second}</p>
        </div>

        <aside className="contact-card">
          <p className="section-kicker">{t.about.contactKicker}</p>
          <h2>{t.about.contactTitle}</h2>
          <p>{t.about.contactText}</p>
          <div className="contact-actions">
            <a className="button button-primary" href="mailto:dominhtri055@gmail.com">
              <FiMail aria-hidden="true" /> {t.about.email}
            </a>
            <a className="icon-link" href="https://github.com/dominhtri055" target="_blank" rel="noreferrer" aria-label={t.about.github}>
              <FiGithub aria-hidden="true" />
            </a>
            <a className="icon-link" href="https://www.linkedin.com/in/trido2908/" target="_blank" rel="noreferrer" aria-label={t.about.linkedin}>
              <FiLinkedin aria-hidden="true" />
            </a>
          </div>
        </aside>
      </section>

      <footer>
        <div className="section-shell footer-inner">
          <span>© {new Date().getFullYear()} Tri Do</span>
          <span>{t.footer.built}</span>
          <a href="#top">{t.footer.top} <FiArrowUpRight aria-hidden="true" /></a>
        </div>
      </footer>
    </main>
  );
}
