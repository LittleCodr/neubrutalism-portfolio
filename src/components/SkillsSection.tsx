import React, { useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '../hooks/useGSAP';
import { skills } from '../data/data';

const SkillsSection = () => {
  useGSAP('.skill-animate', {
    trigger: '#skills',
    from: { y: 50, opacity: 0 },
    to: { y: 0, opacity: 1 },
    staggerChildren: 0.1,
  }, []);

  useEffect(() => {
    // Animate progress bars when they come into view
    const progressBars = document.querySelectorAll('.progress-bar-fill');
    
    progressBars.forEach((bar) => {
      const percentage = bar.getAttribute('data-percentage');
      
      gsap.fromTo(
        bar,
        { width: '0%' },
        {
          width: `${percentage}%`,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: bar,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none none',
          },
        }
      );
    });
  }, []);

  return (
    <section
      id="skills"
      className="py-20 md:py-32 relative overflow-hidden"
      style={{ backgroundColor: 'var(--light)' }}
    >
      {/* Background decorative elements */}
      <div 
        className="absolute -top-10 -right-10 w-40 h-40 rounded-full" 
        style={{ backgroundColor: 'var(--primary)', opacity: 0.1, zIndex: 0 }}
      ></div>
      <div 
        className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full" 
        style={{ backgroundColor: 'var(--tertiary)', opacity: 0.1, zIndex: 0 }}
      ></div>

      <div className="container mx-auto px-6 relative z-10">
        <h2 className="skill-animate text-4xl md:text-5xl font-bold mb-16 text-center">
          <span className="relative inline-block">
            My Skills
            <span 
              className="absolute -bottom-2 left-0 w-full h-3" 
              style={{ backgroundColor: 'var(--accent)', zIndex: -1 }}
            ></span>
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {skills.map((skill, index) => (
            <div key={index} className="skill-animate">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-lg">{skill.name}</h3>
                <span className="font-medium">{skill.percentage}%</span>
              </div>
              <div className="progress-bar bg-white">
                <div
                  className="progress-bar-fill"
                  data-percentage={skill.percentage}
                  style={{ backgroundColor: skill.color }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        <div className="skill-animate mt-16 neubrutalism-box p-6 md:p-10 bg-white max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--primary)' }}>
            Other Technical Competencies
          </h3>
          <div className="flex flex-wrap gap-3">
            {[
              'Python', 'Java', 'Swift', 'Kotlin', 'Firebase',
              'AWS', 'Docker', 'Kubernetes', 'Git', 'CI/CD',
              'GraphQL', 'REST APIs', 'MongoDB', 'SQL', 'NoSQL',
              'Web3', 'Blockchain', 'TensorFlow', 'PyTorch', 'NLP'
            ].map((tech, index) => (
              <span
                key={index}
                className="px-4 py-2 border-2 border-black font-medium transition-all hover:translate-x-1 hover:translate-y-1 cursor-default"
                style={{ 
                  backgroundColor: ['var(--primary)', 'var(--secondary)', 'var(--tertiary)', 'var(--accent)'][index % 4],
                  opacity: 0.8
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;