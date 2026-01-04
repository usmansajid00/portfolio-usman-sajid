export interface PersonalInfo {
  name: string;
  title: string;
  subtitle: string;
  tagline: string;
  email: string;
  phone: string;
  location: {
    city: string;
    state: string;
    country: string;
    timezone: string;
  };
  social: {
    linkedin: string;
    github: string;
    twitter: string;
    medium: string;
    stackoverflow: string;
    fiverr: string;
    upwork: string;
  };
  avatar: string;
  resume: string;
}

export interface About {
  summary: string;
  mission: string;
  yearsOfExperience: string;
  projectsCompleted: number;
  clientSatisfaction: string;
  highlights: string[];
  availability: {
    status: string;
    preferredWorkType: string[];
    fullTimeInterest: boolean;
    hourlyRate: string;
    responseTime: string;
    workingHours: string;
    timezone: string;
  };
  futureLearning: string[];
}

export interface Experience {
  id: string;
  position: string;
  company: string;
  companyWebsite: string | null;
  location: string;
  type: string;
  startDate: string;
  endDate: string | null;
  current: boolean;
  duration: string;
  description: string;
  responsibilities: string[];
  technologies: string[];
  achievements: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa: number | null;
  achievements: string[];
}

export interface Skill {
  name: string;
  level: number;
  years?: number;
  icon?: string;
  category?: string;
}

export interface Skills {
  technical: {
    languages: Skill[];
    frontend: Skill[];
    styling: Skill[];
    backend: Skill[];
    database: Skill[];
    tools: Skill[];
    cloud: Skill[];
    other: Skill[];
  };
  soft: Skill[];
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  featured: boolean;
  thumbnail: string;
  images: string[];
  technologies: string[];
  features: string[];
  keyAchievements: string[];
  demoUrl: string | null;
  githubUrl: string | null;
  status: "Live" | "Completed" | "In Development";
  duration: string;
  role: string;
  teamSize: number;
  clientType: string;
}

export interface Testimonial {
  id: string;
  name: string;
  position: string;
  company: string;
  location: string;
  avatar: string;
  rating: number;
  text: string;
  project: string;
  projectCategory: string;
  date: string;
  verified: boolean;
}

export interface Service {
  id: string;
  title: string;
  icon: string;
  description: string;
  features: string[];
  technologies: string[];
  pricing: string;
}

export interface Stat {
  label: string;
  value: string;
  icon: string;
  color: string;
}

export interface Contact {
  email: string;
  phone: string;
  location: string;
  availability: string;
  preferredContact: string;
  responseTime: string;
  workingHours: string;
  timezone: string;
  calendly: string | null;
  whatsapp: string;
}

export interface SEO {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  ogImage: string;
  twitterHandle: string;
  structuredData: {
    "@context": string;
    "@type": string;
    name: string;
    jobTitle: string;
    url: string;
    sameAs: string[];
    address: {
      "@type": string;
      addressLocality: string;
      addressRegion: string;
      addressCountry: string;
    };
  };
}

export interface Theme {
  mode: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    surfaceLight: string;
    text: string;
    textSecondary: string;
    textMuted: string;
    border: string;
    error: string;
    success: string;
    warning: string;
    info: string;
  };
  gradients: {
    primary: string;
    secondary: string;
    accent: string;
    hero: string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    accent: string;
  };
  fonts: {
    body: string;
    heading: string;
    mono: string;
  };
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    full: string;
  };
  animations: {
    duration: {
      fast: string;
      normal: string;
      slow: string;
    };
    easing: {
      default: string;
      in: string;
      out: string;
      inOut: string;
    };
  };
}

export interface Settings {
  showGithubStats: boolean;
  showBlog: boolean;
  showTestimonials: boolean;
  showCertifications: boolean;
  enableContactForm: boolean;
  enableNewsletter: boolean;
  showAvailabilityStatus: boolean;
  enableAnimations: boolean;
  showProjectFilters: boolean;
  showSkillLevels: boolean;
  enableDarkMode: boolean;
  showSocialLinks: boolean;
  enableChatWidget: boolean;
  showResumeDownload: boolean;
  enableScrollAnimations: boolean;
  showBackToTop: boolean;
}

export interface NavigationItem {
  label: string;
  path: string;
  icon: string;
}

export interface Navigation {
  main: NavigationItem[];
  cta: {
    label: string;
    path: string;
    variant: string;
  };
}

export interface HeroSection {
  greeting: string;
  name: string;
  title: string;
  subtitle: string;
  tagline: string;
  description: string;
  image: string;
  cta: {
    label: string;
    path: string;
    variant: string;
  }[];
  stats: {
    value: string;
    label: string;
  }[];
}

export interface Footer {
  copyright: string;
  links: {
    label: string;
    path: string;
  }[];
  social: boolean;
  newsletter: boolean;
}

export interface Animations {
  pageTransitions: boolean;
  scrollReveal: boolean;
  hoverEffects: boolean;
  cursorFollow: boolean;
  particleBackground: boolean;
  typingEffect: boolean;
}

export interface Features {
  multiLanguage: boolean;
  analytics: boolean;
  seo: boolean;
  pwa: boolean;
  lazyLoading: boolean;
  imageoOptimization: boolean;
  codeHighlighting: boolean;
  searchFunctionality: boolean;
}

export interface PortfolioData {
  personalInfo: PersonalInfo;
  about: About;
  experience: Experience[];
  education: Education[];
  skills: Skills;
  projects: Project[];
  testimonials: Testimonial[];
  certifications: any[];
  services: Service[];
  stats: Stat[];
  blog: any[];
  contact: Contact;
  seo: SEO;
  theme: Theme;
  settings: Settings;
  navigation: Navigation;
  hero: HeroSection;
  footer: Footer;
  animations: Animations;
  features: Features;
}
