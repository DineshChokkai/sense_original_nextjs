import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import ideabaazImage from "../public/images/pic.png";
import frame63 from "../public/images/one.png";
import frame631 from "../public/images/two.png";
import { Phone } from "lucide-react";

const HowToScanSection = ({ onOpenContact }) => {
  const textRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.3 }
    );

    if (textRef.current) observer.observe(textRef.current);
    return () => observer.disconnect();
  }, []);

  const handleContactClick = () => {
    if (onOpenContact) {
      onOpenContact();
    }
  };

  return (
    <div className="relative w-full bg-white mt-[30px]">
      {/* Content Section */}
      <div className="flex flex-col justify-center items-start px-6 md:px-16 pt-8 pb-8 sm:pb-12 md:pb-16">
        {/* Heading */}
        <h1 className="text-[28px] sm:text-[48px] md:text-[64px] font-normal text-black max-w-[900px] leading-tight mt-8">
          Protect Your Brand Today — Before Counterfeiters Do.
        </h1>

        {/* Sub Text */}
        <p className="text-[16px] sm:text-[20px] md:text-[24px] font-light text-black mt-4 max-w-[800px]">
          Schedule a free consultation to see how SenseOriginal can secure your
          brand and build lasting trust.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 mt-12">
          {/* Button 1 - Book a Call */}
          <button className="flex items-center gap-3 bg-gradient-to-b from-[#3E4046] to-[#131314] border border-[#333] rounded-[36px] px-6 py-3 shadow-inner shadow-white/10 hover:scale-105 transition-transform">
            <Phone
              size={10}
              strokeWidth={2}
              color="#ffffff"
              width={20}
              height={20}
            />

            <div className="flex flex-col text-left">
              <div className="flex items-center gap-2">
                <a
                  href="tel:+919876543210"
                  className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition"
                >
                  <span className="text-white text-lg font-normal">
                    Book a Call
                  </span>
                  <Image src={frame63} alt="Arrow" width={16} height={16} className="w-4 h-4" />
                </a>
              </div>
              <span className="text-white text-[10px] font-light">
                Talk to our team about problem
              </span>
            </div>
          </button>

          {/* Button 2 - Book a Demo */}
          <button
            onClick={handleContactClick}
            className="flex items-center gap-3 border border-[#333] rounded-[36px] px-8 py-3 shadow-inner shadow-white/10 hover:scale-105 transition-transform"
          >
            <div className="flex flex-col text-left">
              <div className="flex items-center gap-2">
                <span className="text-black text-lg font-normal">
                  Book a Demo
                </span>
                <Image src={frame631} alt="Arrow" width={16} height={16} className="w-4 h-4" />
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Animated Gradient Text - Responsive Container */}
      <div className="relative w-full px-4 sm:px-6 md:px-8 ">
        <h2
          ref={textRef}
          className={`
            text-center w-full
            font-semibold leading-none tracking-tight
            bg-gradient-to-b from-[#9F9F9F6B] to-transparent bg-clip-text text-transparent
            text-[12vw] sm:text-[10vw] md:text-[9vw] lg:text-[10vw] xl:text-[12.5vw]
            transition-all duration-[1200ms] ease-out
            ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-24"
            }
          `}
          style={{
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            wordWrap: "break-word",
            overflowWrap: "break-word",
          }}
        >
          SENSE ORIGINAL
        </h2>
      </div>
    </div>
  );
};

export default HowToScanSection;
