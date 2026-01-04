import { PortfolioData } from "@/types/portfolio";
import portfolioJson from "@/data/portfolio.json";

export const portfolioData = portfolioJson as unknown as PortfolioData;

export const {
  personalInfo,
  about,
  experience,
  education,
  skills,
  projects,
  testimonials,
  services,
  stats,
  contact,
  seo,
  theme,
  settings,
  navigation,
  hero,
  footer,
  animations,
  features,
} = portfolioData;
