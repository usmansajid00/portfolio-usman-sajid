"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { MapPin, Calendar, Circle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { experience } from "@/lib/portfolio-data";
import { useInView } from "@/hooks/useInView";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { formatDate } from "@/lib/utils";

export default function Experience() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref);

  return (
    <section id="experience" ref={ref} className="section bg-surface/30">
      <div className="container-custom">
        <SectionHeading title="Professional Experience" />

        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="relative mx-auto max-w-6xl"
        >
          {/* Vertical Line */}
          <div className="absolute bottom-0 left-4 top-0 w-0.5 transform bg-accent/30 md:left-1/2 md:-translate-x-1/2" />

          <div className="space-y-12">
            {experience.map((exp, index) => (
              <motion.div
                key={exp.id}
                variants={staggerItem}
                className={`relative flex flex-col gap-8 md:flex-row md:items-center ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-4 z-10 h-4 w-4 -translate-x-1/2 transform rounded-full bg-accent shadow-accent md:left-1/2 md:-translate-x-1/2">
                  {exp.current && (
                    <motion.div
                      className="absolute inset-0 rounded-full bg-accent"
                      animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </div>

                {/* Content Card */}
                <Card
                  variant="glass"
                  hover
                  className={`ml-12 flex-1 p-6 md:ml-0 ${
                    index % 2 === 0 ? "md:mr-[calc(50%+2rem)]" : "md:ml-[calc(50%+2rem)]"
                  }`}
                >
                  <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <h3 className="mb-1 font-heading text-lg font-bold text-text md:text-2xl">
                        {exp.position}
                      </h3>
                      <p className="text-base font-medium text-accent md:text-lg">{exp.company}</p>
                    </div>
                    {exp.current && (
                      <Badge variant="secondary" pulse>
                        Current
                      </Badge>
                    )}
                  </div>

                  <div className="mb-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-textSecondary">
                    <div className="flex items-center gap-1">
                      <MapPin size={16} />
                      <span>{exp.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar size={16} />
                      <span>
                        {formatDate(exp.startDate)} -{" "}
                        {exp.endDate ? formatDate(exp.endDate) : "Present"} ({exp.duration})
                      </span>
                    </div>
                    <Badge variant="default" size="sm">
                      {exp.type}
                    </Badge>
                  </div>

                  <p className="mb-4 text-sm text-textSecondary md:text-base">{exp.description}</p>

                  <div className="mb-4">
                    <h4 className="mb-2 text-sm font-semibold text-text">Key Responsibilities:</h4>
                    <ul className="space-y-1">
                      {exp.responsibilities.slice(0, 3).map((resp, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-textSecondary">
                          <Circle className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 fill-accent text-accent" />
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-4 flex flex-wrap gap-2">
                    {exp.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="rounded-md bg-accent/10 px-3 py-1 text-xs font-medium text-accent"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {exp.achievements.length > 0 && (
                    <div className="border-t border-border pt-4">
                      <h4 className="mb-2 text-sm font-semibold text-accent">Achievements:</h4>
                      <ul className="space-y-1">
                        {exp.achievements.map((achievement, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-textSecondary">
                            <Circle className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 fill-success text-success" />
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
