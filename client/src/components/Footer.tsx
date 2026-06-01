/*
 * BUMI LAB — Footer
 * Design: Minimal, clean footer with brand info and nav links
 */

import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';

export default function Footer() {
  const { lang } = useLanguage();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const navItems = [
    { id: 'brand', ko: '브랜드 소개', en: 'About Brand' },
    { id: 'science', ko: '스피큘 과학', en: 'Spicule Science' },
    { id: 'products', ko: '제품 라인업', en: 'Products' },
    { id: 'process', ko: '제조 공정', en: 'Process' },
    { id: 'contact', ko: '문의하기', en: 'Contact' },
  ];

  const legalItems = [
    { ko: '개인정보처리방침', en: 'Privacy Policy' },
    { ko: '이용약관', en: 'Terms of Use' },
  ];

  return (
    <footer className="bg-[#F5F2EC] border-t border-[#0D3D2E]/10 py-12">
      <div className="container">
        <div className="grid md:grid-cols-12 gap-10 mb-10">
          {/* Brand */}
          <div className="md:col-span-4">
            <div className="font-display text-2xl font-semibold tracking-widest text-[#0D3D2E] mb-1">
              BUMI LAB
            </div>
            <div className="font-mono-lab text-[9px] tracking-[0.3em] text-[#6B8F71] uppercase mb-4">
              {lang === 'ko' ? '클린 사이언스 리추얼' : 'Clean Science Ritual'}
            </div>
            <p className="font-body text-xs text-[#1C1C1A]/50 leading-relaxed max-w-xs">
              {lang === 'ko'
                ? '유니즈랩의 스피큘 기술을 담은 K-뷰티 스킨케어 브랜드. 자연과 과학이 만나는 피부 관리의 새로운 기준.'
                : "A K-beauty skincare brand powered by Unislab's spicule technology. A new standard in skincare where nature meets science."}
            </p>
          </div>

          {/* Nav links */}
          <div className="md:col-span-3 md:col-start-6">
            <div className="font-mono-lab text-[10px] tracking-widest text-[#6B8F71] uppercase mb-4">
              {lang === 'ko' ? '메뉴' : 'Navigation'}
            </div>
            <ul className="space-y-2.5">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollTo(item.id)}
                    className="font-body text-sm text-[#1C1C1A]/55 hover:text-[#0D3D2E] transition-colors duration-200"
                  >
                    {lang === 'ko' ? item.ko : item.en}
                  </button>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-[#0D3D2E]/10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="font-body text-xs text-[#1C1C1A]/35">
            © 2025 BUMI LAB by Unislab.{' '}
            {lang === 'ko' ? '모든 권리 보유.' : 'All rights reserved.'}
          </div>
          <div className="flex gap-6">
            {legalItems.map((item) => (
              <button
                key={item.ko}
                onClick={() => toast.info(lang === 'ko' ? '준비 중입니다.' : 'Coming soon.')}
                className="font-body text-xs text-[#1C1C1A]/35 hover:text-[#0D3D2E] transition-colors duration-200"
              >
                {lang === 'ko' ? item.ko : item.en}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
