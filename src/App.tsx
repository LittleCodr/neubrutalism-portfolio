import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import ExperienceSection from './components/ExperienceSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

function App() {
  useEffect(() => {
    // Set page title and favicon
    document.title = "Mayank Agrawal | Portfolio";
    const favicon = document.querySelector("link[rel='icon']");
    if (favicon) {
      favicon.setAttribute("href", "https://i.pinimg.com/736x/9b/b1/34/9bb1343336ea695552ade93c3f856909.jpg");
    }

    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);

    // Initial page load animation
    const tl = gsap.timeline();
    tl.to("body", { 
      opacity: 1, 
      duration: 0.5,
      ease: "power2.inOut"
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        if (href) {
          document.querySelector(href)?.scrollIntoView({
            behavior: 'smooth'
          });
        }
      });
    });

    // Customize cursor (optional advanced feature)
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.position = 'fixed';
    cursor.style.width = '20px';
    cursor.style.height = '20px';
    cursor.style.borderRadius = '50%';
    cursor.style.backgroundColor = 'var(--primary)';
    cursor.style.opacity = '0.5';
    cursor.style.pointerEvents = 'none';
    cursor.style.zIndex = '9999';
    cursor.style.transform = 'translate(-50%, -50%)';
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: 'power2.out'
      });
    });

    // Cleanup
    return () => {
      document.body.removeChild(cursor);
    };
  }, []);

  return (
    <div className="App">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;