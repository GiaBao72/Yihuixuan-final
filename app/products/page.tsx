'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Contact from '@/components/Contact';
import Link from 'next/link';
import Image from 'next/image';
import '../styles/products.css';
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
    '打标': 'marking',
    '剥线': 'skinning',
    '焊接': 'welding',
    '切割': 'cutting',
    '自动化设备': 'automation',
    '零部件与配件': 'accessories',
    '清洗': 'cleaning',
    '表面处理': 'surface_treatment',
    '雕刻': 'engraving'
  };
  
  // Reverse mapping: English category name -> internal key
  const enCategoryToKey: Record<string, string> = {
    'Marking': 'marking',
    'Wire Stripping': 'skinning',
    'Welding': 'welding',
    'Cutting': 'cutting',
    'Automation Equipment': 'automation',
    'Parts & Accessories': 'accessories',
    'Cleaning': 'cleaning',
    'Surface Treatment': 'surface_treatment',
    'Engraving': 'engraving'
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
                  <Link key={product.id} href={`/products/${product.id}`} className="product-card-link">
                    <div className="product-card">
                      <div className="product-image">
                        <Image
                          src={product.mainImageUrl}
                          alt={product.name}
                          width={400}
                          height={300}
                          style={{ objectFit: 'contain', width: '100%', height: '100%' }}
                        />
                        <span className="category-badge">{product.category}</span>
                      </div>
                      <div className="product-info">
                        <h3>{product.name}</h3>
                        <p>{product.shortDescription}</p>
                        <span className="view-detail-btn">
                          {t.view_detail} →
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Contact />

    </>
  );
}
