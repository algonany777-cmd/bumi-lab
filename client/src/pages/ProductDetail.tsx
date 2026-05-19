/*
 * BUMI LAB — Product Detail Page
 * Design: Clean Protocol — off-white + deep emerald + sage green
 * Layout: Full-width hero → metrics → highlight points → how-to → specs → for-whom → closing CTA
 */

import { useEffect, useRef } from 'react';
import { useParams, Link } from 'wouter';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';
import { useLanguage } from '@/contexts/LanguageContext';
import { getProductBySlug } from '@/data/products';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

function useReveal(deps: unknown[] = []) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('visible'); },
      { threshold: 0.07 }
    );
    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return ref;
}

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { lang } = useLanguage();
  const product = getProductBySlug(slug ?? '');

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#F5F2EC] flex flex-col items-center justify-center gap-6">
        <p className="font-body text-[#0D3D2E] text-lg">
          {lang === 'ko' ? '제품을 찾을 수 없습니다.' : 'Product not found.'}
        </p>
        <Link href="/#products" className="font-mono-lab text-sm tracking-widest text-[#6B8F71] underline underline-offset-4">
          {lang === 'ko' ? '← 제품 목록으로' : '← Back to Products'}
        </Link>
      </div>
    );
  }

  const handleShop = () => {
    toast.info(
      lang === 'ko'
        ? '곧 구매 가능합니다. 문의 섹션에서 사전 등록해 주세요.'
        : 'Coming soon. Please pre-register in the Contact section.'
    );
  };

  const heroRef = useReveal([slug]);
  const metricsRef = useReveal([slug]);
  const pointsRef = useReveal([slug]);
  const stepsRef = useReveal([slug]);
  const specsRef = useReveal([slug]);
  const forWhomRef = useReveal([slug]);
  const closingRef = useReveal([slug]);

  const forWhom = lang === 'ko' ? product.forWhomKo : product.forWhomEn;
  const steps = product.steps;
  const points = product.points;

  return (
    <div className="min-h-screen bg-[#F5F2EC]">
      <Navigation />

      {/* ── Breadcrumb ── */}
      <div className="pt-24 pb-0 container">
        <nav className="flex items-center gap-2 font-mono-lab text-[10px] tracking-widest text-[#6B8F71] uppercase">
          <Link href="/" className="hover:text-[#0D3D2E] transition-colors">
            {lang === 'ko' ? '홈' : 'Home'}
          </Link>
          <ChevronRight size={10} />
          <Link href="/#products" className="hover:text-[#0D3D2E] transition-colors">
            {lang === 'ko' ? '제품' : 'Products'}
          </Link>
          <ChevronRight size={10} />
          <span className="text-[#0D3D2E]">
            {lang === 'ko' ? product.nameKo : product.nameEn}
          </span>
        </nav>
      </div>

      {/* ── Hero ── */}
      <section className="pt-8 pb-16 md:pb-24">
        <div className="container">
          <div ref={heroRef} className="reveal-up grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            {/* Image */}
            <div className="relative bg-[#EDEAE2] overflow-hidden" style={{ aspectRatio: '1/1' }}>
              <img
                src={product.img}
                alt={product.imgAlt}
                className="w-full h-full object-cover"
              />
              {product.badge && (
                <div className={`absolute top-4 left-4 font-mono-lab text-[11px] tracking-widest px-3 py-1.5 ${
                  product.badge === 'SET' ? 'bg-[#6B8F71] text-white'
                  : product.badge === 'NEW' ? 'bg-[#A8C5AC] text-[#0D3D2E]'
                  : 'bg-[#0D3D2E] text-[#F5F2EC]'
                }`}>
                  {product.badge}
                </div>
              )}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm font-mono-lab text-[10px] text-[#6B8F71] px-2.5 py-1 border border-[#6B8F71]/30">
                {product.spiculeSize}
              </div>
            </div>

            {/* Text */}
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-3">
                <span className="block w-6 h-px bg-[#0D3D2E]" />
                <span className="font-mono-lab text-[10px] tracking-[0.3em] text-[#6B8F71] uppercase">
                  {lang === 'ko' ? product.tagKo : product.tagEn}
                </span>
              </div>

              <h1 className="font-display text-3xl md:text-4xl xl:text-5xl text-[#0D3D2E] leading-[1.1]">
                {lang === 'ko' ? product.heroTaglineKo : product.heroTaglineEn}
              </h1>

              <p className="font-body text-base text-[#1C1C1A]/60 leading-relaxed max-w-lg">
                {lang === 'ko' ? product.heroDescKo : product.heroDescEn}
              </p>

              {/* Pills */}
              <div className="flex flex-wrap gap-2">
                {(lang === 'ko' ? product.heroPillsKo : product.heroPillsEn).map((pill) => (
                  <span key={pill} className="font-mono-lab text-[10px] tracking-widest text-[#6B8F71] border border-[#6B8F71]/40 px-3 py-1.5 uppercase">
                    {pill}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={handleShop}
                  className="btn-press flex-1 bg-[#0D3D2E] text-[#F5F2EC] font-body text-sm tracking-wide py-3.5 hover:bg-[#0D3D2E]/85 transition-all duration-200"
                >
                  {lang === 'ko' ? '구매하기' : 'Shop Now'}
                </button>
                <Link
                  href="/#contact"
                  className="flex-1 border border-[#0D3D2E] text-[#0D3D2E] font-body text-sm tracking-wide py-3.5 text-center hover:bg-[#0D3D2E]/5 transition-all duration-200"
                >
                  {lang === 'ko' ? '문의하기' : 'Contact Us'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Metrics ── */}
      <section className="py-16 bg-[#0D3D2E]">
        <div className="container">
          <div ref={metricsRef} className="stagger-children grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10">
            {product.metrics.map((m) => (
              <div key={m.labelKo} className="bg-[#0D3D2E] p-8 flex flex-col gap-2">
                <div className="font-mono-lab text-[10px] tracking-widest text-[#A8C5AC] uppercase">
                  {lang === 'ko' ? m.labelKo : m.labelEn}
                </div>
                <div className="font-display text-4xl md:text-5xl text-[#F5F2EC] leading-none">
                  {m.value}
                  <span className="font-body text-lg text-[#6B8F71] ml-1">
                    {lang === 'ko' ? m.unitKo : m.unitEn}
                  </span>
                </div>
                <div className="font-body text-xs text-[#F5F2EC]/50 leading-relaxed">
                  {lang === 'ko' ? m.noteKo : m.noteEn}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Highlight Points ── */}
      <section className="py-20 md:py-32">
        <div className="container">
          <div ref={pointsRef} className="stagger-children">
            <div className="flex items-center gap-3 mb-12">
              <span className="block w-8 h-px bg-[#0D3D2E]" />
              <span className="font-mono-lab text-[11px] tracking-[0.3em] text-[#6B8F71] uppercase">
                {lang === 'ko' ? '주요 특징' : 'Key Features'}
              </span>
            </div>
            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              {points.map((point, i) => (
                <div
                  key={point.titleKo}
                  className="group border border-[#0D3D2E]/10 p-8 hover:border-[#0D3D2E]/30 hover:bg-white transition-all duration-300"
                >
                  <div className="font-mono-lab text-[10px] tracking-widest text-[#A8C5AC] mb-4">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <h3 className="font-serif-kr text-lg font-medium text-[#0D3D2E] mb-3">
                    {lang === 'ko' ? point.titleKo : point.titleEn}
                  </h3>
                  <p className="font-body text-sm text-[#1C1C1A]/55 leading-relaxed">
                    {lang === 'ko' ? point.descKo : point.descEn}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── How to Use ── */}
      <section className="py-20 md:py-28 bg-[#EDEAE2]">
        <div className="container">
          <div ref={stepsRef} className="stagger-children">
            <div className="flex items-center gap-3 mb-12">
              <span className="block w-8 h-px bg-[#0D3D2E]" />
              <span className="font-mono-lab text-[11px] tracking-[0.3em] text-[#6B8F71] uppercase">
                {lang === 'ko' ? '사용 방법' : 'How to Use'}
              </span>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((step, i) => (
                <div key={step.stepKo} className="flex flex-col gap-4">
                  <div className="w-10 h-10 border border-[#0D3D2E] flex items-center justify-center">
                    <span className="font-mono-lab text-xs text-[#0D3D2E]">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <div className="font-mono-lab text-[10px] tracking-widest text-[#6B8F71] uppercase">
                    {lang === 'ko' ? step.stepKo : step.stepEn}
                  </div>
                  <p className="font-body text-sm text-[#1C1C1A]/65 leading-relaxed">
                    {lang === 'ko' ? step.descKo : step.descEn}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Specs Table ── */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div ref={specsRef} className="stagger-children max-w-2xl">
            <div className="flex items-center gap-3 mb-10">
              <span className="block w-8 h-px bg-[#0D3D2E]" />
              <span className="font-mono-lab text-[11px] tracking-[0.3em] text-[#6B8F71] uppercase">
                {lang === 'ko' ? '제품 사양' : 'Product Specs'}
              </span>
            </div>
            <div className="border-t border-[#0D3D2E]/15">
              {product.specs.map((spec, i) => (
                <div
                  key={spec.labelKo}
                  className={`flex gap-8 py-4 border-b border-[#0D3D2E]/10 ${i % 2 === 0 ? '' : 'bg-[#0D3D2E]/[0.02]'}`}
                >
                  <span className="font-mono-lab text-[11px] tracking-wide text-[#6B8F71] uppercase w-36 shrink-0 pt-0.5">
                    {lang === 'ko' ? spec.labelKo : spec.labelEn}
                  </span>
                  <span className="font-body text-sm text-[#1C1C1A]/80">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── For Whom ── */}
      <section className="py-16 md:py-24 bg-[#0D3D2E]/5">
        <div className="container">
          <div ref={forWhomRef} className="stagger-children">
            <div className="flex items-center gap-3 mb-10">
              <span className="block w-8 h-px bg-[#0D3D2E]" />
              <span className="font-mono-lab text-[11px] tracking-[0.3em] text-[#6B8F71] uppercase">
                {lang === 'ko' ? '이런 분께 추천합니다' : 'Recommended For'}
              </span>
            </div>
            <div className="flex flex-col gap-4 max-w-xl">
              {forWhom.map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <span className="font-mono-lab text-[10px] text-[#A8C5AC] mt-1 shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="font-body text-base text-[#0D3D2E] leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Closing CTA ── */}
      <section className="py-20 md:py-32 bg-[#0D3D2E]">
        <div className="container">
          <div ref={closingRef} className="stagger-children flex flex-col md:flex-row md:items-end md:justify-between gap-10">
            <div className="max-w-xl">
              <div className="font-mono-lab text-[10px] tracking-[0.3em] text-[#A8C5AC] uppercase mb-6">
                AUIN ACU-SHOT
              </div>
              <p className="font-display text-2xl md:text-3xl text-[#F5F2EC] leading-snug">
                {lang === 'ko' ? product.closingKo : product.closingEn}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <button
                onClick={handleShop}
                className="btn-press bg-[#F5F2EC] text-[#0D3D2E] font-body text-sm tracking-wide px-8 py-3.5 hover:bg-white transition-all duration-200"
              >
                {lang === 'ko' ? '구매하기' : 'Shop Now'}
              </button>
              <Link
                href="/#products"
                className="border border-[#F5F2EC]/30 text-[#F5F2EC] font-body text-sm tracking-wide px-8 py-3.5 text-center hover:border-[#F5F2EC]/60 transition-all duration-200 flex items-center gap-2 justify-center"
              >
                <ArrowLeft size={14} />
                {lang === 'ko' ? '제품 목록' : 'All Products'}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
