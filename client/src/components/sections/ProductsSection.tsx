/*
 * BUMI LAB — Products Section
 * Design: Offset grid layout, product cards with hover reveal
 * Products: Real AUIN ACU-SHOT lineup from product detail files
 */

import { useRef, useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';

// Uploaded product images
const IMGS = {
  spot: '/manus-storage/auin-spot-cream_021afe87.png',
  mild: '/manus-storage/auin-mild-cream_686dd894.png',
  syringe: '/manus-storage/auin-syringe-set_ffd7983c.png',
  brightening: '/manus-storage/auin-brightening-set_eee5e8f3.png',
  vial: '/manus-storage/auin-vial-set_a8979d98.jpg',
  ha: '/manus-storage/auin-ha-set_97515706.png',
};

interface Product {
  id: string;
  nameKo: string;
  nameEn: string;
  subtitleKo: string;
  subtitleEn: string;
  tagKo: string;
  tagEn: string;
  descKo: string;
  descEn: string;
  spiculeSize: string;
  specs: { labelKo: string; labelEn: string; value: string }[];
  benefitKo: string[];
  benefitEn: string[];
  img: string;
  badge?: string;
  isSet?: boolean;
}

const products: Product[] = [
  {
    id: 'spot-cream',
    nameKo: 'ACU-SHOT 스팟 케어 크림',
    nameEn: 'ACU-SHOT Spot Care Cream',
    subtitleKo: '고민 부위만 콕 케어',
    subtitleEn: 'Targeted Spot Treatment',
    tagKo: '국소 집중 케어',
    tagEn: 'Spot Intensive',
    descKo: '270μm 스피큘과 고농도 4% 포뮬러로 신경 쓰이는 부위에만 정교하게 사용하는 스팟 전용 크림. 3일 1회 루틴으로 필요한 부위만 집중 케어합니다.',
    descEn: 'A spot-dedicated cream using 270μm spicules and a high-concentration 4% formula for precise application on targeted areas. 3-day interval routine for intensive care.',
    spiculeSize: '270μm',
    specs: [
      { labelKo: '스피큘 함유량', labelEn: 'Spicule Content', value: '4%' },
      { labelKo: '케어 주기', labelEn: 'Routine Cycle', value: '3일 1회' },
      { labelKo: '흡수 효율', labelEn: 'Absorption', value: '31배' },
      { labelKo: '용량', labelEn: 'Volume', value: '10g × 1pc' },
    ],
    benefitKo: ['국소 부위 집중 케어', '3일 간격 부담 없는 루틴', '고농도 4% 스피큘 포뮬러'],
    benefitEn: ['Targeted spot treatment', '3-day low-burden routine', 'High-concentration 4% formula'],
    img: IMGS.spot,
    badge: 'BEST',
  },
  {
    id: 'mild-daily',
    nameKo: 'ACU-SHOT 마일드 데일리 크림',
    nameEn: 'ACU-SHOT Mild Daily Cream',
    subtitleKo: '매일 바르는 순간까지 우아하게',
    subtitleEn: 'Elegantly Refined Every Day',
    tagKo: '데일리 케어',
    tagEn: 'Daily Care',
    descKo: '100μm 울트라파인 스피큘로 예민한 날에도 부담 없이 사용하는 데일리 크림. 바른 직후보다 시간이 지날수록 더 마음에 드는 결 정돈감을 선사합니다.',
    descEn: 'A daily cream with 100μm ultra-fine spicules, gentle enough for sensitive days. Delivers refined skin texture that improves over time after application.',
    spiculeSize: '100μm',
    specs: [
      { labelKo: '스피큘 크기', labelEn: 'Spicule Size', value: '100μm Ultra-fine' },
      { labelKo: '스피큘 개수', labelEn: 'Spicule Count', value: '2,476,500개' },
      { labelKo: '용량', labelEn: 'Volume', value: '50ml' },
      { labelKo: '제형', labelEn: 'Type', value: 'Pump Cream' },
    ],
    benefitKo: ['매일 사용 가능한 순한 포뮬러', '매끈한 피부결 정돈', '은은한 윤기 표현'],
    benefitEn: ['Gentle formula for daily use', 'Smooth skin texture refinement', 'Subtle natural radiance'],
    img: IMGS.mild,
  },
  {
    id: 'ha-ampoule',
    nameKo: 'ACU-SHOT HA 앰플',
    nameEn: 'ACU-SHOT HA Ampoule',
    subtitleKo: '72시간 차오르는 수분 리듬',
    subtitleEn: '72-Hour Moisture Rhythm',
    tagKo: '집중 보습',
    tagEn: 'Deep Hydration',
    descKo: '동결건조 HA 볼과 스피큘 270μm의 듀얼 시스템. 피부 위에서 녹아드는 HA 볼이 깊은 수분 레이어링을 돕습니다. 3일 주기 딥 수분 루틴.',
    descEn: 'Dual system of freeze-dried HA balls and 270μm spicules. HA balls dissolve on skin for deep moisture layering. 3-day deep hydration ritual.',
    spiculeSize: '270μm',
    specs: [
      { labelKo: '보습 지속', labelEn: 'Moisture Duration', value: '72시간' },
      { labelKo: '케어 주기', labelEn: 'Routine Cycle', value: '3일 1회' },
      { labelKo: 'HA 구조', labelEn: 'HA Structure', value: '저분자+고분자' },
      { labelKo: '스피큘 내경', labelEn: 'Spicule Inner', value: '1.5μm 터널' },
    ],
    benefitKo: ['동결건조 HA 볼 듀얼 시스템', '72시간 보습 지속', '저분자+고분자 이중 수분 케어'],
    benefitEn: ['Freeze-dried HA ball dual system', '72-hour moisture retention', 'Low+high molecular weight dual HA'],
    img: IMGS.ha,
    badge: 'NEW',
  },
  {
    id: 'vita-c',
    nameKo: 'ACU-SHOT 비타민C 파우더 앰플',
    nameEn: 'ACU-SHOT Vita-C Powder Ampoule',
    subtitleKo: '한 병으로 끝내는 선명한 광채',
    subtitleEn: 'Brilliant Radiance in One Vial',
    tagKo: '브라이트닝',
    tagEn: 'Brightening',
    descKo: '비타민 C와 스피큘을 사용 직전까지 따로 보관하는 듀얼 캡슐 시스템. 캡을 누르는 순간 활성화되어 더 신선한 광채 루틴을 완성합니다.',
    descEn: 'Dual capsule system keeping Vitamin C and spicules separate until use. Activated the moment you press the cap for a fresher brightening routine.',
    spiculeSize: '270μm',
    specs: [
      { labelKo: '시스템', labelEn: 'System', value: '듀얼 캡슐' },
      { labelKo: '활성화', labelEn: 'Activation', value: '사용 직전' },
      { labelKo: '효과', labelEn: 'Effect', value: '광채 + 결 정돈' },
      { labelKo: '보관', labelEn: 'Storage', value: '냉장 권장' },
    ],
    benefitKo: ['사용 직전 활성화 듀얼 시스템', '맑고 선명한 광채 케어', '매끈한 피부결 정돈'],
    benefitEn: ['Pre-use activation dual system', 'Clear and vivid radiance care', 'Smooth skin texture refinement'],
    img: IMGS.vial,
  },
  {
    id: 'all-in-one',
    nameKo: 'ACU-SHOT 올인원 프로 크림',
    nameEn: 'ACU-SHOT All-in-One Pro Cream',
    subtitleKo: '여러 피부 고민을 한 번에',
    subtitleEn: 'Multiple Concerns, One Solution',
    tagKo: '올인원 케어',
    tagEn: 'All-in-One',
    descKo: '거친 결, 푸석한 인상, 칙칙한 톤까지 얼굴 전체 인상을 한 번에 관리하는 올인원 루틴. 270μm 스피큘로 4가지 피부 고민을 동시에 케어합니다.',
    descEn: 'All-in-one routine managing rough texture, dull appearance, and uneven tone all at once. 270μm spicules address 4 skin concerns simultaneously.',
    spiculeSize: '270μm',
    specs: [
      { labelKo: '케어 범위', labelEn: 'Care Range', value: '4 IN 1' },
      { labelKo: '구성', labelEn: 'Contents', value: '6회분 (6EA)' },
      { labelKo: '케어 주기', labelEn: 'Routine Cycle', value: '주 1회' },
      { labelKo: '제형', labelEn: 'Type', value: 'Syringe Cream' },
    ],
    benefitKo: ['4가지 복합 피부 고민 케어', '주 1회 집중 홈케어 루틴', '전체 얼굴 인상 관리'],
    benefitEn: ['4-in-1 multi-concern care', 'Weekly intensive home care', 'Full-face impression management'],
    img: IMGS.syringe,
  },
  {
    id: 'brightening-set',
    nameKo: 'ACU-SHOT 브라이트닝 3+3 세트',
    nameEn: 'ACU-SHOT Brightening 3+3 Set',
    subtitleKo: '집중 케어 + 진정 앰플 세트',
    subtitleEn: 'Intensive Care + Soothing Ampoule Set',
    tagKo: '세트 구성',
    tagEn: 'Set Collection',
    descKo: '주사기형 집중 케어 3개 + 바이알형 양파 추출 진정 앰플 3개 구성. 도포 → 마사지 → 진정으로 이어지는 완성된 홈케어 루틴 세트.',
    descEn: 'Set of 3 syringe-type intensive care + 3 vial-type onion extract soothing ampoules. Complete home care routine: apply → massage → soothe.',
    spiculeSize: '270μm',
    specs: [
      { labelKo: '구성', labelEn: 'Contents', value: '주사기 3 + 앰플 3' },
      { labelKo: '케어 주기', labelEn: 'Routine Cycle', value: '3일 간격' },
      { labelKo: '진정 성분', labelEn: 'Soothing', value: '양파 추출물' },
      { labelKo: '루틴', labelEn: 'Routine', value: '도포→마사지→진정' },
    ],
    benefitKo: ['집중 케어 + 진정 마무리 세트', '3일 간격 완성형 루틴', '양파 추출 진정 앰플 포함'],
    benefitEn: ['Intensive care + soothing set', '3-day complete routine', 'Onion extract soothing ampoule'],
    img: IMGS.brightening,
    isSet: true,
    badge: 'SET',
  },
];

function ProductCard({ product, index }: { product: Product; index: number }) {
  const { lang } = useLanguage();
  const [hovered, setHovered] = useState(false);
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
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div
        className="bg-white border border-[#0D3D2E]/8 hover:border-[#0D3D2E]/25 transition-all duration-300 hover:shadow-xl overflow-hidden h-full flex flex-col"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Image */}
        <div className="relative overflow-hidden bg-[#F0EDE6]" style={{ aspectRatio: '4/4.5' }}>
          <img
            src={product.img}
            alt={lang === 'ko' ? product.nameKo : product.nameEn}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
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
          <div className={`absolute inset-0 bg-[#0D3D2E]/88 flex flex-col justify-end p-5 transition-opacity duration-300 ${hovered ? 'opacity-100' : 'opacity-0'}`}>
            <div className="font-mono-lab text-[10px] tracking-widest text-[#A8C5AC] uppercase mb-3">
              {lang === 'ko' ? '주요 효과' : 'Key Benefits'}
            </div>
            <ul className="space-y-2 mb-4">
              {benefits.map((b) => (
                <li key={b} className="flex items-start gap-2 font-body text-sm text-[#F5F2EC]">
                  <span className="w-1 h-1 rounded-full bg-[#A8C5AC] shrink-0 mt-1.5" />
                  {b}
                </li>
              ))}
            </ul>
            {/* Specs mini grid */}
            <div className="grid grid-cols-2 gap-1.5">
              {product.specs.slice(0, 4).map((s) => (
                <div key={s.value} className="bg-white/10 px-2 py-1.5">
                  <div className="font-mono-lab text-[9px] text-[#A8C5AC] uppercase tracking-wide">
                    {lang === 'ko' ? s.labelKo : s.labelEn}
                  </div>
                  <div className="font-body text-xs text-white font-medium mt-0.5">{s.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

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
            {lang === 'ko' ? product.descKo : product.descEn}
          </p>
          <button
            onClick={handleShop}
            className="btn-press w-full border border-[#0D3D2E] text-[#0D3D2E] font-body text-sm tracking-wide py-2.5 hover:bg-[#0D3D2E] hover:text-[#F5F2EC] transition-all duration-200 mt-auto"
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
          {products.map((product, i) => (
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
