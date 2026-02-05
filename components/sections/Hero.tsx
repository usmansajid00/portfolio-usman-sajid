"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SocialLinks } from "@/components/shared/SocialLinks";
import { portfolioData } from "@/lib/portfolio-data";
import { scaleIn, staggerContainer, staggerItem, bounceAnimation } from "@/lib/animations";
import { cn, scrollToElement, parseCounterValue } from "@/lib/utils";

const Counter: React.FC<{ endValue: string; duration?: number }> = ({ endValue, duration = 2 }) => {
  const [count, setCount] = useState(0);
  const { num, suffix } = parseCounterValue(endValue);

  useEffect(() => {
    const startTime = Date.now();
    const endTime = startTime + duration * 1000;

    const updateCount = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / (endTime - startTime), 1);
      const currentCount = progress * num;

      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      }
    };

    requestAnimationFrame(updateCount);
  }, [num, duration]);

  const displayValue = num % 1 !== 0 ? count.toFixed(1) : Math.floor(count);

  return (
    <span className="text-gradient">
      {displayValue}
      {suffix}
    </span>
  );
};

// Particle Background Component
const ParticleBackground = () => {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-primary/20 blur-xl"
          initial={{
            x: Math.random() * 100 + "%",
            y: Math.random() * 100 + "%",
            scale: Math.random() * 0.5 + 0.5,
            opacity: Math.random() * 0.3 + 0.1,
          }}
          animate={{
            y: [Math.random() * 100 + "%", Math.random() * 100 + "%"],
            x: [Math.random() * 100 + "%", Math.random() * 100 + "%"],
          }}
          transition={{
            duration: Math.random() * 20 + 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
          }}
          style={{
            width: Math.random() * 300 + 100 + "px",
            height: Math.random() * 300 + 100 + "px",
          }}
        />
      ))}
    </div>
  );
};

export default function Hero() {
  const { hero, personalInfo } = portfolioData;
  const [typedText, setTypedText] = useState("");
  const fullText = hero.name;
  const typingSpeed = 100;

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, typingSpeed);

    return () => clearInterval(typingInterval);
  }, [fullText]);

  const handleScroll = (elementId: string) => {
    scrollToElement(elementId);
  };

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background pb-12 pt-24 lg:py-20"
    >
      <ParticleBackground />

      <div className="container-custom relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="order-2 flex flex-col items-center text-center lg:order-1 lg:items-start lg:text-left"
          >
            <motion.div
              variants={staggerItem}
              className="mb-6 inline-block rounded-full border border-accent/20 bg-accent/10 px-4 py-1.5"
            >
              <span className="text-sm font-medium text-accent">👋 {hero.greeting}</span>
            </motion.div>

            <motion.h1
              variants={staggerItem}
              className="text-text mb-4 font-heading text-4xl font-bold leading-tight sm:text-5xl md:text-6xl lg:text-7xl"
            >
              {typedText}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
                className="ml-1 inline-block h-10 w-1 bg-accent md:h-16"
              />
            </motion.h1>

            <motion.h2
              variants={staggerItem}
              className="from-textSecondary to-textMuted mb-6 bg-gradient-to-r bg-clip-text font-heading text-xl font-semibold text-transparent md:text-3xl"
            >
              {hero.title}
            </motion.h2>

            <motion.p
              variants={staggerItem}
              className="mb-8 text-lg font-medium text-primary md:text-2xl"
            >
              {hero.subtitle}
            </motion.p>

            <motion.p
              variants={staggerItem}
              className="text-textSecondary mb-8 max-w-2xl text-base leading-relaxed md:text-xl"
            >
              {hero.description}
            </motion.p>

            <motion.div
              variants={staggerItem}
              className="mb-10 flex flex-wrap justify-center gap-4 lg:justify-start"
            >
              {hero.cta.map(
                (button: { label: string; path: string; variant: string }, index: number) => (
                  <Button
                    key={index}
                    variant={button.variant === "primary" ? "default" : "outline"}
                    size="lg"
                    onClick={() => handleScroll(button.path.replace("#", ""))}
                    className={cn(
                      "min-w-[140px]",
                      button.variant === "primary"
                        ? "bg-gradient-primary shadow-lg shadow-primary/25 hover:shadow-primary/40"
                        : "border-accent text-accent hover:bg-accent hover:text-white"
                    )}
                  >
                    {button.label}
                  </Button>
                )
              )}
            </motion.div>

            <motion.div
              variants={staggerContainer}
              className="mb-10 grid w-full grid-cols-3 gap-6 border-t border-border pt-8"
            >
              {hero.stats.map((stat: { value: string; label: string }, index: number) => (
                <motion.div key={index} variants={staggerItem} className="text-center lg:text-left">
                  <div className="mb-1 font-heading text-2xl font-bold text-foreground md:text-4xl">
                    <Counter endValue={stat.value} />
                  </div>
                  <p className="text-textMuted text-xs md:text-base">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={staggerItem}>
              <SocialLinks social={personalInfo.social} iconSize={24} />
            </motion.div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={scaleIn}
            className="order-1 flex justify-center lg:order-2"
          >
            <div className="relative h-64 w-64 sm:h-80 sm:w-80 md:h-96 md:w-96 lg:h-[500px] lg:w-[500px]">
              <div className="absolute inset-0 animate-pulse rounded-full bg-gradient-primary opacity-20 blur-3xl" />
              <div className="relative h-full w-full rotate-3 overflow-hidden rounded-2xl border-2 border-accent/30 bg-surface/50 shadow-2xl shadow-accent/20 backdrop-blur-sm transition-all duration-500 hover:rotate-0">
                <Image
                  src={hero.image}
                  alt={personalInfo.name}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 300px, (max-width: 1024px) 384px, 400px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-4 left-1/2 flex hidden -translate-x-1/2 cursor-pointer flex-col items-center gap-2 lg:flex"
        onClick={() => handleScroll("about")}
        animate={bounceAnimation}
      >
        <span className="text-textMuted text-sm font-medium uppercase tracking-widest">Scroll</span>
        <ChevronDown className="h-5 w-5 text-accent" />
      </motion.div>
    </section>
  );
}
