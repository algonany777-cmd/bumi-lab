/*
 * BUMI LAB — Products Section
 * Design: Offset grid layout, product cards with hover reveal
 * Note: Products are placeholder lineup — to be updated with actual products
 */

import { useRef, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';

const SERUM_IMG =
  'https://d2xsxph8kpxj0f.cloudfront.net/310519663388603264/FfX63THfQipTQqzBdN4z4M/bumi-product-serum-jJthN946jaM82qLSfNNpQa.webp';
const HERO_IMG =
  'https://d2xsxph8kpxj0f.cloudfront.net/310519663388603264/FfX63THfQipTQqzBdN4z4M/bumi-hero-X6SqdEiAxeBh7v54UvdM3o.webp';

interface Product {
  id: string;
  nameKo: string;
  nameEn: string;
  tagKo: string;
  tagEn: string;
  descKo: string;
  descEn: string;
  spiculeSize: string;
  benefitKo: string[];
  benefitEn: string[];
  img: string;
  badge?: string;
}

const products: Product[] = [
  {
    id: 'spicule-serum',
    nameKo: '스피큘 앰플 세럼',
    nameEn: 'Spicule Ampoule Serum',
    tagKo: '집중 재생',
    tagEn: 'Intensive Repair',
    descKo: '270μm 스피큘이 진피층까지 침투하여 콜라겐 합성을 촉진하고 피부 탄력을 집중 개선합니다.',
    descEn: '270μm spicules penetrate to the dermis to stimulate collagen synthesis and intensively improve skin elasticity.',
    spiculeSize: '270μm',
    benefitKo: ['콜라겐 합성 촉진', '탄력 개선', '주름 완화'],
    benefitEn: ['Collagen Synthesis', 'Elasticity Boost', 'Wrinkle Reduction'],
    img: SERUM_IMG,
    badge: 'BEST',
  },
  {
    id: 'spicule-toner',
    nameKo: '스피큘 바이탈 토너',
    nameEn: 'Spicule Vital Toner',
    tagKo: '수분 활성화',
    tagEn: 'Hydration Boost',
    descKo: '100μm 스피큘로 각질을 정돈하고 피부 흡수력을 높여 후속 제품의 효과를 극대화합니다.',
    descEn: '100μm spicules refine skin texture and enhance absorption to maximize the effectiveness of subsequent products.',
    spiculeSize: '100μm',
    benefitKo: ['각질 케어', '흡수력 향상', '수분 공급'],
    benefitEn: ['Exfoliation', 'Enhanced Absorption', 'Deep Hydration'],
    img: HERO_IMG,
  },
  {
    id: 'spicule-cream',
    nameKo: '스피큘 리페어 크림',
    nameEn: 'Spicule Repair Cream',
    tagKo: '장벽 강화',
    tagEn: 'Barrier Repair',
    descKo: '200μm 스피큘과 풍부한 보습 성분이 손상된 피부 장벽을 회복하고 외부 자극으로부터 피부를 보호합니다.',
    descEn: '200μm spicules and rich moisturizing ingredients restore damaged skin barriers and protect skin from external irritants.',
    spiculeSize: '200μm',
    benefitKo: ['장벽 강화', '보습 유지', '트러블 진정'],
    benefitEn: ['Barrier Repair', 'Moisture Retention', 'Soothing'],
    img: SERUM_IMG,
    badge: 'NEW',
  },
];

function ProductCard({ product, index }: { product: Product; index: number }) {
  const { lang } = useLanguage();
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('visible'); },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleShop = () => {
    toast.info(
      lang === 'ko'
        ? '곧 구매 가능합니다. 문의 섹션에서 사전 등록해 주세요.'
        : 'Coming soon. Please pre-register in the Contact section.'
    );
  };

  const benefits = lang === 'ko' ? product.benefitKo : product.benefitEn;

  return (
    <div
      ref={cardRef}
      className="reveal-up group"
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      <div className="bg-white border border-[#0D3D2E]/8 hover:border-[#0D3D2E]/25 transition-all duration-300 hover:shadow-lg overflow-hidden">
        {/* Image */}
        <div className="img-hover relative aspect-[4/5] bg-[#EDE9E0]">
          <img
            src={product.img}
            alt={lang === 'ko' ? product.nameKo : product.nameEn}
            className="w-full h-full object-cover"
          />
          {product.badge && (
            <div className="absolute top-4 left-4 bg-[#0D3D2E] text-[#F5F2EC] font-mono-lab text-[10px] tracking-widest px-2.5 py-1">
              {product.badge}
            </div>
          )}
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-[#0D3D2E]/85 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="font-mono-lab text-[10px] tracking-widest text-[#A8C5AC] mb-3 uppercase">
              {lang === 'ko' ? '주요 효과' : 'Key Benefits'}
            </div>
            <ul className="space-y-1.5">
              {benefits.map((b) => (
                <li key={b} className="flex items-center gap-2 font-body text-sm text-[#F5F2EC]">
                  <span className="w-1 h-1 rounded-full bg-[#A8C5AC] shrink-0" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Info */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono-lab text-[10px] tracking-widest text-[#6B8F71] border border-[#6B8F71]/40 px-2 py-0.5">
              {lang === 'ko' ? product.tagKo : product.tagEn}
            </span>
            <span className="font-mono-lab text-[10px] text-[#1C1C1A]/40">
              {product.spiculeSize}
            </span>
          </div>
          <h3 className="font-serif-kr text-lg font-medium text-[#0D3D2E] mb-2">
            {lang === 'ko' ? product.nameKo : product.nameEn}
          </h3>
          <p className="font-body text-sm text-[#1C1C1A]/55 leading-relaxed mb-5">
            {lang === 'ko' ? product.descKo : product.descEn}
          </p>
          <button
            onClick={handleShop}
            className="btn-press w-full border border-[#0D3D2E] text-[#0D3D2E] font-body text-sm tracking-wide py-3 hover:bg-[#0D3D2E] hover:text-[#F5F2EC] transition-all duration-200"
          >
            {lang === 'ko' ? '구매하기' : 'Shop Now'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ProductsSection() {
  const { lang } = useLanguage();
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('visible'); },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="products" className="py-24 md:py-36 bg-[#F5F2EC]">
      <div className="container">
        {/* Header */}
        <div ref={headerRef} className="stagger-children mb-16">
          <div className="flex items-center gap-3 mb-6">
            <span className="block w-8 h-px bg-[#0D3D2E]" />
            <span className="font-mono-lab text-[11px] tracking-[0.3em] text-[#6B8F71] uppercase">
              {lang === 'ko' ? '제품 라인업' : 'Product Lineup'}
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="font-display text-4xl md:text-5xl text-[#0D3D2E] leading-[1.1]">
              {lang === 'ko' ? (
                <>스피큘 사이언스<br />스킨케어 컬렉션</>
              ) : (
                <>Spicule Science<br />Skincare Collection</>
              )}
            </h2>
            <p className="font-body text-sm text-[#1C1C1A]/55 max-w-xs leading-relaxed">
              {lang === 'ko'
                ? '각 제품은 스피큘 크기에 따라 피부의 서로 다른 층에 작용하도록 설계되었습니다.'
                : 'Each product is designed to act on different layers of the skin based on spicule size.'}
            </p>
          </div>
        </div>

        {/* Product grid */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        {/* Coming soon note */}
        <div className="mt-12 text-center">
          <p className="font-body text-sm text-[#1C1C1A]/40">
            {lang === 'ko'
              ? '더 많은 제품이 출시 예정입니다. 문의 섹션에서 신제품 알림을 신청하세요.'
              : 'More products coming soon. Subscribe to new product alerts in the Contact section.'}
          </p>
        </div>
      </div>
    </section>
  );
}
