import HomeClient from './HomeClient';
import { getStrapiImageUrl } from '@/lib/strapi-api';

const STRAPI_URL = process.env.STRAPI_INTERNAL_URL || process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

// Placeholder gallery images (fallback if Strapi gallery is empty)
const placeholderImages = [
  'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1200',
  'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1200',
  'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=1200',
  'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=1200'
];

async function fetchProductDetailsByLocale(locale: string) {
  try {
    // Fetch products with order >= 100 (homepage ProductDetail sections)
    const response = await fetch(
      `${STRAPI_URL}/api/products?locale=${locale}&filters[order][$gte]=100&sort=order:asc&populate=*`,
      { next: { revalidate: 60 } }
    );
    
    if (!response.ok) {
      return [];
    }
    
    const json = await response.json();
    return json.data || [];
  } catch (error) {
    console.error(`Error fetching product details for locale ${locale}:`, error);
    return [];
  }
}

export default async function Home() {
  // Fetch ProductDetail data for all locales
  const [productDetailsVi, productDetailsZh, productDetailsEn] = await Promise.all([
    fetchProductDetailsByLocale('vi'),
    fetchProductDetailsByLocale('zh'),
    fetchProductDetailsByLocale('en')
  ]);
  
  // Transform Vietnamese ProductDetails
  const transformedDetailsVi = productDetailsVi.map((p: any, idx: number) => {
    const mainMediaUrl = p.attributes.mediaType === 'video' && p.attributes.videoUrl 
      ? p.attributes.videoUrl 
      : getStrapiImageUrl(p.attributes.mainImage);
    
    const mainMediaThumb = p.attributes.mediaType === 'video' && p.attributes.videoUrl
      ? `https://img.youtube.com/vi/${p.attributes.videoUrl.split('/').pop()?.split('?')[0]}/mqdefault.jpg`
      : mainMediaUrl;
    
    // Use gallery from Strapi if available, otherwise use placeholders
    let gallery = [];
    
    if (p.attributes.gallery?.data && p.attributes.gallery.data.length > 0) {
      // Use Strapi gallery
      gallery = p.attributes.gallery.data.map((img: any) => ({
        type: 'image',
        url: getStrapiImageUrl(img),
        thumb: getStrapiImageUrl(img)
      }));
    } else {
      // Fallback to main media + placeholders
      gallery = [
        {
          type: p.attributes.mediaType || 'image',
          url: mainMediaUrl,
          thumb: mainMediaThumb
        },
        ...placeholderImages.slice(0, 3).map(url => ({
          type: 'image',
          url: url,
          thumb: url.replace('w=1200', 'w=300')
        }))
      ];
    }
    
    return {
      id: `sp${idx + 1}`,
      num: String(idx + 1).padStart(2, '0'),
      label: p.attributes.category || '',
      title: p.attributes.name.replace(/ Laser$/, '').replace(/ 激光$/, ''),
      titleEm: p.attributes.titleEm || 'Laser',
      description: p.attributes.shortDescription || '',
      features: [],
      applications: p.attributes.applications || [],
      mediaType: p.attributes.mediaType || 'image',
      mediaUrl: mainMediaUrl,
      mediaAlt: p.attributes.name,
      ctaText: p.attributes.ctaText || 'Xem chi tiết sản phẩm →',
      ctaLink: `/products/${p.id}`,
      reverse: idx % 2 === 1,
      gallery: gallery,
      specs: p.attributes.specs || [],
      advantages: p.attributes.advantages || []
    };
  });
  
  // Transform Chinese ProductDetails
  const transformedDetailsZh = productDetailsZh.map((p: any, idx: number) => {
    const mainMediaUrl = p.attributes.mediaType === 'video' && p.attributes.videoUrl 
      ? p.attributes.videoUrl 
      : getStrapiImageUrl(p.attributes.mainImage);
    
    const mainMediaThumb = p.attributes.mediaType === 'video' && p.attributes.videoUrl
      ? `https://img.youtube.com/vi/${p.attributes.videoUrl.split('/').pop()?.split('?')[0]}/mqdefault.jpg`
      : mainMediaUrl;
    
    let gallery = [];
    
    if (p.attributes.gallery?.data && p.attributes.gallery.data.length > 0) {
      gallery = p.attributes.gallery.data.map((img: any) => ({
        type: 'image',
        url: getStrapiImageUrl(img),
        thumb: getStrapiImageUrl(img)
      }));
    } else {
      gallery = [
        {
          type: p.attributes.mediaType || 'image',
          url: mainMediaUrl,
          thumb: mainMediaThumb
        },
        ...placeholderImages.slice(0, 3).map(url => ({
          type: 'image',
          url: url,
          thumb: url.replace('w=1200', 'w=300')
        }))
      ];
    }
    
    return {
      id: `sp${idx + 1}`,
      num: String(idx + 1).padStart(2, '0'),
      label: p.attributes.category || '',
      title: p.attributes.name.replace(/ Laser$/, '').replace(/ 激光$/, ''),
      titleEm: p.attributes.titleEm || '激光',
      description: p.attributes.shortDescription || '',
      features: [],
      applications: p.attributes.applications || [],
      mediaType: p.attributes.mediaType || 'image',
      mediaUrl: mainMediaUrl,
      mediaAlt: p.attributes.name,
      ctaText: p.attributes.ctaText || '查看产品详情 →',
      ctaLink: `/products/${p.id}`,
      reverse: idx % 2 === 1,
      gallery: gallery,
      specs: p.attributes.specs || [],
      advantages: p.attributes.advantages || []
    };
  });
  
  // Transform English ProductDetails
  const transformedDetailsEn = productDetailsEn.map((p: any, idx: number) => {
    const mainMediaUrl = p.attributes.mediaType === 'video' && p.attributes.videoUrl 
      ? p.attributes.videoUrl 
      : getStrapiImageUrl(p.attributes.mainImage);
    
    const mainMediaThumb = p.attributes.mediaType === 'video' && p.attributes.videoUrl
      ? `https://img.youtube.com/vi/${p.attributes.videoUrl.split('/').pop()?.split('?')[0]}/mqdefault.jpg`
      : mainMediaUrl;
    
    let gallery = [];
    
    if (p.attributes.gallery?.data && p.attributes.gallery.data.length > 0) {
      gallery = p.attributes.gallery.data.map((img: any) => ({
        type: 'image',
        url: getStrapiImageUrl(img),
        thumb: getStrapiImageUrl(img)
      }));
    } else {
      gallery = [
        {
          type: p.attributes.mediaType || 'image',
          url: mainMediaUrl,
          thumb: mainMediaThumb
        },
        ...placeholderImages.slice(0, 3).map(url => ({
          type: 'image',
          url,
          thumb: url
        }))
      ];
    }
    
    return {
      id: p.id,
      title: p.attributes.name,
      titleEm: p.attributes.titleEm || 'Laser',
      description: p.attributes.shortDescription || '',
      features: [],
      applications: p.attributes.applications || [],
      mediaType: p.attributes.mediaType || 'image',
      mediaUrl: mainMediaUrl,
      mediaAlt: p.attributes.name,
      ctaText: p.attributes.ctaText || 'View Product Details →',
      ctaLink: `/products/${p.id}`,
      reverse: idx % 2 === 1,
      gallery: gallery,
      specs: p.attributes.specs || [],
      advantages: p.attributes.advantages || []
    };
  });
  
  return (
    <HomeClient 
      products={[]} 
      productDetails={transformedDetailsVi}
      productsZh={[]}
      productDetailsZh={transformedDetailsZh}
      productsEn={[]}
      productDetailsEn={transformedDetailsEn}
    />
  );
}
