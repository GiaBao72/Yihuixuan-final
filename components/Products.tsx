interface Product {
  id: number;
  attributes: {
    name: string;
    slug: string;
    description: string;
    category: string;
    features: string[];
    image?: {
      data?: {
        attributes: {
          url: string;
        };
      };
    };
  };
}

async function getProducts() {
  try {
    const res = await fetch('http://localhost:3001/api/products?populate=*', {
      cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch');
    const data = await res.json();
    return data.data as Product[];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export default async function Products() {
  const products = await getProducts();

  // Fallback data nếu Strapi chưa có
  const fallbackProducts = [
    {
      id: 1,
      name: 'Laser Marking',
      category: 'Khắc laser',
      description: 'Khắc laser chính xác cao cho kim loại, nhựa, gỗ và nhiều vật liệu khác',
      features: ['Độ chính xác cao', 'Tốc độ nhanh', 'Bền bỉ'],
    },
    {
      id: 2,
      name: 'Laser Skinning',
      category: 'Bóc vỏ cáp',
      description: 'Bóc vỏ cáp tự động với độ chính xác tuyệt đối, không làm hỏng lõi',
      features: ['Tự động hóa', 'An toàn', 'Hiệu quả cao'],
    },
    {
      id: 3,
      name: 'Laser Welding',
      category: 'Hàn laser',
      description: 'Hàn laser công nghiệp cho kim loại, pin lithium và linh kiện điện tử',
      features: ['Chất lượng cao', 'Không biến dạng', 'Tiết kiệm năng lượng'],
    },
    {
      id: 4,
      name: 'Laser Cutting',
      category: 'Cắt laser',
      description: 'Cắt laser chính xác cho kim loại tấm, ống và các hình dạng phức tạp',
      features: ['Cắt nhanh', 'Độ chính xác cao', 'Đa dạng vật liệu'],
    },
  ];

  const displayProducts = products.length > 0 ? products : fallbackProducts;

  return (
    <section id="products" className="relative min-h-screen py-20 overflow-hidden">
      <div className="grid-bg"></div>
      <div className="orb orb1"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-block text-sm font-semibold text-[#4a90e2] tracking-wider uppercase mb-4 anim">
            Sản phẩm
          </div>
          <h2 className="text-5xl font-extrabold mb-6 anim">
            Dòng sản phẩm <em className="not-italic text-[#4a90e2]">Laser</em>
          </h2>
          <p className="text-lg text-[rgba(255,255,255,0.6)] max-w-2xl mx-auto anim">
            Giải pháp laser công nghiệp toàn diện cho mọi nhu cầu sản xuất
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayProducts.map((product: any, index: number) => {
            const name = product.attributes?.name || product.name;
            const category = product.attributes?.category || product.category;
            const description = product.attributes?.description || product.description;
            const features = product.attributes?.features || product.features || [];

            return (
              <div
                key={product.id}
                className="group relative bg-gradient-to-br from-[rgba(255,255,255,0.05)] to-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.1)] rounded-2xl p-6 hover:border-[#4a90e2] hover:shadow-lg hover:shadow-[rgba(27,95,212,0.2)] transition-all duration-300 anim"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#1b5fd4] to-[#4a90e2] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>

                <div className="text-xs font-semibold text-[#4a90e2] uppercase tracking-wider mb-2">
                  {category}
                </div>

                <h3 className="text-2xl font-bold mb-3">{name}</h3>

                <p className="text-[rgba(255,255,255,0.6)] text-sm mb-4 leading-relaxed">
                  {description}
                </p>

                {features.length > 0 && (
                  <ul className="space-y-2 mb-4">
                    {features.slice(0, 3).map((feature: string, i: number) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-[rgba(255,255,255,0.7)]">
                        <svg className="w-4 h-4 text-[#4a90e2]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}

                <a
                  href={product.attributes?.ctaLink || `/products/${product.attributes?.slug || product.id}`}
                  className="inline-flex items-center gap-2 text-[#4a90e2] font-semibold text-sm hover:gap-3 transition-all"
                >
                  Xem chi tiết
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
