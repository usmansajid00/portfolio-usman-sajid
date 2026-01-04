"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaTwitter, FaMedium, FaStackOverflow } from "react-icons/fa";
import { SiFiverr, SiUpwork, SiFreelancer } from "react-icons/si";
import { cn } from "@/lib/utils";

interface SocialLink {
  name: string;
  url: string;
  icon: React.ReactNode;
}

interface SocialLinksProps {
  social: {
    linkedin?: string;
    github?: string;
    twitter?: string;
    medium?: string;
    stackoverflow?: string;
    fiverr?: string;
    upwork?: string;
  };
  className?: string;
  iconSize?: number;
  showLabels?: boolean;
}

export const SocialLinks: React.FC<SocialLinksProps> = ({
  social,
  className,
  iconSize = 20,
  showLabels = false,
}) => {
  const socialLinks: SocialLink[] = [
    { name: "LinkedIn", url: social.linkedin || "", icon: <FaLinkedin size={iconSize} /> },
    { name: "GitHub", url: social.github || "", icon: <FaGithub size={iconSize} /> },
    { name: "Twitter", url: social.twitter || "", icon: <FaTwitter size={iconSize} /> },
    { name: "Medium", url: social.medium || "", icon: <FaMedium size={iconSize} /> },
    {
      name: "Stack Overflow",
      url: social.stackoverflow || "",
      icon: <FaStackOverflow size={iconSize} />,
    },
    { name: "Fiverr", url: social.fiverr || "", icon: <SiFiverr size={iconSize} /> },
    { name: "Upwork", url: social.upwork || "", icon: <SiUpwork size={iconSize} /> },
  ].filter((link) => link.url);

  return (
    <div className={cn("flex items-center gap-4", className)}>
      {socialLinks.map((link) => (
        <motion.div
          key={link.name}
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg p-2 text-textSecondary transition-colors hover:bg-accent/10 hover:text-accent"
            aria-label={link.name}
          >
            {link.icon}
            {showLabels && <span className="text-sm font-medium">{link.name}</span>}
          </Link>
        </motion.div>
      ))}
    </div>
  );
};
