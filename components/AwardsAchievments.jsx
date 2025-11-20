import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

// Add your image paths and titles here
const awardsData = [
    {
        image: "/images/award-1.png",
        title: "Featured on IdeaBaaz TV Show – Funded Startup"
    },
    {
        image: "/images/award-2.png",
        title: "Winner of MSME National Award 2024"
    },
    {
        image: "/images/award-3.png",
        title: "Best Innovation Award – Startup India"
    },
    {
        image: "/images/award-4.png",
        title: "Excellence in Digital Transformation"
    },
    {
        image: "/images/award-5.png",
        title: "Top 10 Emerging Startups of the Year"
    },
];

export default function AwardsAchievements() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [paused, setPaused] = useState(false);
    const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward

    // Auto-rotate images every 5 seconds (including animation time)
    useEffect(() => {
        if (!paused) {
            const timeout = setTimeout(() => {
                handleNext();
            }, 5000);
            return () => clearTimeout(timeout);
        }
    }, [paused, activeIndex]);

    const handleNext = () => {
        setDirection(1);
        setActiveIndex((prev) => (prev + 1) % awardsData.length);
    };

    const handlePrev = () => {
        setDirection(-1);
        setActiveIndex((prev) => (prev - 1 + awardsData.length) % awardsData.length);
    };

    // Helper to get the correct image for each position
    const getImageAtPosition = (position) => {
        return awardsData[(activeIndex + position) % awardsData.length].image;
    };

    return (
        <section className="bg-[#E6E9EE] py-10 md:py-14 px-4 md:px-8 lg:px-12 pt-16 md:pt-24 lg:pt-36 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 lg:gap-20">
            {/* Left: Awards & Achievements text */}
            <div className="flex-1 w-full md:w-auto text-center md:text-left">
                <span className="text-sm md:text-md text-[#FF6900] font-[400] px-4 md:px-8 py-1.5 md:py-2 rounded-xl border border-[#00000066]/40 inline-block">Awards</span>
                <h2 className="mt-4 md:mt-6 text-3xl md:text-4xl lg:text-6xl xl:text-[64px] font-[400] text-gray-900 mb-4">
                    Awards &<br />Achievements
                </h2>
            </div>

            {/* Center: Animated Album/collage */}
            <div
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
                className="relative w-full max-w-[280px] h-[240px] sm:max-w-[350px] sm:h-[295px] md:w-[418px] md:h-[355px] cursor-pointer flex-shrink-0"
            >
                <AnimatePresence mode="popLayout">
                    <motion.img
                        key={activeIndex}
                        src={getImageAtPosition(0)}
                        alt="award"
                        initial={{ opacity: 0, y: -80, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 80, scale: 0.9 }}
                        transition={{ duration: 1, ease: "easeInOut" }}
                        className="absolute top-0 left-0 w-full h-full object-cover rounded-xl z-50 shadow-2xl"
                    />
                </AnimatePresence>

                <motion.img
                    src={getImageAtPosition(1)}
                    alt="award"
                    className="absolute -top-3 left-3 sm:-top-4 sm:left-4 md:-top-5 md:left-5 w-[90%] h-full object-cover rounded-xl z-40 shadow-xl"
                />

                <motion.img
                    src={getImageAtPosition(2)}
                    alt="award"
                    className="absolute -top-5 left-5 sm:-top-7 sm:left-7 md:-top-10 md:left-10 w-[80%] h-full object-cover rounded-xl z-30 shadow-lg"
                />

                <motion.img
                    src={getImageAtPosition(3)}
                    alt="award"
                    className="absolute -top-7 left-7 sm:-top-10 sm:left-10 md:-top-14 md:left-14 w-[70%] h-full object-cover rounded-xl z-20 shadow-md"
                />

                <motion.img
                    src={getImageAtPosition(4)}
                    alt="award"
                    className="absolute -top-8 left-10 sm:-top-12 sm:left-14 md:-top-16 md:left-20 w-[60%] h-full object-cover rounded-xl z-10 shadow"
                />
            </div>

            {/* Right: Featured text and button */}
            <div className="flex-1 w-full md:w-auto flex flex-col gap-3 items-center md:items-start mt-4 md:mt-0">
                <AnimatePresence mode="wait">
                    <motion.span
                        key={activeIndex}
                        initial={{ opacity: 0, y: direction * 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: direction * -20 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="text-lg md:text-xl font-[500] text-gray-900 text-center md:text-left max-w-md"
                    >
                        {awardsData[activeIndex].title}
                    </motion.span>
                </AnimatePresence>
                
                {/* Navigation Buttons */}
                <div className="flex items-center gap-4 mt-2">
                    <button 
                        onClick={handlePrev}
                        className="w-10 h-10 flex items-center justify-center rounded-full text-white font-[500] bg-gradient-to-b from-[#3E4046] to-[#131314] hover:opacity-90 hover:scale-105 duration-300 transition-all"
                        aria-label="Previous award"
                    >
                        <ChevronLeft strokeWidth={3} size={20} />
                    </button>
                    <button 
                        onClick={handleNext}
                        className="w-10 h-10 flex items-center justify-center rounded-full text-white font-[500] bg-gradient-to-b from-[#3E4046] to-[#131314] hover:opacity-90 hover:scale-105 duration-300 transition-all"
                        aria-label="Next award"
                    >
                        <ChevronRight strokeWidth={3} size={20} />
                    </button>
                </div>
                
                <button className="bg-gradient-to-b from-[#3E4046] to-[#131314] text-white px-6 py-2 rounded-full text-sm flex items-center gap-1 hover:bg-black hover:scale-110 transition-all duration-300 font-[500]">
                    Visit <ArrowUpRight size={18}/>
                </button>
            </div>
        </section>
    );
}