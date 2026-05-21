/*
 * BUMI LAB — Manufacturing Process Section
 * Design: Timeline layout on sage-green background, step-by-step process
 * Features: Animated timeline, per-step images with lightbox
 */

import { useRef, useEffect, useState, useCallback } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const PROCESS_IMGS = [
  'https://d2xsxph8kpxj0f.cloudfront.net/310519663388603264/FfX63THfQipTQqzBdN4z4M/process-01-cultivation-QYEuYGhU3RMoHc8hpwrmMs.webp',
  'https://d2xsxph8kpxj0f.cloudfront.net/310519663388603264/FfX63THfQipTQqzBdN4z4M/process-02-extraction-Livu7T9q4LR8aJdvma7inv.webp',
  'https://d2xsxph8kpxj0f.cloudfront.net/310519663388603264/FfX63THfQipTQqzBdN4z4M/process-03-purification-dmX5WND2Yz74i5uWoRauM2.webp',
  'https://d2xsxph8kpxj0f.cloudfront.net/310519663388603264/FfX63THfQipTQqzBdN4z4M/process-04-classification-4ytLjpjymTty37QbBKwyT4.webp',
  'https://d2xsxph8kpxj0f.cloudfront.net/310519663388603264/FfX63THfQipTQqzBdN4z4M/process-05-quality-32vZTTgckTAcDf3A6RF9PG.webp',
  'https://d2xsxph8kpxj0f.cloudfront.net/310519663388603264/FfX63THfQipTQqzBdN4z4M/process-06-formulation-oPtvm6HBCJ4rcVsghauVmu.webp',
];

/* ── Lightbox ── */
interface LightboxProps {
  src: string;
  alt: string;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
  closing: boolean;
}

function Lightbox({ src, alt, onClose, onPrev, onNext, hasPrev, hasNext, closing }: LightboxProps) {
  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && hasPrev) onPrev();
      if (e.key === 'ArrowRight' && hasNext) onNext();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose, onPrev, onNext, hasPrev, hasNext]);

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{
        animation: closing
          ? 'lbFadeOut 220ms ease-in forwards'
          : 'lbFadeIn 260ms ease-out forwards',
      }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/85 backdrop-blur-sm cursor-zoom-out"
        onClick={onClose}
      />

      {/* Image container */}
      <div
        className="relative z-10 max-w-[90vw] max-h-[90vh] flex items-center justify-center"
        style={{
          animation: closing
            ? 'lbSlideDown 220ms ease-in forwards'
            : 'lbSlideUp 280ms cubic-bezier(0.23,1,0.32,1) forwards',
        }}
      >
        <img
          src={src}
          alt={alt}
          className="max-w-full max-h-[85vh] object-contain rounded-sm shadow-2xl"
          draggable={false}
        />

        {/* Caption */}
        <div className="absolute bottom-0 left-0 right-0 px-4 py-3 bg-gradient-to-t from-black/60 to-transparent rounded-b-sm">
          <p className="font-mono-lab text-[11px] tracking-[0.2em] text-white/80 uppercase text-center">
            {alt}
          </p>
        </div>
      </div>

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/25 transition-colors duration-200 text-white"
        aria-label="Close"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M2 2l14 14M16 2L2 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </button>

      {/* Prev button */}
      {hasPrev && (
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/25 transition-colors duration-200 text-white"
          aria-label="Previous"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M13 4l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}

      {/* Next button */}
      {hasNext && (
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/25 transition-colors duration-200 text-white"
          aria-label="Next"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M7 4l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}
    </div>
  );
}

export default function ProcessSection() {
  const { lang } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  // Lightbox state
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const [closing, setClosing] = useState(false);

  const openLightbox = useCallback((idx: number) => {
    setClosing(false);
    setLightboxIdx(idx);
  }, []);

  const closeLightbox = useCallback(() => {
    setClosing(true);
    setTimeout(() => {
      setLightboxIdx(null);
      setClosing(false);
    }, 230);
  }, []);

  const goPrev = useCallback(() => {
    setLightboxIdx((i) => (i !== null && i > 0 ? i - 1 : i));
  }, []);

  const goNext = useCallback(() => {
    setLightboxIdx((i) => (i !== null && i < PROCESS_IMGS.length - 1 ? i + 1 : i));
  }, []);

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
    <>
      {/* Lightbox keyframe styles */}
      <style>{`
        @keyframes lbFadeIn  { from { opacity: 0; } to { opacity: 1; } }
        @keyframes lbFadeOut { from { opacity: 1; } to { opacity: 0; } }
        @keyframes lbSlideUp   { from { opacity: 0; transform: scale(0.95) translateY(16px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        @keyframes lbSlideDown { from { opacity: 1; transform: scale(1) translateY(0); } to { opacity: 0; transform: scale(0.95) translateY(16px); } }
      `}</style>

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

          {/* Timeline */}
          <div ref={timelineRef} className="stagger-children">
            {steps.map((step, idx) => (
              <div key={step.num} className="flex gap-6 pb-10 last:pb-0">
                {/* Left: number + connector */}
                <div className="flex flex-col items-center shrink-0">
                  <div className="w-10 h-10 border border-[#0D3D2E] flex items-center justify-center">
                    <span className="font-mono-lab text-xs text-[#0D3D2E]">{step.num}</span>
                  </div>
                  {idx < steps.length - 1 && (
                    <div className="flex-1 w-px bg-[#0D3D2E]/15 mt-2" />
                  )}
                </div>

                {/* Right: image + text */}
                <div className="flex-1 pb-2">
                  {/* Clickable image */}
                  <button
                    type="button"
                    className="group w-full h-48 md:h-56 overflow-hidden rounded-sm mb-4 block relative cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6B8F71]"
                    onClick={() => openLightbox(idx)}
                    aria-label={lang === 'ko' ? `${step.titleKo} 이미지 크게 보기` : `View ${step.titleEn} image`}
                  >
                    <img
                      src={PROCESS_IMGS[idx]}
                      alt={lang === 'ko' ? step.titleKo : step.titleEn}
                      className="w-full h-full object-cover scale-100 transition-transform duration-700 ease-out group-hover:scale-110"
                      loading="lazy"
                    />
                    {/* Zoom hint overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/20 backdrop-blur-sm rounded-full p-2.5">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-white">
                          <circle cx="8.5" cy="8.5" r="5.5" stroke="currentColor" strokeWidth="1.8"/>
                          <path d="M13 13l3.5 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                          <path d="M6.5 8.5h4M8.5 6.5v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                        </svg>
                      </div>
                    </div>
                  </button>

                  {/* Text */}
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

      {/* Lightbox portal */}
      {lightboxIdx !== null && (
        <Lightbox
          src={PROCESS_IMGS[lightboxIdx]}
          alt={lang === 'ko' ? steps[lightboxIdx].titleKo : steps[lightboxIdx].titleEn}
          onClose={closeLightbox}
          onPrev={goPrev}
          onNext={goNext}
          hasPrev={lightboxIdx > 0}
          hasNext={lightboxIdx < PROCESS_IMGS.length - 1}
          closing={closing}
        />
      )}
    </>
  );
}
