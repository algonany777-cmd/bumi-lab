/*
 * BUMI LAB — Hero Section
 * Design: Asymmetric split layout, large display typography, scroll indicator
 * Background: Generated brand hero image (off-white + emerald + sage)
 * Text: Dark on light background
 */

import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const HERO_IMG =
  'https://d2xsxph8kpxj0f.cloudfront.net/310519663388603264/FfX63THfQipTQqzBdN4z4M/bumi-hero-X6SqdEiAxeBh7v54UvdM3o.webp';

export default function HeroSection() {
  const { lang } = useLanguage();
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const scrollToNext = () => {
    const el = document.getElementById('brand');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col overflow-hidden bg-[#F5F2EC]"
    >
      {/* Background image — right side */}
      <div className="absolute inset-0 md:left-[45%] left-0">
        <img
          src={HERO_IMG}
          alt="BUMI LAB hero"
          className="w-full h-full object-cover"
        />
        {/* Gradient overlay — left fade */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#F5F2EC] via-[#F5F2EC]/80 to-transparent md:via-[#F5F2EC]/60" />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#F5F2EC] to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container flex flex-col justify-center min-h-screen pt-20 pb-16">
        <div className="max-w-xl">
          {/* Label */}
          <div
            className={`flex items-center gap-3 mb-8 transition-all duration-700 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            <span className="block w-8 h-px bg-[#0D3D2E]" />
            <span className="font-mono-lab text-[11px] tracking-[0.3em] text-[#6B8F71] uppercase">
              {lang === 'ko' ? '유니즈랩 스피큘 테크놀로지' : 'Unislab Spicule Technology'}
            </span>
          </div>

          {/* Main headline */}
          <h1
            className={`font-display text-5xl md:text-6xl lg:text-7xl font-medium text-[#0D3D2E] leading-[1.05] mb-6 transition-all duration-800 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '250ms' }}
          >
            {lang === 'ko' ? (
              <>
                자연이 빚은<br />
                <em className="not-italic text-[#6B8F71]">과학</em>의 결정체
              </>
            ) : (
              <>
                Nature's<br />
                <em className="not-italic text-[#6B8F71]">Science</em>,<br />
                Crystallized
              </>
            )}
          </h1>

          {/* Sub headline */}
          <p
            className={`font-body text-base md:text-lg text-[#1C1C1A]/65 leading-relaxed mb-10 max-w-sm transition-all duration-700 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            {lang === 'ko'
              ? (
                <>
                  해양 스피큘의 미세 침투 원리로 피부 본연의 재생 리듬을 깨웁니다.<br /><br />
                  99.8% 고순도 스피큘, 23단계 정제 공정.
                </>
              )
              : "Marine spicule micro-penetration awakens your skin's natural regeneration rhythm. 99.8% pure spicule, 23-step purification process."}
          </p>

          {/* CTAs */}
          <div
            className={`flex flex-wrap gap-4 transition-all duration-700 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: '550ms' }}
          >
            <button
              onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-press bg-[#0D3D2E] text-[#F5F2EC] font-body text-sm tracking-wider px-8 py-3.5 hover:bg-[#1A5C44] transition-colors duration-200"
            >
              {lang === 'ko' ? '제품 보기' : 'Explore Products'}
            </button>
            <button
              onClick={() => document.getElementById('science')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-press border border-[#0D3D2E] text-[#0D3D2E] font-body text-sm tracking-wider px-8 py-3.5 hover:bg-[#0D3D2E] hover:text-[#F5F2EC] transition-all duration-200"
            >
              {lang === 'ko' ? '스피큘 과학' : 'Spicule Science'}
            </button>
          </div>

          {/* Stats row */}
          <div
            className={`flex gap-8 mt-14 pt-8 border-t border-[#0D3D2E]/15 transition-all duration-700 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: '700ms' }}
          >
            {[
              { num: '99.8', unit: '%', label: lang === 'ko' ? '스피큘 순도' : 'Spicule Purity' },
              { num: '23', unit: lang === 'ko' ? '단계' : 'Steps', label: lang === 'ko' ? '정제 공정' : 'Purification' },
              { num: '4', unit: lang === 'ko' ? '종' : 'Types', label: lang === 'ko' ? '스피큘 크기' : 'Spicule Sizes' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="stat-number text-2xl md:text-3xl">
                  {stat.num}
                  <span className="text-base font-normal text-[#6B8F71] ml-0.5">{stat.unit}</span>
                </div>
                <div className="font-body text-xs text-[#1C1C1A]/50 mt-1 tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToNext}
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#0D3D2E]/50 hover:text-[#0D3D2E] transition-all duration-300 z-10 ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ transitionDelay: '900ms' }}
        aria-label="Scroll down"
      >
        <span className="font-mono-lab text-[10px] tracking-[0.3em] uppercase">
          {lang === 'ko' ? '스크롤' : 'Scroll'}
        </span>
        <div className="w-px h-10 bg-[#0D3D2E]/30 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[#0D3D2E] animate-[scrollLine_1.5s_ease-in-out_infinite]" />
        </div>
      </button>

      <style>{`
        @keyframes scrollLine {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </section>
  );
}
