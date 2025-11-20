import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';
import DangalLogo from '../public/images/dangallogo.png';
import IdeabaazShowImage from '../public/images/ideabuzshow.png';


export default function IdeaBaazSection() {
  const [scrollY, setScrollY] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    const handleScroll = () => setScrollY(window.scrollY);

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Helper: apply parallax only for desktop
  const parallax = (multiplier) =>
    isDesktop ? `translateY(${scrollY * multiplier}px)` : 'translateY(0px)';

  const parallaxX = (multiplier) =>
    isDesktop ? `translateX(${scrollY * multiplier}px)` : 'translateX(0px)';

  return (
    <div
      className="relative min-h-screen  px-4 sm:px-6 md:px-8 lg:px-12"
      style={{
        background:
          'linear-gradient(256.67deg, #F9FAFB 21.73%, #EFF6FF 50%, #F3F4F6 78.27%)',
      }}
    >
      {/* Tag */}
      <div className="inline-block mb-6 sm:mb-8 mt-6">
        <span className="text-md text-[#FF6900] font-[400] px-8 py-1.5 rounded-xl border border-[#00000066]/40">Featured on IdeaBaaz</span>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 max-w-7xl mx-auto">
        {/* Left Column */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8">
          {/* Title */}
          <div className="space-y-1" style={{ transform: parallaxX(-0.05) }}>
          
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-normal text-gray-600 whitespace-nowrap">
  Where Innovation Gets Funded
</h2>

          </div>

          {/* Dangal Logo (Mobile/Tablet) */}
          <div className="lg:hidden mt-4">
            <div className="w-40 sm:w-52 mx-auto" style={{ transform: parallax(0.1) }}>
              <div className="bg-white rounded-lg p-3 shadow-md">
                <Image
                  src={DangalLogo}
                  alt="IdeaBaaz Dangal Logo"
                  width={200}
                  height={100}
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          </div>

          {/* Success Story */}
          <div className="space-y-6 pt-6 sm:pt-8" style={{ transform: parallax(0.08) }}>
            <h3 className="text-lg sm:text-xl font-semibold text-black">Our Success</h3>
            <p className="text-sm sm:text-base text-black/80 leading-relaxed max-w-md mx-auto lg:mx-0">
              We pitched our vision to India's leading investors and secured the
              deal of a lifetime. Watch our journey unfold.
            </p>

            {/* Thumbnail */}
            <div
              className="relative rounded-2xl overflow-hidden group cursor-pointer shadow-xl w-full max-w-md sm:max-w-lg mx-auto"
              onClick={() => setShowVideo(true)}
            >
              <Image
                src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&h=400&fit=crop"
                alt="MSME Award Ceremony"
                width={600}
                height={400}
                className="w-full h-56 sm:h-64 md:h-72 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 transition-opacity duration-300 group-hover:bg-black/30" />

              {/* Play Button */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center shadow-2xl transition-all duration-300 group-hover:scale-110">
                <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-orange-500 text-orange-500 ml-1" />
              </div>
            </div>

            {/* Watch Button */}
            <div className="flex justify-center lg:justify-start pt-2">
              <button
                className="bg-gradient-to-b from-gray-800 to-black rounded-full px-8 py-3 flex items-center gap-3 text-white text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                onClick={() => setShowVideo(true)}
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Watch Full Video</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="relative flex justify-center lg:justify-end">
          {/* Desktop Logo */}
          <div className="hidden lg:block absolute -top-8 right-0 w-52">
            <div className="rounded-lg p-3">
              <Image
                src={DangalLogo}
                alt="IdeaBaaz Dangal Logo"
                width={200}
                height={100}
                className="w-full h-auto object-contain"
              />
            </div>
          </div>

          {/* Main Show Image */}
          <div
            className="rounded-2xl overflow-hidden shadow-2xl w-full max-w-md sm:max-w-lg lg:max-w-xl mt-10 lg:mt-[450px]"
            style={{ transform: parallax(-0.1) }}
          >
            <Image
              src={IdeabaazShowImage}
              alt="IdeaBaaz Show Presentation"
              width={600}
              height={500}
              className="w-full h-56 sm:h-80 md:h-[420px] lg:h-[500px] object-cover"
            />
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {showVideo && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setShowVideo(false)}
        >
          <div
            className="relative w-full max-w-4xl aspect-video bg-black rounded-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-white bg-black/50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-black/70 transition-colors z-10 text-xl"
              onClick={() => setShowVideo(false)}
            >
              ✕
            </button>
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="IdeaBaaz Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
