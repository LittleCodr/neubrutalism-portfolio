import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';
import FloatingIslands from './components/FloatingIslands';
import AIChat from './components/AIChat';
import VoiceCommand from './components/VoiceCommand';
import Collaboration from './components/Collaboration';
import { Hero, About, Skills, Projects, Contact } from './components/sections';
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, vx: number, vy: number, color: string}>>([]);
  const [isHovered, setIsHovered] = useState<string | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Create sexy particle trail on mouse move
      if (Math.random() > 0.7) {
        const newParticle = {
          id: Date.now() + Math.random(),
          x: e.clientX,
          y: e.clientY,
          vx: (Math.random() - 0.5) * 4,
          vy: (Math.random() - 0.5) * 4,
          color: ['#7c3aed', '#06b6d4', '#22c55e', '#f59e0b', '#ef4444'][Math.floor(Math.random() * 5)]
        };
        setParticles(prev => [...prev.slice(-20), newParticle]);
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animate particles
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev => prev.map(p => ({
        ...p,
        x: p.x + p.vx,
        y: p.y + p.vy,
        vx: p.vx * 0.98,
        vy: p.vy * 0.98
      })).filter(p => Math.abs(p.vx) > 0.1 || Math.abs(p.vy) > 0.1));
    }, 16);
    
    return () => clearInterval(interval);
  }, []);

  const glassStyle = {
    background: 'rgba(255, 255, 255, 0.08)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.12)',
    borderRadius: '20px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
  };

  const sexyGlassStyle = {
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
    backdropFilter: 'blur(25px)',
    border: '1px solid rgba(255, 255, 255, 0.18)',
    borderRadius: '25px',
    boxShadow: '0 15px 35px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
  };

  const skills = [
    { name: 'React/Next.js', level: 95, color: '#61dafb' },
    { name: 'TypeScript', level: 90, color: '#3178c6' },
    { name: 'Python/AI', level: 88, color: '#3776ab' },
    { name: 'Node.js', level: 85, color: '#339933' },
    { name: 'Mobile Dev', level: 82, color: '#ff6b6b' },
    { name: 'Web3/Blockchain', level: 78, color: '#f7931e' },
  ];

  const projects = [
    {
      title: 'AI-Powered Analytics Dashboard',
      description: 'Real-time data visualization with ML predictions and automated insights',
      tech: ['React', 'Python', 'TensorFlow', 'FastAPI', 'PostgreSQL'],
      status: 'Live',
      color: '#7c3aed',
      link: 'https://analytics.mayank.dev',
      github: 'https://github.com/LittleCodr/ai-analytics'
    },
    {
      title: 'Cross-Platform Mobile App',
      description: 'React Native app with 50K+ downloads and 4.8★ rating',
      tech: ['React Native', 'Firebase', 'Redux', 'TypeScript'],
      status: 'Published',
      color: '#06b6d4',
      link: 'https://play.google.com/store/apps/details?id=com.mayank.app',
      github: 'https://github.com/LittleCodr/mobile-app'
    },
    {
      title: 'Blockchain DeFi Platform',
      description: 'Decentralized finance application with yield farming',
      tech: ['Solidity', 'Web3.js', 'Next.js', 'Hardhat'],
      status: 'Beta',
      color: '#22c55e',
      link: 'https://defi.mayank.dev',
      github: 'https://github.com/LittleCodr/defi-platform'
    },
    {
      title: 'AI Code Assistant',
      description: 'VS Code extension powered by GPT-4 for code generation',
      tech: ['TypeScript', 'OpenAI API', 'VS Code API'],
      status: 'Live',
      color: '#f59e0b',
      link: 'https://marketplace.visualstudio.com/items?itemName=mayank.ai-assistant',
      github: 'https://github.com/LittleCodr/ai-code-assistant'
    },
    {
      title: 'Real-time Chat Platform',
      description: 'Scalable chat app with video calls and file sharing',
      tech: ['Socket.io', 'WebRTC', 'Node.js', 'MongoDB'],
      status: 'Live',
      color: '#ef4444',
      link: 'https://chat.mayank.dev',
      github: 'https://github.com/LittleCodr/chat-platform'
    },
    {
      title: 'E-commerce Automation',
      description: 'Automated inventory management with ML price optimization',
      tech: ['Python', 'Selenium', 'Pandas', 'AWS Lambda'],
      status: 'Private',
      color: '#8b5cf6',
      link: '#',
      github: '#'
    }
  ];

  // Form handling functions
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('sending');
    
    // Simulate API call
    setTimeout(() => {
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '', rating: 5 });
      setTimeout(() => setSubmitStatus(''), 3000);
    }, 1500);
  };

  // Animation helpers
  const triggerSectionAnimation = (section: string) => {
    setIsAnimating(true);
    setActiveSection(section);
    setTimeout(() => setIsAnimating(false), 500);
  };

  // 3D CSS transforms for cards
  const get3DTransform = (index: number) => {
    const time = Date.now() * 0.001;
    const x = Math.sin(time + index) * 2;
    const y = Math.cos(time + index * 0.5) * 1;
    return `translateZ(0) rotateX(${y}deg) rotateY(${x}deg)`;
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: `
        radial-gradient(circle at 20% 80%, rgba(124, 58, 237, 0.15) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(6, 182, 212, 0.15) 0%, transparent 50%),
        radial-gradient(circle at 40% 40%, rgba(34, 197, 94, 0.1) 0%, transparent 50%),
        linear-gradient(135deg, #0a0e1a 0%, #1a1f2e 25%, #0f1419 50%, #1e2a3a 75%, #0a0e1a 100%)
      `,
      color: '#e5e7eb', 
      fontFamily: 'system-ui, -apple-system, sans-serif',
      position: 'relative',
      overflow: 'hidden',
      '--gradient-1': '#7c3aed',
      '--gradient-2': '#06b6d4',
      '--gradient-3': '#22c55e',
      '--gradient-4': '#f59e0b',
      '--gradient-5': '#ef4444'
    } as React.CSSProperties}>
      
      {/* 3D Background */}
      <FloatingIslands />
      
      {/* AI Assistant */}
      <AIChat />
      
      {/* Voice Command */}
      <VoiceCommand />
      
      {/* Collaboration */}
      <Collaboration />
      {/* Sexy Mouse Cursor Effect */}
      <div style={{
        position: 'fixed',
        top: mousePosition.y - 150,
        left: mousePosition.x - 150,
        width: '300px',
        height: '300px',
        background: `
          radial-gradient(circle, 
            rgba(124, 58, 237, 0.2) 0%, 
            rgba(6, 182, 212, 0.15) 30%, 
            rgba(34, 197, 94, 0.1) 60%, 
            transparent 80%
          )
        `,
        borderRadius: '50%',
        pointerEvents: 'none',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        zIndex: 1,
        filter: 'blur(2px)',
        animation: 'pulse 3s ease-in-out infinite'
      }} />

      {/* Particle System */}
      {particles.map(particle => (
        <div key={particle.id} style={{
          position: 'fixed',
          top: particle.y,
          left: particle.x,
          width: '4px',
          height: '4px',
          background: particle.color,
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 2,
          boxShadow: `0 0 10px ${particle.color}`,
          animation: 'particleFade 1s ease-out forwards'
        }} />
      ))}

      {/* 3D Floating Elements */}
      {[...Array(6)].map((_, i) => (
        <div key={i} style={{
          position: 'fixed',
          top: `${20 + i * 15}%`,
          left: `${10 + i * 12}%`,
          width: '60px',
          height: '60px',
          background: `linear-gradient(135deg, ${['#7c3aed', '#06b6d4', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6'][i]}, transparent)`,
          borderRadius: i % 2 === 0 ? '50%' : '20%',
          opacity: 0.1,
          transform: get3DTransform(i),
          animation: `float${i} ${3 + i}s ease-in-out infinite`,
          pointerEvents: 'none',
          zIndex: 1
        }} />
      ))}

      <style>{`
        @keyframes float0 { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-20px) rotate(180deg); } }
        @keyframes float1 { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-15px) rotate(-180deg); } }
        @keyframes float2 { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-25px) rotate(90deg); } }
        @keyframes float3 { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-18px) rotate(-90deg); } }
        @keyframes float4 { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-22px) rotate(270deg); } }
        @keyframes float5 { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-16px) rotate(-270deg); } }
      `}</style>

      {/* Sexy Navigation */}
      <nav style={{
        position: 'fixed',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 100,
        ...sexyGlassStyle,
        padding: '16px 32px',
        display: 'flex',
        gap: '8px'
      }}>
        {['Hero', 'About', 'Skills', 'Projects', 'Contact', 'Feedback'].map((item, index) => (
          <button
            key={item}
            onClick={() => triggerSectionAnimation(item.toLowerCase())}
            onMouseEnter={() => setIsHovered(item)}
            onMouseLeave={() => setIsHovered(null)}
            style={{
              background: activeSection === item.toLowerCase() 
                ? 'linear-gradient(135deg, #7c3aed, #06b6d4)' 
                : isHovered === item 
                  ? 'rgba(124, 58, 237, 0.2)' 
                  : 'transparent',
              color: activeSection === item.toLowerCase() ? 'white' : '#e5e7eb',
              border: activeSection === item.toLowerCase() 
                ? '1px solid rgba(255, 255, 255, 0.3)' 
                : '1px solid rgba(255, 255, 255, 0.1)',
              padding: '10px 20px',
              borderRadius: '15px',
              cursor: 'pointer',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              fontSize: '14px',
              fontWeight: '600',
              transform: isHovered === item ? 'translateY(-2px) scale(1.05)' : 'translateY(0) scale(1)',
              boxShadow: activeSection === item.toLowerCase() 
                ? '0 10px 25px rgba(124, 58, 237, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)' 
                : isHovered === item 
                  ? '0 5px 15px rgba(124, 58, 237, 0.2)' 
                  : 'none',
              backdropFilter: 'blur(10px)',
              animation: activeSection === item.toLowerCase() ? 'navPulse 2s ease-in-out infinite' : 'none'
            }}
          >
            {item}
          </button>
        ))}
      </nav>

      <div style={{ padding: '100px 20px 20px', maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        
        {/* Hero Section */}
        {activeSection === 'hero' && (
          <div style={{ 
            textAlign: 'center', 
            marginBottom: '60px',
            opacity: isAnimating ? 0 : 1,
            transform: isAnimating ? 'scale(0.95) translateY(20px)' : 'scale(1) translateY(0)',
            transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
          }}>
            <div style={{
              ...sexyGlassStyle,
              padding: '80px 50px',
              marginBottom: '40px',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Sexy gradient overlay */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(45deg, rgba(124, 58, 237, 0.1), rgba(6, 182, 212, 0.1), rgba(34, 197, 94, 0.1))',
                opacity: 0.6,
                zIndex: -1
              }} />
              
              <div style={{
                width: '140px',
                height: '140px',
                borderRadius: '50%',
                background: `
                  linear-gradient(135deg, #7c3aed 0%, #06b6d4 50%, #22c55e 100%),
                  linear-gradient(45deg, #f59e0b, #ef4444)
                `,
                backgroundSize: '200% 200%',
                margin: '0 auto 40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '52px',
                fontWeight: 'bold',
                color: 'white',
                boxShadow: '0 20px 40px rgba(124, 58, 237, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                animation: 'gradientShift 4s ease-in-out infinite, avatarFloat 3s ease-in-out infinite',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1) rotate(5deg)';
                e.currentTarget.style.boxShadow = '0 25px 50px rgba(124, 58, 237, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(124, 58, 237, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
              }}>
                MA
              </div>
              <h1 style={{ 
                fontSize: '64px', 
                fontWeight: '900', 
                margin: '0 0 25px',
                background: 'linear-gradient(90deg, #7c3aed, #06b6d4, #22c55e, #f59e0b, #ef4444, #7c3aed)',
                backgroundSize: '200% auto',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animation: 'textShimmer 3s linear infinite',
                textShadow: '0 0 30px rgba(124, 58, 237, 0.5)',
                letterSpacing: '-2px'
              }}>
                Mayank Agrawal
              </h1>
              <p style={{ fontSize: '24px', opacity: 0.9, marginBottom: '30px' }}>
                Tech Lead • AI Engineer • Full-Stack Developer
              </p>
              <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
                {[
                  { text: '🎯 GDG Tech Lead', color: '#7c3aed' },
                  { text: '🚀 MLSA', color: '#06b6d4' },
                  { text: '☁️ Google Cloud Facilitator', color: '#22c55e' }
                ].map((badge, index) => (
                  <span 
                    key={index}
                    style={{ 
                      ...sexyGlassStyle, 
                      padding: '12px 20px', 
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      animation: `sexyGlow 3s ease-in-out infinite ${index * 0.5}s`,
                      border: `1px solid ${badge.color}44`
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
                      e.currentTarget.style.background = `${badge.color}22`;
                      e.currentTarget.style.borderColor = badge.color;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0) scale(1)';
                      e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))';
                      e.currentTarget.style.borderColor = `${badge.color}44`;
                    }}
                  >
                    {badge.text}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* About Section */}
        {activeSection === 'about' && (
          <div style={{ ...glassStyle, padding: '40px', marginBottom: '40px' }}>
            <h2 style={{ fontSize: '36px', marginBottom: '30px', color: '#06b6d4' }}>About Me</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
              <div>
                <h3 style={{ color: '#7c3aed', marginBottom: '15px' }}>🤖 AI & Machine Learning</h3>
                <p style={{ lineHeight: '1.6', opacity: 0.9 }}>
                  Specialized in LLMs, Symbolic AI, and cutting-edge machine learning solutions. 
                  Building intelligent systems that solve real-world problems.
                </p>
              </div>
              <div>
                <h3 style={{ color: '#22c55e', marginBottom: '15px' }}>💻 Full-Stack Development</h3>
                <p style={{ lineHeight: '1.6', opacity: 0.9 }}>
                  Expert in modern web technologies, mobile development (Android & iOS), 
                  and scalable system architecture.
                </p>
              </div>
              <div>
                <h3 style={{ color: '#f43f5e', marginBottom: '15px' }}>🌐 Web3 & Innovation</h3>
                <p style={{ lineHeight: '1.6', opacity: 0.9 }}>
                  Passionate about blockchain technology, DeFi, and building the future of 
                  decentralized applications.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Skills Section */}
        {activeSection === 'skills' && (
          <div style={{ ...glassStyle, padding: '40px', marginBottom: '40px' }}>
            <h2 style={{ fontSize: '36px', marginBottom: '30px', color: '#22c55e' }}>Skills & Expertise</h2>
            <div style={{ display: 'grid', gap: '20px' }}>
              {skills.map((skill, index) => (
                <div key={skill.name} style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontWeight: '600' }}>{skill.name}</span>
                    <span style={{ color: skill.color }}>{skill.level}%</span>
                  </div>
                  <div style={{
                    width: '100%',
                    height: '8px',
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: '4px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: `${skill.level}%`,
                      height: '100%',
                      background: `linear-gradient(90deg, ${skill.color}, ${skill.color}aa)`,
                      borderRadius: '4px',
                      transition: 'width 2s ease',
                      boxShadow: `0 0 10px ${skill.color}44`
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects Section */}
        {activeSection === 'projects' && (
          <div style={{ 
            opacity: isAnimating ? 0 : 1, 
            transform: isAnimating ? 'translateY(20px)' : 'translateY(0)',
            transition: 'all 0.5s ease'
          }}>
            <h2 style={{ fontSize: '36px', marginBottom: '30px', color: '#f43f5e', textAlign: 'center' }}>Featured Projects</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px' }}>
              {projects.map((project, index) => (
                <div key={index} style={{
                  ...glassStyle,
                  padding: '30px',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  cursor: 'pointer',
                  transform: `perspective(1000px) rotateX(${Math.sin(Date.now() * 0.001 + index) * 2}deg)`,
                  animation: `projectFloat ${2 + index * 0.5}s ease-in-out infinite`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-15px) scale(1.02)';
                  e.currentTarget.style.boxShadow = `0 25px 50px rgba(0,0,0,0.5), 0 0 30px ${project.color}44`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';
                }}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '12px',
                    background: `linear-gradient(135deg, ${project.color}, ${project.color}aa)`,
                    marginBottom: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                    animation: 'iconSpin 4s linear infinite'
                  }}>
                    🚀
                  </div>
                  <h3 style={{ fontSize: '24px', marginBottom: '15px', color: project.color }}>{project.title}</h3>
                  <p style={{ marginBottom: '20px', opacity: 0.9, lineHeight: '1.6' }}>{project.description}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
                    {project.tech.map((tech, i) => (
                      <span key={i} style={{
                        background: 'rgba(255,255,255,0.1)',
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        border: `1px solid ${project.color}44`,
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = `${project.color}22`;
                        e.currentTarget.style.transform = 'scale(1.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                        e.currentTarget.style.transform = 'scale(1)';
                      }}>
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <div style={{
                      display: 'inline-block',
                      background: project.color,
                      color: 'white',
                      padding: '8px 16px',
                      borderRadius: '20px',
                      fontSize: '14px',
                      fontWeight: '600'
                    }}>
                      {project.status}
                    </div>
                    {project.link !== '#' && (
                      <a href={project.link} target="_blank" rel="noopener noreferrer" style={{
                        ...glassStyle,
                        padding: '8px 12px',
                        textDecoration: 'none',
                        color: 'inherit',
                        fontSize: '12px',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = `${project.color}22`;
                        e.currentTarget.style.transform = 'scale(1.05)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                        e.currentTarget.style.transform = 'scale(1)';
                      }}>
                        🔗 Live
                      </a>
                    )}
                    {project.github !== '#' && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer" style={{
                        ...glassStyle,
                        padding: '8px 12px',
                        textDecoration: 'none',
                        color: 'inherit',
                        fontSize: '12px',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = `${project.color}22`;
                        e.currentTarget.style.transform = 'scale(1.05)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                        e.currentTarget.style.transform = 'scale(1)';
                      }}>
                        🐱 Code
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Contact Section */}
        {activeSection === 'contact' && (
          <div style={{ ...glassStyle, padding: '40px', textAlign: 'center' }}>
            <h2 style={{ fontSize: '36px', marginBottom: '30px', color: '#f43f5e' }}>Let's Connect</h2>
            <p style={{ fontSize: '18px', marginBottom: '40px', opacity: 0.9 }}>
              Ready to collaborate on your next big project? Let's build something amazing together!
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
              {[
                { name: 'LinkedIn', url: 'https://www.linkedin.com/in/littlecodr/', icon: '💼', color: '#0077b5' },
                { name: 'GitHub', url: 'https://github.com/LittleCodr', icon: '🐱', color: '#333' },
                { name: 'Twitter', url: 'https://x.com/mindflayer_69', icon: '🐦', color: '#1da1f2' },
                { name: 'Email', url: 'mailto:contact@mayank.dev', icon: '📧', color: '#ea4335' }
              ].map((contact) => (
                <a key={contact.name} href={contact.url} style={{
                  ...glassStyle,
                  padding: '20px',
                  textDecoration: 'none',
                  color: 'inherit',
                  display: 'block',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.background = `${contact.color}22`;
                  e.currentTarget.style.borderColor = contact.color;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                }}>
                  <div style={{ fontSize: '32px', marginBottom: '10px' }}>{contact.icon}</div>
                  <div style={{ fontWeight: '600' }}>{contact.name}</div>
                </a>
              ))}
            </div>
            <div style={{
              ...glassStyle,
              padding: '20px',
              background: 'linear-gradient(135deg, #7c3aed22, #06b6d422)',
              border: '1px solid #7c3aed44'
            }}>
              <p style={{ margin: 0, fontSize: '16px' }}>
                🚀 Available for freelance projects and full-time opportunities
              </p>
            </div>
          </div>
        )}

        {/* Feedback Section */}
        {activeSection === 'feedback' && (
          <div style={{ 
            opacity: isAnimating ? 0 : 1, 
            transform: isAnimating ? 'translateY(20px)' : 'translateY(0)',
            transition: 'all 0.5s ease'
          }}>
            <h2 style={{ fontSize: '36px', marginBottom: '30px', color: '#f59e0b', textAlign: 'center' }}>Send Feedback</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'start' }}>
              
              {/* Contact Form */}
              <div style={{ ...glassStyle, padding: '40px' }}>
                <h3 style={{ fontSize: '24px', marginBottom: '20px', color: '#06b6d4' }}>Get In Touch</h3>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.12)',
                        borderRadius: '12px',
                        color: '#e5e7eb',
                        fontSize: '16px',
                        outline: 'none',
                        transition: 'all 0.3s ease'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#7c3aed';
                        e.target.style.boxShadow = '0 0 0 3px rgba(124, 58, 237, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'rgba(255,255,255,0.12)';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                  
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.12)',
                        borderRadius: '12px',
                        color: '#e5e7eb',
                        fontSize: '16px',
                        outline: 'none',
                        transition: 'all 0.3s ease'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#06b6d4';
                        e.target.style.boxShadow = '0 0 0 3px rgba(6, 182, 212, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'rgba(255,255,255,0.12)';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>Rating</label>
                    <select
                      name="rating"
                      value={formData.rating}
                      onChange={handleInputChange}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.12)',
                        borderRadius: '12px',
                        color: '#e5e7eb',
                        fontSize: '16px',
                        outline: 'none'
                      }}
                    >
                      <option value={5}>⭐⭐⭐⭐⭐ Excellent</option>
                      <option value={4}>⭐⭐⭐⭐ Good</option>
                      <option value={3}>⭐⭐⭐ Average</option>
                      <option value={2}>⭐⭐ Poor</option>
                      <option value={1}>⭐ Very Poor</option>
                    </select>
                  </div>
                  
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.12)',
                        borderRadius: '12px',
                        color: '#e5e7eb',
                        fontSize: '16px',
                        outline: 'none',
                        resize: 'vertical',
                        transition: 'all 0.3s ease'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#22c55e';
                        e.target.style.boxShadow = '0 0 0 3px rgba(34, 197, 94, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'rgba(255,255,255,0.12)';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={submitStatus === 'sending'}
                    style={{
                      padding: '16px 32px',
                      background: submitStatus === 'success' ? '#22c55e' : 'linear-gradient(135deg, #7c3aed, #06b6d4)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '12px',
                      fontSize: '16px',
                      fontWeight: '600',
                      cursor: submitStatus === 'sending' ? 'not-allowed' : 'pointer',
                      transition: 'all 0.3s ease',
                      opacity: submitStatus === 'sending' ? 0.7 : 1
                    }}
                    onMouseEnter={(e) => {
                      if (submitStatus !== 'sending') {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 10px 25px rgba(124, 58, 237, 0.3)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    {submitStatus === 'sending' ? '🚀 Sending...' : 
                     submitStatus === 'success' ? '✅ Sent!' : 
                     '📤 Send Message'}
                  </button>
                </form>
              </div>

              {/* Quick Stats & Info */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ ...glassStyle, padding: '30px', textAlign: 'center' }}>
                  <h3 style={{ fontSize: '20px', marginBottom: '20px', color: '#f59e0b' }}>📊 Portfolio Stats</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div>
                      <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#7c3aed' }}>6+</div>
                      <div style={{ fontSize: '14px', opacity: 0.8 }}>Projects</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#06b6d4' }}>50K+</div>
                      <div style={{ fontSize: '14px', opacity: 0.8 }}>Downloads</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#22c55e' }}>3+</div>
                      <div style={{ fontSize: '14px', opacity: 0.8 }}>Years Exp</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#f59e0b' }}>95%</div>
                      <div style={{ fontSize: '14px', opacity: 0.8 }}>Client Satisfaction</div>
                    </div>
                  </div>
                </div>

                <div style={{ ...glassStyle, padding: '30px' }}>
                  <h3 style={{ fontSize: '20px', marginBottom: '15px', color: '#ef4444' }}>🚀 Currently Working On</h3>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    <li style={{ marginBottom: '10px', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                      🤖 Advanced AI Chat Assistant
                    </li>
                    <li style={{ marginBottom: '10px', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                      📱 Cross-Platform Mobile Framework
                    </li>
                    <li style={{ marginBottom: '10px', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                      🌐 Web3 Gaming Platform
                    </li>
                    <li style={{ padding: '8px 0' }}>
                      ☁️ Cloud Infrastructure Automation
                    </li>
                  </ul>
                </div>

                <div style={{ ...glassStyle, padding: '20px', textAlign: 'center' }}>
                  <p style={{ margin: 0, fontSize: '16px', opacity: 0.9 }}>
                    💡 <strong>Response Time:</strong> Usually within 24 hours
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Sexy CSS Animations */}
      <style>{`
        @keyframes projectFloat {
          0%, 100% { transform: translateY(0px) rotateZ(0deg); }
          50% { transform: translateY(-10px) rotateZ(1deg); }
        }
        @keyframes iconSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.1); opacity: 1; }
        }
        @keyframes particleFade {
          0% { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(0.5); }
        }
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes avatarFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes navPulse {
          0%, 100% { box-shadow: 0 10px 25px rgba(124, 58, 237, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2); }
          50% { box-shadow: 0 15px 35px rgba(124, 58, 237, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.3); }
        }
        @keyframes sexyGlow {
          0%, 100% { 
            box-shadow: 0 0 20px rgba(124, 58, 237, 0.3), 0 0 40px rgba(6, 182, 212, 0.2); 
          }
          50% { 
            box-shadow: 0 0 30px rgba(124, 58, 237, 0.5), 0 0 60px rgba(6, 182, 212, 0.3); 
          }
        }
        @keyframes textShimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        
        /* Sexy scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #7c3aed, #06b6d4);
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, #8b5cf6, #0891b2);
        }
        
        /* Sexy selection */
        ::selection {
          background: rgba(124, 58, 237, 0.3);
          color: white;
        }
        
        /* Sexy focus outline */
        *:focus {
          outline: 2px solid rgba(124, 58, 237, 0.5);
          outline-offset: 2px;
        }
      `}</style>
    </div>
  );
}

// Add global styles for the new components
const globalStyles = `
  /* Smooth scroll behavior */
  html {
    scroll-behavior: smooth;
  }
  
  /* Custom scrollbar for the entire app */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  
  ::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 10px;
  }
  
  ::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, var(--gradient-1), var(--gradient-2));
    border-radius: 10px;
    transition: all 0.3s ease;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(135deg, var(--gradient-4), var(--gradient-5));
  }
  
  /* Custom selection color */
  ::selection {
    background: rgba(124, 58, 237, 0.3);
    color: white;
  }
  
  /* Custom focus styles */
  *:focus {
    outline: 2px solid rgba(124, 58, 237, 0.5);
    outline-offset: 2px;
  }
  
  /* Animation keyframes */
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 0.8; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.05); }
  }
  
  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
`;

// Add global styles to the document
const styleElement = document.createElement('style');
styleElement.innerHTML = globalStyles;
document.head.appendChild(styleElement);

export default App;