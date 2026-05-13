import HomeClient from './HomeClient';
import { getStrapiImageUrl, getStrapiGalleryItems } from '@/lib/strapi-api';

const STRAPI_URL = process.env.STRAPI_INTERNAL_URL || process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

async function fetchHomepageFeaturesByLocale(locale: string) {
  try {
    const response = await fetch(
      `${STRAPI_URL}/api/homepage-features?locale=${locale}&filters[isActive][$eq]=true&sort=order:asc&populate=deep`,
      { next: { revalidate: 60 } }
    );
    if (!response.ok) return [];
    const json = await response.json();
    return json.data || [];
  } catch (error) {
    console.error(`Error fetching homepage features for locale ${locale}:`, error);
    return [];
  }
}

function transformFeatures(features: any[], locale: string) {
  return features.map((p: any, idx: number) => {
    const attrs = p.attributes;

    const mainMediaUrl = attrs.mediaType === 'video' && attrs.videoUrl
      ? attrs.videoUrl
      : getStrapiImageUrl(attrs.mainImage);

    const mainMediaThumb = attrs.mediaType === 'video' && attrs.videoUrl
      ? `https://img.youtube.com/vi/${attrs.videoUrl.split('/').pop()?.split('?')[0]}/mqdefault.jpg`
      : mainMediaUrl;

    let gallery = [];
    if (attrs.gallery?.data && attrs.gallery.data.length > 0) {
      const galleryItems = getStrapiGalleryItems(attrs.gallery);
      gallery = galleryItems.map((img: any) => ({
        type: 'image',
        url: img.url,
        thumb: img.url
      }));
    } else {
      gallery = [{
        type: attrs.mediaType || 'image',
        url: mainMediaUrl,
        thumb: mainMediaThumb
      }];
    }

    const defaultCta = locale === 'zh' ? '查看产品详情 →' : locale === 'en' ? 'View Details →' : 'Xem chi tiết →';

    return {
      id: `hf${idx + 1}`,
      num: String(idx + 1).padStart(2, '0'),
      label: '',
      title: attrs.name || '',
      titleEm: attrs.titleEm || '',
      description: attrs.description || '',
      features: [],
      applications: [],
      mediaType: attrs.mediaType || 'image',
      mediaUrl: mainMediaUrl,
      mediaAlt: attrs.name || '',
      ctaText: attrs.ctaText || defaultCta,
      ctaLink: attrs.ctaLink || '#',
      reverse: idx % 2 === 1,
      gallery,
      specs: [],
      advantages: []
    };
  });
}

export default async function Home() {
  const [featuresVi, featuresZh, featuresEn] = await Promise.all([
    fetchHomepageFeaturesByLocale('vi'),
    fetchHomepageFeaturesByLocale('zh'),
    fetchHomepageFeaturesByLocale('en')
  ]);

  return (
    <HomeClient
      products={[]}
      productDetails={transformFeatures(featuresVi, 'vi')}
      productsZh={[]}
      productDetailsZh={transformFeatures(featuresZh, 'zh')}
      productsEn={[]}
      productDetailsEn={transformFeatures(featuresEn, 'en')}
    />
  );
}
