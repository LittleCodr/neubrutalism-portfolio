import { useState, useEffect } from 'react';

function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const glassStyle = {
    background: 'rgba(255, 255, 255, 0.08)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.12)',
    borderRadius: '20px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
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
      description: 'Real-time data visualization with ML predictions',
      tech: ['React', 'Python', 'TensorFlow', 'FastAPI'],
      status: 'Live',
      color: '#7c3aed'
    },
    {
      title: 'Cross-Platform Mobile App',
      description: 'React Native app with 50K+ downloads',
      tech: ['React Native', 'Firebase', 'Redux'],
      status: 'Published',
      color: '#06b6d4'
    },
    {
      title: 'Blockchain DeFi Platform',
      description: 'Decentralized finance application',
      tech: ['Solidity', 'Web3.js', 'Next.js'],
      status: 'Beta',
      color: '#22c55e'
    }
  ];

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #0b0f14 0%, #1a1f2e 50%, #0b0f14 100%)',
      color: '#e5e7eb', 
      fontFamily: 'system-ui, -apple-system, sans-serif',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated background elements */}
      <div style={{
        position: 'fixed',
        top: mousePosition.y - 100,
        left: mousePosition.x - 100,
        width: '200px',
        height: '200px',
        background: 'radial-gradient(circle, rgba(124, 58, 237, 0.1) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none',
        transition: 'all 0.3s ease',
        zIndex: 1
      }} />

      {/* Navigation */}
      <nav style={{
        position: 'fixed',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 100,
        ...glassStyle,
        padding: '12px 24px'
      }}>
        {['Hero', 'About', 'Skills', 'Projects', 'Contact'].map((item) => (
          <button
            key={item}
            onClick={() => setActiveSection(item.toLowerCase())}
            style={{
              background: activeSection === item.toLowerCase() ? '#7c3aed' : 'transparent',
              color: activeSection === item.toLowerCase() ? 'white' : '#e5e7eb',
              border: 'none',
              padding: '8px 16px',
              margin: '0 4px',
              borderRadius: '12px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontSize: '14px',
              fontWeight: '500'
            }}
          >
            {item}
          </button>
        ))}
      </nav>

      <div style={{ padding: '100px 20px 20px', maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        
        {/* Hero Section */}
        {activeSection === 'hero' && (
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <div style={{
              ...glassStyle,
              padding: '60px 40px',
              marginBottom: '40px',
              position: 'relative'
            }}>
              <div style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
                margin: '0 auto 30px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '48px',
                fontWeight: 'bold',
                color: 'white'
              }}>
                MA
              </div>
              <h1 style={{ 
                fontSize: '56px', 
                fontWeight: '800', 
                margin: '0 0 20px',
                background: 'linear-gradient(135deg, #7c3aed, #06b6d4, #22c55e)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Mayank Agrawal
              </h1>
              <p style={{ fontSize: '24px', opacity: 0.9, marginBottom: '30px' }}>
                Tech Lead • AI Engineer • Full-Stack Developer
              </p>
              <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <span style={{ ...glassStyle, padding: '8px 16px', fontSize: '14px' }}>🎯 GDG Tech Lead</span>
                <span style={{ ...glassStyle, padding: '8px 16px', fontSize: '14px' }}>🚀 MLSA</span>
                <span style={{ ...glassStyle, padding: '8px 16px', fontSize: '14px' }}>☁️ Google Cloud Facilitator</span>
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
          <div>
            <h2 style={{ fontSize: '36px', marginBottom: '30px', color: '#f43f5e', textAlign: 'center' }}>Featured Projects</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px' }}>
              {projects.map((project, index) => (
                <div key={index} style={{
                  ...glassStyle,
                  padding: '30px',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.boxShadow = `0 20px 40px rgba(0,0,0,0.4), 0 0 20px ${project.color}33`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
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
                    fontSize: '24px'
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
                        border: `1px solid ${project.color}44`
                      }}>
                        {tech}
                      </span>
                    ))}
                  </div>
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
      </div>
    </div>
  );
}

export default App;