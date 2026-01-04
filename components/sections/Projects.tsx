"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, Circle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { projects } from "@/lib/portfolio-data";
import { useInView } from "@/hooks/useInView";
import { staggerContainer, staggerItem } from "@/lib/animations";

const categories = ["All Projects", "AI/ML", "Web3", "Healthcare", "E-Commerce", "Education"];

export default function Projects() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref);
  const [activeFilter, setActiveFilter] = useState("All Projects");

  const filteredProjects =
    activeFilter === "All Projects"
      ? projects
      : projects.filter((p) => p.category === activeFilter.replace("/", "/"));

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Live":
        return "success";
      case "Completed":
        return "info";
      case "In Development":
        return "warning";
      default:
        return "default";
    }
  };

  return (
    <section id="projects" ref={ref} className="section bg-surface/30">
      <div className="container-custom">
        <SectionHeading
          title="Featured Projects"
          subtitle="Showcasing my best work across various domains"
        />

        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="mb-12 flex flex-wrap justify-center gap-3"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              variants={staggerItem}
              onClick={() => setActiveFilter(category)}
              className={`rounded-lg px-6 py-2 font-medium transition-all ${
                activeFilter === category
                  ? "bg-gradient-primary text-white shadow-accent"
                  : "bg-surface text-textSecondary hover:text-accent"
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {filteredProjects.map((project) => (
            <motion.div key={project.id} variants={staggerItem}>
              <Card variant="glass" hover className="flex h-full flex-col p-6">
                {}
                <div className="mb-4">
                  <div className="mb-2 flex items-start justify-between gap-2">
                    <h3 className="font-heading text-xl font-bold text-text">{project.title}</h3>
                    {project.featured && (
                      <Badge variant="secondary" size="sm">
                        Featured
                      </Badge>
                    )}
                  </div>
                  <p className="mb-2 text-sm text-accent">{project.subtitle}</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant={getStatusColor(project.status) as any} size="sm">
                      {project.status}
                    </Badge>
                    <Badge variant="default" size="sm">
                      {project.category}
                    </Badge>
                  </div>
                </div>

                <p className="mb-4 flex-grow text-textSecondary">{project.description}</p>

                <div className="mb-4 flex flex-wrap gap-2">
                  {project.technologies.slice(0, 4).map((tech, i) => (
                    <span
                      key={i}
                      className="rounded bg-accent/10 px-2 py-1 text-xs font-medium text-accent"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="px-2 py-1 text-xs text-textMuted">
                      +{project.technologies.length - 4} more
                    </span>
                  )}
                </div>

                <div className="mb-4">
                  <h4 className="mb-2 text-sm font-semibold text-text">Key Achievements:</h4>
                  <ul className="space-y-1">
                    {project.keyAchievements.slice(0, 2).map((achievement, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-textSecondary">
                        <Circle className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 fill-accent text-accent" />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto flex gap-3">
                  {project.demoUrl && (
                    <Button
                      variant="default"
                      size="sm"
                      fullWidth
                      leftIcon={<ExternalLink size={16} />}
                      onClick={() => window.open(project.demoUrl!, "_blank")}
                    >
                      Live Demo
                    </Button>
                  )}
                  {project.githubUrl && (
                    <Button
                      variant="secondary"
                      size="sm"
                      fullWidth
                      leftIcon={<Github size={16} />}
                      onClick={() => window.open(project.githubUrl!, "_blank")}
                    >
                      Code
                    </Button>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
