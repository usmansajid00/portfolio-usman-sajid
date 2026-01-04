"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useInView } from "@/hooks/useInView";
import { slideInUp } from "@/lib/animations";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  subtitle,
  align = "center",
  className,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { threshold: 0.5 });

  const alignments = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  return (
    <motion.div
      ref={ref}
      className={cn("mb-12 md:mb-16", alignments[align], className)}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={slideInUp}
    >
      <h2 className="relative mb-3 inline-block font-heading text-3xl font-bold text-text md:text-4xl lg:text-5xl">
        {title}
        <motion.div
          className="absolute -bottom-2 left-0 h-1 rounded-full bg-gradient-primary"
          initial={{ width: 0 }}
          animate={{ width: inView ? "100%" : 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />
      </h2>
      {subtitle && (
        <p className="mx-auto mt-4 max-w-2xl text-lg text-textSecondary md:text-xl">{subtitle}</p>
      )}
    </motion.div>
  );
};
