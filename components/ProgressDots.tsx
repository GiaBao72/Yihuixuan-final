'use client';

import { useEffect, useState } from 'react';

interface ProgressDotsProps {
  scrollToSection: (index: number) => void;
}

export default function ProgressDots({ scrollToSection }: ProgressDotsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const totalSlides = 11; // s0 to s10

  useEffect(() => {
    const updateActiveDot = () => {
      const slides = Array.from(document.querySelectorAll('.fp-slide'));
      const scrollPos = window.scrollY + window.innerHeight / 2;
      let newActiveIndex = 0;
      
      slides.forEach((slide, i) => {
        const rect = (slide as HTMLElement).getBoundingClientRect();
        const slideTop = rect.top + window.scrollY;
        if (scrollPos >= slideTop) newActiveIndex = i;
      });
      
      setActiveIndex(newActiveIndex);
    };
    
    window.addEventListener('scroll', updateActiveDot, { passive: true });
    updateActiveDot();
    
    return () => window.removeEventListener('scroll', updateActiveDot);
  }, []);

  return (
    <div id="fp-dots">
      {Array.from({ length: totalSlides }, (_, i) => (
        <div 
          key={i}
          className={`fp-dot ${i === activeIndex ? 'active' : ''}`}
          onClick={() => scrollToSection(i)}
          aria-label={`Go to section ${i}`}
        />
      ))}
    </div>
  );
}
