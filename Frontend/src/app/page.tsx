'use client';

import dynamic from 'next/dynamic';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ClientWrapper from '@/components/ClientWrapper';

// Lazy-load non-critical, below-the-fold sections to reduce initial JS payload
const WhyUs = dynamic(() => import('@/components/WhyUs'), { ssr: false, loading: () => null });
const Services = dynamic(() => import('@/components/Services'), { ssr: false, loading: () => null });
const CaseStudies = dynamic(() => import('@/components/CaseStudies'), { ssr: false, loading: () => null });
const Pricing = dynamic(() => import('@/components/Pricing'), { ssr: false, loading: () => null });
const FAQ = dynamic(() => import('@/components/FAQ'), { ssr: false, loading: () => null });
const Contact = dynamic(() => import('@/components/Contact'), { ssr: false, loading: () => null });
const Footer = dynamic(() => import('@/components/Footer'), { ssr: false, loading: () => null });

export default function Home() {
  return (
    <ClientWrapper>
      <div className="min-h-screen bg-white">
        <Header />
        <main>
          <Hero />
          <WhyUs />
          <Services />
          <CaseStudies />
          <Pricing />
          <FAQ />
          <Contact />
        </main>
        <Footer />
      </div>
    </ClientWrapper>
  );
}