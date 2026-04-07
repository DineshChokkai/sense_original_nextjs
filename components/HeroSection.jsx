import React, { useEffect, useState } from 'react';
import { Check, Shield, BarChart3 } from 'lucide-react';
import Image from 'next/image';
import Rocket from '../public/images/rocket.png';
import Cloud1 from '../public/images/cloud1.png';
import Cloud2 from '../public/images/cloud2.png';
import Mobile1 from '../public/images/mobile1.png';
import Right from '../public/images/right.png';
import Rev from '../public/images/rev.png';
import Graph from '../public/images/graph.png';
import BGFRAME from '../public/images/heroframe.png';

export default function AntiCounterfeitHero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div
      className="min-h-screen bg-[#E6E9EE] relative overflow-hidden pt-20 md:pt-8"
      style={{
        backgroundImage: `url(${BGFRAME})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Background blur effects */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-blue-400/10 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/3 w-[400px] h-[400px] bg-purple-400/20 rounded-full blur-3xl" />

      <div className="relative z-10 container mx-auto px-4  ">
        {/* Badge */}
        {/* <div className={`flex justify-center mb-8 transition-all duration-1000 \${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
          <div className="bg-blue-100/60 backdrop-blur-sm border border-white/40 rounded-full px-6 py-3 flex items-center gap-3">
            <Image src={Rocket} alt="User" width={32} height={32} className="w-8 h-8 rounded-full" />
            <span className="text-gray-800 font-medium">In Ideaabaz dangal</span>
          </div>
        </div> */}

        {/* Hero Text */}
        <div
          className={`text-center max-w-7xl mx-auto mb-12 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-6 leading-tight">
            <span className="text-gray-800 ">Eliminate </span>
            <span className="text-gray-900 font-extrabold italic">Counterfeits</span>
            <span className="text-gray-800">. Protect Your </span>
            <span className="text-gray-900 font-extrabold italic">Brand</span>
            <span className="text-gray-800">. Empower Every </span>
            <span className="text-gray-900 font-extrabold italic">Purchase</span>
            <span className="text-gray-800">.</span>
          </h1>

          <p className="text-lg md:text-xl lg:text-2xl text-gray-700 max-w-4xl mx-auto font-medium">
            Protect your products, your customers, and your reputation — with encrypted NFC smart
            tags that prove authenticity in seconds.
          </p>
        </div>

        {/* CTA Buttons */}
        <div
          className={`flex flex-col sm:flex-row justify-center items-center gap-4 mb-16 transition-all duration-1000 delay-400 md:pb-7 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          <button className="group bg-gradient-to-b from-gray-700 to-gray-900 border border-gray-700 text-white px-8 py-4 rounded-full flex items-center gap-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <Image
              src={Cloud1}
              alt="User"
              width={32}
              height={32}
              className="w-8 h-8 rounded-full"
            />
            <span className="font-medium">Download Android app</span>
          </button>

          <button className="group bg-white/40 border border-gray-400 text-gray-600 px-8 py-4 rounded-full flex items-center gap-3 opacity-60 cursor-not-allowed">
            <Image
              src={Cloud2}
              alt="User"
              width={32}
              height={32}
              className="w-8 h-8 rounded-full"
            />
            <span className="font-medium">iOS App Coming Soon</span>
          </button>
        </div>

        {/* Animated Elements Section */}
        {/* Animated Elements Section */}
        <div className="relative max-w-6xl mx-auto aspect-[16/9] md:aspect-[16/9] lg:h-[580px] overflow-visible">
          {/* Verified Card - Left */}
          <div
            className="absolute left-[4%] top-[12%] sm:left-[6%] sm:top-[10%] md:left-[10%] md:top-[10%] bg-white/90 backdrop-blur-sm rounded-2xl p-3 sm:p-4 md:p-6 shadow-lg"
            style={{ animation: 'floatLeft 4s ease-in-out infinite' }}
          >
            <div className="flex flex-col items-center gap-2 sm:gap-3">
              <Image
                src={Right}
                alt="Verified"
                width={56}
                height={56}
                className="w-8 sm:w-10 md:w-14"
              />
              <span className="font-semibold text-gray-800 text-xs sm:text-sm md:text-base">
                Verified
              </span>
            </div>
          </div>

          {/* Revolutionary Technology - Right Top */}
          <div
            className="absolute z-50 right-[4%] top-[14%] sm:right-[6%] sm:top-[12%] md:right-[10%] md:top-[12%] bg-white/90 backdrop-blur-sm rounded-2xl p-3 sm:p-4 md:p-6 shadow-lg"
            style={{ animation: 'floatRight 5s ease-in-out infinite' }}
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <Image
                src={Rev}
                alt="Revolutionary"
                width={56}
                height={56}
                className="w-8 sm:w-10 md:w-14"
              />
              <div className="text-left">
                <div className="font-semibold text-gray-800 text-xs sm:text-sm md:text-base">
                  Revolutionary
                </div>
                <div className="font-semibold text-gray-800 text-xs sm:text-sm md:text-base">
                  Technology
                </div>
              </div>
            </div>
          </div>

          {/* Main Phone */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 mt-4">
            <Image
              src={Mobile1}
              alt="Phone Scanning NFC Tag"
              width={320}
              height={640}
              className="w-48 sm:w-60 md:w-72 lg:w-80"
            />
          </div>

          {/* Tap Button */}
          <div
            className="absolute right-[10%] bottom-[18%] sm:right-[12%] sm:bottom-[14%] md:right-[16%] md:bottom-[12%] bg-white/90 backdrop-blur-sm rounded-3xl p-4 sm:p-6 md:p-8 shadow-lg"
            style={{ animation: 'floatRight 6s ease-in-out infinite' }}
          >
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-20 md:h-20 bg-black rounded-full flex items-center justify-center shadow-inner">
              <span className="text-white text-sm sm:text-lg md:text-2xl font-semibold">Tap</span>
            </div>
          </div>

          {/* Enhancing Customer Experience */}
          <div
            className="absolute z-50 left-[8%] bottom-[12%] sm:left-[10%] sm:bottom-[10%] md:left-[14%] md:bottom-[8%] bg-white/90 backdrop-blur-sm rounded-2xl p-3 sm:p-4 md:p-6 shadow-lg"
            style={{ animation: 'floatLeft 5.5s ease-in-out infinite' }}
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#f4f4f4] flex items-center justify-center rounded-lg">
                <Image src={Graph} alt="Graph" width={24} height={24} className="w-4 sm:w-6" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-gray-800 text-xs sm:text-sm md:text-base">
                  Enhancing
                </div>
                <div className="font-semibold text-gray-800 text-xs sm:text-sm md:text-base">
                  Customer Experience
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes floatLeft {
          0%,
          100% {
            transform: translateX(0) translateY(0);
          }
          50% {
            transform: translateX(20px) translateY(-10px);
          }
        }

        @keyframes floatRight {
          0%,
          100% {
            transform: translateX(0) translateY(0);
          }
          50% {
            transform: translateX(-20px) translateY(-10px);
          }
        }

        @keyframes floatLeftSlow {
          0%,
          100% {
            transform: translateX(0) translateY(0);
          }
          50% {
            transform: translateX(15px) translateY(-8px);
          }
        }

        @keyframes floatRightSlow {
          0%,
          100% {
            transform: translateX(0) translateY(0);
          }
          50% {
            transform: translateX(-15px) translateY(-8px);
          }
        }

        .animate-float-left {
          animation: floatLeft 4s ease-in-out infinite;
        }

        .animate-float-right {
          animation: floatRight 5s ease-in-out infinite;
        }

        .animate-float-left-slow {
          animation: floatLeftSlow 5.5s ease-in-out infinite;
        }

        .animate-float-right-slow {
          animation: floatRightSlow 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
