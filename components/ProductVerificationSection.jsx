import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import BG from "../public/images/bg.png";
import Shoe1 from "../public/images/showe1.png";
import Shoe2 from "../public/images/showe2.png";
import Watch from "../public/images/watch.png";
import Headset from "../public/images/headset.png";
import Camera from "../public/images/camera.png";
import Mobile1 from "../public/images/mobile1.png";
import Mobile2 from "../public/images/mobile2.png";
import Mobile3 from "../public/images/mobile3.png";
import Verified2 from "../public/images/verified2.png";
import Verified1 from "../public/images/veri1.png";

const ProductVerificationSection = () => {
  const scrollRef = useRef(null);
  const sectionRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState({
    step1: 0,
    step2: 0,
    step3: 0
  });

  // Smooth infinite scroll for products
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationFrameId;
    let scrollPosition = 0;
    const scrollSpeed = 0.8;

    const scroll = () => {
      scrollPosition += scrollSpeed;
      const maxScroll = scrollContainer.scrollWidth / 2;
      if (scrollPosition >= maxScroll) {
        scrollPosition = 0;
      }
      scrollContainer.scrollLeft = scrollPosition;
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // Track scroll progress for smooth parallax animations
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const section = sectionRef.current;
      const steps = section.querySelectorAll('.step-container');
      
      steps.forEach((step, index) => {
        const rect = step.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const stepName = `step${index + 1}`;
        
        let progress = 0;
        
        // Calculate smooth progress from 0 to 1
        if (rect.top > windowHeight) {
          progress = 0;
        } else if (rect.bottom < 0) {
          progress = 1;
        } else {
          // Smooth transition as element moves through viewport
          progress = (windowHeight - rect.top) / (windowHeight + rect.height);
          progress = Math.max(0, Math.min(1, progress));
        }
        
        setScrollProgress(prev => ({
          ...prev,
          [stepName]: progress
        }));
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const products = [
    { img: Shoe1, type: "shoe1" },
    { img: Watch, type: "watch" },
    { img: Shoe2, type: "shoe2" },
    { img: Headset, type: "headset" },
    { img: Camera, type: "camera" },
  ];

  const getMobileTransform = (step, isLeft = true) => {
    const progress = scrollProgress[step] || 0;
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
    const easedProgress = easeOutCubic(progress);
    
    // Reduce 3D effects on mobile for better visibility
    const isMobile = window.innerWidth < 768;
    
    if (isLeft) {
      const translateX = -100 + (easedProgress * 100);
      const translateY = (isMobile ? 30 : 80) - (easedProgress * (isMobile ? 30 : 80));
      const translateZ = (isMobile ? -150 : -300) + (easedProgress * (isMobile ? 150 : 300));
      const rotateY = (isMobile ? -45 : -90) + (easedProgress * (isMobile ? 45 : 90));
      const rotateX = (isMobile ? 10 : 20) - (easedProgress * (isMobile ? 10 : 20));
      const rotateZ = (isMobile ? -5 : -10) + (easedProgress * (isMobile ? 5 : 10));
      const scale = (isMobile ? 0.7 : 0.5) + (easedProgress * (isMobile ? 0.3 : 0.5));
      const opacity = Math.min(1, progress * 1.5);
      
      return {
        transform: `translateX(${translateX}%) translateY(${translateY}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) rotateZ(${rotateZ}deg) scale(${scale})`,
        opacity: opacity
      };
    } else {
      const translateX = 100 - (easedProgress * 100);
      const translateY = (isMobile ? 30 : 80) - (easedProgress * (isMobile ? 30 : 80));
      const translateZ = (isMobile ? -150 : -300) + (easedProgress * (isMobile ? 150 : 300));
      const rotateY = (isMobile ? 45 : 90) - (easedProgress * (isMobile ? 45 : 90));
      const rotateX = (isMobile ? 10 : 20) - (easedProgress * (isMobile ? 10 : 20));
      const rotateZ = (isMobile ? 5 : 10) - (easedProgress * (isMobile ? 5 : 10));
      const scale = (isMobile ? 0.7 : 0.5) + (easedProgress * (isMobile ? 0.3 : 0.5));
      const opacity = Math.min(1, progress * 1.5);
      
      return {
        transform: `translateX(${translateX}%) translateY(${translateY}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) rotateZ(${rotateZ}deg) scale(${scale})`,
        opacity: opacity
      };
    }
  };

  const getTextTransform = (step, delay = 0) => {
    const progress = Math.max(0, (scrollProgress[step] || 0) - delay);
    const opacity = Math.min(1, progress * 2);
    
    // Easing function for smooth parallax
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
    const easedProgress = easeOutCubic(progress);
    
    // Enhanced parallax movement on all screens
    const isMobile = window.innerWidth < 768;
    const translateY = (1 - easedProgress) * (isMobile ? 40 : 80);
    const translateX = (1 - easedProgress) * (isMobile ? 20 : 50);
    const scale = 0.95 + (easedProgress * 0.05);
    
    return {
      opacity: opacity,
      transform: `translateY(${translateY}px) translateX(${translateX}px) scale(${scale})`,
      transition: 'none'
    };
  };

  return (
    <div
      ref={sectionRef}
      className="min-h-screen mx-4 sm:mx-8 lg:mx-14 rounded-[40px] sm:rounded-[50px] bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-950 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      // style={{
      //   backgroundImage: `url(${BG})`,
      //   backgroundSize: "cover",
      //   backgroundPosition: "center",
      //   backgroundRepeat: "no-repeat",
      // }}
    >
      {/* Background glow effects */}
      <div className="absolute w-[620px] h-[589px] bg-blue-500/30 rounded-full blur-[210px] right-0 bottom-20 opacity-40" />
      <div className="absolute w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[200px] left-0 top-40 opacity-30" />

      <div className="max-w-[1600px] mx-auto">
        {/* Auto-scrolling Product Banner */}
        <div className="mb-16 sm:mb-24 relative h-32 sm:h-40 overflow-hidden">
          <div
            ref={scrollRef}
            className="flex gap-8 sm:gap-12 overflow-x-scroll scrollbar-hide"
          >
            {[...products, ...products, ...products, ...products].map(
              (product, idx) => (
                <div
                  key={idx}
                  className="inline-block flex-shrink-0 transform hover:scale-110 transition-transform duration-300"
                  style={{
                    transform: `rotate(${((idx % 3) - 1) * 12}deg)`,
                  }}
                >
                  <Image
                    src={product.img}
                    alt={`Product ${idx + 1}`}
                    width={224}
                    height={128}
                    className="w-32 sm:w-48 lg:w-56 h-20 sm:h-28 lg:h-32 object-contain"
                  />
                </div>
              )
            )}
          </div>
        </div>

        {/* Step 1 */}
        <div className="step-container mb-32 sm:mb-48 lg:mb-64 relative min-h-[400px] sm:min-h-[500px] lg:min-h-[700px]">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            <div 
              className="w-full max-w-[650px] space-y-4 sm:space-y-6 lg:space-y-8 lg:pt-20"
              style={getTextTransform('step1', 0)}
            >
              <div 
                className="inline-block px-4 py-2 bg-blue-500/20 border border-blue-400/30 rounded-full"
                style={getTextTransform('step1', 0.05)}
              >
                <span className="text-blue-300 font-semibold text-sm sm:text-base">STEP 1</span>
              </div>
              
              <h2 
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] tracking-tight"
                style={getTextTransform('step1', 0.1)}
              >
                Tap Your Phone.<br/>
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Trigger the Truth.
                </span>
              </h2>
              
              <p 
                className="text-lg sm:text-xl lg:text-2xl text-gray-300 leading-relaxed font-light"
                style={getTextTransform('step1', 0.15)}
              >
                When a customer taps their smartphone, the tag securely connects
                to our verification system, authenticating the product in real
                time. <span className="text-white font-medium">No confusion.</span> Just a single, seamless
                interaction.
              </p>
            </div>

            <div className="flex justify-center perspective-container ">
              <div 
                className="relative w-[200px] sm:w-[240px] lg:w-[280px] h-[410px] sm:h-[500px] lg:h-[580px] bg-white rounded-[40px] border-[4px] border-black overflow-hidden shadow-2xl"
                style={{
                  ...getMobileTransform('step1', true),
                  transformStyle: 'preserve-3d',
                  boxShadow: `0 ${30 * (scrollProgress.step1 || 0)}px ${80 * (scrollProgress.step1 || 0)}px rgba(59, 130, 246, ${0.4 * (scrollProgress.step1 || 0)})`
                }}
              >
                <Image
                  src={Mobile1}
                  alt="Phone verification screen"
                  width={280}
                  height={580}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="step-container mb-32 sm:mb-48 lg:mb-64 relative min-h-[400px] sm:min-h-[500px] lg:min-h-[700px]">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            <div className="flex justify-center perspective-container order-2 lg:order-1 ">
              <div 
                className="relative w-[200px] sm:w-[240px] lg:w-[280px] h-[410px] sm:h-[500px] lg:h-[580px] bg-gray-800 rounded-[40px] border-[4px] border-black overflow-hidden shadow-2xl"
                style={{
                  ...getMobileTransform('step2', false),
                  transformStyle: 'preserve-3d',
                  boxShadow: `0 ${30 * (scrollProgress.step2 || 0)}px ${80 * (scrollProgress.step2 || 0)}px rgba(168, 85, 247, ${0.4 * (scrollProgress.step2 || 0)})`
                }}
              >
                <Image
                  src={Mobile2}
                  alt="Verification process"
                  width={280}
                  height={580}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div 
              className="w-full max-w-[650px] space-y-4 sm:space-y-6 lg:space-y-8 lg:pt-20 order-1 lg:order-2"
              style={getTextTransform('step2', 0)}
            >
              <div 
                className="inline-flex items-center gap-3"
                style={getTextTransform('step2', 0.05)}
              >
                <Image src={Verified1} alt="Verified" width={80} height={80} className="w-12 sm:w-16 lg:w-20" />
                <div className="px-4 py-2 bg-purple-500/20 border border-purple-400/30 rounded-full">
                  <span className="text-purple-300 font-semibold text-sm sm:text-base">STEP 2</span>
                </div>
              </div>
              
              <h2 
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] tracking-tight"
                style={getTextTransform('step2', 0.1)}
              >
                Encrypted. Secure.<br/>
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
                  Verified.
                </span>
              </h2>
              
              <p 
                className="text-base sm:text-lg lg:text-xl xl:text-2xl text-gray-300 leading-relaxed font-light"
                style={getTextTransform('step2', 0.15)}
              >
                If genuine, the verification signal flashes, proving your
                product's authenticity instantly. <span className="text-white font-medium">Every scan is encrypted
                end-to-end,</span> ensuring no cloning or tampering is possible.
              </p>
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div className="step-container mb-20 sm:mb-32 relative min-h-[400px] sm:min-h-[500px] lg:min-h-[700px]">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            <div 
              className="w-full max-w-[650px] space-y-4 sm:space-y-6 lg:space-y-8"
              style={getTextTransform('step3', 0)}
            >
              <div 
                className="inline-flex items-center gap-3"
                style={getTextTransform('step3', 0.05)}
              >
                <Image src={Verified2} alt="Verified" width={80} height={80} className="w-12 sm:w-16 lg:w-20" />
                <div className="px-4 py-2 bg-green-500/20 border border-green-400/30 rounded-full">
                  <span className="text-green-300 font-semibold text-sm sm:text-base">STEP 3</span>
                </div>
              </div>
              
              <h2 
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] tracking-tight"
                style={getTextTransform('step3', 0.1)}
              >
                Instant Proof.<br/>
                <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  Lifelong Trust.
                </span>
              </h2>
              
              <p 
                className="text-base sm:text-lg lg:text-xl xl:text-2xl text-gray-300 leading-relaxed font-light"
                style={getTextTransform('step3', 0.15)}
              >
                Once verified, the product details appear on-screen — <span className="text-white font-medium">brand
                name, origin, authenticity badge, and story.</span> Your customers get
                instant confidence. You get lifelong loyalty.
              </p>
            </div>

            <div className="flex justify-center perspective-container ">
              <div 
                className="relative w-[200px] sm:w-[240px] lg:w-[280px] h-[410px] sm:h-[500px] lg:h-[580px] bg-white rounded-[40px] border-[4px] border-black overflow-hidden shadow-2xl"
                style={{
                  ...getMobileTransform('step3', true),
                  transformStyle: 'preserve-3d',
                  boxShadow: `0 ${30 * (scrollProgress.step3 || 0)}px ${80 * (scrollProgress.step3 || 0)}px rgba(34, 197, 94, ${0.4 * (scrollProgress.step3 || 0)})`
                }}
              >
                <Image
                  src={Mobile3}
                  alt="Product details screen"
                  width={280}
                  height={580}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Download Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-12 pb-8">
          <button className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-5 rounded-full flex items-center justify-center gap-3 shadow-2xl hover:shadow-blue-500/50 hover:scale-105 transition-all duration-300 font-semibold text-lg">
            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.523 15.341c-.801-.753-1.373-1.741-1.672-2.818-.299-1.078-.326-2.221-.078-3.312.248-1.091.769-2.092 1.514-2.897.745-.806 1.691-1.388 2.741-1.686-1.268-1.651-3.243-2.628-5.317-2.628-3.036 0-5.5 2.464-5.5 5.5v1c0 .828-.672 1.5-1.5 1.5s-1.5-.672-1.5-1.5v-1c0-4.687 3.813-8.5 8.5-8.5 2.799 0 5.389 1.379 6.956 3.683 1.212.313 2.301.963 3.149 1.885.849.922 1.433 2.078 1.693 3.347.26 1.269.184 2.582-.221 3.801-.404 1.22-1.123 2.307-2.08 3.147l-5.685 5.028v-5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5v1.783l2.477-2.189z" />
            </svg>
            Download Android App
          </button>

          <button className="w-full sm:w-auto bg-white/10 backdrop-blur-sm text-gray-400 px-8 py-5 rounded-full flex items-center justify-center gap-3 border border-gray-600 cursor-not-allowed font-semibold text-lg">
            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            iOS App Coming Soon
          </button>
        </div>
      </div>
      
      <style>{`
        .perspective-container {
          perspective: 2500px;
          perspective-origin: center center;
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        @media (max-width: 1024px) {
          .perspective-container {
            perspective: 1500px;
          }
        }
        
        @media (max-width: 640px) {
          .perspective-container {
            perspective: 1000px;
          }
        }
      `}</style>
    </div>
  );
};

export default ProductVerificationSection;