import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AnimationOptions {
  trigger?: string;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  markers?: boolean;
  toggleActions?: string;
  duration?: number;
  delay?: number;
  ease?: string;
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  staggerChildren?: number;
  staggerFrom?: gsap.TweenVars;
  staggerTo?: gsap.TweenVars;
}

export const useGSAP = (
  selector: string,
  options: AnimationOptions = {},
  dependencies: any[] = []
) => {
  const animationRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const elements = document.querySelectorAll(selector);
    
    if (elements.length === 0) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: options.trigger ? {
          trigger: options.trigger,
          start: options.start || 'top 80%',
          end: options.end || 'bottom 20%',
          scrub: options.scrub || false,
          markers: options.markers || false,
          toggleActions: options.toggleActions || 'play none none none',
        } : undefined,
      });

      animationRef.current = tl;

      if (options.from && options.to) {
        tl.fromTo(selector, options.from, {
          ...options.to,
          duration: options.duration || 1,
          delay: options.delay || 0,
          ease: options.ease || 'power2.out',
        });
      } else if (options.from) {
        tl.from(selector, {
          ...options.from,
          duration: options.duration || 1,
          delay: options.delay || 0,
          ease: options.ease || 'power2.out',
        });
      } else if (options.to) {
        tl.to(selector, {
          ...options.to,
          duration: options.duration || 1,
          delay: options.delay || 0,
          ease: options.ease || 'power2.out',
        });
      }

      if (options.staggerFrom && options.staggerTo) {
        tl.staggerFromTo(
          selector,
          options.duration || 1,
          options.staggerFrom,
          options.staggerTo,
          options.staggerChildren || 0.1
        );
      } else if (options.staggerFrom) {
        tl.staggerFrom(
          selector,
          options.duration || 1,
          options.staggerFrom,
          options.staggerChildren || 0.1
        );
      } else if (options.staggerTo) {
        tl.staggerTo(
          selector,
          options.duration || 1,
          options.staggerTo,
          options.staggerChildren || 0.1
        );
      }
    });

    return () => {
      ctx.revert();
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, dependencies);

  return animationRef;
};

export const useHoverAnimation = (
  selector: string,
  hoverAnimation: gsap.TweenVars,
  dependencies: any[] = []
) => {
  useEffect(() => {
    const elements = document.querySelectorAll(selector);
    
    if (elements.length === 0) return;

    const ctx = gsap.context(() => {
      elements.forEach((element) => {
        const enterAnimation = () => {
          gsap.to(element, {
            ...hoverAnimation,
            duration: 0.3,
            ease: 'power2.out',
          });
        };

        const leaveAnimation = () => {
          gsap.to(element, {
            ...Object.fromEntries(
              Object.entries(hoverAnimation).map(([key, value]) => {
                if (typeof value === 'number') {
                  return [key, 0];
                }
                return [key, ''];
              })
            ),
            duration: 0.3,
            ease: 'power2.out',
          });
        };

        element.addEventListener('mouseenter', enterAnimation);
        element.addEventListener('mouseleave', leaveAnimation);
      });
    });

    return () => {
      ctx.revert();
      elements.forEach((element) => {
        element.removeEventListener('mouseenter', () => {});
        element.removeEventListener('mouseleave', () => {});
      });
    };
  }, dependencies);
};