import { useCart } from '@/contexts/CartContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Minus, Plus, X, ShoppingBag, ExternalLink } from 'lucide-react';
import { PRODUCTS } from '@/data/products';

const STORE_URL = 'https://smartstore.naver.com/spicules';

const SHIPPING_THRESHOLD = 50000;
const SHIPPING_FEE = 3000;

function fmt(n: number) {
  return `₩${n.toLocaleString('ko-KR')}`;
}

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQty, subtotal } = useCart();
  const { lang } = useLanguage();

  const handleCheckout = () => {
    closeCart();
    if (items.length === 1) {
      // 단일 제품: 해당 제품 스마트스토어 페이지로
      const product = PRODUCTS.find(p => p.id === items[0].id);
      const url = product?.storeUrl ?? STORE_URL;
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      // 여러 제품: 스마트스토어 메인 페이지로
      window.open(STORE_URL, '_blank', 'noopener,noreferrer');
    }
  };

  const shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : (subtotal > 0 ? SHIPPING_FEE : 0);
  const total = subtotal + shipping;
  const remaining = SHIPPING_THRESHOLD - subtotal;

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm"
        style={{ transition: 'opacity 300ms ease' }}
        onClick={closeCart}
      />

      {/* Drawer panel */}
      <div
        className="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-[#F5F2EC] z-50 flex flex-col shadow-2xl"
        style={{ animation: 'slideInRight 300ms cubic-bezier(0.23, 1, 0.32, 1)' }}
      >
        <style>{`
          @keyframes slideInRight {
            from { transform: translateX(100%); }
            to   { transform: translateX(0); }
          }
        `}</style>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#0D3D2E]/10">
          <div className="flex items-center gap-3">
            <ShoppingBag size={18} className="text-[#0D3D2E]" />
            <h2 className="font-display text-lg text-[#0D3D2E]">
              {lang === 'ko' ? '장바구니' : 'Cart'}
            </h2>
            {items.length > 0 && (
              <span className="font-mono-lab text-xs text-[#6B8F71]">
                ({items.reduce((s, i) => s + i.qty, 0)})
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            className="w-8 h-8 flex items-center justify-center text-[#6B8F71] hover:text-[#0D3D2E] transition-colors"
            aria-label="Close cart"
          >
            <X size={18} />
          </button>
        </div>

        {/* Free shipping progress */}
        {subtotal > 0 && subtotal < SHIPPING_THRESHOLD && (
          <div className="px-6 py-3 bg-[#A8C5AC]/20 border-b border-[#A8C5AC]/30">
            <p className="font-mono-lab text-[10px] tracking-widest text-[#0D3D2E] uppercase">
              {lang === 'ko'
                ? `${fmt(remaining)} 더 구매하면 무료 배송`
                : `${fmt(remaining)} more for free shipping`}
            </p>
            <div className="mt-2 h-0.5 bg-[#A8C5AC]/40 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#0D3D2E] transition-all duration-500"
                style={{ width: `${Math.min((subtotal / SHIPPING_THRESHOLD) * 100, 100)}%` }}
              />
            </div>
          </div>
        )}
        {subtotal >= SHIPPING_THRESHOLD && subtotal > 0 && (
          <div className="px-6 py-3 bg-[#0D3D2E]/5 border-b border-[#0D3D2E]/10">
            <p className="font-mono-lab text-[10px] tracking-widest text-[#0D3D2E] uppercase">
              {lang === 'ko' ? '무료 배송 조건 충족' : 'Free shipping unlocked'}
            </p>
          </div>
        )}

        {/* Item list */}
        <div className="flex-1 overflow-y-auto py-4 space-y-3 px-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 text-[#6B8F71]">
              <ShoppingBag size={32} className="mb-3 opacity-30" />
              <p className="font-body text-sm">
                {lang === 'ko' ? '장바구니가 비어 있습니다.' : 'Your cart is empty.'}
              </p>
            </div>
          ) : items.map(item => (
            <div key={item.id} className="flex gap-3 bg-white p-3 group">
              <img
                src={item.img}
                alt={lang === 'ko' ? item.nameKo : item.nameEn}
                className="w-20 h-20 object-cover shrink-0 bg-[#F0EDE6]"
              />
              <div className="flex-1 min-w-0">
                <p className="font-body text-sm text-[#0D3D2E] font-medium leading-snug">
                  {lang === 'ko' ? item.nameKo : item.nameEn}
                </p>
                <p className="font-mono-lab text-xs text-[#6B8F71] mt-1">{fmt(item.price)}</p>
                {/* Qty controls */}
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => updateQty(item.id, item.qty - 1)}
                    className="w-6 h-6 border border-[#0D3D2E]/20 flex items-center justify-center
                               hover:bg-[#0D3D2E] hover:text-white transition-colors duration-150"
                  >
                    <Minus size={10} />
                  </button>
                  <span className="font-mono-lab text-sm w-6 text-center text-[#0D3D2E]">{item.qty}</span>
                  <button
                    onClick={() => updateQty(item.id, item.qty + 1)}
                    className="w-6 h-6 border border-[#0D3D2E]/20 flex items-center justify-center
                               hover:bg-[#0D3D2E] hover:text-white transition-colors duration-150"
                  >
                    <Plus size={10} />
                  </button>
                  <span className="ml-auto font-mono-lab text-xs text-[#0D3D2E]">
                    {fmt(item.price * item.qty)}
                  </span>
                </div>
              </div>
              <button
                onClick={() => removeItem(item.id)}
                className="text-[#A8C5AC] hover:text-[#0D3D2E] transition-colors self-start mt-0.5"
                aria-label="Remove item"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>

        {/* Summary + CTA */}
        {items.length > 0 && (
          <div className="border-t border-[#0D3D2E]/10 px-6 pt-4 pb-6 space-y-3 bg-[#F5F2EC]">
            <div className="flex justify-between font-body text-sm text-[#6B8F71]">
              <span>{lang === 'ko' ? '소계' : 'Subtotal'}</span>
              <span>{fmt(subtotal)}</span>
            </div>
            <div className="flex justify-between font-body text-sm text-[#6B8F71]">
              <span>{lang === 'ko' ? '배송비' : 'Shipping'}</span>
              <span>
                {shipping === 0
                  ? (lang === 'ko' ? '무료' : 'Free')
                  : fmt(shipping)}
              </span>
            </div>
            <div className="flex justify-between font-display text-xl text-[#0D3D2E] pt-2 border-t border-[#0D3D2E]/10">
              <span>{lang === 'ko' ? '합계' : 'Total'}</span>
              <span>{fmt(total)}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full bg-[#0D3D2E] text-[#F5F2EC] font-mono-lab text-xs tracking-widest
                         py-4 uppercase hover:bg-[#6B8F71] transition-colors duration-300
                         active:scale-[0.98] mt-2 flex items-center justify-center gap-2"
            >
              <ExternalLink size={12} />
              {lang === 'ko' ? '네이버 스마트스토어에서 구매' : 'Buy on Naver Smart Store'}
            </button>
            <p className="text-center font-mono-lab text-[10px] text-[#6B8F71]/60 tracking-wide">
              {lang === 'ko' ? '네이버페이 · 카드 · 계좌이체 결제 가능' : 'Naver Pay · Card · Bank Transfer'}
            </p>
            <button
              onClick={closeCart}
              className="w-full border border-[#0D3D2E]/20 text-[#6B8F71] font-mono-lab text-xs
                         tracking-widest py-3 uppercase hover:border-[#0D3D2E] hover:text-[#0D3D2E]
                         transition-colors duration-200"
            >
              {lang === 'ko' ? '쇼핑 계속하기' : 'Continue Shopping'}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
