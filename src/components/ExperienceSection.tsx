import React, { useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '../hooks/useGSAP';
import { experiences } from '../data/data';

const ExperienceSection = () => {
  useGSAP('.experience-animate', {
    trigger: '#experience',
    from: { x: -50, opacity: 0 },
    to: { x: 0, opacity: 1 },
    staggerChildren: 0.2,
  }, []);

  useEffect(() => {
    // Timeline animation
    const timelineConnector = document.querySelector('.timeline-connector');
    
    if (timelineConnector) {
      gsap.fromTo(
        timelineConnector,
        { height: 0 },
        {
          height: '100%',
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '#experience',
            start: 'top 70%',
            end: 'bottom 80%',
            scrub: 1,
          },
        }
      );
    }
    
    // Timeline circle animations
    const timelineCircles = document.querySelectorAll('.timeline-circle');
    
    timelineCircles.forEach((circle) => {
      gsap.fromTo(
        circle,
        { scale: 0 },
        {
          scale: 1,
          duration: 0.5,
          ease: 'back.out(2)',
          scrollTrigger: {
            trigger: circle,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });
  }, []);

  return (
    <section
      id="experience"
      className="py-20 md:py-32 relative"
      style={{ backgroundColor: 'var(--tertiary)' }}
    >
      {/* Background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute bottom-0 left-0 w-64 h-64 rounded-full" 
          style={{ backgroundColor: 'var(--primary)', opacity: 0.1, zIndex: 0 }}
        ></div>
        <div 
          className="absolute top-20 right-20 w-40 h-40 rounded-full" 
          style={{ backgroundColor: 'var(--dark)', opacity: 0.1, zIndex: 0 }}
        ></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <h2 className="experience-animate text-4xl md:text-5xl font-bold mb-16 text-center">
          <span className="relative inline-block">
            Experience
            <span 
              className="absolute -bottom-2 left-0 w-full h-3" 
              style={{ backgroundColor: 'var(--secondary)', zIndex: -1 }}
            ></span>
          </span>
        </h2>

        <div className="relative max-w-4xl mx-auto pl-8 md:pl-0">
          {/* Timeline connector (the vertical line) */}
          <div 
            className="timeline-connector absolute left-0 md:left-1/2 top-0 w-1 h-full bg-black transform md:-translate-x-1/2"
            style={{ zIndex: 0 }}
          ></div>

          {experiences.map((exp, index) => (
            <div 
              key={exp.id}
              className={`experience-animate mb-16 relative flex flex-col ${
                index % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'
              } md:items-center`}
            >
              {/* Timeline circle */}
              <div 
                className="timeline-circle absolute left-0 md:left-1/2 w-6 h-6 rounded-full border-2 border-black transform -translate-x-3 md:-translate-x-3 z-10"
                style={{ backgroundColor: exp.color, top: '0px' }}
              ></div>
              
              {/* Experience card */}
              <div 
                className={`md:w-5/12 neubrutalism-box bg-white p-6 ${
                  index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'
                }`}
                style={{ marginLeft: index % 2 === 0 ? '2rem' : '', marginRight: index % 2 !== 0 ? '2rem' : '' }}
              >
                <h3 className="text-xl font-bold" style={{ color: 'var(--dark)' }}>
                  {exp.position}
                </h3>
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-medium" style={{ color: exp.color }}>
                    {exp.company}
                  </h4>
                  <span className="text-sm font-medium">{exp.duration}</span>
                </div>
                <p className="text-gray-700">
                  {exp.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="experience-animate text-center mt-16">
          <a
            href="#" 
            className="neubrutalism-button inline-block"
            style={{ backgroundColor: 'var(--secondary)' }}
            target="_blank"
            rel="noopener noreferrer"
          >
            Download Resume
          </a>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;