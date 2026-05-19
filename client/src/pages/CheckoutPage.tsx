import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocation, Link } from 'wouter';
import { ChevronLeft, Package, CreditCard, Check, ShoppingBag } from 'lucide-react';
import { toast } from 'sonner';

const SHIPPING_THRESHOLD = 50000;
const SHIPPING_FEE = 3000;

function fmt(n: number) {
  return `₩${n.toLocaleString('ko-KR')}`;
}

interface ShippingForm {
  name: string;
  phone: string;
  email: string;
  postcode: string;
  address: string;
  addressDetail: string;
  memo: string;
}

const EMPTY_FORM: ShippingForm = {
  name: '', phone: '', email: '', postcode: '', address: '', addressDetail: '', memo: '',
};

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const { lang } = useLanguage();
  const [, navigate] = useLocation();
  const [step, setStep] = useState<'shipping' | 'payment'>('shipping');
  const [form, setForm] = useState<ShippingForm>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<ShippingForm>>({});
  const [isProcessing, setIsProcessing] = useState(false);

  const shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : (subtotal > 0 ? SHIPPING_FEE : 0);
  const total = subtotal + shipping;

  const t = (ko: string, en: string) => lang === 'ko' ? ko : en;

  const validate = (): boolean => {
    const e: Partial<ShippingForm> = {};
    if (!form.name.trim()) e.name = t('이름을 입력해 주세요', 'Please enter your name');
    if (!form.phone.trim()) e.phone = t('연락처를 입력해 주세요', 'Please enter your phone number');
    if (!form.email.trim() || !form.email.includes('@')) e.email = t('올바른 이메일을 입력해 주세요', 'Please enter a valid email');
    if (!form.address.trim()) e.address = t('주소를 입력해 주세요', 'Please enter your address');
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleShippingNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) setStep('payment');
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate payment processing (Stripe integration placeholder)
    await new Promise(r => setTimeout(r, 1800));
    setIsProcessing(false);
    clearCart();
    navigate('/order-complete');
  };

  const field = (key: keyof ShippingForm, label: string, placeholder: string, type = 'text') => (
    <div className="space-y-1">
      <label className="font-mono-lab text-[10px] tracking-widest text-[#6B8F71] uppercase">
        {label}
      </label>
      <input
        type={type}
        value={form[key]}
        onChange={e => { setForm(f => ({ ...f, [key]: e.target.value })); setErrors(er => ({ ...er, [key]: undefined })); }}
        placeholder={placeholder}
        className={`w-full bg-white border px-4 py-3 font-body text-sm text-[#0D3D2E] placeholder-[#0D3D2E]/30
                    outline-none focus:border-[#0D3D2E] transition-colors duration-200
                    ${errors[key] ? 'border-red-400' : 'border-[#0D3D2E]/20'}`}
      />
      {errors[key] && (
        <p className="font-body text-xs text-red-500">{errors[key]}</p>
      )}
    </div>
  );

  if (items.length === 0 && step === 'shipping') {
    return (
      <div className="min-h-screen bg-[#F5F2EC] flex flex-col items-center justify-center gap-6 px-4">
        <ShoppingBag size={36} className="text-[#A8C5AC]" />
        <p className="font-body text-[#6B8F71]">
          {t('장바구니가 비어 있습니다.', 'Your cart is empty.')}
        </p>
        <Link to="/" className="font-mono-lab text-xs tracking-widest text-[#0D3D2E] border border-[#0D3D2E]/30 px-6 py-3 uppercase hover:bg-[#0D3D2E] hover:text-white transition-colors">
          {t('쇼핑 계속하기', 'Continue Shopping')}
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F2EC]">
      {/* Top nav */}
      <nav className="sticky top-0 z-30 bg-[#F5F2EC]/95 backdrop-blur-md border-b border-[#0D3D2E]/10">
        <div className="container flex items-center justify-between h-14">
          <Link to="/" className="font-display text-lg text-[#0D3D2E] tracking-widest">BUMI LAB</Link>
          <button
            onClick={() => step === 'payment' ? setStep('shipping') : navigate('/')}
            className="flex items-center gap-1.5 font-mono-lab text-[10px] tracking-widest text-[#6B8F71] uppercase hover:text-[#0D3D2E] transition-colors"
          >
            <ChevronLeft size={14} />
            {step === 'payment' ? t('배송 정보', 'Shipping') : t('쇼핑 계속', 'Shop')}
          </button>
        </div>
      </nav>

      {/* Step indicator */}
      <div className="container py-6">
        <div className="flex items-center gap-3 mb-8">
          {[
            { key: 'shipping', icon: Package, labelKo: '배송 정보', labelEn: 'Shipping' },
            { key: 'payment', icon: CreditCard, labelKo: '결제', labelEn: 'Payment' },
          ].map((s, i) => (
            <div key={s.key} className="flex items-center gap-2">
              {i > 0 && <div className="w-8 h-px bg-[#0D3D2E]/20" />}
              <div className={`flex items-center gap-2 ${step === s.key ? 'text-[#0D3D2E]' : step === 'payment' && s.key === 'shipping' ? 'text-[#6B8F71]' : 'text-[#0D3D2E]/30'}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center border ${
                  step === s.key ? 'bg-[#0D3D2E] border-[#0D3D2E] text-white' :
                  step === 'payment' && s.key === 'shipping' ? 'bg-[#A8C5AC] border-[#A8C5AC] text-white' :
                  'border-[#0D3D2E]/20'
                }`}>
                  {step === 'payment' && s.key === 'shipping'
                    ? <Check size={12} />
                    : <s.icon size={12} />}
                </div>
                <span className="font-mono-lab text-[10px] tracking-widest uppercase hidden sm:block">
                  {lang === 'ko' ? s.labelKo : s.labelEn}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-[1fr_380px] gap-8 items-start">
          {/* Left: Form */}
          <div>
            {step === 'shipping' ? (
              <form onSubmit={handleShippingNext} className="space-y-5">
                <h1 className="font-display text-2xl text-[#0D3D2E] mb-6">
                  {t('배송 정보', 'Shipping Information')}
                </h1>
                <div className="grid sm:grid-cols-2 gap-4">
                  {field('name', t('수령인', 'Recipient'), t('홍길동', 'Full Name'))}
                  {field('phone', t('연락처', 'Phone'), '010-0000-0000', 'tel')}
                </div>
                {field('email', t('이메일', 'Email'), 'example@email.com', 'email')}
                {field('address', t('주소', 'Address'), t('도로명 주소를 입력해 주세요', 'Enter your street address'))}
                {field('addressDetail', t('상세 주소', 'Address Detail'), t('아파트, 동/호수 등', 'Apt, suite, unit, etc.'))}
                <div className="space-y-1">
                  <label className="font-mono-lab text-[10px] tracking-widest text-[#6B8F71] uppercase">
                    {t('배송 메모', 'Delivery Note')} ({t('선택', 'Optional')})
                  </label>
                  <textarea
                    value={form.memo}
                    onChange={e => setForm(f => ({ ...f, memo: e.target.value }))}
                    placeholder={t('배송 시 요청사항을 입력해 주세요', 'Any special delivery instructions?')}
                    rows={3}
                    className="w-full bg-white border border-[#0D3D2E]/20 px-4 py-3 font-body text-sm text-[#0D3D2E] placeholder-[#0D3D2E]/30 outline-none focus:border-[#0D3D2E] transition-colors duration-200 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#0D3D2E] text-[#F5F2EC] font-mono-lab text-xs tracking-widest py-4 uppercase hover:bg-[#6B8F71] transition-colors duration-300 active:scale-[0.98] mt-4"
                >
                  {t('결제 단계로 →', 'Continue to Payment →')}
                </button>
              </form>
            ) : (
              <form onSubmit={handlePayment} className="space-y-5">
                <h1 className="font-display text-2xl text-[#0D3D2E] mb-6">
                  {t('결제 정보', 'Payment')}
                </h1>

                {/* Shipping summary */}
                <div className="bg-white border border-[#0D3D2E]/10 p-4 space-y-1">
                  <p className="font-mono-lab text-[10px] tracking-widest text-[#6B8F71] uppercase mb-2">
                    {t('배송지', 'Ship To')}
                  </p>
                  <p className="font-body text-sm text-[#0D3D2E]">{form.name} · {form.phone}</p>
                  <p className="font-body text-sm text-[#0D3D2E]/70">{form.address} {form.addressDetail}</p>
                </div>

                {/* Payment method placeholder */}
                <div className="bg-white border border-[#0D3D2E]/10 p-6">
                  <p className="font-mono-lab text-[10px] tracking-widest text-[#6B8F71] uppercase mb-4">
                    {t('결제 수단', 'Payment Method')}
                  </p>
                  <div className="border border-[#A8C5AC] bg-[#A8C5AC]/10 p-4 flex items-center gap-3">
                    <CreditCard size={18} className="text-[#0D3D2E]" />
                    <div>
                      <p className="font-body text-sm text-[#0D3D2E] font-medium">
                        {t('신용/체크카드', 'Credit / Debit Card')}
                      </p>
                      <p className="font-body text-xs text-[#6B8F71]">
                        {t('Stripe 보안 결제', 'Secured by Stripe')}
                      </p>
                    </div>
                    <Check size={14} className="ml-auto text-[#6B8F71]" />
                  </div>
                  <p className="font-body text-xs text-[#6B8F71]/70 mt-3">
                    {t(
                      '* 실제 결제 연동을 위해 Stripe API 키 설정이 필요합니다.',
                      '* Stripe API key setup required for live payments.'
                    )}
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-[#0D3D2E] text-[#F5F2EC] font-mono-lab text-xs tracking-widest py-4 uppercase hover:bg-[#6B8F71] transition-colors duration-300 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      {t('처리 중...', 'Processing...')}
                    </>
                  ) : (
                    `${t('결제하기', 'Pay')} ${fmt(total)}`
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Right: Order summary */}
          <div className="bg-white border border-[#0D3D2E]/10 p-6 space-y-4 lg:sticky lg:top-20">
            <h2 className="font-mono-lab text-[10px] tracking-widest text-[#6B8F71] uppercase mb-4">
              {t('주문 요약', 'Order Summary')}
            </h2>
            <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
              {items.map(item => (
                <div key={item.id} className="flex gap-3">
                  <img src={item.img} alt={lang === 'ko' ? item.nameKo : item.nameEn} className="w-14 h-14 object-cover bg-[#F0EDE6] shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-body text-xs text-[#0D3D2E] font-medium leading-snug">
                      {lang === 'ko' ? item.nameKo : item.nameEn}
                    </p>
                    <p className="font-mono-lab text-[10px] text-[#6B8F71] mt-0.5">
                      {fmt(item.price)} × {item.qty}
                    </p>
                  </div>
                  <span className="font-mono-lab text-xs text-[#0D3D2E] shrink-0">
                    {fmt(item.price * item.qty)}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t border-[#0D3D2E]/10 pt-4 space-y-2">
              <div className="flex justify-between font-body text-sm text-[#6B8F71]">
                <span>{t('소계', 'Subtotal')}</span>
                <span>{fmt(subtotal)}</span>
              </div>
              <div className="flex justify-between font-body text-sm text-[#6B8F71]">
                <span>{t('배송비', 'Shipping')}</span>
                <span>{shipping === 0 ? t('무료', 'Free') : fmt(shipping)}</span>
              </div>
              <div className="flex justify-between font-display text-xl text-[#0D3D2E] pt-2 border-t border-[#0D3D2E]/10">
                <span>{t('합계', 'Total')}</span>
                <span>{fmt(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
