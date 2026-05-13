import '@/app/styles/products-split-screen.css';
'use client';

import { useState, useRef } from 'react';
import { useLang } from '@/lib/useLang';
import Link from 'next/link';

interface Product {
  id: string;
  num: string;
  tag: string;
  name: string;
  image: string;
  shortDescription?: string;
  slug: string;
  ctaLink?: string;
}

interface ProductsSplitScreenProps {
  products: Product[];
}

export default function ProductsSplitScreen({ products }: ProductsSplitScreenProps) {
  const [activeProduct, setActiveProduct] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const { lang, t } = useLang();

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && activeProduct < products.length - 1) {
      setActiveProduct(activeProduct + 1);
    }
    if (isRightSwipe && activeProduct > 0) {
      setActiveProduct(activeProduct - 1);
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  return (
    <section className="fp-slide" id="s1">
      <div className="orb orb1"></div>
      <div className="ps-wrap">
        
        {/* DESKTOP: LEFT - Product List */}
        <div className="ps-left ps-desktop-only">
          <div className="ps-header">
            <div className="sec-label anim">{lang === 'vi' ? 'Dòng sản phẩm' : '产品系列'}</div>
            <h2 className="sec-title anim" style={{ marginBottom: 0 }}>
              {lang === 'vi' ? 'Giải pháp laser ' : '激光解决方案 '}<em>{lang === 'vi' ? 'toàn diện' : '全面'}</em>
            </h2>
          </div>
          
          <div className="ps-list">
            {products.map((product, index) => (
              <div
                key={product.id}
                className={`ps-item anim ${activeProduct === index ? 'active' : ''}`}
                data-panel={`p-${product.id}`}
                onClick={() => setActiveProduct(index)}
                onMouseEnter={() => setActiveProduct(index)}
              >
                <span className="ps-num">{product.num}</span>
                <div className="ps-item-text">
                  <div className="ps-item-tag">{product.tag}</div>
                  <div className="ps-item-name">{product.name}</div>
                </div>
                <span className="ps-item-arr">→</span>
              </div>
            ))}
          </div>
        </div>

        {/* DESKTOP: RIGHT - Product Panels */}
        <div className="ps-right ps-desktop-only">
          {products.map((product, index) => (
            <div
              key={product.id}
              id={`p-${product.id}`}
              className={`ps-panel ${activeProduct === index ? 'active' : ''}`}
            >
              <div className="ps-panel-img">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="ps-panel-content">
                <h3>{product.name}</h3>
                <p>{product.shortDescription}</p>
                <Link href={`/products/${product.slug}`} className="btn btn-fill">
                  {t.view_detail} <span className="btn-arr">→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* MOBILE: Slider */}
        <div className="ps-mobile-only">
          <div className="ps-header">
            <div className="sec-label anim">{lang === 'vi' ? 'Dòng sản phẩm' : '产品系列'}</div>
            <h2 className="sec-title anim">
              {lang === 'vi' ? 'Giải pháp laser ' : '激光解决方案 '}<em>{lang === 'vi' ? 'toàn diện' : '全面'}</em>
            </h2>
          </div>
          
          <div 
            className="ps-mobile-slider"
            ref={sliderRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div 
              className="ps-mobile-track"
              style={{ transform: `translateX(-${activeProduct * 100}%)` }}
            >
              {products.map((product) => (
                <div key={product.id} className="ps-mobile-card">
                  <div className="ps-mobile-img">
                    <img src={product.image} alt={product.name} />
                  </div>
                  <div className="ps-mobile-content">
                    <div className="ps-item-tag">{product.tag}</div>
                    <h3>{product.name}</h3>
                    <p>{product.shortDescription}</p>
                    <Link href={`/products/${product.slug}`} className="btn btn-fill">
                      {t.view_detail} <span className="btn-arr">→</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="ps-mobile-dots">
            {products.map((_, index) => (
              <button
                key={index}
                className={`ps-dot ${activeProduct === index ? 'active' : ''}`}
                onClick={() => setActiveProduct(index)}
                aria-label={`Go to product ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
