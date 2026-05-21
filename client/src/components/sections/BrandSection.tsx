/*
 * BUMI LAB — Brand Introduction Section
 * Design: Asymmetric layout, large serif quote, brand philosophy
 * Background: Off-white cream
 */

import { useRef, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const BRAND_OCEAN_IMG =
  'https://d2xsxph8kpxj0f.cloudfront.net/310519663388603264/FfX63THfQipTQqzBdN4z4M/bumi-brand-ocean-Zw3ncf7Sb8ug9nHZ9nYpmq.webp';

const BRAND_SCIENCE_IMG =
  'https://d2xsxph8kpxj0f.cloudfront.net/310519663388603264/FfX63THfQipTQqzBdN4z4M/brand-science-aQRUbekk4hdNMg3k7nrsnw.webp';

const BRAND_SUSTAINABLE_IMG =
  'https://d2xsxph8kpxj0f.cloudfront.net/310519663388603264/FfX63THfQipTQqzBdN4z4M/brand-sustainable-aTLjJm9NPLKmWYqYWYp5oS.webp';

const BRAND_KBEAUTY_IMG =
  'https://d2xsxph8kpxj0f.cloudfront.net/310519663388603264/FfX63THfQipTQqzBdN4z4M/brand-kbeauty-e89KH2G54NXrdF6RdmjM9p.webp';

export default function BrandSection() {
  const { lang } = useLanguage();
  const sectionRef = useScrollReveal(0.1);
  const staggerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = staggerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.classList.add('visible');
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = imgRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const values = [
    {
      num: '01',
      titleKo: '과학적 근거',
      titleEn: 'Science-Based',
      descKo: '23단계 정제 공정을 통한 99.8% 고순도 스피큘. 모든 성분은 임상적으로 검증됩니다.',
      descEn: '99.8% pure spicule through a 23-step purification process. Every ingredient is clinically validated.',
      img: BRAND_SCIENCE_IMG,
      imgAltKo: '스피큘 결정체 연구실 클로즈업',
      imgAltEn: 'Spicule crystals in research laboratory',
      captionKo: '23단계 정제 · 99.8% 고순도',
      captionEn: '23-Step Purification · 99.8% Purity',
    },
    {
      num: '02',
      titleKo: '지속 가능한 원료',
      titleEn: 'Sustainable Sourcing',
      descKo: '독자적인 해면동물 양식 기술로 자연 훼손 없이 균일한 품질의 원료를 안정적으로 공급합니다.',
      descEn: 'Our proprietary sponge cultivation technology ensures stable supply of uniform-quality raw materials without harming nature.',
      img: BRAND_SUSTAINABLE_IMG,
      imgAltKo: '해면동물 수중 양식 장면',
      imgAltEn: 'Marine sponge aquaculture underwater',
      captionKo: '해면동물 양식 · 자연 친화적',
      captionEn: 'Sponge Aquaculture · Eco-Friendly',
    },
    {
      num: '03',
      titleKo: 'K-뷰티 리추얼',
      titleEn: 'K-Beauty Ritual',
      descKo: '한국의 스킨케어 문화와 과학적 성분이 만나 매일의 피부 관리를 의식(儀式)으로 승화시킵니다.',
      descEn: 'Korean skincare culture meets scientific ingredients, elevating daily skincare into a meaningful ritual.',
      img: BRAND_KBEAUTY_IMG,
      imgAltKo: 'K-뷰티 스킨케어 리추얼 플랫레이',
      imgAltEn: 'K-beauty skincare ritual flatlay',
      captionKo: 'K-뷰티 · 매일의 의식',
      captionEn: 'K-Beauty · Daily Ritual',
    },
  ];

  return (
    <section
      id="brand"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="py-24 md:py-36 bg-[#F5F2EC] reveal-up"
    >
      <div className="container">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-16">
          <span className="block w-8 h-px bg-[#0D3D2E]" />
          <span className="font-mono-lab text-[11px] tracking-[0.3em] text-[#6B8F71] uppercase">
            {lang === 'ko' ? '브랜드 소개' : 'About BUMI LAB'}
          </span>
        </div>

        {/* Main layout: left text + right accent */}
        <div className="grid md:grid-cols-12 gap-12 md:gap-0 items-start">
          {/* Left: Large quote */}
          <div className="md:col-span-7 md:pr-16">
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-[#0D3D2E] leading-[1.1] mb-8">
              {lang === 'ko' ? (
                <>
                  자연에서 찾은 아이디어,<br />
                  <span className="text-[#6B8F71]">연구로 완성해 가는</span><br />
                  기술
                </>
              ) : (
                <>
                  Ideas found in nature,<br />
                  <span className="text-[#6B8F71]">perfected through</span><br />
                  research
                </>
              )}
            </h2>
            <p className="font-body text-base md:text-lg text-[#1C1C1A]/65 leading-relaxed max-w-lg mb-10">
              {lang === 'ko'
                ? '부미랩은 유니즈랩의 독자적인 해양 스피큘 기술을 바탕으로 탄생한 K-뷰티 스킨케어 브랜드입니다. 깊은 바다의 해면동물에서 추출한 스피큘의 미세 침투 원리를 피부 케어에 적용하여, 피부 본연의 재생 능력을 과학적으로 활성화합니다.'
                : "BUMI LAB is a K-beauty skincare brand born from Unislab's proprietary marine spicule technology. By applying the micro-penetration principle of spicules extracted from deep-sea sponges, we scientifically activate the skin's natural regeneration capabilities."}
            </p>

            {/* Brand image — visible on mobile below text */}
            <div
              ref={imgRef}
              className="block md:hidden relative overflow-hidden rounded-sm"
              style={{
                opacity: 0,
                transform: 'translateY(24px)',
                transition: 'opacity 0.7s cubic-bezier(0.23,1,0.32,1), transform 0.7s cubic-bezier(0.23,1,0.32,1)',
              }}
            >
              <img
                src={BRAND_OCEAN_IMG}
                alt={lang === 'ko' ? '해양 해면동물과 스피큘 결정체' : 'Marine sponge and spicule crystals'}
                className="w-full h-64 object-cover"
                loading="lazy"
              />
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#F5F2EC] to-transparent" />
            </div>

            {/* Value cards with images — visible on desktop inside left column */}
            <div className="hidden md:flex flex-col gap-6 mt-4">
              {values.map((item, idx) => (
                <ValueCard key={item.num} item={item} lang={lang} delay={idx * 120} />
              ))}
            </div>
          </div>

          {/* Right: Brand image (desktop) */}
          <div
            ref={staggerRef}
            className="md:col-span-5 stagger-children"
          >
            {/* Main image — desktop only */}
            <div
              className="hidden md:block relative overflow-hidden rounded-sm mb-8"
              style={{
                opacity: 0,
                transform: 'translateY(24px)',
                transition: 'opacity 0.8s cubic-bezier(0.23,1,0.32,1) 0.15s, transform 0.8s cubic-bezier(0.23,1,0.32,1) 0.15s',
              }}
              ref={(el) => {
                if (!el) return;
                const obs = new IntersectionObserver(
                  ([entry]) => {
                    if (entry.isIntersecting) {
                      el.style.opacity = '1';
                      el.style.transform = 'translateY(0)';
                    }
                  },
                  { threshold: 0.1 }
                );
                obs.observe(el);
              }}
            >
              <img
                src={BRAND_OCEAN_IMG}
                alt={lang === 'ko' ? '해양 해면동물과 스피큘 결정체' : 'Marine sponge and spicule crystals'}
                className="w-full h-80 object-cover"
                loading="lazy"
              />
              {/* Caption overlay */}
              <div className="absolute bottom-0 left-0 right-0 px-4 py-3 bg-gradient-to-t from-[#0D3D2E]/70 to-transparent">
                <p className="font-mono-lab text-[10px] tracking-[0.25em] text-[#A8C5AC] uppercase">
                  {lang === 'ko' ? 'Porifera Spicule · 해면동물 스피큘' : 'Porifera Spicule · Marine Origin'}
                </p>
              </div>
            </div>

            {/* Mobile: image + text stacked */}
            <div className="flex md:hidden flex-col">
              {values.map((item) => (
                <div
                  key={item.num}
                  className="py-6 border-b border-[#0D3D2E]/10 last:border-0"
                >
                  {/* Image full-width */}
                  <div className="relative w-full h-48 overflow-hidden rounded-sm mb-4">
                    <img
                      src={item.img}
                      alt={lang === 'ko' ? item.imgAltKo : item.imgAltEn}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  {/* Text below image */}
                  <div className="flex gap-4 items-start">
                    <span className="font-mono-lab text-xs text-[#6B8F71] mt-0.5 shrink-0">
                      {item.num}
                    </span>
                    <div>
                      <h3 className="font-serif-kr text-base font-medium text-[#0D3D2E] mb-2">
                        {lang === 'ko' ? item.titleKo : item.titleEn}
                      </h3>
                      <p className="font-body text-sm text-[#1C1C1A]/60 leading-relaxed">
                        {lang === 'ko' ? item.descKo : item.descEn}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom: Unislab partnership note */}
        <div className="mt-20 pt-10 border-t border-[#0D3D2E]/10 flex flex-col md:flex-row md:items-center gap-6">
          <div className="shrink-0">
            <div className="font-mono-lab text-[10px] tracking-[0.3em] text-[#6B8F71] uppercase mb-1">
              {lang === 'ko' ? '기술 파트너' : 'Technology Partner'}
            </div>
            <div className="font-display text-xl text-[#0D3D2E] font-medium">
              UNISLAB
            </div>
          </div>
          <div className="w-px h-10 bg-[#0D3D2E]/15 hidden md:block mx-8" />
          <p className="font-body text-sm text-[#1C1C1A]/55 leading-relaxed max-w-xl">
            {lang === 'ko'
              ? '유니즈랩(Unislab)은 해양 스피큘 원료 연구 및 양식 기술을 보유한 바이오테크 기업입니다. 부미랩은 유니즈랩의 응용 제품 브랜드로, 검증된 스피큘 기술을 소비자에게 직접 전달합니다.'
              : "Unislab is a biotech company specializing in marine spicule raw material research and cultivation technology. BUMI LAB is Unislab's consumer brand, delivering validated spicule technology directly to consumers."}
          </p>
        </div>
      </div>
    </section>
  );
}

/* ── Value Card with image ── */
interface ValueItem {
  num: string;
  titleKo: string;
  titleEn: string;
  descKo: string;
  descEn: string;
  img: string;
  imgAltKo: string;
  imgAltEn: string;
  captionKo: string;
  captionEn: string;
}

function ValueCard({ item, lang, delay }: { item: ValueItem; lang: string; delay: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className="group flex gap-5 items-start py-5 border-b border-[#0D3D2E]/10 last:border-0"
      style={{
        opacity: 0,
        transform: 'translateY(20px)',
        transition: `opacity 0.6s cubic-bezier(0.23,1,0.32,1) ${delay}ms, transform 0.6s cubic-bezier(0.23,1,0.32,1) ${delay}ms`,
      }}
    >
      {/* Thumbnail image */}
      <div className="relative shrink-0 w-40 h-32 overflow-hidden rounded-sm">
        <img
          src={item.img}
          alt={lang === 'ko' ? item.imgAltKo : item.imgAltEn}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {/* Dark overlay with caption on hover */}
        <div className="absolute inset-0 bg-[#0D3D2E]/0 group-hover:bg-[#0D3D2E]/40 transition-colors duration-300 flex items-end">
          <p className="font-mono-lab text-[8px] tracking-[0.2em] text-white/0 group-hover:text-white/90 transition-colors duration-300 px-2 pb-1.5 leading-tight uppercase">
            {lang === 'ko' ? item.captionKo : item.captionEn}
          </p>
        </div>
      </div>

      {/* Text */}
      <div className="flex gap-4 items-start flex-1">
        <span className="font-mono-lab text-xs text-[#6B8F71] mt-0.5 shrink-0">
          {item.num}
        </span>
        <div>
          <h3 className="font-serif-kr text-base font-medium text-[#0D3D2E] mb-1.5">
            {lang === 'ko' ? item.titleKo : item.titleEn}
          </h3>
          <p className="font-body text-sm text-[#1C1C1A]/60 leading-relaxed">
            {lang === 'ko' ? item.descKo : item.descEn}
          </p>
        </div>
      </div>
    </div>
  );
}
