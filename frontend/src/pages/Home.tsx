import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import { getProjects } from "@/lib/api/projects";
import { getServices } from "@/lib/api/services";
import { Project, Service } from "@/types";

const processSteps = [
  {
    number: "01",
    title: "Find the signal",
    description: "We get close to the problem, the people, and the opportunity before deciding what to make.",
  },
  {
    number: "02",
    title: "Shape the answer",
    description: "A clear product direction and considered design give the work a strong foundation.",
  },
  {
    number: "03",
    title: "Make it real",
    description: "Our team builds, tests, and refines the details until the product is ready for the real world.",
  },
];

export function HomePage() {
  const [services, setServices] = useState<Service[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    getServices()
      .then((data) => setServices(data.slice(0, 4)))
      .catch((error: unknown) => console.error("Unable to load homepage services:", error));

    getProjects({ featured: true })
      .then((data) => setProjects(data.slice(0, 3)))
      .catch((error: unknown) => console.error("Unable to load homepage projects:", error));
  }, []);

  return (
    <div className="studio-home">
      <section className="studio-hero">
        <div className="studio-wrap">
          <div className="studio-kicker">
            <span className="studio-kicker-dot" />
            Independent digital product studio
          </div>

          <div className="studio-hero-grid">
            <div className="studio-hero-copy">
              <h1>
                Good ideas deserve
                <span>great engineering.</span>
              </h1>
              <p>
                We turn ambitious ideas into useful, thoughtful digital products—from the first sketch to the
                details that make them last.
              </p>
              <div className="studio-actions">
                <Link to="/contact" className="studio-button studio-button-dark">
                  Tell us what you&apos;re building <ArrowUpRight size={16} />
                </Link>
                <Link to="/projects" className="studio-text-link">
                  See our work <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            <div className="studio-mark" aria-label="Prakalp Labs, ideas made tangible">
              <div className="studio-mark-top">
                <span>Prakalp Labs</span>
                <span>STUDIO</span>
              </div>
              <div className="studio-mark-letter">P</div>
              <div className="studio-mark-bottom">
                <span>Ideas, made tangible.</span>
                <span>DESIGN + ENGINEERING</span>
              </div>
              <span className="studio-mark-spark" aria-hidden="true">✳</span>
            </div>
          </div>

          <a className="studio-scroll" href="#studio-intro">
            <span>Scroll to explore</span>
            <ArrowDown size={14} />
          </a>
        </div>
      </section>

      <section className="studio-intro" id="studio-intro">
        <div className="studio-wrap studio-intro-grid">
          <p className="studio-eyebrow">A little less noise.<br />A lot more intention.</p>
          <div>
            <h2>
              Technology is the material.
              <em>Progress is the point.</em>
            </h2>
            <p className="studio-body-copy">
              The best digital products feel simple because someone cared about every decision behind them.
              We bring strategy, design, and engineering together to make work that earns its place in people&apos;s
              lives.
            </p>
          </div>
        </div>
      </section>

      <section className="studio-services">
        <div className="studio-wrap">
          <div className="studio-section-heading">
            <div>
              <p className="studio-eyebrow">What we bring to the table</p>
              <h2>Good thinking.<br /><em>Beautifully built.</em></h2>
            </div>
            <Link to="/services" className="studio-text-link">
              Explore all services <ArrowUpRight size={16} />
            </Link>
          </div>

          <div className="studio-service-list">
            {services.map((service, index) => (
              <Link
                className="studio-service-row"
                key={service.id}
                to={`/services/${service.slug}`}
              >
                <span className="studio-row-number">{String(index + 1).padStart(2, "0")}</span>
                <span className="studio-service-name">{service.title}</span>
                <span className="studio-service-description">{service.shortDescription}</span>
                <ArrowUpRight className="studio-row-arrow" size={19} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="studio-work">
        <div className="studio-wrap">
          <div className="studio-section-heading">
            <div>
              <p className="studio-eyebrow">A few things we&apos;ve made</p>
              <h2>Selected <em>work.</em></h2>
            </div>
            <Link to="/projects" className="studio-text-link">
              More projects <ArrowUpRight size={16} />
            </Link>
          </div>

          <div className="studio-project-grid">
            {projects.map((project, index) => (
              <Link
                className={`studio-project-card studio-project-card-${index % 3}`}
                key={project.id}
                to={`/projects/${project.slug}`}
              >
                <div className="studio-project-art" aria-hidden="true">
                  <span className="studio-project-art-index">0{index + 1}</span>
                  <span className="studio-project-art-word">
                    {project.title.split(/[—–]/)[0].trim().split(" ")[0]}
                  </span>
                  <span className="studio-project-art-shape" />
                  <span className="studio-project-art-caption">{project.category}</span>
                  <span className="studio-project-art-link"><ArrowUpRight size={19} /></span>
                </div>
                <div className="studio-project-info">
                  <div>
                    <h3>{project.title.split(/[—–]/)[0].trim()}</h3>
                    <p>{project.description}</p>
                  </div>
                  <span className="studio-project-category">{project.category}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="studio-process">
        <div className="studio-wrap">
          <div className="studio-process-heading">
            <p className="studio-eyebrow">From first conversation to first release</p>
            <h2>Thoughtful by design.<br /><em>Practical by nature.</em></h2>
          </div>
          <div className="studio-process-grid">
            {processSteps.map((step) => (
              <article className="studio-process-step" key={step.number}>
                <span>{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
          <div className="studio-contact-band">
            <p>Have a good idea?</p>
            <Link to="/contact">
              Let&apos;s give it a beginning <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
