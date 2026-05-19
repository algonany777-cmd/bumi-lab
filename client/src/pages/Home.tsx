/*
 * BUMI LAB — Home Page
 * Sections: Hero → Brand → Science → Products → Process → Contact → Footer
 * Design: Clean Protocol (Swiss International Style × K-Beauty)
 */

import HeroSection from '@/components/sections/HeroSection';
import BrandSection from '@/components/sections/BrandSection';
import ScienceSection from '@/components/sections/ScienceSection';
import ProductsSection from '@/components/sections/ProductsSection';
import ProcessSection from '@/components/sections/ProcessSection';
import ContactSection from '@/components/sections/ContactSection';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F5F2EC]">
      <Navigation />
      <main>
        <HeroSection />
        <BrandSection />
        <ScienceSection />
        <ProductsSection />
        <ProcessSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
