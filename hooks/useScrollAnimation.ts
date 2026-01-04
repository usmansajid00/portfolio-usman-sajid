"use client";

import { useEffect, RefObject } from "react";
import { useAnimation, AnimationControls } from "framer-motion";
import { useInView } from "./useInView";

interface UseScrollAnimationOptions {
  threshold?: number;
  triggerOnce?: boolean;
}

export function useScrollAnimation<T extends HTMLElement>(
  ref: RefObject<T>,
  options: UseScrollAnimationOptions = {}
): {
  controls: AnimationControls;
  inView: boolean;
} {
  const controls = useAnimation();
  const inView = useInView(ref, options);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else if (!options.triggerOnce) {
      controls.start("hidden");
    }
  }, [inView, controls, options.triggerOnce]);

  return { controls, inView };
}
