import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";

const industries = [
  {
    id: 1,
    title: "FMCG",
    color: "from-blue-400/80 to-blue-700/80",
    image: "https://images.unsplash.com/photo-1534723452862-4c874018d66d?w=800",
  },
  {
    id: 2,
    title: "Electronics",
    color: "from-cyan-400/80 to-sky-700/80",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800",
  },
  {
    id: 3,
    title: "Liquor",
    color: "from-amber-500/80 to-orange-700/80",
    image: "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=800",
  },
  {
    id: 4,
    title: "Pharmaceuticals",
    color: "from-green-400/80 to-teal-700/80",
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800",
  },
  {
    id: 5,
    title: "Luxury Goods",
    color: "from-pink-400/80 to-fuchsia-700/80",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800",
  },
  {
    id: 6,
    title: "Automobile",
    color: "from-indigo-500/80 to-purple-700/80",
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800",
  },
];

const IndustriesParallax = () => {
  const [hoveredId, setHoveredId] = useState(null);
  const [visibleRows, setVisibleRows] = useState([]);
  const rowRefs = useRef([]);

  // Scroll-based reveal - row by row
  useEffect(() => {
    const handleScroll = () => {
      rowRefs.current.forEach((row, index) => {
        if (!row) return;
        
        const rect = row.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Row becomes visible when it enters viewport
        if (rect.top < windowHeight * 0.8 && rect.bottom > 0) {
          setVisibleRows((prev) => {
            if (!prev.includes(index)) {
              return [...prev, index];
            }
            return prev;
          });
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Split industries into rows (3 per row)
  const firstRow = industries.slice(0, 3);
  const secondRow = industries.slice(3, 6);

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/10 to-gray-100 py-20 overflow-hidden">
      <div className="text-center mb-14 px-4">
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
          Trusted Across Industries That <br className="hidden sm:block" />
          <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Demand Authenticity
          </span>
        </h2>
      </div>

      <div className="container mx-auto px-6 space-y-8">
        {/* First Row */}
        <div 
          ref={(el) => (rowRefs.current[0] = el)}
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 transition-all duration-1000 ease-out ${
            visibleRows.includes(0) 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-20'
          }`}
        >
          {firstRow.map((industry, idx) => (
            <div
              key={industry.id}
              onMouseEnter={() => setHoveredId(industry.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={`relative w-full rounded-2xl overflow-hidden shadow-xl cursor-pointer transform transition-all duration-500 ease-out hover:scale-105 hover:shadow-2xl ${
                visibleRows.includes(0) ? 'delay-' + (idx * 150) : ''
              }`}
              style={{
                transitionDelay: visibleRows.includes(0) ? `${idx * 150}ms` : '0ms'
              }}
            >
              {/* Background Image */}
              <div className="relative h-64 md:h-72 lg:h-80 overflow-hidden">
                <Image
                  src={industry.image}
                  alt={industry.title}
                  width={400}
                  height={320}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                />
                
                {/* Title at bottom - always visible */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <h3 className="text-2xl md:text-3xl font-bold text-white">
                    {industry.title}
                  </h3>
                </div>
              </div>

              {/* Gradient Overlay with content - shows on hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-tr ${industry.color} backdrop-blur-sm flex flex-col justify-center items-center text-white text-center transition-all duration-500 ${
  hoveredId === industry.id ? "opacity-100 visible" : "opacity-0 invisible"
}`}

              >
                <div className="bg-white/30 backdrop-blur-sm p-5 rounded-full mb-4 transform transition-transform duration-500 shadow-lg"
                  style={{
                    transform: hoveredId === industry.id ? 'scale(1) rotate(0deg)' : 'scale(0.5) rotate(-180deg)'
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-10 h-10 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12l2 2 4-4m1-5a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <p className="text-lg font-medium mb-2">Verified Authentic</p>
                <h3 className="text-3xl font-bold">{industry.title}</h3>
                <p className="text-sm mt-3 opacity-90 px-6">
                  Protecting authenticity and building trust
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Second Row */}
        <div 
          ref={(el) => (rowRefs.current[1] = el)}
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 transition-all duration-1000 ease-out ${
            visibleRows.includes(1) 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-20'
          }`}
        >
          {secondRow.map((industry, idx) => (
            <div
              key={industry.id}
              onMouseEnter={() => setHoveredId(industry.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={`relative w-full rounded-2xl overflow-hidden shadow-xl cursor-pointer transform transition-all duration-500 ease-out hover:scale-105 hover:shadow-2xl`}
              style={{
                transitionDelay: visibleRows.includes(1) ? `${idx * 150}ms` : '0ms'
              }}
            >
              {/* Background Image */}
              <div className="relative h-64 md:h-72 lg:h-80 overflow-hidden">
                <Image
                  src={industry.image}
                  alt={industry.title}
                  width={400}
                  height={320}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                />
                
                {/* Title at bottom - always visible */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <h3 className="text-2xl md:text-3xl font-bold text-white">
                    {industry.title}
                  </h3>
                </div>
              </div>

              {/* Gradient Overlay with content - shows on hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-tr ${industry.color} backdrop-blur-sm flex flex-col justify-center items-center text-white text-center transition-all duration-500 ${
                  hoveredId === industry.id 
                    ? 'opacity-100 visible' 
                    : 'opacity-0 invisible'
                }`}
              >
                <div className="bg-white/30 backdrop-blur-sm p-5 rounded-full mb-4 transform transition-transform duration-500 shadow-lg"
                  style={{
                    transform: hoveredId === industry.id ? 'scale(1) rotate(0deg)' : 'scale(0.5) rotate(-180deg)'
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-10 h-10 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12l2 2 4-4m1-5a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <p className="text-lg font-medium mb-2">Verified Authentic</p>
                <h3 className="text-3xl font-bold">{industry.title}</h3>
                <p className="text-sm mt-3 opacity-90 px-6">
                  Protecting authenticity and building trust
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Button */}
      <div className="mt-16 flex justify-center">
        <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full text-base font-semibold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
          Explore Industry Applications
        </button>
      </div>
    </section>
  );
};

export default IndustriesParallax;

