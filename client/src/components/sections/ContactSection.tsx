/*
 * BUMI LAB — Contact Section
 * Design: Full-width dark emerald section, inquiry form + distribution info
 * Features: Form with validation, distribution channel expansion note, lifestyle image
 */

import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';

const CONTACT_LIFESTYLE_IMG =
  'https://d2xsxph8kpxj0f.cloudfront.net/310519663388603264/FfX63THfQipTQqzBdN4z4M/bumi-contact-lifestyle-BJETy3xL6jG7WKUTYnUr5K.webp';

export default function ContactSection() {
  const { lang } = useLanguage();
  const [form, setForm] = useState({
    name: '',
    email: '',
    type: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('visible'); },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = imgRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error(
        lang === 'ko'
          ? '필수 항목을 모두 입력해 주세요.'
          : 'Please fill in all required fields.'
      );
      return;
    }
    setSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          type: form.type,
          message: form.message,
        })
      });

      if (response.ok) {
        toast.success(
          lang === 'ko'
            ? '문의가 성공적으로 전송되었습니다. 곧 연락드리겠습니다.'
            : 'Your inquiry has been sent successfully. We will contact you soon.'
        );
        setForm({ name: '', email: '', type: '', message: '' });
      } else {
        throw new Error('Failed to send');
      }
    } catch (error) {
      toast.error(
        lang === 'ko'
          ? '전송에 실패했습니다. 잠시 후 다시 시도해 주세요.'
          : 'Failed to send. Please try again later.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const inquiryTypes = [
    { value: 'product', ko: '제품 문의', en: 'Product Inquiry' },
    { value: 'distribution', ko: '유통/입점 문의', en: 'Distribution Inquiry' },
    { value: 'partnership', ko: '파트너십 문의', en: 'Partnership Inquiry' },
    { value: 'press', ko: '언론/PR 문의', en: 'Press/PR Inquiry' },
    { value: 'other', ko: '기타', en: 'Other' },
  ];

  const contactDetails = [
    { label: 'Email', value: 'algonany777@gmail.com' },
    { label: 'TEL', value: '+82 1065579600' },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-24 md:py-36 bg-[#0D3D2E] reveal-up"
    >
      <div className="container">
        {/* Header */}
        <div className="flex items-center gap-3 mb-16">
          <span className="block w-8 h-px bg-[#A8C5AC]" />
          <span className="font-mono-lab text-[11px] tracking-[0.3em] text-[#A8C5AC] uppercase">
            {lang === 'ko' ? '문의하기' : 'Get in Touch'}
          </span>
        </div>

        <div className="grid md:grid-cols-12 gap-16">
          {/* Left: Info + Image */}
          <div className="md:col-span-4">
            <h2 className="font-display text-4xl md:text-5xl text-[#F5F2EC] leading-[1.1] mb-8">
              {lang === 'ko' ? (
                <>함께<br />만들어가는<br /><span className="text-[#A8C5AC]">부미랩</span></>
              ) : (
                <>Building<br />BUMI LAB<br /><span className="text-[#A8C5AC]">Together</span></>
              )}
            </h2>
            <p className="font-body text-sm text-[#F5F2EC]/60 leading-relaxed mb-10">
              {lang === 'ko'
                ? '제품 문의, 유통 입점, 파트너십 등 다양한 협업을 환영합니다. 부미랩은 향후 종합 유통 채널로의 확장을 계획하고 있습니다.'
                : 'We welcome inquiries about products, distribution, partnerships, and various collaborations. BUMI LAB is planning to expand into comprehensive distribution channels.'}
            </p>

            {/* Distribution expansion note */}
            <div className="border border-[#A8C5AC]/30 p-5 mb-8">
              <div className="font-mono-lab text-[10px] tracking-widest text-[#A8C5AC] uppercase mb-3">
                {lang === 'ko' ? '유통 채널 확장 예정' : 'Distribution Expansion'}
              </div>
              <p className="font-body text-sm text-[#F5F2EC]/70 leading-relaxed">
                {lang === 'ko'
                  ? '부미랩은 현재 자사몰 중심으로 운영되며, 향후 주요 뷰티 플랫폼 및 오프라인 채널로 확장 예정입니다. 입점 문의를 환영합니다.'
                  : 'BUMI LAB currently operates through its own online store and plans to expand to major beauty platforms and offline channels. Distribution inquiries are welcome.'}
              </p>
            </div>



            {/* Lifestyle image */}
            <div
              ref={imgRef}
              className="relative overflow-hidden"
              style={{
                opacity: 0,
                transform: 'translateY(24px)',
                transition: 'opacity 0.8s cubic-bezier(0.23,1,0.32,1) 0.2s, transform 0.8s cubic-bezier(0.23,1,0.32,1) 0.2s',
              }}
            >
              <img
                src={CONTACT_LIFESTYLE_IMG}
                alt={lang === 'ko' ? 'BUMI LAB 스킨케어 리추얼' : 'BUMI LAB skincare ritual'}
                className="w-full h-52 object-cover"
                loading="lazy"
              />
              {/* Subtle overlay matching section bg */}
              <div className="absolute inset-0 bg-[#0D3D2E]/20 pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#0D3D2E]/60 to-transparent" />
              <p className="absolute bottom-3 left-4 font-mono-lab text-[9px] tracking-[0.25em] text-[#A8C5AC]/80 uppercase">
                {lang === 'ko' ? 'Clean Science Ritual' : 'Clean Science Ritual'}
              </p>
            </div>
          </div>

          {/* Right: Form */}
          <div className="md:col-span-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                {/* Name */}
                <div>
                  <label className="font-mono-lab text-[10px] tracking-widest text-[#A8C5AC] uppercase block mb-2">
                    {lang === 'ko' ? '이름' : 'Name'}{' '}
                    <span className="text-[#6B8F71]">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder={lang === 'ko' ? '홍길동' : 'John Doe'}
                    className="w-full bg-transparent border border-[#F5F2EC]/20 text-[#F5F2EC] placeholder-[#F5F2EC]/30 font-body text-sm px-4 py-3 focus:outline-none focus:border-[#A8C5AC] transition-colors duration-200"
                    required
                  />
                </div>
                {/* Email */}
                <div>
                  <label className="font-mono-lab text-[10px] tracking-widest text-[#A8C5AC] uppercase block mb-2">
                    {lang === 'ko' ? '이메일' : 'Email'}{' '}
                    <span className="text-[#6B8F71]">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="hello@example.com"
                    className="w-full bg-transparent border border-[#F5F2EC]/20 text-[#F5F2EC] placeholder-[#F5F2EC]/30 font-body text-sm px-4 py-3 focus:outline-none focus:border-[#A8C5AC] transition-colors duration-200"
                    required
                  />
                </div>
              </div>

              {/* Inquiry type */}
              <div>
                <label className="font-mono-lab text-[10px] tracking-widest text-[#A8C5AC] uppercase block mb-2">
                  {lang === 'ko' ? '문의 유형' : 'Inquiry Type'}
                </label>
                <select
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  className="w-full bg-[#0D3D2E] border border-[#F5F2EC]/20 text-[#F5F2EC] font-body text-sm px-4 py-3 focus:outline-none focus:border-[#A8C5AC] transition-colors duration-200 appearance-none"
                >
                  <option value="">
                    {lang === 'ko' ? '선택해 주세요' : 'Please select'}
                  </option>
                  {inquiryTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {lang === 'ko' ? type.ko : type.en}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="font-mono-lab text-[10px] tracking-widest text-[#A8C5AC] uppercase block mb-2">
                  {lang === 'ko' ? '문의 내용' : 'Message'}{' '}
                  <span className="text-[#6B8F71]">*</span>
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder={
                    lang === 'ko'
                      ? '문의하실 내용을 자유롭게 작성해 주세요.'
                      : 'Please write your inquiry freely.'
                  }
                  rows={5}
                  className="w-full bg-transparent border border-[#F5F2EC]/20 text-[#F5F2EC] placeholder-[#F5F2EC]/30 font-body text-sm px-4 py-3 focus:outline-none focus:border-[#A8C5AC] transition-colors duration-200 resize-none"
                  required
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting}
                className="btn-press w-full bg-[#F5F2EC] text-[#0D3D2E] font-body text-sm tracking-wider py-4 hover:bg-[#A8C5AC] transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting
                  ? lang === 'ko' ? '전송 중...' : 'Sending...'
                  : lang === 'ko' ? '문의 보내기' : 'Send Inquiry'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
