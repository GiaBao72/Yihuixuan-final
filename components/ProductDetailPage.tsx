'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useLang } from '@/lib/useLang';
import '@/app/styles/product-detail-page.css';

interface Feature {
  id: number;
  title: string;
  description: string;
}

interface ProductImage {
  id: number;
  url: string;
  alternativeText: string;
  width: number;
  height: number;
}

interface GalleryItem {
  id: number;
  url: string;
  mime: string;
  alternativeText?: string;
  width: number;
  height: number;
}

interface Product {
  id: number;
  name: string;
  slug: string;
  shortDescription: string;
  detailedContent?: string;
  fullDescription: string;
  features: Feature[];
  mainImage: ProductImage;
  detailImage: ProductImage;
  gallery?: GalleryItem[];
  otherProducts: Array<{
    id: number;
    name: string;
    slug: string;
    shortDescription: string;
    mainImage: ProductImage;
  }>;
}

// Extract specs from HTML table
function extractSpecsFromHTML(html: string): Array<{key: string, value: string}> {
  const tableMatch = html.match(/<table[^>]*>([\s\S]*?)<\/table>/i);
  if (!tableMatch) return [];
  
  const rows = tableMatch[1].match(/<tr[^>]*>([\s\S]*?)<\/tr>/gi);
  if (!rows) return [];
  
  const specs: Array<{key: string, value: string}> = [];
  
  for (const row of rows) {
    const cells = row.match(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/gi);
    if (cells && cells.length >= 2) {
      const key = cells[0].replace(/<[^>]+>/g, '').trim();
      const value = cells[1].replace(/<[^>]+>/g, '').trim();
      
      if (key !== 'Thông số' && key !== 'Giá trị' && key !== 'Specification' && key !== 'Value') {
        specs.push({ key, value });
      }
    }
  }
  
  return specs;
}

