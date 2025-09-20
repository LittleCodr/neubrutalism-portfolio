import { useEffect } from 'react';
import gsap from 'gsap';
import { ExternalLink, Github } from 'lucide-react';
import { useGSAP } from '../hooks/useGSAP';
import { projects } from '../data/data';

const ProjectsSection = () => {
  useGSAP('.project-animate', {
    trigger: '#projects',
    from: { y: 100, opacity: 0 },
    to: { y: 0, opacity: 1 },
    staggerChildren: 0.2,
  }, []);

  useEffect(() => {
    // Project card hover animations
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach((card) => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          y: -15,
          boxShadow: '12px 12px 0 #000',
          duration: 0.3,
          ease: 'power2.out',
        });
        
        // Animate project image
        const projectImage = card.querySelector('.project-image');
        if (projectImage) {
          gsap.to(projectImage, {
            scale: 1.1,
            duration: 0.5,
            ease: 'power2.out',
          });
        }
        
        // Animate tags
        const tags = card.querySelectorAll('.project-tag');
        gsap.to(tags, {
          y: -5,
          stagger: 0.05,
          duration: 0.2,
          ease: 'power2.out',
        });
      });
      
      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          y: 0,
          boxShadow: '8px 8px 0 #000',
          duration: 0.3,
          ease: 'power2.out',
        });
        
        // Reset project image
        const projectImage = card.querySelector('.project-image');
        if (projectImage) {
          gsap.to(projectImage, {
            scale: 1,
            duration: 0.5,
            ease: 'power2.out',
          });
        }
        
        // Reset tags
        const tags = card.querySelectorAll('.project-tag');
        gsap.to(tags, {
          y: 0,
          stagger: 0.05,
          duration: 0.2,
          ease: 'power2.out',
        });
      });
    });
  }, []);

  return (
    <section
      id="projects"
      className="py-20 md:py-32 relative grid-bg"
      style={{ backgroundColor: 'var(--dark)' }}
    >
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-24 h-24 md:w-48 md:h-48 bg-tertiary -translate-y-1/2"></div>
      <div className="absolute top-1/4 left-0 w-16 h-16 md:w-32 md:h-32 bg-primary -translate-x-1/2"></div>

      <div className="container mx-auto px-6">
        <h2 className="project-animate text-4xl md:text-5xl font-bold mb-16 text-center neon-text">
          <span className="relative inline-block">
            My Projects
            <span 
              className="absolute -bottom-2 left-0 w-full h-3" 
              style={{ backgroundColor: 'var(--primary)', zIndex: -1, opacity: 0.5 }}
            ></span>
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {projects.map((project) => (
            <div
              key={project.id}
              className="project-animate project-card neubrutalism-box glass overflow-hidden"
            >
              <div className="overflow-hidden h-56">
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-image w-full h-full object-cover transition-transform duration-500"
                />
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3" style={{ color: 'var(--light)' }}>
                  {project.title}
                </h3>
                
                <p className="text-white/80 mb-4">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="project-tag px-3 py-1 text-sm font-medium transition-all"
                      style={{ 
                        backgroundColor: ['var(--primary)', 'var(--secondary)', 'var(--tertiary)', 'var(--accent)'][index % 4],
                        opacity: 0.8,
                        border: '1px solid rgba(255,255,255,0.12)'
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-4">
                  <a
                    href={project.link}
                    className="neubrutalism-button flex items-center gap-2 text-sm text-black"
                    style={{ backgroundColor: 'var(--tertiary)' }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>Live Demo</span>
                    <ExternalLink size={16} />
                  </a>
                  
                  <a
                    href="#"
                    className="neubrutalism-button flex items-center gap-2 text-sm text-white"
                    style={{ backgroundColor: 'var(--primary)' }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>Source Code</span>
                    <Github size={16} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="project-animate text-center mt-16">
          <a
            href="#"
            className="neubrutalism-button inline-block"
            style={{ backgroundColor: 'var(--primary)', color: 'white' }}
            target="_blank"
            rel="noopener noreferrer"
          >
            See All Projects
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;