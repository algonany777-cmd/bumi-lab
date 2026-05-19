/*
 * BUMI LAB — Manufacturing Process Section
 * Design: Timeline layout on sage-green background, step-by-step process
 * Features: Animated timeline, manufacturing image
 */

import { useRef, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const MFG_IMG =
  'https://d2xsxph8kpxj0f.cloudfront.net/310519663388603264/FfX63THfQipTQqzBdN4z4M/bumi-manufacturing-KRtMUe8pkoUtQdgMkLuaX9.webp';

export default function ProcessSection() {
  const { lang } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('visible'); },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = timelineRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('visible'); },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const steps = [
    {
      num: '01',
      titleKo: '해면동물 양식',
      titleEn: 'Sponge Cultivation',
      descKo: '독자적인 스마트팜 기술로 해면동물을 청정 환경에서 안정적으로 양식합니다. 자연 채취 없이 균일한 품질의 원료를 확보합니다.',
      descEn: 'Marine sponges are stably cultivated in a clean environment using proprietary smart-farm technology, ensuring uniform quality without wild harvesting.',
    },
    {
      num: '02',
      titleKo: '스피큘 추출',
      titleEn: 'Spicule Extraction',
      descKo: '해면동물에서 스피큘만을 선택적으로 분리하는 특수 추출 공정을 적용합니다. 스피큘의 구조적 완전성을 유지합니다.',
      descEn: 'A specialized extraction process selectively isolates spicules from sponges while maintaining their structural integrity.',
    },
    {
      num: '03',
      titleKo: '23단계 정제',
      titleEn: '23-Step Purification',
      descKo: '23단계의 엄격한 정제 과정을 통해 불순물을 완전히 제거하고 99.8% 고순도 스피큘을 완성합니다.',
      descEn: 'Through 23 rigorous purification steps, all impurities are completely removed to achieve 99.8% pure spicule.',
    },
    {
      num: '04',
      titleKo: '크기별 분류',
      titleEn: 'Size Classification',
      descKo: '100μm, 200μm, 270μm, 320μm 4가지 크기로 정밀 분류하여 각 제품의 목적에 맞는 스피큘을 선별합니다.',
      descEn: "Precisely classified into 4 sizes (100μm, 200μm, 270μm, 320μm) to select the appropriate spicule for each product's purpose.",
    },
    {
      num: '05',
      titleKo: '품질 검증',
      titleEn: 'Quality Validation',
      descKo: '현미경 분석, 순도 테스트, 피부 안전성 평가를 포함한 다단계 품질 검증을 거쳐 최종 원료를 승인합니다.',
      descEn: 'Final raw materials are approved through multi-stage quality validation including microscopic analysis, purity testing, and skin safety evaluation.',
    },
    {
      num: '06',
      titleKo: '제품 배합 및 완성',
      titleEn: 'Formulation & Completion',
      descKo: '검증된 스피큘 원료와 최적의 보조 성분을 배합하여 부미랩 제품을 완성합니다. GMP 인증 시설에서 생산됩니다.',
      descEn: 'Validated spicule raw materials are combined with optimal supporting ingredients to complete BUMI LAB products, manufactured in GMP-certified facilities.',
    },
  ];

  const certs = [
    { ko: 'GMP 인증', en: 'GMP Certified' },
    { ko: '스피큘 양식 특허', en: 'Spicule Cultivation Patent' },
    { ko: '고순도 정제 기술 특허', en: 'High-Purity Purification Patent' },
    { ko: '피부 안전성 임상 완료', en: 'Skin Safety Clinical Completed' },
  ];

  return (
    <section
      id="process"
      ref={sectionRef}
      className="py-24 md:py-36 bg-[#EDE9E0] reveal-up"
    >
      <div className="container">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <span className="block w-8 h-px bg-[#0D3D2E]" />
          <span className="font-mono-lab text-[11px] tracking-[0.3em] text-[#6B8F71] uppercase">
            {lang === 'ko' ? '제조 공정' : 'Manufacturing Process'}
          </span>
        </div>
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 mb-20 items-end">
          <h2 className="font-display text-4xl md:text-5xl text-[#0D3D2E] leading-[1.1]">
            {lang === 'ko' ? (
              <>엄격한 과학,<br /><span className="text-[#6B8F71]">신뢰할 수 있는</span><br />공정</>
            ) : (
              <>Rigorous Science,<br /><span className="text-[#6B8F71]">Trustworthy</span><br />Process</>
            )}
          </h2>
          <p className="font-body text-base text-[#1C1C1A]/60 leading-relaxed">
            {lang === 'ko'
              ? '부미랩의 모든 제품은 유니즈랩의 특허 기술로 생산된 고순도 스피큘을 사용합니다. 양식부터 완제품까지 모든 단계에서 엄격한 품질 기준을 적용합니다.'
              : "All BUMI LAB products use high-purity spicules produced with Unislab's patented technology. Strict quality standards are applied at every stage from cultivation to finished product."}
          </p>
        </div>

        {/* Main layout: timeline + image */}
        <div className="grid md:grid-cols-12 gap-12">
          {/* Timeline */}
          <div ref={timelineRef} className="md:col-span-7 stagger-children">
            {steps.map((step) => (
              <div key={step.num} className="flex gap-6 pb-8 last:pb-0">
                {/* Left: number + connector */}
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 shrink-0 border border-[#0D3D2E] flex items-center justify-center">
                    <span className="font-mono-lab text-xs text-[#0D3D2E]">{step.num}</span>
                  </div>
                  <div className="flex-1 w-px bg-[#0D3D2E]/15 mt-2 last:hidden" />
                </div>
                {/* Right: content */}
                <div className="pb-2">
                  <h3 className="font-serif-kr text-base font-medium text-[#0D3D2E] mb-2">
                    {lang === 'ko' ? step.titleKo : step.titleEn}
                  </h3>
                  <p className="font-body text-sm text-[#1C1C1A]/60 leading-relaxed">
                    {lang === 'ko' ? step.descKo : step.descEn}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Image */}
          <div className="md:col-span-5">
            <div className="img-hover sticky top-24">
              <img
                src={MFG_IMG}
                alt={lang === 'ko' ? '유니즈랩 제조 시설' : 'Unislab Manufacturing Facility'}
                className="w-full aspect-[3/4] object-cover"
              />
              <div className="bg-[#0D3D2E] px-6 py-5">
                <div className="font-mono-lab text-[10px] tracking-widest text-[#A8C5AC] uppercase mb-1">
                  {lang === 'ko' ? '제조 시설' : 'Manufacturing Facility'}
                </div>
                <div className="font-body text-sm text-[#F5F2EC]/80">
                  {lang === 'ko' ? '유니즈랩 GMP 인증 생산 시설' : 'Unislab GMP-certified production facility'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className="mt-16 pt-10 border-t border-[#0D3D2E]/15">
          <div className="font-mono-lab text-[11px] tracking-[0.3em] text-[#6B8F71] uppercase mb-6">
            {lang === 'ko' ? '인증 및 특허' : 'Certifications & Patents'}
          </div>
          <div className="flex flex-wrap gap-4">
            {certs.map((cert) => (
              <div
                key={cert.ko}
                className="border border-[#0D3D2E]/25 px-4 py-2 font-body text-sm text-[#0D3D2E]"
              >
                {lang === 'ko' ? cert.ko : cert.en}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
