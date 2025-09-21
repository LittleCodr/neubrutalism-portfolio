import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ChevronDown } from 'lucide-react';
import { useGSAP } from '../hooks/useGSAP';
import ThreeScene from './ThreeScene';

const HeroSection = () => {
  const [enable3D, setEnable3D] = useState<boolean>(() => {
    try {
      const flag = localStorage.getItem('disable3D');
      // Default to disabled for isolation; set flag if not present
      if (flag === null) localStorage.setItem('disable3D', '1');
      return flag === '0';
    } catch {
      return false;
    }
  });
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  
  useGSAP('.hero-animate', {
    from: { y: 50, opacity: 0 },
    to: { y: 0, opacity: 1 },
    duration: 1,
    staggerChildren: 0.2,
  }, []);

  useEffect(() => {
    // Check if 3D is disabled via ErrorBoundary button or manual flag
    try {
      const flag = localStorage.getItem('disable3D');
      setEnable3D(flag === '0');
    } catch {}
    // dev hint
    try { console.info('3D enabled?', enable3D, 'Toggle with localStorage.setItem("disable3D", "0"|"1"); then location.reload()'); } catch {}

    const tl = gsap.timeline();

    tl.fromTo(
      titleRef.current,
      { x: -100, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: 'power3.out' }
    )
      .fromTo(
        subtitleRef.current,
        { x: 100, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: 'power3.out' },
        '-=0.7'
      )
      .fromTo(
        ctaRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
        '-=0.5'
      );

    // Background animation
    const bgElements = document.querySelectorAll('.bg-element');
    bgElements.forEach((el, index) => {
      gsap.to(el, {
        y: `${(index % 2 === 0 ? '-' : '')}15px`,
        duration: 2 + index * 0.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: index * 0.2,
      });
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="min-h-screen relative flex flex-col justify-center items-center overflow-hidden grid-bg"
      style={{ backgroundColor: 'var(--dark)' }}
    >
      {/* 3D Background (toggleable) */}
      {enable3D && (
        <div className="absolute inset-0 -z-10">
          <ThreeScene />
        </div>
      )}
      {/* Gradient overlay for readability */}
      <div className="absolute inset-0 -z-10 pointer-events-none" style={{
        background: 'radial-gradient(800px 400px at 70% 0%, rgba(11,15,20,0) 0%, rgba(11,15,20,0.4) 60%, rgba(11,15,20,0.75) 100%)'
      }} />

      <div className="container mx-auto px-6 z-10 text-center">
        <h1
          ref={titleRef}
          className="hero-animate text-5xl md:text-7xl font-bold mb-6 neon-text"
          style={{ color: 'var(--light)' }}
        >
          <span>Hi, I'm </span>
          <span className="relative inline-block">
            <span style={{ color: 'var(--primary)' }}>Mayank</span>
            <span 
              className="absolute -bottom-2 left-0 w-full h-3" 
              style={{ backgroundColor: 'var(--secondary)', zIndex: -1, opacity: 0.5 }}
            ></span>
          </span>
        </h1>
        
        <p
          ref={subtitleRef}
          className="hero-animate text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-white/80"
        >
          Tech Lead @GDG | MLSA | Google Cloud Arcade Facilitator 2025
          <br />
          <span className="font-bold" style={{ color: 'var(--secondary)' }}>
            LLMs & Symbolic AI | Full-Stack, Android & iOS Dev | Automation, Web3 & Scalable Systems
          </span>
        </p>
        
        <div ref={ctaRef} className="hero-animate flex flex-col md:flex-row justify-center items-center gap-4 md:gap-6">
          <a
            href="#projects"
            className="neubrutalism-button text-white"
            style={{ backgroundColor: 'var(--primary)' }}
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="neubrutalism-button text-black"
            style={{ backgroundColor: 'var(--tertiary)', color: '#0b0f14' }}
          >
            Contact Me
          </a>
        </div>
      </div>
      
      <div className="absolute bottom-10 w-full flex justify-center animate-bounce">
        <a
          href="#about"
          className="p-2 rounded-full border-2 border-black"
          onClick={(e) => {
            e.preventDefault();
            document.querySelector('#about')?.scrollIntoView({
              behavior: 'smooth',
            });
          }}
        >
          <ChevronDown size={24} />
        </a>
      </div>
    </section>
  );
};

export default HeroSection;