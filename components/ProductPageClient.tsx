'use client';

import Navbar from '@/components/Navbar';
import Contact from '@/components/Contact';
import ProductDetailPage from '@/components/ProductDetailPage';

interface Product {
  id: number;
  name: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  detailedContent: string;
  features: any[];
  mainImage: any;
  detailImage: any;
  gallery: any[];
  otherProducts: any[];
}

export default function ProductPageClient({ product }: { product: Product }) {
  return (
    <>
      <Navbar />
      <ProductDetailPage product={product} />
      <Contact />
    </>
  );
}
