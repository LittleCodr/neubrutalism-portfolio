export interface ProjectType {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
  link: string;
}

export interface SkillType {
  name: string;
  percentage: number;
  color: string;
}

export interface ExperienceType {
  id: number;
  position: string;
  company: string;
  duration: string;
  description: string;
  color: string;
}

export interface SocialLinkType {
  platform: string;
  url: string;
  icon: string;
}