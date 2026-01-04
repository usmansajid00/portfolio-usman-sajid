"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { skills } from "@/lib/portfolio-data";
import { useInView } from "@/hooks/useInView";
import { staggerContainer, staggerItem } from "@/lib/animations";

// React Icons Imports
import {
  SiJavascript,
  SiTypescript,
  SiHtml5,
  SiCss3,
  SiSass,
  SiReact,
  SiNextdotjs,
  SiRedux,
  SiReactrouter,
  SiTailwindcss,
  SiAntdesign,
  SiBootstrap,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiGit,
  SiGithub,
  SiVscodium,
  SiPostman,
  SiDocker,
  SiFigma,
  SiVercel,
  SiNetlify,
  SiAmazon,
  SiStripe,
  SiOpenai,
  SiSocketdotio,
  SiChartdotjs,
  SiD3Dotjs,
  SiWeb3Dotjs,
} from "react-icons/si";
import { FaCode } from "react-icons/fa";

// Map for skill icons
const iconMap: Record<string, React.ReactNode> = {
  // Languages
  javascript: <SiJavascript className="text-yellow-400" size={24} />,
  typescript: <SiTypescript className="text-blue-500" size={24} />,
  html5: <SiHtml5 className="text-orange-500" size={24} />,
  css3: <SiCss3 className="text-blue-400" size={24} />,
  sass: <SiSass className="text-pink-400" size={24} />,

  // Frontend
  react: <SiReact className="text-cyan-400" size={24} />,
  nextjs: <SiNextdotjs className="text-white" size={24} />,
  redux: <SiRedux className="text-purple-500" size={24} />,
  "react-router": <SiReactrouter className="text-red-500" size={24} />,

  // Styling
  tailwind: <SiTailwindcss className="text-cyan-300" size={24} />,
  antd: <SiAntdesign className="text-blue-500" size={24} />,
  shadcn: <FaCode className="text-white" size={24} />, // No specific icon for shadcn yet
  bootstrap: <SiBootstrap className="text-purple-600" size={24} />,
  "css-grid": <FaCode className="text-indigo-400" size={24} />,
  flexbox: <FaCode className="text-indigo-400" size={24} />,

  // Backend
  nodejs: <SiNodedotjs className="text-green-500" size={24} />,
  express: <SiExpress className="text-white" size={24} />,
  api: <FaCode className="text-yellow-500" size={24} />,
  microservices: <FaCode className="text-blue-400" size={24} />,

  // Database
  mongodb: <SiMongodb className="text-green-500" size={24} />,
  postgresql: <SiPostgresql className="text-blue-400" size={24} />,

  // Tools
  git: <SiGit className="text-orange-500" size={24} />,
  github: <SiGithub className="text-white" size={24} />,
  vscode: <SiVscodium className="text-blue-500" size={24} />,
  postman: <SiPostman className="text-orange-500" size={24} />,
  docker: <SiDocker className="text-blue-500" size={24} />,
  figma: <SiFigma className="text-purple-400" size={24} />,

  // Cloud
  vercel: <SiVercel className="text-white" size={24} />,
  netlify: <SiNetlify className="text-green-400" size={24} />,
  aws: <SiAmazon className="text-yellow-500" size={24} />,

  // Other
  web3: <SiWeb3Dotjs className="text-orange-500" size={24} />,
  stripe: <SiStripe className="text-purple-500" size={24} />,
  chartjs: <SiChartdotjs className="text-pink-400" size={24} />,
  d3: <SiD3Dotjs className="text-orange-400" size={24} />,
  openai: <SiOpenai className="text-green-400" size={24} />,
  socketio: <SiSocketdotio className="text-white" size={24} />,

  // Defaults
  default: <FaCode className="text-primary" size={24} />,
};

const skillCategories = [
  { key: "languages", label: "Languages" },
  { key: "frontend", label: "Frontend" },
  { key: "styling", label: "Styling & UI" },
  { key: "backend", label: "Backend" },
  { key: "database", label: "Databases" },
  { key: "tools", label: "Tools & DevOps" },
  { key: "cloud", label: "Cloud" },
  { key: "other", label: "Other" },
];

export default function Skills() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref);
  const [activeCategory, setActiveCategory] = useState("all");

  const allSkills = Object.entries(skills.technical).flatMap(([category, skills]) =>
    skills.map((skill) => ({ ...skill, category }))
  );

  const filteredSkills =
    activeCategory === "all"
      ? allSkills
      : skills.technical[activeCategory as keyof typeof skills.technical] || [];

  return (
    <section id="skills" ref={ref} className="section bg-background">
      <div className="container-custom">
        <SectionHeading title="Technical Skills" subtitle="Technologies and tools I work with" />

        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="mb-12 flex flex-wrap justify-center gap-3"
        >
          <motion.button
            variants={staggerItem}
            onClick={() => setActiveCategory("all")}
            className={`rounded-lg px-6 py-2 font-medium transition-all ${
              activeCategory === "all"
                ? "bg-gradient-primary text-white shadow-accent"
                : "bg-surface text-textSecondary hover:text-accent"
            }`}
          >
            All Skills
          </motion.button>
          {skillCategories.map((cat) => (
            <motion.button
              key={cat.key}
              variants={staggerItem}
              onClick={() => setActiveCategory(cat.key)}
              className={`rounded-lg px-6 py-2 font-medium transition-all ${
                activeCategory === cat.key
                  ? "bg-gradient-primary text-white shadow-accent"
                  : "bg-surface text-textSecondary hover:text-accent"
              }`}
            >
              {cat.label}
            </motion.button>
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="mb-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {(activeCategory === "all" ? allSkills : filteredSkills).map((skill, index) => (
            <motion.div key={`${skill.name}-${index}`} variants={staggerItem}>
              <Card variant="gradient" hover className="flex h-full flex-col justify-between p-5">
                <div>
                  <div className="mb-4 flex items-center gap-3">
                    <div className="rounded-lg bg-surfaceLight p-2 ring-1 ring-white/10">
                      {iconMap[skill.icon || "default"] || iconMap.default}
                    </div>
                    <div>
                      <h4 className="font-semibold text-text">{skill.name}</h4>
                      {skill.years && (
                        <span className="text-xs text-textMuted">{skill.years}y exp</span>
                      )}
                    </div>
                  </div>
                </div>
                <Progress value={skill.level} className="h-2" />
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <h3 className="mb-8 text-center font-heading text-2xl font-bold text-text">
            Soft Skills
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            {skills.soft.map((skill, index) => (
              <motion.div key={index} variants={staggerItem}>
                <Card
                  variant="gradient"
                  hover
                  className="flex h-full flex-col items-center justify-center p-6 text-center"
                >
                  <div className="mb-3 text-accent">
                    <FaCode size={24} />
                  </div>
                  <p className="text-lg font-medium text-text">{skill.name}</p>
                  <div className="mt-2 text-sm text-textSecondary">{skill.level}% Proficiency</div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
