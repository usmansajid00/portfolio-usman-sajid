"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
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
  const alignments = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  return (
    <motion.div
      className={cn("mb-12 md:mb-16", alignments[align], className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={slideInUp}
    >
      <h2 className="text-text relative mb-3 inline-block font-heading text-3xl font-bold md:text-4xl lg:text-5xl">
        {title}
        <motion.div
          className="absolute -bottom-2 left-0 h-1 rounded-full bg-gradient-primary"
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />
      </h2>
      {subtitle && (
        <p className="text-textSecondary mx-auto mt-4 max-w-2xl text-lg md:text-xl">{subtitle}</p>
      )}
    </motion.div>
  );
};
