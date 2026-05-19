/*
 * BUMI LAB Navigation
 * Design: Clean Protocol — Swiss International Style
 * Fixed top nav with scroll-based background transition
 * Language toggle (KO/EN) on the right
 */

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const navItems = [
  { id: 'brand', ko: '브랜드', en: 'Brand' },
  { id: 'science', ko: '스피큘 과학', en: 'Spicule Science' },
  { id: 'products', ko: '제품', en: 'Products' },
  { id: 'process', ko: '제조 공정', en: 'Process' },
  { id: 'contact', ko: '문의', en: 'Contact' },
];

export default function Navigation() {
  const { lang, toggleLang, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setMenuOpen(false);
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#F5F2EC]/95 backdrop-blur-md shadow-sm border-b border-[#0D3D2E]/10'
            : 'bg-transparent'
        }`}
      >
        <div className="container flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex flex-col items-start group"
          >
            <span
              className="font-display text-xl md:text-2xl font-semibold tracking-widest text-[#0D3D2E] leading-none"
              style={{ letterSpacing: '0.18em' }}
            >
              BUMI LAB
            </span>
            <span className="font-mono-lab text-[9px] tracking-[0.3em] text-[#6B8F71] uppercase mt-0.5">
              {t('클린 사이언스 리추얼', 'Clean Science Ritual')}
            </span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="font-body text-sm text-[#1C1C1A]/70 hover:text-[#0D3D2E] transition-colors duration-200 tracking-wide relative group"
              >
                {lang === 'ko' ? item.ko : item.en}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#0D3D2E] transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-4">
            {/* Language Toggle */}
            <button
              onClick={toggleLang}
              className="font-mono-lab text-xs tracking-widest border border-[#0D3D2E]/30 hover:border-[#0D3D2E] text-[#0D3D2E] px-3 py-1.5 transition-all duration-200 hover:bg-[#0D3D2E] hover:text-[#F5F2EC] btn-press"
            >
              {lang === 'ko' ? 'EN' : 'KO'}
            </button>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden flex flex-col gap-1.5 p-1"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span
                className={`block w-6 h-px bg-[#0D3D2E] transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}
              />
              <span
                className={`block w-6 h-px bg-[#0D3D2E] transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}
              />
              <span
                className={`block w-6 h-px bg-[#0D3D2E] transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-[#F5F2EC] flex flex-col justify-center items-center transition-all duration-400 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center gap-8">
          {navItems.map((item, i) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="font-display text-3xl text-[#0D3D2E] hover:text-[#6B8F71] transition-colors duration-200"
              style={{ transitionDelay: menuOpen ? `${i * 60}ms` : '0ms' }}
            >
              {lang === 'ko' ? item.ko : item.en}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
