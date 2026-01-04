"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, CheckCircle, Smile, GitCommit } from "lucide-react";
import { Card } from "@/components/ui/card";
import { stats } from "@/lib/portfolio-data";
import { useInView } from "@/hooks/useInView";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { parseCounterValue } from "@/lib/utils";

const iconMap: Record<string, React.ReactNode> = {
  clock: <Clock size={32} />,
  "check-circle": <CheckCircle size={32} />,
  smile: <Smile size={32} />,
  "git-commit": <GitCommit size={32} />,
};

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
    <span>
      {displayValue}
      {suffix}
    </span>
  );
};

export default function Stats() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref);

  return (
    <section id="stats" ref={ref} className="section bg-background">
      <div className="container-custom">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {stats.map((stat, index) => (
            <motion.div key={index} variants={staggerItem}>
              <Card variant="gradient" hover className="p-8 text-center">
                <div className="mb-4 flex justify-center text-accent">
                  {iconMap[stat.icon] || <CheckCircle size={32} />}
                </div>
                <div className="text-gradient mb-2 font-heading text-4xl font-bold md:text-5xl">
                  {inView && <Counter endValue={stat.value} />}
                </div>
                <p className="font-medium text-textSecondary">{stat.label}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
