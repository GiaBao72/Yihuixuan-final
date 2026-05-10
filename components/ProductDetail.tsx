'use client';

import { useState } from 'react';
import { useLang } from '@/lib/useLang';
import '@/app/styles/product-detail.css';

interface ProductDetailProps {
  data: {
    id: string;
    num: string;
    label: string;
    title: string;
    titleEm: string;
    description: string;
    applications: string[];
    ctaText: string;
    ctaLink: string;
    reverse: boolean;
    gallery: Array<{
      type: 'video' | 'image';
      url: string;
    }>;
    specs: string[];
    advantages: string[];
  };
}

export default function ProductDetail({ data }: ProductDetailProps) {
  const { lang } = useLang();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Check if this is the first product (num === '01')
  const isFirstProduct = data.num === '01';
  
  // Check if description is long (>150 chars)
  
  // Helper function to add autoplay params to YouTube URL
  const getAutoplayVideoUrl = (url: string) => {
    if (!url.includes('youtube.com') && !url.includes('youtu.be')) return url;
    
    // Add autoplay, muted, loop, hide controls
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}autoplay=1&mute=1&loop=1&controls=0&modestbranding=1&rel=0&showinfo=0`;
  };

  // Helper function to get clean YouTube embed URL with controls
  const getModalVideoUrl = (url: string) => {
    if (!url.includes('youtube.com') && !url.includes('youtu.be')) return url;
    
    // Extract video ID
    let videoId = '';
    if (url.includes('youtube.com/embed/')) {
      videoId = url.split('youtube.com/embed/')[1].split('?')[0];
    } else if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1].split('?')[0];
    } else if (url.includes('youtube.com/watch?v=')) {
      videoId = url.split('v=')[1].split('&')[0];
    }
    
    // Return embed URL with controls enabled
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&modestbranding=1&rel=0`;
  };
  
  // For first product: show only 1 video
  // For second product: show 6 items
  // For others: show 9 items in masonry grid
  const isSecondProduct = data.num === '02';
  const targetCount = isFirstProduct ? 1 : (isSecondProduct ? 5 : 9);
  let displayGallery = [...data.gallery];
  
  if (!isFirstProduct) {
    // If less than target items, repeat items to fill
    if (displayGallery.length < targetCount) {
      while (displayGallery.length < targetCount) {
        const remaining = targetCount - displayGallery.length;
        const toAdd = data.gallery.slice(0, Math.min(remaining, data.gallery.length));
        displayGallery = [...displayGallery, ...toAdd];
      }
    }
    
    // Take only target items
    displayGallery = displayGallery.slice(0, targetCount);
  } else {
    // First product: take only first item (video)
    displayGallery = displayGallery.slice(0, 1);
  }

  // Assign fixed heights to gallery items (cycling pattern for 9 items)
  const heightClasses = ['masonry-h1', 'masonry-h2', 'masonry-h3', 'masonry-h2', 'masonry-h1', 'masonry-h3', 'masonry-h2', 'masonry-h1', 'masonry-h3'];

  // Helper for multilingual text
  const getText = (vi: string, zh: string, en: string) => {
    if (lang === 'vi') return vi;
    if (lang === 'en') return en;
    return zh;
  };

  return (
    <section className="pd-section" id={data.id}>
      <div className={`pd-container ${data.reverse ? 'pd-reverse' : ''}`}>
        
        {/* Text Side */}
        <div className="pd-text-side">
          <div className="pd-text-content">
            <div className="pd-header">
              <span className="pd-num">{data.num}</span>
              <span className="pd-label">{data.label}</span>
            </div>
            
            <h2 className="pd-title">
              {data.title} <em>{data.titleEm}</em>
            </h2>
            
            <div className="pd-desc-wrapper">
              <p className="pd-desc">
                {data.description}
              </p>
            </div>

            {/* Specs - Hide for first product */}
            {!isFirstProduct && data.specs && data.specs.length > 0 && (
              <div className="pd-section-box">
                <h3 className="pd-section-title">
                  {getText('⚙️ Thông số kỹ thuật', '⚙️ 技术规格', '⚙️ Technical Specifications')}
                </h3>
                <ul className="pd-list">
                  {data.specs.slice(0, 3).map((spec, idx) => (
                    <li key={idx}>{spec}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Advantages - Hide for first product */}
            {!isFirstProduct && data.advantages && data.advantages.length > 0 && (
              <div className="pd-section-box">
                <h3 className="pd-section-title">
                  {getText('✨ Ưu điểm nổi bật', '✨ 突出优势', '✨ Key Advantages')}
                </h3>
                <ul className="pd-list">
                  {data.advantages.slice(0, 3).map((adv, idx) => (
                    <li key={idx}>{adv}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Applications - Hide for first product */}
            {!isFirstProduct && data.applications && data.applications.length > 0 && (
              <div className="pd-section-box">
                <h3 className="pd-section-title">
                  {getText('🎯 Ứng dụng', '🎯 应用', '🎯 Applications')}
                </h3>
                <div className="pd-tags">
                  {data.applications.slice(0, 4).map((app, idx) => (
                    <span key={idx} className="pd-tag">{app}</span>
                  ))}
                </div>
              </div>
            )}

            <a href={data.ctaLink} className="pd-cta-btn">
              {data.ctaText}
            </a>
          </div>
        </div>

        {/* Masonry Grid Side */}
        <div className="pd-masonry-side">
          {isFirstProduct ? (
            /* First product: Show single video full-size */
            <div className="masonry-single-video">
              {displayGallery[0]?.type === 'video' ? (
                <div 
                  className="masonry-video-full"
                  onClick={() => setIsModalOpen(true)}
                  style={{ cursor: 'pointer', position: 'relative' }}
                >
                  <iframe
                    src={getAutoplayVideoUrl(displayGallery[0].url)}
                    title="Product Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: '12px',
                      pointerEvents: 'none'
                    }}
                  />
                  <div className="video-overlay">
                    <div className="video-play-icon">▶</div>
                  </div>
                </div>
              ) : (
                <img 
                  src={displayGallery[0]?.url} 
                  alt={data.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '12px'
                  }}
                />
              )}
            </div>
          ) : (
            /* Other products: Show masonry grid */
            <>
              {/* Desktop: Show all 9 images */}
              <div className="masonry-grid masonry-desktop">
                {displayGallery.map((item, idx) => (
                  <div
                    key={idx}
                    className={`masonry-item ${heightClasses[idx]}`}
                  >
                    {item.type === 'video' ? (
                      <div className="masonry-video">
                        <img 
                          src={`https://img.youtube.com/vi/${item.url.split('/').pop()}/mqdefault.jpg`}
                          alt={`Video ${idx + 1}`}
                        />
                        <div className="masonry-play">▶</div>
                      </div>
                    ) : (
                      <img src={item.url} alt={`${data.title} ${idx + 1}`} />
                    )}
                  </div>
                ))}
              </div>

              {/* Mobile: Show only first image */}
              <div className="masonry-mobile">
                <div className="masonry-item-single">
                  {data.gallery[0]?.type === 'video' ? (
                    <div className="masonry-video">
                      <img 
                        src={`https://img.youtube.com/vi/${data.gallery[0].url.split('/').pop()}/mqdefault.jpg`}
                        alt="Video"
                      />
                      <div className="masonry-play">▶</div>
                    </div>
                  ) : (
                    <img src={data.gallery[0]?.url} alt={data.title} />
                  )}
                </div>
              </div>
            </>
          )}
        </div>

      </div>

      {/* Video Modal */}
      {isModalOpen && isFirstProduct && displayGallery[0]?.type === 'video' && (
        <div className="video-modal" onClick={() => setIsModalOpen(false)}>
          <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="video-modal-close" 
              onClick={() => setIsModalOpen(false)}
              aria-label="Close"
            >
              ✕
            </button>
            <div className="video-modal-wrapper">
              <iframe
                src={getModalVideoUrl(displayGallery[0].url)}
                title="Product Video - Full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '12px'
                }}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}