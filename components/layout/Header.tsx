"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { personalInfo, navigation } from "@/lib/portfolio-data";
import { scrollToElement } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { useScrollProgress } from "@/hooks/useScrollProgress";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY } = useScrollProgress();

  const isScrolled = scrollY > 50;

  const handleNavClick = (path: string) => {
    const sectionId = path.replace("#", "");
    scrollToElement(sectionId);
    setIsMenuOpen(false);
  };

  return (
    <motion.header
      className={cn(
        "fixed left-0 right-0 top-0 z-40 transition-all duration-300",
        isScrolled || isMenuOpen ? "bg-surface/95 shadow-lg backdrop-blur-lg" : "bg-transparent"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <nav className="container-custom py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="font-heading text-2xl font-bold text-text">
            <span className="text-accent">{personalInfo.name.split(" ")[0]}</span>
            <span className="ml-1">{personalInfo.name.split(" ")[1]}</span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {navigation.main.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavClick(item.path)}
                className="font-medium text-textSecondary transition-colors hover:text-accent"
              >
                {item.label}
              </button>
            ))}
            <Button variant="default" size="sm" onClick={() => handleNavClick(navigation.cta.path)}>
              {navigation.cta.label}
            </Button>
          </div>

          <button
            className="p-2 text-text md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 overflow-hidden border-t border-border py-4 md:hidden"
            >
              <div className="flex flex-col gap-4 px-2 pb-4">
                {navigation.main.map((item) => (
                  <button
                    key={item.path}
                    onClick={() => handleNavClick(item.path)}
                    className="block w-full rounded-lg px-4 py-3 text-left font-medium text-textSecondary transition-all hover:bg-surfaceLight hover:text-accent"
                  >
                    {item.label}
                  </button>
                ))}
                <div className="px-4 pt-2">
                  <Button
                    variant="default"
                    fullWidth
                    onClick={() => handleNavClick(navigation.cta.path)}
                  >
                    {navigation.cta.label}
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
