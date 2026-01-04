"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { Code, Layers, Boxes, Palette, Server, Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { services } from "@/lib/portfolio-data";
import { useInView } from "@/hooks/useInView";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { scrollToElement } from "@/lib/utils";

const iconMap: Record<string, React.ReactNode> = {
  code: <Code size={40} />,
  layers: <Layers size={40} />,
  blockchain: <Boxes size={40} />,
  palette: <Palette size={40} />,
  server: <Server size={40} />,
};

export default function Services() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref);

  return (
    <section id="services" ref={ref} className="section bg-background">
      <div className="container-custom">
        <SectionHeading title="Services Offered" subtitle="What I can do for you" />

        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="grid gap-8 md:grid-cols-2"
        >
          {services.map((service) => (
            <motion.div key={service.id} variants={staggerItem}>
              <Card variant="glass" hover className="h-full p-8">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  {iconMap[service.icon] || <Code size={40} />}
                </div>

                <h3 className="text-text mb-3 font-heading text-2xl font-bold">{service.title}</h3>
                <p className="text-textSecondary mb-6">{service.description}</p>

                <div className="mb-6">
                  <h4 className="text-text mb-3 text-sm font-semibold">What&apos;s Included:</h4>
                  <ul className="space-y-2">
                    {service.features.map((feature, i) => (
                      <li key={i} className="text-textSecondary flex items-start gap-2 text-sm">
                        <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6 flex flex-wrap gap-2">
                  {service.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="text-textSecondary rounded-md bg-surface px-3 py-1 text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between border-t border-border pt-6">
                  <div>
                    <p className="text-textMuted text-sm">Starting at</p>
                    <p className="font-heading text-2xl font-bold text-accent">
                      {service.pricing.split(" ")[2]}
                    </p>
                  </div>
                  <Button variant="default" onClick={() => scrollToElement("contact")}>
                    Get Started
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
