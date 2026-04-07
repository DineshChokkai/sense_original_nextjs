'use client';
import React, { use, useEffect, useRef, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import IdeaBaazSection from '../components/IdeabuzzSection';
import BrandProblems from '../components/Problems';
import ComparisonTable from '../components/ComparisonTable';
import HowToScan from '../components/HowToOpenVideoSection';
import WhyChooseSection from '../components/WhyChooseBrands';
import IndustriesParallax from '../components/industries';
import ResultsSection from '../components/Results';
import AwardsAchievements from '../components/AwardsAchievments';
import LatestNewsSection from '../components/LatestNewsSection';
import Footer from '../components/Footer';
import FaqSection from '../components/Faqs';
import HowToScanSection from '../components/HowToScanSection';
import ProductVerificationSection from '../components/ProductVerificationSection';
import ReelsSection from '../components/ReelsSection';

const Home = () => {
  const headerRef = useRef(null);
  const newsRef = useRef(null);
  const ideaBaazRef = useRef(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const handleOpenContact = () => {
    if (headerRef.current) {
      headerRef.current.openContactForm();
    }
  };

  const scrollToNews = () => {
    if (newsRef.current) {
      const headerOffset = 120;
      const elementPosition = newsRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Track scroll position to show/hide scroll to top button
  useEffect(() => {
    const handleScroll = () => {
      if (ideaBaazRef.current) {
        const ideaBaazPosition = ideaBaazRef.current.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        // Show button when IdeaBaaz section has scrolled past the viewport
        if (ideaBaazPosition < windowHeight / 2) {
          setShowScrollTop(true);
        } else {
          setShowScrollTop(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Header ref={headerRef} />
      <div className="bg-[#E6E9EE] pt-20 md:pt-24">
        <HeroSection />
        <div ref={ideaBaazRef}>{/* <IdeaBaazSection /> */}</div>
        <BrandProblems />
        <ProductVerificationSection />
        <ComparisonTable />
        <HowToScan />
        <WhyChooseSection />
        <IndustriesParallax />
        <ResultsSection />
        <AwardsAchievements />

        <div id="latest-news-section" ref={newsRef}>
          {/* <LatestNewsSection /> */}
        </div>
        <ReelsSection />
        <FaqSection />
        <HowToScanSection onOpenContact={handleOpenContact} />
        <Footer onOpenContactForm={handleOpenContact} onScrollToNews={scrollToNews} />
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-50 bg-black text-white p-4 rounded-full shadow-2xl hover:bg-gray-800 transition-all duration-500 hover:scale-110 ${
          showScrollTop
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-16 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <FaArrowUp className="w-5 h-5" />
      </button>
    </>
  );
};

export default Home;
