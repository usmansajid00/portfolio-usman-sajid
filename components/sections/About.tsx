"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin, Mail, Phone, Download, Circle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { portfolioData } from "@/lib/portfolio-data";
import { useInView } from "@/hooks/useInView";
import { staggerContainer, staggerItem } from "@/lib/animations";

export default function About() {
  const { about, personalInfo } = portfolioData;
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref);

  return (
    <section id="about" ref={ref} className="section bg-background">
      <div className="container-custom">
        <SectionHeading title="About Me" />

        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="grid gap-12 lg:grid-cols-2"
        >
          <motion.div variants={staggerItem} className="space-y-6">
            <p className="text-lg leading-relaxed text-textSecondary">{about.summary}</p>

            <Card className="border-border/50 bg-surface/30 p-6 backdrop-blur-md">
              <h3 className="mb-3 font-heading text-xl font-semibold text-accent">Mission</h3>
              <p className="text-textSecondary">{about.mission}</p>
            </Card>

            <div className="space-y-4">
              <h3 className="font-heading text-2xl font-bold text-text">Key Highlights</h3>
              <div className="grid gap-3">
                {about.highlights.map((highlight: string, index: number) => (
                  <Card
                    key={index}
                    className="border-border/50 bg-surface/30 p-4 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="flex items-start gap-3">
                      <Circle className="mt-2 h-2 w-2 flex-shrink-0 fill-accent text-accent" />
                      <p className="text-textSecondary">{highlight}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-4 font-heading text-2xl font-bold text-text">Future Learning</h3>
              <div className="flex flex-wrap gap-2">
                {about.futureLearning.map((skill: string, index: number) => (
                  <span
                    key={index}
                    className="rounded-lg border border-accent/30 bg-accent/10 px-4 py-2 text-sm font-medium text-accent"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div variants={staggerItem} className="space-y-6">
            <Card className="border-border/50 bg-surface/30 p-6 backdrop-blur-md">
              <h3 className="mb-4 font-heading text-xl font-semibold text-text">
                Contact Information
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-textSecondary">
                  <Mail className="h-5 w-5 text-accent" />
                  <span>{personalInfo.email}</span>
                </div>
                <div className="flex items-center gap-3 text-textSecondary">
                  <Phone className="h-5 w-5 text-accent" />
                  <span>{personalInfo.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-textSecondary">
                  <MapPin className="h-5 w-5 text-accent" />
                  <span>
                    {personalInfo.location.city}, {personalInfo.location.country}
                  </span>
                </div>
              </div>

              <div className="mt-6 border-t border-border pt-6">
                <div className="mb-3 flex items-center gap-2">
                  <motion.div
                    className="h-3 w-3 rounded-full bg-success"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="font-medium text-success">{about.availability.status}</span>
                </div>
                <p className="text-sm text-textSecondary">
                  Response Time: {about.availability.responseTime}
                </p>
                <p className="text-sm text-textSecondary">
                  Working Hours: {about.availability.workingHours}
                </p>
              </div>
            </Card>

            <div className="grid grid-cols-2 gap-4">
              <Card className="border-border/50 bg-surface/30 p-6 text-center backdrop-blur-md transition-all duration-300 hover:shadow-lg">
                <div className="text-gradient mb-2 font-heading text-4xl font-bold">
                  {about.yearsOfExperience}
                </div>
                <p className="text-textSecondary">Years Experience</p>
              </Card>
              <Card className="border-border/50 bg-surface/30 p-6 text-center backdrop-blur-md transition-all duration-300 hover:shadow-lg">
                <div className="text-gradient mb-2 font-heading text-4xl font-bold">
                  {about.projectsCompleted}+
                </div>
                <p className="text-textSecondary">Projects Done</p>
              </Card>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
