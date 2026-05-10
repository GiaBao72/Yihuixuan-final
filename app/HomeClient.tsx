'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ProductDetail from '@/components/ProductDetail';
import Industries from '@/components/Industries';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import ProgressDots from '@/components/ProgressDots';
import ContactButtons from '@/components/ContactButtons';
import { useLang } from '@/lib/useLang';

interface HomeClientProps {
  products: any[];
  productDetails: any[];
  productsZh?: any[];
  productDetailsZh?: any[];
  productsEn?: any[];
  productDetailsEn?: any[];
}

export default function HomeClient({ products, productDetails, productsZh, productDetailsZh, productsEn, productDetailsEn }: HomeClientProps) {
  const [gsapLoaded, setGsapLoaded] = useState(false);
  const { lang } = useLang();

  // Select products based on current language
  const currentProducts = lang === 'zh' && productsZh ? productsZh 
                        : lang === 'en' && productsEn ? productsEn 
                        : products;
  const currentProductDetails = lang === 'zh' && productDetailsZh ? productDetailsZh 
                              : lang === 'en' && productDetailsEn ? productDetailsEn 
                              : productDetails;

  const scrollToSection = (index: number) => {
    const sectionIds = ['s0', 'sp1', 'sp2', 'sp3', 'sp4', 'sp5', 's8', 's9', 's10'];
    const section = document.getElementById(sectionIds[index] || `s${index}`);
    section?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (!gsapLoaded) return;

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    const handleScroll = () => {
      navbar?.classList.toggle('solid', window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [gsapLoaded]);

  return (
    <>
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"
        strategy="afterInteractive"
        onLoad={() => setGsapLoaded(true)}
      />

      <Navbar />
      <ProgressDots scrollToSection={scrollToSection} />
      
      <div id="fp-wrapper">
        <div id="fp-track">
          <Hero scrollToSection={scrollToSection} />
          {currentProductDetails.map((product: any) => (
            <ProductDetail key={product.id} data={product} />
          ))}
          
          <Industries />
          <Testimonials scrollToSection={scrollToSection} />
          <Contact />
        </div>
      </div>

      <ContactButtons />
    </>
  );
}
