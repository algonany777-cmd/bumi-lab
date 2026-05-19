/*
 * BUMI LAB — Spicule Science Section
 * Design: Dark emerald background, circular image clips, data visualization
 * Features: YouTube embed, spicule mechanism diagram, stat counters
 */

import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCounter } from '@/hooks/useCounter';

const SPICULE_IMG =
  'https://d2xsxph8kpxj0f.cloudfront.net/310519663388603264/FfX63THfQipTQqzBdN4z4M/bumi-spicule-science-NnZ55hT3bBHsug5EgKQYuC.webp';

function StatCounter({
  target,
  unit,
  label,
  start,
  decimal,
}: {
  target: number;
  unit: string;
  label: string;
  start: boolean;
  decimal?: boolean;
}) {
  const count = useCounter(target, 1800, start);
  return (
    <div className="text-center">
      <div className="stat-number text-4xl md:text-5xl text-[#F5F2EC]">
        {decimal ? (count / 10).toFixed(1) : count}
        <span className="text-xl md:text-2xl text-[#A8C5AC] ml-1">{unit}</span>
      </div>
      <div className="font-body text-xs text-[#A8C5AC] mt-2 tracking-wide">{label}</div>
    </div>
  );
}

export default function ScienceSection() {
  const { lang } = useLanguage();
  const [statsVisible, setStatsVisible] = useState(false);
  const [sectionVisible, setSectionVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    const statsEl = statsRef.current;
    if (!sectionEl || !statsEl) return;

    const sectionObs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setSectionVisible(true); },
      { threshold: 0.05 }
    );
    const statsObs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setStatsVisible(true); },
      { threshold: 0.3 }
    );

    sectionObs.observe(sectionEl);
    statsObs.observe(statsEl);
    return () => { sectionObs.disconnect(); statsObs.disconnect(); };
  }, []);

  const mechanisms = [
    {
      size: '100μm',
      effectKo: '표피층 각질 케어',
      effectEn: 'Stratum Corneum Care',
      descKo: '피부 표면의 각질과 노폐물을 제거하고 피부결을 정돈합니다.',
      descEn: 'Removes dead skin cells and refines skin texture.',
      color: '#A8C5AC',
    },
    {
      size: '200μm',
      effectKo: '표피 기저층 자극',
      effectEn: 'Basal Layer Stimulation',
      descKo: '표피 기저층에 작용하여 세포 재생 신호를 활성화합니다.',
      descEn: 'Activates cell regeneration signals at the epidermal basal layer.',
      color: '#6B8F71',
    },
    {
      size: '270μm',
      effectKo: '진피층 콜라겐 촉진',
      effectEn: 'Dermal Collagen Boost',
      descKo: '진피층까지 침투하여 콜라겐 합성을 촉진하고 탄력을 개선합니다.',
      descEn: 'Penetrates to the dermis to stimulate collagen synthesis and improve elasticity.',
      color: '#2D6A4F',
    },
    {
      size: '320μm',
      effectKo: '심층 재생 활성화',
      effectEn: 'Deep Regeneration',
      descKo: '피부 심층부의 재생 능력을 깨워 근본적인 피부 건강을 회복합니다.',
      descEn: 'Awakens deep skin regeneration capacity for fundamental skin health restoration.',
      color: '#0D3D2E',
    },
  ];

  return (
    <section
      id="science"
      ref={sectionRef}
      className="py-24 md:py-36 bg-[#0D3D2E] overflow-hidden"
    >
      <div className="container">
        {/* Section label */}
        <div
          className={`flex items-center gap-3 mb-16 transition-all duration-700 ${sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <span className="block w-8 h-px bg-[#A8C5AC]" />
          <span className="font-mono-lab text-[11px] tracking-[0.3em] text-[#A8C5AC] uppercase">
            {lang === 'ko' ? '스피큘 과학' : 'Spicule Science'}
          </span>
        </div>

        {/* Main grid */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center mb-24">
          {/* Left: Text */}
          <div
            className={`transition-all duration-800 ${sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: '150ms' }}
          >
            <h2 className="font-display text-4xl md:text-5xl text-[#F5F2EC] leading-[1.1] mb-6">
              {lang === 'ko' ? (
                <>
                  바다가 만든<br />
                  <span className="text-[#A8C5AC]">미세 결정체</span>
                </>
              ) : (
                <>
                  Micro Crystals<br />
                  <span className="text-[#A8C5AC]">Born from the Sea</span>
                </>
              )}
            </h2>
            <p className="font-body text-base text-[#F5F2EC]/65 leading-relaxed mb-8">
              {lang === 'ko'
                ? '스피큘(Spicule)은 해면동물의 골격을 이루는 미세한 침 형태의 결정체입니다. 100~320μm의 다양한 크기로 존재하며, 각 크기별로 피부의 서로 다른 층에 작용하여 맞춤형 피부 재생 효과를 발휘합니다.'
                : 'Spicules are microscopic needle-shaped crystals that form the skeleton of marine sponges. Existing in various sizes from 100 to 320μm, each size acts on different layers of the skin to deliver targeted skin regeneration effects.'}
            </p>

            {/* Mechanism list */}
            <div className="space-y-4">
              {mechanisms.map((m, i) => (
                <div
                  key={m.size}
                  className={`flex items-start gap-4 transition-all duration-600 ${sectionVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
                  style={{ transitionDelay: `${300 + i * 80}ms` }}
                >
                  <div
                    className="shrink-0 font-mono-lab text-xs px-2 py-1 mt-0.5"
                    style={{ backgroundColor: m.color + '33', color: m.color === '#0D3D2E' ? '#A8C5AC' : m.color, border: `1px solid ${m.color}66` }}
                  >
                    {m.size}
                  </div>
                  <div>
                    <div className="font-serif-kr text-sm font-medium text-[#F5F2EC] mb-0.5">
                      {lang === 'ko' ? m.effectKo : m.effectEn}
                    </div>
                    <div className="font-body text-xs text-[#F5F2EC]/50 leading-relaxed">
                      {lang === 'ko' ? m.descKo : m.descEn}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Circular image */}
          <div
            className={`flex justify-center transition-all duration-900 ${sectionVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
            style={{ transitionDelay: '200ms' }}
          >
            <div className="relative">
              {/* Main circle */}
              <div className="circle-clip w-72 h-72 md:w-96 md:h-96 border-2 border-[#A8C5AC]/30">
                <img
                  src={SPICULE_IMG}
                  alt="Spicule microscopy"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative ring */}
              <div className="absolute -inset-4 rounded-full border border-[#6B8F71]/20" />
              <div className="absolute -inset-8 rounded-full border border-[#6B8F71]/10" />
              {/* Label badge */}
              <div className="absolute -bottom-4 -right-4 bg-[#F5F2EC] px-4 py-3 shadow-lg">
                <div className="font-mono-lab text-[10px] tracking-widest text-[#6B8F71] uppercase">
                  {lang === 'ko' ? '해면동물 스피큘' : 'Marine Sponge Spicule'}
                </div>
                <div className="font-display text-sm text-[#0D3D2E] font-medium mt-0.5">
                  Porifera Spicule
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* YouTube video */}
        <div
          className={`mb-24 transition-all duration-800 ${sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ transitionDelay: '400ms' }}
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono-lab text-[11px] tracking-[0.3em] text-[#A8C5AC] uppercase">
              {lang === 'ko' ? '스피큘 소개 영상' : 'Spicule Introduction Video'}
            </span>
          </div>
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/AqGD3ZoCwJQ?rel=0&modestbranding=1"
              title={lang === 'ko' ? '유니즈랩 스피큘 소개 영상' : 'Unislab Spicule Introduction Video'}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        {/* Stats */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-[#F5F2EC]/10"
        >
          <StatCounter target={998} unit="%" label={lang === 'ko' ? '스피큘 순도' : 'Spicule Purity'} start={statsVisible} decimal />
          <StatCounter target={23} unit={lang === 'ko' ? '단계' : 'Steps'} label={lang === 'ko' ? '정제 공정' : 'Purification Process'} start={statsVisible} />
          <StatCounter target={4} unit={lang === 'ko' ? '종' : 'Types'} label={lang === 'ko' ? '스피큘 크기' : 'Spicule Sizes'} start={statsVisible} />
          <StatCounter target={100} unit="%" label={lang === 'ko' ? '자체 양식' : 'In-house Cultivation'} start={statsVisible} />
        </div>
      </div>
    </section>
  );
}
