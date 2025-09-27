import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';
import { addGlobalStyles } from './styles/globalStyles';

// Import components
import FloatingIslands from './components/FloatingIslands';
import AIChat from './components/AIChat';
import VoiceCommand from './components/VoiceCommand';
import Collaboration from './components/Collaboration';

// Import sections
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import ContactSection from './components/ContactSection';

// Define types for particles
interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
}

function App() {
  // State for the active section
  const [activeSection, setActiveSection] = useState('home');
  const [isAnimating, setIsAnimating] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, vx: number, vy: number, color: string}>>([]);
  const [isHovered, setIsHovered] = useState<string | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  // Add global styles on component mount
  useEffect(() => {
    addGlobalStyles();
  }, []);

  // Mouse move effect for particles
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
    borderRadius: '20px',
    boxShadow: '0 10px 35px rgba(0, 0, 0, 0.2)',
  };

  // Form handling functions
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('sending');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitStatus('idle'), 3000);
    } catch (error) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 3000);
    }
  };

  // Animation helpers
  const triggerSectionAnimation = (section: string) => {
    setIsAnimating(true);
    setActiveSection(section);
    setTimeout(() => {
      setIsAnimating(false);
    }, 600);
  };

  // 3D CSS transforms for cards
  const get3DTransform = (index: number) => {
    const x = (Math.sin(Date.now() * 0.001 + index) * 2);
    const y = (Math.cos(Date.now() * 0.001 + index) * 2);
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
      <div style={{ position: 'relative', zIndex: 10 }}>
        {/* Main content */}
        <div style={{ padding: '100px 20px 20px', maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <ContactSection />
        </div>
        
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
          <div 
            key={particle.id} 
            style={{
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
            }} 
          />
        ))}

        {/* 3D Floating Elements */}
        {[...Array(6)].map((_, i) => (
          <div 
            key={i} 
            style={{
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
            }} 
          />
        ))}

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
          {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item) => (
            <button
              key={item}
              onClick={() => setActiveSection(item.toLowerCase())}
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
      </div>
      
      {/* Global Styles */}
      <style>{`
        @keyframes float0 { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-20px) rotate(180deg); } }
        @keyframes float1 { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-15px) rotate(-180deg); } }
        @keyframes float2 { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-25px) rotate(90deg); } }
        @keyframes float3 { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-18px) rotate(-90deg); } }
        @keyframes float4 { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-22px) rotate(270deg); } }
        @keyframes float5 { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-16px) rotate(-270deg); } }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.1); opacity: 1; }
        }
        
        @keyframes particleFade {
          0% { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(0.5); }
        }
        
        @keyframes navPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(124, 58, 237, 0.7); }
          70% { box-shadow: 0 0 0 10px rgba(124, 58, 237, 0); }
        }
      `}</style>
    </div>
  );
}

export default App;
