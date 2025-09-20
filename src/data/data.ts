import { ProjectType, SkillType, ExperienceType, SocialLinkType } from '../types';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';

export const projects: ProjectType[] = [
  {
    id: 1,
    title: "AI-Powered Chat Application",
    description: "A real-time chat application with AI-based response suggestions and sentiment analysis.",
    tags: ["React", "Node.js", "Machine Learning", "Socket.io"],
    image: "https://images.pexels.com/photos/4050291/pexels-photo-4050291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    link: "#"
  },
  {
    id: 2,
    title: "Mobile Task Manager",
    description: "Cross-platform mobile application for task management with cloud synchronization and reminders.",
    tags: ["React Native", "Firebase", "Redux", "Mobile Development"],
    image: "https://images.pexels.com/photos/6070443/pexels-photo-6070443.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    link: "#"
  },
  {
    id: 3,
    title: "E-commerce Platform",
    description: "Full-featured e-commerce solution with payment processing, inventory management, and analytics.",
    tags: ["Next.js", "Stripe", "MongoDB", "Tailwind CSS"],
    image: "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    link: "#"
  },
  {
    id: 4,
    title: "AR Navigation System",
    description: "Augmented reality application for indoor navigation in complex buildings like malls and airports.",
    tags: ["AR", "iOS", "Android", "3D Modeling"],
    image: "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    link: "#"
  },
];

export const skills: SkillType[] = [
  { name: "JavaScript/TypeScript", percentage: 95, color: "#FFD700" },
  { name: "React/React Native", percentage: 90, color: "#61DAFB" },
  { name: "AI & Machine Learning", percentage: 85, color: "#FF6B6B" },
  { name: "iOS Development", percentage: 80, color: "#4ECDC4" },
  { name: "Android Development", percentage: 85, color: "#3DDC84" },
  { name: "Node.js & Express", percentage: 88, color: "#68A063" },
  { name: "UI/UX Design", percentage: 75, color: "#FF9E7D" },
  { name: "Cloud & DevOps", percentage: 70, color: "#007FFF" },
];

export const experiences: ExperienceType[] = [
  {
    id: 1,
    position: "Microsoft Learn Student Ambassador",
    company: "Microsoft",
    duration: "April 2025 – Present",
    description: "Promoting Microsoft technologies and educating fellow students on cloud computing, AI, and developer tools.",
    color: "#ff6b6b"
  },
  {
    id: 2,
    position: "iOS App Developer",
    company: "Apple",
    duration: "June 2023 – Present",
    description: "Developing innovative iOS applications using Swift and SwiftUI, focusing on performant and user-friendly interfaces.",
    color: "#4ecdc4"
  },
  {
    id: 3,
    position: "Android Developer",
    company: "Freelance",
    duration: "June 2020 – Present",
    description: "Creating custom Android applications for clients, specializing in Kotlin and Jetpack Compose.",
    color: "#ffe66d"
  },
  {
    id: 4,
    position: "Technical Lead",
    company: "Google Developers Group – GLA University",
    duration: "March 2025 – Present",
    description: "Leading technical initiatives and workshops, mentoring junior developers, and organizing community events.",
    color: "#1a535c"
  },
];

export const socialLinks: SocialLinkType[] = [
  {
    platform: "LinkedIn",
    url: "https://linkedin.com/in/littlecodr",
    icon: "linkedin"
  },
  {
    platform: "GitHub",
    url: "https://github.com/LittleCodr",
    icon: "github"
  },
  {
    platform: "Email",
    url: "mailto:littlecodr@gmail.com",
    icon: "mail"
  },
  {
    platform: "Twitter",
    url: "#",
    icon: "twitter"
  }
];

export const contactInfo = {
  email: "littlecodr@gmail.com",
  phone: "7818823774",
  location: "Mathura, Uttar Pradesh, India"
};