import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'wouter';
import { Check, Package } from 'lucide-react';

export default function OrderComplete() {
  const { lang } = useLanguage();
  const t = (ko: string, en: string) => lang === 'ko' ? ko : en;

  return (
    <div className="min-h-screen bg-[#F5F2EC] flex flex-col">
      {/* Top nav */}
      <nav className="border-b border-[#0D3D2E]/10 bg-[#F5F2EC]">
        <div className="container flex items-center h-14">
          <Link to="/" className="font-display text-lg text-[#0D3D2E] tracking-widest">BUMI LAB</Link>
        </div>
      </nav>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-16">
        {/* Success icon */}
        <div className="relative mb-8">
          <div className="w-20 h-20 rounded-full bg-[#A8C5AC]/30 flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-[#A8C5AC] flex items-center justify-center">
              <Check size={28} className="text-[#0D3D2E]" strokeWidth={2.5} />
            </div>
          </div>
        </div>

        <div className="text-center max-w-md space-y-4">
          <p className="font-mono-lab text-[10px] tracking-[0.3em] text-[#6B8F71] uppercase">
            {t('주문 완료', 'Order Confirmed')}
          </p>
          <h1 className="font-display text-3xl md:text-4xl text-[#0D3D2E]">
            {t('감사합니다', 'Thank You')}
          </h1>
          <p className="font-body text-sm text-[#1C1C1A]/60 leading-relaxed">
            {t(
              '주문이 성공적으로 접수되었습니다. 주문 확인 이메일이 곧 발송됩니다. 배송이 시작되면 별도로 안내해 드리겠습니다.',
              'Your order has been successfully placed. A confirmation email will be sent shortly. We will notify you once your order has shipped.'
            )}
          </p>
        </div>

        {/* Order info card */}
        <div className="mt-10 bg-white border border-[#0D3D2E]/10 p-6 w-full max-w-sm space-y-3">
          <div className="flex items-center gap-3 text-[#0D3D2E]">
            <Package size={16} />
            <span className="font-mono-lab text-[10px] tracking-widest uppercase">
              {t('배송 안내', 'Shipping Info')}
            </span>
          </div>
          <div className="space-y-2 font-body text-sm text-[#1C1C1A]/70">
            <p>
              {t('• 영업일 기준 2~3일 내 발송됩니다.', '• Ships within 2–3 business days.')}
            </p>
            <p>
              {t('• 배송 시작 시 문자/이메일로 안내드립니다.', '• You will receive a shipping notification by email/SMS.')}
            </p>
            <p>
              {t('• 문의: contact@bumilab.com', '• Inquiries: contact@bumilab.com')}
            </p>
          </div>
        </div>

        {/* CTA buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3 w-full max-w-sm">
          <Link
            to="/"
            className="flex-1 bg-[#0D3D2E] text-[#F5F2EC] font-mono-lab text-xs tracking-widest
                       py-4 uppercase text-center hover:bg-[#6B8F71] transition-colors duration-300
                       active:scale-[0.98]"
          >
            {t('홈으로 돌아가기', 'Back to Home')}
          </Link>
          <Link
            to="/#products"
            className="flex-1 border border-[#0D3D2E]/30 text-[#0D3D2E] font-mono-lab text-xs
                       tracking-widest py-4 uppercase text-center hover:border-[#0D3D2E]
                       hover:bg-[#0D3D2E]/5 transition-colors duration-200"
          >
            {t('더 쇼핑하기', 'Continue Shopping')}
          </Link>
        </div>
      </div>
    </div>
  );
}
