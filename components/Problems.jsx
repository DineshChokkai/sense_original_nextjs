import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Verify from '../public/images/veri2.png';
export default function BrandProblems() {
  const [cardProgress, setCardProgress] = useState([]);
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);
  
  const problems = [
    {
      image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1200&q=80",
      title: "Lost Sales",
      description: "Counterfeit products divert revenue and cannibalize your market share"
    },
    {
      image: Verify,
      title: "Customer Confusion",
      description: "Fake products create uncertainty, making buyers hesitant to purchase"
    },
    {
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=80",
      title: "Reputation Damage",
      description: "Poor quality fakes tarnish your brand identity and customer loyalty"
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const newProgress = cardRefs.current.map((card) => {
        if (!card) return 0;
        
        const rect = card.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Calculate progress for each card individually
        if (rect.top > windowHeight) {
          return 0; // Card not visible yet
        } else if (rect.bottom < windowHeight * 0.3) {
          return 1; // Card fully revealed
        } else {
          // Progress from 0 to 1 as card enters viewport
          const progress = (windowHeight - rect.top) / (windowHeight * 0.7);
          return Math.max(0, Math.min(1, progress));
        }
      });
      
      setCardProgress(newProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      ref={sectionRef}
      className="relative w-full bg-[#E6E9EE] py-8 sm:py-16 md:py-24 px-4 sm:px-8 lg:px-16 overflow-hidden"
    >
      {/* Heading */}
      <div className="max-w-7xl mx-auto mb-8 sm:mb-16 md:mb-24 lg:mb-32">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 text-center leading-tight px-2 sm:px-4">
          The Problem Brands Face Today
        </h2>
      </div>

      {/* Cards - Each slides from right one by one */}
      <div className="max-w-7xl mx-auto space-y-16 sm:space-y-32 md:space-y-48 lg:space-y-64 xl:space-y-80">
        {problems.map((problem, index) => {
          const progress = cardProgress[index] || 0;
          
          // Strong slide from right effect
          const slideX = (1 - progress) * 300; // Slide 300px from right
          const opacity = Math.min(progress * 1.5, 1);
          
          // Image parallax - moves independently
          const imageSlide = (1 - progress) * 150;
          
          // Text parallax - moves slower
          const textSlide = (1 - progress) * 100;
          
          // Badge rotation
          const badgeRotation = progress * 360;
          
          return (
            <div
              key={index}
              ref={(el) => (cardRefs.current[index] = el)}
              className="min-h-[400px] sm:min-h-[500px] md:min-h-[600px] flex items-center"
            >
              <div 
                className="w-full relative"
                style={{
                  opacity: opacity,
                  transform: `translateX(${slideX}px)`,
                  transition: 'none'
                }}
              >
                {/* Card Container */}
                <div className="relative rounded-xl sm:rounded-2xl md:rounded-3xl bg-white shadow-2xl overflow-hidden border-2 border-gray-300 hover:shadow-3xl transition-shadow duration-500 flex flex-col lg:flex-row min-h-[350px] sm:min-h-[450px] md:min-h-[500px] lg:min-h-[600px]">
                  
                  {/* Image Section - Parallax inside card */}
                  <div className="lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 min-h-[200px] sm:min-h-[250px] md:min-h-[300px] lg:min-h-full">
                    <div 
                      className="absolute inset-0 flex items-center justify-center p-3 sm:p-6 md:p-8 lg:p-12"
                      style={{
                        transform: `translateX(${imageSlide}px) scale(${1.1 + (1 - progress) * 0.1})`,
                        transition: 'none'
                      }}
                    >
                      <Image
                        src={problem.image}
                        alt={problem.title}
                        width={400}
                        height={300}
                        className="w-full h-full object-cover rounded-lg sm:rounded-xl md:rounded-2xl shadow-2xl"
                        loading="lazy"
                      />
                    </div>
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 pointer-events-none"></div>
                  </div>

                  {/* Text Content - Slower parallax */}
                  <div className="lg:w-1/2 p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16 flex flex-col justify-center relative bg-white">
                    
                    {/* Animated Number Badge */}
                    <div 
                      className="absolute top-3 right-3 sm:top-4 sm:right-4 md:top-6 md:right-6 lg:-top-10 lg:-right-10 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-32 lg:h-32 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center text-white text-lg sm:text-2xl md:text-3xl lg:text-5xl font-bold shadow-2xl z-20 border-2 sm:border-4 md:border-6 border-white"
                      style={{
                        transform: `rotate(${badgeRotation}deg) scale(${progress})`,
                        opacity: progress,
                        transition: 'none'
                      }}
                    >
                      {index + 1}
                    </div>
                    
                    <div 
                      className="space-y-3 sm:space-y-4 md:space-y-6"
                      style={{
                        transform: `translateX(${textSlide}px)`,
                        transition: 'none'
                      }}
                    >
                      <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 pr-10 sm:pr-12 md:pr-16 leading-tight">
                        {problem.title}
                      </h3>
                      <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-600 leading-relaxed">
                        {problem.description}
                      </p>
                      
                      {/* Animated progress bar */}
                      <div className="relative h-1.5 sm:h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"
                          style={{
                            width: `${progress * 100}%`,
                            transition: 'width 0.3s ease-out'
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating parallax orbs - Hidden on mobile */}
                <div 
                  className="absolute -top-16 -left-16 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 bg-blue-500/20 rounded-full blur-3xl pointer-events-none hidden sm:block"
                  style={{
                    transform: `translate(${(1 - progress) * 100}px, ${(1 - progress) * -80}px) scale(${progress})`,
                    opacity: progress * 0.6,
                    transition: 'none'
                  }}
                ></div>
                <div 
                  className="absolute -bottom-16 -right-16 w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 bg-purple-500/20 rounded-full blur-3xl pointer-events-none hidden sm:block"
                  style={{
                    transform: `translate(${(1 - progress) * -120}px, ${(1 - progress) * 100}px) scale(${progress})`,
                    opacity: progress * 0.6,
                    transition: 'none'
                  }}
                ></div>

                {/* Trail effect lines - Hidden on mobile */}
                <div 
                  className="absolute top-1/2 -right-20 w-40 h-1 bg-gradient-to-l from-blue-500/40 to-transparent rounded-full hidden md:block"
                  style={{
                    transform: `translateX(${(1 - progress) * 200}px)`,
                    opacity: (1 - progress) * 0.8,
                    transition: 'none'
                  }}
                ></div>
                <div 
                  className="absolute top-1/2 mt-8 -right-20 w-32 h-1 bg-gradient-to-l from-purple-500/40 to-transparent rounded-full hidden md:block"
                  style={{
                    transform: `translateX(${(1 - progress) * 250}px)`,
                    opacity: (1 - progress) * 0.6,
                    transition: 'none'
                  }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom spacing */}
      <div className="h-16 sm:h-24 md:h-32 lg:h-48"></div>
    </div>
  );
}