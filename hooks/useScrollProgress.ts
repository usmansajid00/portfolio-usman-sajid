"use client";

import { useEffect, useState } from "react";

interface ScrollProgress {
  scrollY: number;
  scrollYProgress: number;
  scrollDirection: "up" | "down" | null;
}

export function useScrollProgress(): ScrollProgress {
  const [scrollProgress, setScrollProgress] = useState<ScrollProgress>({
    scrollY: 0,
    scrollYProgress: 0,
    scrollDirection: null,
  });

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScrollProgress = () => {
      const scrollY = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollYProgress = documentHeight > 0 ? scrollY / documentHeight : 0;
      const scrollDirection = scrollY > lastScrollY ? "down" : scrollY < lastScrollY ? "up" : null;

      setScrollProgress({
        scrollY,
        scrollYProgress,
        scrollDirection,
      });

      lastScrollY = scrollY;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollProgress);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    updateScrollProgress();

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return scrollProgress;
}
