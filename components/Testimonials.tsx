'use client';

import { useLang } from '@/lib/useLang';
import '@/app/styles/testimonials.css';

interface TestimonialsProps {
  scrollToSection: (index: number) => void;
}

export default function Testimonials({ scrollToSection }: TestimonialsProps) {
  const { lang, t } = useLang();
  
  const testimonials = [
    { textKey: 'testimonials_1_text', authorKey: 'testimonials_1_author', companyKey: 'testimonials_1_company' },
    { textKey: 'testimonials_2_text', authorKey: 'testimonials_2_author', companyKey: 'testimonials_2_company' },
    { textKey: 'testimonials_3_text', authorKey: 'testimonials_3_author', companyKey: 'testimonials_3_company' },
    { textKey: 'testimonials_4_text', authorKey: 'testimonials_4_author', companyKey: 'testimonials_4_company' },
    { textKey: 'testimonials_5_text', authorKey: 'testimonials_5_author', companyKey: 'testimonials_5_company' },
    { textKey: 'testimonials_6_text', authorKey: 'testimonials_6_author', companyKey: 'testimonials_6_company' },
  ];
  
  return (
    <section className="fp-slide testimonials-section" id="s9">
      <div className="grid-bg"></div>
      <div className="orb orb2"></div>
      
      <div className="slide-inner">
        <div className="testimonials-header">
          <div className="sec-label anim">{t.testimonials_label}</div>
          <h2 className="sec-title anim">
            {t.testimonials_title} <em>{t.testimonials_title_em}</em>
          </h2>
          <p className="sec-sub anim">{t.testimonials_subtitle}</p>
        </div>
        
        <div className="testimonials-grid">
          {testimonials.map((item, index) => (
            <TestimonialCard
              key={index}
              text={(t as any)[item.textKey]}
              author={(t as any)[item.authorKey]}
              company={(t as any)[item.companyKey]}
              delay={index * 0.1}
            />
          ))}
        </div>
        
        <div className="testimonials-cta anim">
          <button 
            className="btn btn-primary" 
            onClick={() => scrollToSection(10)}
          >
            {t.contact_us} <span className="btn-arr">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}

interface TestimonialCardProps {
  text: string;
  author: string;
  company: string;
  delay: number;
}

function TestimonialCard({ text, author, company, delay }: TestimonialCardProps) {
  return (
    <div 
      className="testimonial-card anim" 
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="testimonial-quote">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <path d="M10 8.5C10 6.01472 7.98528 4 5.5 4C3.01472 4 1 6.01472 1 8.5C1 10.9853 3.01472 13 5.5 13C6.16667 13 6.8 12.8667 7.4 12.6L7 16C7 18.2091 5.20914 20 3 20H2V22H3C6.31371 22 9 19.3137 9 16L10 8.5Z" fill="currentColor"/>
          <path d="M23 8.5C23 6.01472 20.9853 4 18.5 4C16.0147 4 14 6.01472 14 8.5C14 10.9853 16.0147 13 18.5 13C19.1667 13 19.8 12.8667 20.4 12.6L20 16C20 18.2091 18.2091 20 16 20H15V22H16C19.3137 22 22 19.3137 22 16L23 8.5Z" fill="currentColor"/>
        </svg>
      </div>
      
      <p className="testimonial-text">{text}</p>
      
      <div className="testimonial-author">
        <div className="author-avatar">
          <span>{author.charAt(0).toUpperCase()}</span>
        </div>
        <div className="author-info">
          <strong className="author-name">{author}</strong>
          <span className="author-company">{company}</span>
        </div>
      </div>
    </div>
  );
}
