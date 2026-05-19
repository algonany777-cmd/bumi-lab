/*
 * BUMI LAB — Brand Introduction Section
 * Design: Asymmetric layout, large serif quote, brand philosophy
 * Background: Off-white cream
 */

import { useRef, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function BrandSection() {
  const { lang } = useLanguage();
  const sectionRef = useScrollReveal(0.1);
  const staggerRef = useRef<HTMLDivElement>(null);

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

  const values = [
    {
      num: '01',
      titleKo: '과학적 근거',
      titleEn: 'Science-Based',
      descKo: '23단계 정제 공정을 통한 99.8% 고순도 스피큘. 모든 성분은 임상적으로 검증됩니다.',
      descEn: '99.8% pure spicule through a 23-step purification process. Every ingredient is clinically validated.',
    },
    {
      num: '02',
      titleKo: '지속 가능한 원료',
      titleEn: 'Sustainable Sourcing',
      descKo: '독자적인 해면동물 양식 기술로 자연 훼손 없이 균일한 품질의 원료를 안정적으로 공급합니다.',
      descEn: 'Our proprietary sponge cultivation technology ensures stable supply of uniform-quality raw materials without harming nature.',
    },
    {
      num: '03',
      titleKo: 'K-뷰티 리추얼',
      titleEn: 'K-Beauty Ritual',
      descKo: '한국의 스킨케어 문화와 과학적 성분이 만나 매일의 피부 관리를 의식(儀式)으로 승화시킵니다.',
      descEn: 'Korean skincare culture meets scientific ingredients, elevating daily skincare into a meaningful ritual.',
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
            <p className="font-body text-base md:text-lg text-[#1C1C1A]/65 leading-relaxed max-w-lg">
              {lang === 'ko'
                ? '부미랩은 유니즈랩의 독자적인 해양 스피큘 기술을 바탕으로 탄생한 K-뷰티 스킨케어 브랜드입니다. 깊은 바다의 해면동물에서 추출한 스피큘의 미세 침투 원리를 피부 케어에 적용하여, 피부 본연의 재생 능력을 과학적으로 활성화합니다.'
                : "BUMI LAB is a K-beauty skincare brand born from Unislab's proprietary marine spicule technology. By applying the micro-penetration principle of spicules extracted from deep-sea sponges, we scientifically activate the skin's natural regeneration capabilities."}
            </p>
          </div>

          {/* Right: Brand values */}
          <div
            ref={staggerRef}
            className="md:col-span-5 stagger-children"
          >
            {values.map((item) => (
              <div
                key={item.num}
                className="flex gap-6 py-6 border-b border-[#0D3D2E]/10 last:border-0"
              >
                <span className="font-mono-lab text-xs text-[#6B8F71] mt-1 shrink-0">
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
            ))}
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
