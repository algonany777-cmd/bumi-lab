/*
 * BUMI LAB — Product Detail Page (iframe embed mode)
 * Design: Clean Protocol — thin top bar with back navigation + full-height iframe of original HTML
 * The original product HTML files are served as-is via manus-storage for 100% design fidelity.
 */

import { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'wouter';
import { ArrowLeft, ChevronRight, Loader2, ExternalLink, ShoppingBag } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { getProductBySlug } from '@/data/products';

const STORE_URL = 'https://smartstore.naver.com/spicules';

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { lang } = useLanguage();
  const product = getProductBySlug(slug ?? '');
  const [loading, setLoading] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
  }, [slug]);

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

  const name = lang === 'ko' ? product.nameKo : product.nameEn;
  const hasStoreUrl = !!product.storeUrl;
  const storeUrl = product.storeUrl ?? STORE_URL;

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F2EC]">
      {/* ── Top bar ── */}
      <header className="sticky top-0 z-50 bg-[#F5F2EC]/95 backdrop-blur-md border-b border-[#0D3D2E]/10">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-4">
          {/* Left: back + breadcrumb */}
          <div className="flex items-center gap-3 min-w-0">
            <Link
              href="/#products"
              className="shrink-0 flex items-center gap-1.5 font-mono-lab text-[11px] tracking-widest text-[#6B8F71] hover:text-[#0D3D2E] transition-colors uppercase"
            >
              <ArrowLeft size={12} />
              {lang === 'ko' ? '제품' : 'Products'}
            </Link>
            <ChevronRight size={10} className="text-[#0D3D2E]/30 shrink-0" />
            <span className="font-mono-lab text-[11px] tracking-wide text-[#0D3D2E] truncate">
              {name}
            </span>
          </div>

          {/* Right: brand mark */}
          <Link href="/" className="shrink-0 font-display text-sm tracking-[0.15em] text-[#0D3D2E] hover:opacity-70 transition-opacity">
            BUMI LAB
          </Link>
        </div>
      </header>

      {/* ── iframe ── */}
      <div className="relative flex-1">
        {loading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[#F5F2EC] z-10">
            <Loader2 size={28} className="animate-spin text-[#6B8F71]" />
            <p className="font-mono-lab text-[11px] tracking-widest text-[#6B8F71] uppercase">
              {lang === 'ko' ? '불러오는 중...' : 'Loading...'}
            </p>
          </div>
        )}
        <iframe
          ref={iframeRef}
          src={product.htmlUrl}
          title={name}
          className="w-full border-0"
          style={{ minHeight: 'calc(100vh - 3.5rem - 4rem)', height: '100%' }}
          onLoad={() => setLoading(false)}
          scrolling="yes"
          allow="autoplay"
        />
      </div>

      {/* ── Bottom bar ── */}
      <footer className="sticky bottom-0 z-50 bg-[#0D3D2E] border-t border-white/10">
        <div className="max-w-[1280px] mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-3">
          {/* Left: back link */}
          <Link
            href="/#products"
            className="flex items-center gap-1.5 font-mono-lab text-[10px] sm:text-[11px] tracking-widest text-[#A8C5AC] hover:text-white transition-colors uppercase shrink-0"
          >
            <ArrowLeft size={11} />
            <span className="hidden sm:inline">{lang === 'ko' ? '제품 목록으로 돌아가기' : 'Back to All Products'}</span>
            <span className="sm:hidden">{lang === 'ko' ? '목록' : 'Back'}</span>
          </Link>

          {/* Right: CTA buttons */}
          <div className="flex items-center gap-2">
            {/* Price tag */}
            <span className="hidden sm:block font-mono-lab text-sm text-[#A8C5AC]">
              ₩{product.price.toLocaleString('ko-KR')}
            </span>

            {/* Smart Store buy button */}
            {hasStoreUrl ? (
              <a
                href={storeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 bg-[#03C75A] text-white font-mono-lab text-[11px] tracking-widest
                           px-4 py-2.5 uppercase hover:bg-[#02b350] transition-colors duration-200
                           active:scale-[0.97]"
              >
                <ShoppingBag size={12} />
                {lang === 'ko' ? '네이버 스마트스토어 구매' : 'Buy on Smart Store'}
                <ExternalLink size={10} className="opacity-70" />
              </a>
            ) : (
              <span
                className="flex items-center gap-1.5 bg-[#A8C5AC]/30 text-[#A8C5AC] font-mono-lab text-[11px] tracking-widest
                           px-4 py-2.5 uppercase cursor-not-allowed"
              >
                {lang === 'ko' ? '준비 중' : 'Coming Soon'}
              </span>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}
