import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const newsData = [
  {
    id: 1,
    image: '/assets/news-author.png',
    title: 'We are in',
    description:
      "Recognized as the most innovative startup at Asia's Business Excellence Awards for groundbreaking healthcare solutions.",
  },
  {
    id: 2,
    image: '/assets/news-author.png',
    title: "Featured in Tech Magazine's Top 50 Startups",
    description:
      'Our journey from a small team to becoming one of the most promising health-tech companies in the region.',
  },
  {
    id: 3,
    image: '/assets/news-author.png',
    title: 'Partnership with Leading Healthcare Provider',
    description:
      'Expanding our reach to serve millions of patients through strategic collaboration with industry leaders.',
  },
  {
    id: 4,
    image: '/assets/news-author.png',
    title: 'Raised Series A Funding of $5M',
    description:
      'Secured major funding to accelerate product development and expand our team of healthcare professionals.',
  },
  {
    id: 5,
    image: '/assets/news-author.png',
    title: 'Launched New AI-Powered Health Platform',
    description:
      'Introducing cutting-edge technology that revolutionizes patient care with personalized health insights.',
  },
  {
    id: 6,
    image: '/assets/news-author.png',
    title: 'CEO Featured in Forbes Healthcare Leaders',
    description:
      'Recognition of visionary leadership driving innovation in digital healthcare transformation.',
  },
];

export default function LatestNewsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward

  // Auto-scroll every 15 seconds
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        handleNext();
      }, 15000);
      return () => clearInterval(interval);
    }
  }, [currentIndex, isPaused]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % newsData.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + newsData.length) % newsData.length);
  };

  const getVisibleCards = () => {
    const cards = [];
    for (let i = 0; i < 2; i++) {
      cards.push(newsData[(currentIndex + i) % newsData.length]);
    }
    return cards;
  };

  return (
    <section className="py-10 md:py-16 px-4 md:px-8 lg:px-12 bg-[#E6E9EE] overflow-x-hidden">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 xl:gap-32">
        {/* Section header and description */}
        <div className="flex flex-col gap-4 md:gap-6 max-w-full lg:max-w-[500px] xl:max-w-[600px]">
          <span className="text-md text-[#FF6900] font-[400] px-4 md:px-8 py-1.5 rounded-xl border border-[#00000066]/40 w-fit mb-2">
            Articles
          </span>
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-[400] text-black mb-4 leading-tight">
              Our latest <span className="text-[#2874f0]">news</span>
            </h2>
            <p className="font-[300] text-base md:text-lg">
              SenseOriginal Clinches Most Innovative Startup at Asia&apos;s Business Excellence
              Awards 2024
            </p>
          </div>
          {/* Carousel controls and CTA */}
          <div className="flex flex-wrap items-center gap-4 md:gap-6 mt-8 md:mt-12 lg:mt-20 z-20">
            <div className="flex items-center gap-4">
              <button
                onClick={handlePrev}
                className="w-10 h-10 flex items-center justify-center rounded-full text-white font-[500] bg-gradient-to-b from-[#3E4046] to-[#131314] hover:opacity-90 hover:scale-105 duration-300 transition-all"
              >
                <ChevronLeft strokeWidth={3} size={20} />
              </button>
              <button
                onClick={handleNext}
                className="w-10 h-10 flex items-center justify-center rounded-full text-white font-[500] bg-gradient-to-b from-[#3E4046] to-[#131314] hover:opacity-90 hover:scale-105 duration-300 transition-all"
              >
                <ChevronRight strokeWidth={3} size={20} />
              </button>
            </div>
            <button className="flex gap-2 items-center bg-gradient-to-b from-[#3E4046] to-[#131314] text-white px-6 md:px-8 py-2.5 rounded-full font-[500] shadow hover:opacity-90 hover:scale-105 duration-300 transition-all text-sm md:text-base">
              See all media coverage <ArrowUpRight size={18} />
            </button>
          </div>
        </div>

        {/* News Cards */}
        <div
          className="flex-1"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="flex gap-4 md:gap-6 justify-center lg:justify-end flex-wrap lg:flex-nowrap">
            {getVisibleCards().map((card, index) => (
              <motion.div
                key={`${card.id}-${currentIndex}`}
                initial={{ opacity: 0, x: direction * 100 }}
                animate={{
                  opacity: hoveredCard === null || hoveredCard === index ? 1 : 0.5,
                  x: 0,
                  scale: hoveredCard === index ? 1.05 : 1,
                }}
                exit={{ opacity: 0, x: direction * -100 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                className="bg-[#E6E9EE] rounded-2xl pb-4 border border-black flex flex-col justify-between min-h-[380px] w-full sm:w-[350px] md:w-[380px] shadow cursor-pointer overflow-hidden"
              >
                <div className="mb-4">
                  <div className="relative w-full h-48 md:h-56 overflow-hidden mb-4">
                    <Image
                      src={card.image}
                      alt={card.title}
                      width={380}
                      height={224}
                      className="w-full h-full object-cover grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                    />
                  </div>
                  <div className="px-4 pt-2">
                    <h3 className="font-[500] text-base md:text-lg mb-2 line-clamp-2">
                      {card.title}
                    </h3>
                    <p className="text-sm font-[500] line-clamp-3">{card.description}</p>
                  </div>
                </div>
                <div className="place-self-end pr-4">
                  <button
                    onClick={() =>
                      window.open(
                        'https://www.apnnews.com/sense-original-clinches-most-innovative-startup-at-asias-business-excellence-awards-2024/',
                        '_blank',
                      )
                    }
                    className="bg-gradient-to-b from-[#3E4046] to-[#131314] text-white px-4 py-2 rounded-full font-[500] flex items-center gap-1 self-start hover:opacity-90 hover:scale-105 duration-300 transition-all text-sm"
                  >
                    Read more <ArrowUpRight size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pagination dots */}
          {/* <div className="flex justify-center gap-2 mt-6">
                        {newsData.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                    index === currentIndex 
                                        ? 'bg-[#2874f0] w-8' 
                                        : 'bg-gray-400 hover:bg-gray-600'
                                }`}
                            />
                        ))}
                    </div> */}
        </div>
      </div>
    </section>
  );
}
