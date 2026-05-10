const STRAPI_URL = process.env.STRAPI_INTERNAL_URL || process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
const STRAPI_PUBLIC_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

export interface StrapiImage {
  data: {
    id: number;
    attributes: {
      name: string;
      url: string;
      width: number;
      height: number;
      formats?: {
        thumbnail?: { url: string };
        small?: { url: string };
        medium?: { url: string };
        large?: { url: string };
      };
    };
  } | null;
}

export interface StrapiProduct {
  id: number;
  attributes: {
    name: string;
    slug: string;
    shortDescription: string;
    category?: string;
    fullDescription: string;
    detailedContent?: string;
    features: Array<{
      id: number;
      title: string;
      description: string;
    }>;
    mainImage: StrapiImage;
    gallery?: { data: Array<{ id: number; attributes: { name: string; url: string; mime: string; width: number; height: number; alternativeText?: string; formats?: any; }; }>; };
    detailImage: StrapiImage;
    ctaLink: string;
    order: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export function getStrapiImageUrl(image: StrapiImage | undefined, size: 'thumbnail' | 'small' | 'medium' | 'large' | 'original' = 'original'): string {
  if (!image?.data) {
    return '/images/product-placeholder.jpg';
  }

  const attrs = image.data.attributes;
  
  let url: string;
  if (size !== 'original' && attrs.formats?.[size]) {
    url = attrs.formats[size].url;
  } else {
    url = attrs.url;
  }
  
  // If URL already has protocol, use it directly
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  
  // Otherwise, prepend Strapi URL
  return `${STRAPI_URL}${url}`;
}

export async function getProducts(): Promise<StrapiProduct[]> {
  console.log("[getProducts] STRAPI_URL:", STRAPI_URL);
  try {
    const response = await fetch(`${STRAPI_URL}/api/products?sort=order:asc&populate=*`, {
      next: { revalidate: 60 }
    });
    console.log("[getProducts] response.ok:", response.ok, "status:", response.status);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.status}`);
    }
    
    const json: StrapiResponse<StrapiProduct[]> = await response.json();
    return json.data.filter(p => p.attributes.isActive);
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function getProductBySlug(slug: string): Promise<StrapiProduct | null> {
  try {
    const response = await fetch(
      `${STRAPI_URL}/api/products?filters[slug][$eq]=${slug}&populate=*`,
      {
        next: { revalidate: 60 }
      }
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch product: ${response.status}`);
    }
    
    const json: StrapiResponse<StrapiProduct[]> = await response.json();
    return json.data[0] || null;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

export function getStrapiGalleryItems(gallery: any): Array<{
  id: number;
  url: string;
  mime: string;
  alternativeText?: string;
  width: number;
  height: number;
}> {
  if (!gallery?.data || !Array.isArray(gallery.data)) {
    return [];
  }

  return gallery.data.map((item: any) => {
    const url = item.attributes.url;
    // If URL already has protocol, use it directly
    const fullUrl = (url.startsWith('http://') || url.startsWith('https://')) 
      ? url 
      : `${STRAPI_PUBLIC_URL}${url}`;
    
    return {
      id: item.id,
      url: fullUrl,
      mime: item.attributes.mime,
      alternativeText: item.attributes.alternativeText,
      width: item.attributes.width,
      height: item.attributes.height,
    };
  });
}
