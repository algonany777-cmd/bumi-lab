/*
 * BUMI LAB — Product Detail Page (iframe embed mode)
 * Design: Clean Protocol — thin top bar with back navigation + full-height iframe of original HTML
 * The original product HTML files are served as-is via manus-storage for 100% design fidelity.
 */

import { useEffect, useRef, useState, useCallback } from 'react';
import { useParams, Link } from 'wouter';
import { ArrowLeft, ChevronRight, Loader2, ExternalLink, ShoppingBag, Share2, Link2, Check, X as XIcon } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { getProductBySlug } from '@/data/products';

const STORE_URL = 'https://smartstore.naver.com/spicules';

/* ── Share panel sub-component ── */
function SharePanel({
  productName,
  lang,
  onClose,
}: {
  productName: string;
  lang: 'ko' | 'en';
  onClose: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const pageUrl = window.location.href;
  const shareText = lang === 'ko'
    ? `BUMI LAB — ${productName}`
    : `BUMI LAB — ${productName}`;

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(pageUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback for older browsers
      const ta = document.createElement('textarea');
      ta.value = pageUrl;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [pageUrl]);

  const handleKakao = useCallback(() => {
    // KakaoTalk share via app URI scheme (mobile) or web sharer
    const kakaoUrl = `https://sharer.kakao.com/talk/friends/picker/link?app_key=&link_ver=4.0&template_id=&url=${encodeURIComponent(pageUrl)}`;
    // Use Web Share API if available (mobile), else open KakaoTalk link
    if (navigator.share) {
      navigator.share({ title: shareText, url: pageUrl }).catch(() => {});
    } else {
      window.open(kakaoUrl, '_blank', 'noopener,noreferrer,width=500,height=600');
    }
  }, [pageUrl, shareText]);

  const handleX = useCallback(() => {
    const url = `https://x.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(pageUrl)}`;
    window.open(url, '_blank', 'noopener,noreferrer,width=600,height=400');
  }, [pageUrl, shareText]);

  const handleFacebook = useCallback(() => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`;
    window.open(url, '_blank', 'noopener,noreferrer,width=600,height=400');
  }, [pageUrl]);

  const handleNativeShare = useCallback(() => {
    if (navigator.share) {
      navigator.share({ title: shareText, url: pageUrl }).catch(() => {});
    }
  }, [pageUrl, shareText]);

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center"
      onClick={onClose}
    >
      {/* Dim */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Panel */}
      <div
        className="relative w-full sm:w-[360px] bg-[#F5F2EC] rounded-t-2xl sm:rounded-2xl shadow-2xl
                   p-6 pb-8 sm:pb-6 z-10"
        style={{ animation: 'slideUpPanel 260ms cubic-bezier(0.23,1,0.32,1)' }}
        onClick={e => e.stopPropagation()}
      >
        <style>{`
          @keyframes slideUpPanel {
            from { transform: translateY(24px); opacity: 0; }
            to   { transform: translateY(0);    opacity: 1; }
          }
        `}</style>

        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-display text-base text-[#0D3D2E]">
            {lang === 'ko' ? '공유하기' : 'Share'}
          </h3>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center text-[#6B8F71] hover:text-[#0D3D2E] transition-colors"
            aria-label="Close share panel"
          >
            <XIcon size={16} />
          </button>
        </div>

        {/* URL copy row */}
        <div className="flex items-center gap-2 bg-white border border-[#0D3D2E]/10 px-3 py-2.5 mb-5">
          <span className="flex-1 font-mono-lab text-[10px] text-[#6B8F71] truncate">{pageUrl}</span>
          <button
            onClick={handleCopy}
            className="shrink-0 flex items-center gap-1 font-mono-lab text-[10px] tracking-widest uppercase
                       text-[#0D3D2E] hover:text-[#6B8F71] transition-colors"
            aria-label="Copy link"
          >
            {copied ? <Check size={12} className="text-[#6B8F71]" /> : <Link2 size={12} />}
            {copied
              ? (lang === 'ko' ? '복사됨' : 'Copied')
              : (lang === 'ko' ? '복사' : 'Copy')}
          </button>
        </div>

        {/* SNS buttons grid */}
        <div className="grid grid-cols-4 gap-3">
          {/* KakaoTalk */}
          <button
            onClick={handleKakao}
            className="flex flex-col items-center gap-1.5 group"
            aria-label="Share via KakaoTalk"
          >
            <span className="w-12 h-12 flex items-center justify-center bg-[#FEE500] group-hover:brightness-95 transition-all duration-200 active:scale-95">
              {/* Kakao bubble icon */}
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M12 3C6.477 3 2 6.477 2 10.8c0 2.7 1.56 5.08 3.93 6.52L5 21l4.22-2.3A11.4 11.4 0 0 0 12 18.6c5.523 0 10-3.477 10-7.8S17.523 3 12 3Z" fill="#3C1E1E"/>
              </svg>
            </span>
            <span className="font-mono-lab text-[9px] tracking-wide text-[#6B8F71]">
              KakaoTalk
            </span>
          </button>

          {/* X (Twitter) */}
          <button
            onClick={handleX}
            className="flex flex-col items-center gap-1.5 group"
            aria-label="Share on X"
          >
            <span className="w-12 h-12 flex items-center justify-center bg-black group-hover:bg-neutral-800 transition-all duration-200 active:scale-95">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.912-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </span>
            <span className="font-mono-lab text-[9px] tracking-wide text-[#6B8F71]">X</span>
          </button>

          {/* Facebook */}
          <button
            onClick={handleFacebook}
            className="flex flex-col items-center gap-1.5 group"
            aria-label="Share on Facebook"
          >
            <span className="w-12 h-12 flex items-center justify-center bg-[#1877F2] group-hover:bg-[#166fe5] transition-all duration-200 active:scale-95">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073Z"/>
              </svg>
            </span>
            <span className="font-mono-lab text-[9px] tracking-wide text-[#6B8F71]">Facebook</span>
          </button>

          {/* Native share / More */}
          <button
            onClick={typeof navigator.share === 'function' ? handleNativeShare : handleCopy}
            className="flex flex-col items-center gap-1.5 group"
            aria-label="More share options"
          >
            <span className="w-12 h-12 flex items-center justify-center bg-[#0D3D2E]/10 group-hover:bg-[#0D3D2E]/20 transition-all duration-200 active:scale-95">
              <Share2 size={18} className="text-[#0D3D2E]" />
            </span>
            <span className="font-mono-lab text-[9px] tracking-wide text-[#6B8F71]">
              {lang === 'ko' ? '더 보기' : 'More'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Main page ── */
export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { lang } = useLanguage();
  const product = getProductBySlug(slug ?? '');
  const [loading, setLoading] = useState(true);
  const [shareOpen, setShareOpen] = useState(false);
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

            {/* Share button */}
            <button
              onClick={() => setShareOpen(true)}
              className="flex items-center gap-1.5 border border-white/20 text-[#A8C5AC] font-mono-lab text-[11px]
                         tracking-widest px-3 py-2.5 uppercase hover:border-white/50 hover:text-white
                         transition-colors duration-200 active:scale-[0.97]"
              aria-label="Share this product"
            >
              <Share2 size={12} />
              <span className="hidden sm:inline">{lang === 'ko' ? '공유' : 'Share'}</span>
            </button>

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
                <span className="hidden sm:inline">{lang === 'ko' ? '네이버 스마트스토어 구매' : 'Buy on Smart Store'}</span>
                <span className="sm:hidden">{lang === 'ko' ? '구매' : 'Buy'}</span>
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

      {/* ── Share panel (modal) ── */}
      {shareOpen && (
        <SharePanel
          productName={name}
          lang={lang}
          onClose={() => setShareOpen(false)}
        />
      )}
    </div>
  );
}