export default function ProductDetailPage({ product }: { product: Product }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'overview' | 'specs'>('overview');
  const { lang } = useLang();

  const galleryItems = product.gallery && product.gallery.length > 0 
    ? product.gallery 
    : [product.mainImage];

  const activeItem = galleryItems[activeIndex];
  const isVideo = 'mime' in activeItem && activeItem.mime?.startsWith('video/');
  const specs = Array.isArray(product.specs) && product.specs.length > 0
    ? product.specs.map((s: any) => ({ key: s.label, value: s.value }))
    : extractSpecsFromHTML(product.detailedContent || '');

  const translations = {
    vi: {
      breadcrumb_home: 'Trang chủ',
      breadcrumb_products: 'Sản phẩm',
      tab_overview: 'Tổng quan',
      tab_specs: 'Thông số kỹ thuật',
      tab_features: 'Tính năng',
      cta_contact: 'Liên hệ tư vấn',
      cta_quote: 'Yêu cầu báo giá',
      related_title: 'Sản phẩm',
      related_title_em: 'liên quan',
      related_label: 'KHÁM PHÁ THÊM',
      view_details: 'Xem chi tiết →',
      category: 'DÒNG SẢN PHẨM LASER',
    },
    zh: {
      breadcrumb_home: '首页',
      breadcrumb_products: '产品',
      tab_overview: '概述',
      tab_specs: '技术规格',
      tab_features: '特点',
      cta_contact: '联系咨询',
      cta_quote: '请求报价',
      related_title: '相关',
      related_title_em: '产品',
      related_label: '探索更多',
      view_details: '查看详情 →',
      category: '激光系列产品',
    },
    en: {
      breadcrumb_home: 'Home',
      breadcrumb_products: 'Products',
      tab_overview: 'Overview',
      tab_specs: 'Specifications',
      tab_features: 'Features',
      cta_contact: 'Contact Us',
      cta_quote: 'Request Quote',
      related_title: 'Related',
      related_title_em: 'Products',
      related_label: 'EXPLORE MORE',
      view_details: 'View Details →',
      category: 'LASER PRODUCT SERIES',
    },
  };

  const tr = translations[lang as keyof typeof translations] || translations.vi;


  return (
    <div className="pdp-wrapper">
      {/* Breadcrumb */}
      <div className="pdp-breadcrumb">
        <div className="pdp-container">
          <a href="/">{tr.breadcrumb_home}</a>
          <span className="pdp-breadcrumb-sep">›</span>
          <a href="/#s1">{tr.breadcrumb_products}</a>
          <span className="pdp-breadcrumb-sep">›</span>
          <span className="pdp-breadcrumb-current">{product.name}</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="pdp-hero">
        <div className="pdp-container">
          <div className="pdp-hero-grid">
            {/* Gallery (Left - Sticky) */}
            <div className="pdp-gallery">
              <div className="pdp-gallery-main">
                <div className="pdp-gallery-image-wrapper">
                  {isVideo ? (
                    <video
                      src={activeItem.url}
                      controls
                      className="pdp-gallery-video"
                    />
                  ) : (
                    <Image
                      src={activeItem.url}
                      alt={activeItem.alternativeText || product.name}
                      width={800}
                      height={800}
                      priority
                      className="pdp-gallery-image"
                    />
                  )}
                </div>
              </div>
              
              {galleryItems.length > 1 && (
                <div className="pdp-gallery-thumbs">
                  {galleryItems.map((item, idx) => (
                    <button
                      key={idx}
                      className={`pdp-gallery-thumb ${idx === activeIndex ? 'active' : ''}`}
                      onClick={() => setActiveIndex(idx)}
                    >
                      {'mime' in item && item.mime?.startsWith('video/') ? (
                        <div className="pdp-thumb-video-icon">▶</div>
                      ) : (
                        <Image
                          src={item.url}
                          alt={`Thumbnail ${idx + 1}`}
                          width={100}
                          height={75}
                        />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info (Right) */}
            <div className="pdp-info">
              <div className="pdp-category">{tr.category}</div>
              <h1 className="pdp-title">{product.name}</h1>
              <p className="pdp-subtitle">{product.shortDescription}</p>
              <div className="pdp-description">{product.fullDescription}</div>
              
              <div className="pdp-cta-group">
                <a href="#s10" className="pdp-cta-btn primary">
                  {tr.cta_contact}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Tabs Section */}
      <section className="pdp-tabs">
        <div className="pdp-container">
          {/* Tabs Navigation */}
          <div className="pdp-tabs-nav">
            <button
              className={`pdp-tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              {tr.tab_overview}
            </button>
            <button
              className={`pdp-tab-btn ${activeTab === 'specs' ? 'active' : ''}`}
              onClick={() => setActiveTab('specs')}
            >
              {tr.tab_specs}
            </button>
          </div>

          {/* Tab Content */}
          <div className="pdp-tab-content">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="pdp-overview">
                <div dangerouslySetInnerHTML={{ __html: product.detailedContent || product.fullDescription }} />
              </div>
            )}

            {/* Specifications Tab */}
            {activeTab === 'specs' && (
              <div className="pdp-specs-table-wrapper">
                {specs.length > 0 ? (
                  <table className="pdp-specs-table">
                    <thead>
                      <tr>
                        <th>{lang === 'vi' ? 'Thuộc tính' : lang === 'en' ? 'Property' : '属性'}</th>
                        <th>{lang === 'vi' ? 'Thông số' : lang === 'en' ? 'Specification' : '规格'}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {specs.map((spec, idx) => (
                        <tr key={idx}>
                          <td className="pdp-spec-key">{spec.key}</td>
                          <td className="pdp-spec-value">{spec.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p style={{ color: 'rgba(255,255,255,0.5)' }}>
                    {lang === 'vi' ? 'Chưa có thông số kỹ thuật' : lang === 'en' ? 'No specifications available' : '暂无技术规格'}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Related Products */}
      {product.otherProducts && product.otherProducts.length > 0 && (
        <section className="pdp-related">
          <div className="pdp-container">
            <div className="pdp-related-header">
              <div className="pdp-related-label">{tr.related_label}</div>
              <h2 className="pdp-related-title">
                {tr.related_title} <em>{tr.related_title_em}</em>
              </h2>
            </div>
            
            <div className="pdp-related-grid">
              {product.otherProducts.slice(0, 3).map((other) => (
                <a key={other.id} href={`/products/${other.id}`} className="pdp-related-card">
                  <div className="pdp-related-img">
                    <Image
                      src={other.mainImage.url}
                      alt={other.mainImage.alternativeText || other.name}
                      width={400}
                      height={300}
                      loading="lazy"
                    />
                  </div>
                  <div className="pdp-related-content">
                    <div className="pdp-related-category">{tr.category}</div>
                    <h3 className="pdp-related-name">{other.name}</h3>
                    <p className="pdp-related-desc">{other.shortDescription}</p>
                    <div className="pdp-related-link">{tr.view_details}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}