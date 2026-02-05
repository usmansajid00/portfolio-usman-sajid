"use client";

import React from "react";
import { SocialLinks } from "@/components/shared/SocialLinks";
import { personalInfo, navigation } from "@/lib/portfolio-data";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface py-12">
      <div className="container-custom">
        <div className="mb-8 grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-text mb-4 font-heading text-xl font-bold">{personalInfo.name}</h3>
            <p className="text-textSecondary mb-4">{personalInfo.tagline}</p>
          </div>

          <div>
            <h4 className="text-text mb-4 font-heading text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              {navigation.main.slice(1, 6).map((item) => (
                <li key={item.path}>
                  <a
                    href={item.path}
                    className="text-textSecondary transition-colors hover:text-accent"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-text mb-4 font-heading text-lg font-semibold">Connect</h4>
            <SocialLinks social={personalInfo.social} iconSize={20} />
          </div>
        </div>

        <div className="border-t border-border pt-8 text-center">
          <p className="text-textMuted text-sm">
            © {currentYear} {personalInfo.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
