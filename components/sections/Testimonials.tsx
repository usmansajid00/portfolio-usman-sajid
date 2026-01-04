"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Star, Quote, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { testimonials } from "@/lib/portfolio-data";
import { useInView } from "@/hooks/useInView";
import { staggerContainer, staggerItem } from "@/lib/animations";

export default function Testimonials() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref);

  return (
    <section id="testimonials" ref={ref} className="section bg-background/50">
      <div className="container-custom">
        <SectionHeading title="Client Testimonials" subtitle="Feedback from valued clients" />

        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {testimonials.map((testimonial) => (
            <motion.div key={testimonial.id} variants={staggerItem}>
              <Card variant="gradient" hover className="flex h-full flex-col p-6">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={
                          i < testimonial.rating ? "fill-accent text-accent" : "text-textMuted"
                        }
                      />
                    ))}
                  </div>
                  <Quote size={20} className="text-accent/40" />
                </div>

                <p className="mb-6 line-clamp-4 flex-grow leading-relaxed text-textSecondary">
                  "{testimonial.text}"
                </p>

                <div className="mt-auto border-t border-white/10 pt-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 overflow-hidden rounded-full border border-accent/30 bg-surfaceLight">
                      {/* Avatar placeholder if image fails or use user initials */}
                      <div className="flex h-full w-full items-center justify-center bg-accent/20 text-xs font-bold text-accent">
                        {testimonial.name.slice(0, 2).toUpperCase()}
                      </div>
                    </div>
                    <div>
                      <h5 className="text-sm font-bold text-text">{testimonial.name}</h5>
                      <p className="text-xs text-textMuted">{testimonial.position}</p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
