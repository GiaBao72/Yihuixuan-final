'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Contact from '@/components/Contact';
import Link from 'next/link';
import Image from 'next/image';
import { useLang } from '@/lib/useLang';

interface Product {
  id: number;
  name: string;
  slug: string;
  shortDescription: string;
  category: string;
  mainImageUrl: string;
}

export default function ProductsPage() {
  const { lang, t } = useLang();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Category mapping: internal key -> display text
  const categoryMap = {
    all: t.cat_all,
    marking: t.cat_marking,
    skinning: t.cat_skinning,
    welding: t.cat_welding,
    cutting: t.cat_cutting,
    automation: t.cat_automation,
    accessories: t.cat_accessories
  };
  
  // Reverse mapping: Vietnamese category name -> internal key
  const viCategoryToKey: Record<string, string> = {
    'Đánh dấu laser': 'marking',
    'Bóc vỏ dây': 'skinning',
    'Hàn laser': 'welding',
    'Cắt laser': 'cutting',
    'Tự động hóa': 'automation',
    'Linh kiện & Phụ kiện': 'accessories'
  };
  
  // Reverse mapping: Chinese category name -> internal key
  const zhCategoryToKey: Record<string, string> = {
    '激光打标': 'marking',
    '激光剥线': 'skinning',
    '激光焊接': 'welding',
    '激光切割': 'cutting',
    '自动化设备': 'automation',
    '零部件与配件': 'accessories'
  };
  
  // Reverse mapping: English category name -> internal key
  const enCategoryToKey: Record<string, string> = {
    'Laser Marking': 'marking',
    'Wire Stripping': 'skinning',
    'Laser Welding': 'welding',
    'Laser Cutting': 'cutting',
    'Automation Equipment': 'automation',
    'Parts & Accessories': 'accessories'
  };
  
  const CATEGORIES = Object.keys(categoryMap) as Array<keyof typeof categoryMap>;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:3001';
        const locale = lang === 'zh' ? 'zh' : lang === 'en' ? 'en' : 'vi';
        const response = await fetch(`${strapiUrl}/api/products?locale=${locale}&populate=mainImage&sort=order:asc&pagination[pageSize]=100`);
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        
        const productsData: Product[] = data.data
          .filter((p: any) => p.attributes.isActive !== false)
          .map((p: any) => ({
            id: p.id,
            name: p.attributes.name,
            slug: p.attributes.slug,
            shortDescription: p.attributes.shortDescription || '',
            category: p.attributes.category || 'Khác',
            mainImageUrl: (() => {
              const url = p.attributes.mainImage?.data?.attributes?.url;
              if (!url) return '/images/product-placeholder.jpg';
              // If URL already has protocol (http:// or https://), use it directly
              if (url.startsWith('http://') || url.startsWith('https://')) {
                return url;
              }
              // Otherwise, prepend Strapi URL
              return `${strapiUrl}${url}`;
            })()
          }));

        setProducts(productsData);
        setError(null);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err instanceof Error ? err.message : 'Không thể tải sản phẩm');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [lang]);

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(p => {
        // Use correct mapping based on current language
        const categoryToKey = lang === 'zh' ? zhCategoryToKey 
                            : lang === 'en' ? enCategoryToKey 
                            : viCategoryToKey;
        const productKey = categoryToKey[p.category];
        return productKey === selectedCategory;
      });

  return (
    <>
      <Navbar />
      
      <main className="products-page">
        {/* Hero Section */}
        <section className="products-hero">
          <div className="container">
            <h1>{t.products_hero_title}</h1>
            <p>{t.products_hero_subtitle}</p>
          </div>
        </section>

        {/* Filter Section */}
        <section className="products-filter">
          <div className="container">
            <div className="filter-buttons">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  className={selectedCategory === cat ? 'active' : ''}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {categoryMap[cat]}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="products-grid-section">
          <div className="container">
            {loading && (
              <div className="loading-state">
                <p>{t.loading}</p>
              </div>
            )}

            {error && (
              <div className="error-state">
                <p>⚠️ {t.error_load}: {error}</p>
              </div>
            )}

            {!loading && !error && filteredProducts.length === 0 && (
              <div className="empty-state">
                <p>{t.no_products}</p>
              </div>
            )}

            {!loading && !error && filteredProducts.length > 0 && (
              <div className="products-grid">
                {filteredProducts.map(product => (
                  <div key={product.id} className="product-card">
                    <div className="product-image">
                      <Image
                        src={product.mainImageUrl}
                        alt={product.name}
                        width={400}
                        height={300}
                        style={{ objectFit: 'cover' }}
                      />
                      <span className="category-badge">{product.category}</span>
                    </div>
                    <div className="product-info">
                      <h3>{product.name}</h3>
                      <p>{product.shortDescription}</p>
                      <Link href={`/products/${product.id}`} className="view-detail-btn">
                        {t.view_detail} →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Contact />

      <style jsx>{`
        .container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 clamp(2rem, 5vw, 4rem);
        }

        .products-page {
          background: #020b1a;
          color: #fff;
          min-height: 100vh;
        }

        .products-hero {
          padding: clamp(3rem, 8vw, 6rem) 0 clamp(2rem, 5vw, 4rem);
          text-align: center;
          background: linear-gradient(135deg, #020b1a 0%, #0a1628 100%);
        }

        .products-hero h1 {
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 700;
          margin-bottom: 1rem;
          color: #fff;
        }

        .products-hero p {
          font-size: clamp(1rem, 2vw, 1.25rem);
          color: rgba(255, 255, 255, 0.7);
        }

        .products-filter {
          padding: 2rem 0;
          background: rgba(10, 22, 40, 0.5);
          border-bottom: 1px solid rgba(74, 144, 226, 0.2);
        }

        .filter-buttons {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          justify-content: center;
        }

        .filter-buttons button {
          padding: 0.75rem 1.5rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(74, 144, 226, 0.3);
          color: #fff;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.95rem;
          font-weight: 500;
        }

        .filter-buttons button:hover {
          background: rgba(74, 144, 226, 0.1);
          border-color: #4a90e2;
        }

        .filter-buttons button.active {
          background: #4a90e2;
          border-color: #4a90e2;
          color: #fff;
        }

        .products-grid-section {
          padding: clamp(3rem, 6vw, 5rem) 0;
        }

        .products-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
        }

        .product-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(74, 144, 226, 0.2);
          border-radius: 12px;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .product-card:hover {
          transform: translateY(-5px);
          border-color: #4a90e2;
          box-shadow: 0 10px 30px rgba(74, 144, 226, 0.2);
        }

        .product-image {
          position: relative;
          width: 100%;
          height: 240px;
          overflow: hidden;
        }

        .category-badge {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: rgba(74, 144, 226, 0.9);
          color: #fff;
          padding: 0.4rem 0.8rem;
          border-radius: 6px;
          font-size: 0.85rem;
          font-weight: 600;
        }

        .product-info {
          padding: 1.5rem;
        }

        .product-info h3 {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 0.75rem;
          color: #fff;
        }

        .product-info p {
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.6;
          margin-bottom: 1.25rem;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .view-detail-btn {
          display: inline-block;
          padding: 0.75rem 1.5rem;
          background: #4a90e2;
          color: #fff;
          text-decoration: none;
          border-radius: 8px;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .view-detail-btn:hover {
          background: #357abd;
          transform: translateX(5px);
        }

        .loading-state,
        .error-state,
        .empty-state {
          text-align: center;
          padding: 4rem 2rem;
          font-size: 1.25rem;
        }

        .error-state {
          color: #ff6b6b;
        }

        .empty-state {
          color: rgba(255, 255, 255, 0.5);
        }

        @media (max-width: 1024px) {
          .products-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 1.5rem;
          }
        }

        @media (max-width: 768px) {
          .products-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
          }

          .filter-buttons {
            gap: 0.75rem;
          }
        }

        @media (max-width: 480px) {
          .products-grid {
            grid-template-columns: 1fr;
          }

          .filter-buttons {
            gap: 0.75rem;
          }

          .filter-buttons button {
            padding: 0.6rem 1rem;
            font-size: 0.9rem;
          }
        }
      `}</style>
    </>
  );
}