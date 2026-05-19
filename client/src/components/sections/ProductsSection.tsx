/*
 * BUMI LAB — Products Section
 * Design: Offset grid layout, product cards with hover reveal + cart add button
 */

import { useRef, useEffect } from 'react';
import { Link } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import { PRODUCTS } from '@/data/products';
import { ShoppingBag } from 'lucide-react';

function fmt(n: number) {
  return `₩${n.toLocaleString('ko-KR')}`;
}

function ProductCard({ product, index }: { product: typeof PRODUCTS[number]; index: number }) {
  const { lang } = useLanguage();
  const { addItem } = useCart();
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('visible'); },
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const benefits = (lang === 'ko' ? product.forWhomKo : product.forWhomEn).slice(0, 3);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product.id,
      nameKo: product.nameKo,
      nameEn: product.nameEn,
      img: product.img,
      price: product.price,
    });
  };

  return (
    <div
      ref={cardRef}
      className="reveal-up group"
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="bg-white border border-[#0D3D2E]/8 hover:border-[#0D3D2E]/25 transition-all duration-300 hover:shadow-xl overflow-hidden h-full flex flex-col">
        {/* Image — click navigates to detail */}
        <Link href={`/products/${product.slug}`} className="block">
          <div className="relative overflow-hidden bg-[#F0EDE6] cursor-pointer" style={{ aspectRatio: '4/4.5' }}>
            <img
              src={product.img}
              alt={lang === 'ko' ? product.nameKo : product.nameEn}
              className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-110 will-change-transform"
            />
            {/* Badges */}
            <div className="absolute top-3 left-3 flex gap-2">
              {product.badge && (
                <div className={`font-mono-lab text-[10px] tracking-widest px-2.5 py-1 ${
                  product.badge === 'SET'
                    ? 'bg-[#6B8F71] text-white'
                    : product.badge === 'NEW'
                    ? 'bg-[#A8C5AC] text-[#0D3D2E]'
                    : 'bg-[#0D3D2E] text-[#F5F2EC]'
                }`}>
                  {product.badge}
                </div>
              )}
            </div>
            {/* Spicule size badge */}
            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm font-mono-lab text-[10px] text-[#6B8F71] px-2 py-1 border border-[#6B8F71]/30">
              {product.spiculeSize}
            </div>

            {/* Hover overlay with benefits */}
            <div className="absolute inset-0 bg-[#0D3D2E]/88 flex flex-col justify-end p-5 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0">
              <div className="font-mono-lab text-[10px] tracking-widest text-[#A8C5AC] uppercase mb-3">
                {lang === 'ko' ? '주요 효과' : 'Key Benefits'}
              </div>
              <ul className="space-y-2 mb-4">
                {benefits.map((b: string) => (
                  <li key={b} className="flex items-start gap-2 font-body text-sm text-[#F5F2EC]">
                    <span className="w-1 h-1 rounded-full bg-[#A8C5AC] shrink-0 mt-1.5" />
                    {b}
                  </li>
                ))}
              </ul>
              {/* Specs mini grid */}
              <div className="grid grid-cols-2 gap-1.5">
                {(product.specs ?? []).slice(0, 4).map((s) => (
                  <div key={s.value} className="bg-white/10 px-2 py-1.5">
                    <div className="font-mono-lab text-[9px] text-[#A8C5AC] uppercase tracking-wide">
                      {lang === 'ko' ? s.labelKo : s.labelEn}
                    </div>
                    <div className="font-body text-xs text-white font-medium mt-0.5">{s.value}</div>
                  </div>
                ))}
              </div>
              {/* View detail CTA */}
              <div className="mt-4 pt-3 border-t border-white/20 font-mono-lab text-[10px] tracking-widest text-[#A8C5AC] uppercase flex items-center gap-2">
                {lang === 'ko' ? '상세 보기 →' : 'View Details →'}
              </div>
            </div>
          </div>
        </Link>

        {/* Info */}
        <div className="p-5 flex flex-col flex-1">
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono-lab text-[10px] tracking-widest text-[#6B8F71] border border-[#6B8F71]/40 px-2 py-0.5">
              {lang === 'ko' ? product.tagKo : product.tagEn}
            </span>
          </div>
          <h3 className="font-serif-kr text-base font-medium text-[#0D3D2E] mb-1 leading-snug">
            {lang === 'ko' ? product.nameKo : product.nameEn}
          </h3>
          <p className="font-body text-xs text-[#6B8F71] mb-2">
            {lang === 'ko' ? product.subtitleKo : product.subtitleEn}
          </p>
          <p className="font-body text-sm text-[#1C1C1A]/55 leading-relaxed mb-4 flex-1">
            {lang === 'ko' ? product.heroDescKo.slice(0, 80) + '…' : product.heroDescEn.slice(0, 90) + '…'}
          </p>

          {/* Price + action buttons */}
          <div className="mt-auto space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-display text-lg text-[#0D3D2E]">{fmt(product.price)}</span>
              <span className="font-mono-lab text-[10px] text-[#6B8F71]/60">
                {lang === 'ko' ? '무료배송 ₩50,000~' : 'Free ship ₩50,000+'}
              </span>
            </div>
            <div className="flex gap-2">
              <Link
                href={`/products/${product.slug}`}
                className="flex-1 border border-[#0D3D2E]/30 text-[#0D3D2E] font-mono-lab text-[10px]
                           tracking-widest py-2.5 text-center uppercase hover:border-[#0D3D2E]
                           hover:bg-[#0D3D2E]/5 transition-all duration-200"
              >
                {lang === 'ko' ? '상세 보기' : 'Details'}
              </Link>
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-[#0D3D2E] text-[#F5F2EC] font-mono-lab text-[10px]
                           tracking-widest py-2.5 uppercase hover:bg-[#6B8F71] transition-colors
                           duration-200 active:scale-[0.97] flex items-center justify-center gap-1.5"
              >
                <ShoppingBag size={12} />
                {lang === 'ko' ? '담기' : 'Add'}
              </button>
            </div>
          </div>
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
                <>AUIN ACU-SHOT<br />컬렉션</>
              ) : (
                <>AUIN ACU-SHOT<br />Collection</>
              )}
            </h2>
            <p className="font-body text-sm text-[#1C1C1A]/55 max-w-sm leading-relaxed">
              {lang === 'ko'
                ? '스피큘 크기와 포뮬러 설계에 따라 각기 다른 피부 고민에 맞춤 대응하는 ACU-SHOT 라인업.'
                : 'The ACU-SHOT lineup tailored to different skin concerns based on spicule size and formula design.'}
            </p>
          </div>
        </div>

        {/* Product grid — 3 columns on desktop */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {PRODUCTS.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        {/* Bottom note */}
        <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-[#0D3D2E]/10">
          <p className="font-body text-sm text-[#1C1C1A]/40">
            {lang === 'ko'
              ? '모든 제품은 유니즈랩 GMP 인증 시설에서 생산됩니다. 향후 추가 제품이 출시될 예정입니다.'
              : 'All products are manufactured in Unislab GMP-certified facilities. Additional products are planned for future release.'}
          </p>
          <div className="flex items-center gap-2 shrink-0">
            <span className="font-mono-lab text-[10px] tracking-widest text-[#6B8F71] uppercase">
              {lang === 'ko' ? '유니즈랩 스피큘 기술' : 'Unislab Spicule Technology'}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
