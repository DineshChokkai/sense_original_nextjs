import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Brand1 from "../public/images/brand1.png";
import Brand2 from "../public/images/brand2.png";
import Brand3 from "../public/images/brand3.png";
import Brand4 from "../public/images/brand4.png";
const WhyChooseSection = () => {
  const [activeCard, setActiveCard] = useState(0); // 👈 default card stays active
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef(null);

  const cards = [
    {
      id: 0,
      title: "Authenticity Guaranteed",
      description: "Military-grade encryption that can't be cloned",
      image: Brand1,
    },
    {
      id: 1,
      title: "Real-Time Tracking",
      description: "Monitor your products across the entire supply chain",
      image: Brand2,
    },
    {
      id: 2,
      title: "Consumer Trust",
      description: "Build brand loyalty with verified authenticity",
      image: Brand3,
    },
    {
      id: 3,
      title: "Easy Integration",
      description: "Seamlessly integrate with your existing systems",
      image: Brand4,
    },
  ];

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementTop = rect.top;
      const elementHeight = rect.height;

      const progress = Math.max(
        0,
        Math.min(1, (windowHeight - elementTop) / (windowHeight + elementHeight / 2))
      );

      setScrollProgress(progress);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={sectionRef}
      className="py-16 md:py-24 px-4 md:px-16 bg-[#E6E9EE] overflow-hidden"
    >
      <div className="w-full mx-auto">
        {/* Header Section */}
        <div
          className="mb-9 transition-all duration-700 ease-out"
          style={{
            opacity: scrollProgress,
            transform: `translateY(${(1 - scrollProgress) * 50}px)`,
          }}
        >
          <h2 className="text-5xl md:text-6xl lg:text-[64px] font-normal mb-6 text-black leading-tight">
            Why Brands Choose SenseOriginal
          </h2>
          <p className="text-lg md:text-xl text-[#364153] italic leading-7">
            "Our technology turns your product into its own security system."
          </p>
        </div>

        {/* Cards Grid */}
        <div className="max-w-[1500px] mx-auto flex flex-col md:flex-row flex-wrap gap-2.5 p-2.5 justify-center items-center">
  {cards.map((card, index) => {
    const delay = index * 0.1;
    const cardProgress = Math.max(
      0,
      Math.min(1, (scrollProgress - delay) / (1 - delay))
    );
    const isActive = activeCard === index;

    return (
      <div
        key={card.id}
        className="relative group cursor-pointer w-full sm:w-[80%] md:w-auto transition-all duration-700 ease-out"
        onMouseEnter={() => setActiveCard(index)}
        onMouseLeave={() => setActiveCard(0)}
        style={{
          transform: `translateY(${(1 - cardProgress) * 50}px)`,
          flex:
            isActive && window.innerWidth >= 768 ? "1.8 1 0%" : "1 1 0%",
          transition: "all 0.7s ease-out",
        }}
      >
        <div
          className="relative rounded-3xl border border-black/50 overflow-hidden 
                     w-full max-w-[380px] md:max-w-none mx-auto 
                     h-[300px] sm:h-[350px] md:h-[420px] lg:h-[460px] 
                     transition-all duration-700 ease-out"
        >
          {/* Image with overlay */}
          <div className="absolute inset-0">
            <Image
              src={card.image}
              alt={card.title}
              width={380}
              height={460}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              style={{ filter: "brightness(0.7)" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>

          {/* Content Overlay */}
          <div
            className={`absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 lg:p-9 transition-all duration-700 ease-out ${
              isActive
                ? "translate-y-0 opacity-100"
                : "translate-y-full opacity-0"
            }`}
          >
            <h3
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal text-white leading-tight mb-2 sm:mb-3"
            >
              {card.title}
            </h3>
            <p
              className="text-sm sm:text-base md:text-lg text-[#B2B2B2] leading-snug sm:leading-6"
            >
              {card.description}
            </p>
          </div>
        </div>
      </div>
    );
  })}
</div>


        {/* Mobile Navigation Dots */}
        <div className="flex justify-center gap-2 mt-8 md:hidden">
          {cards.map((card, index) => (
            <button
              key={card.id}
              onClick={() => setActiveCard(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeCard === index ? "bg-black w-8" : "bg-gray-400 w-2"
              }`}
              aria-label={`View ${card.title}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseSection;
