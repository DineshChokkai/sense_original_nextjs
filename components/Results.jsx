import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import Image from "next/image";

export default function ResultsSection() {
  const controls1 = useAnimation();
  const controls2Top = useAnimation();
  const controls2Bottom = useAnimation();
  const controls3 = useAnimation();

  const card1Ref = useRef(null);
  const card2TopRef = useRef(null);
  const card2BottomRef = useRef(null);
  const card3Ref = useRef(null);

  useEffect(() => {
    const createObserver = (ref, controls) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              controls.start("visible");
            } else {
              controls.start("hidden");
            }
          });
        },
        { threshold: 0.2 }
      );

      if (ref.current) {
        observer.observe(ref.current);
      }

      return observer;
    };

    const observer1 = createObserver(card1Ref, controls1);
    const observer2Top = createObserver(card2TopRef, controls2Top);
    const observer2Bottom = createObserver(card2BottomRef, controls2Bottom);
    const observer3 = createObserver(card3Ref, controls3);

    return () => {
      observer1.disconnect();
      observer2Top.disconnect();
      observer2Bottom.disconnect();
      observer3.disconnect();
    };
  }, [controls1, controls2Top, controls2Bottom, controls3]);

  const butterflyVariants = {
    hidden: {
      scaleY: 0,
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeIn",
      },
    },
    visible: {
      scaleY: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="bg-[#E6E9EE] py-8 md:py-12 lg:py-16 px-4 md:px-8 lg:px-12">
      <div className="mx-auto max-w-8xl">
        {/* Section Header */}
        <div className="mb-6 md:mb-8">
          <span className="text-sm md:text-md text-[#FF6900] font-[400] px-4 md:px-8 py-1 md:py-1.5 rounded-xl border border-[#00000066]/40 inline-block">
            Results
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-6xl font-[400] text-gray-600 mt-4 md:mt-6">
            Result That Matters
          </h2>
          <h3 className="text-2xl md:text-3xl lg:text-6xl font-[400] text-gray-900 mt-1 md:mt-2">
            Authenticity That Pays Off.
          </h3>
        </div>
        {/* Cards Row */}
        <div className="grid md:grid-cols-3 gap-4 md:gap-6 items-stretch mt-8 md:mt-16">
          {/* Card 1 */}
          {/* Card 1 */}
          <motion.div
            ref={card1Ref}
            variants={butterflyVariants}
            initial="hidden"
            animate={controls1}
            style={{ originY: 0.5 }}
            className="relative bg-white p-4 md:p-6 rounded-xl border border-black/40 flex flex-col justify-between min-h-[260px] md:min-h-[400px]"
          >
            {/* FIXED IMAGE */}
            <div className="absolute top-20 md:top-28 left-0 z-10 w-16 md:w-auto">
              <Image
                className="w-full"
                src="/images/arrow.png"
                alt="join"
                width={90}
                height={90}
              />
               
            </div>

            <p className="text-[#1D191F] font-[400] text-sm md:text-md mb-4 lg:text-lg">
              Every scan verifies product authenticity instantly, eliminating
              fake product uncertainty and rebuilding buyer confidence.
            </p>

            <div>
              <div className="text-4xl md:text-5xl font-[400] mb-1">100%</div>
              <p className="text-sm md:text-md font-[400] text-[#555555] lg:text-lg">
                <span className="text-blue-600">Reduction</span> in Counterfeit
                Confusion
              </p>
            </div>
          </motion.div>

          {/* Card 2 */}
          <div className="flex flex-col justify-between w-full gap-4 md:gap-6">
            <motion.div
              ref={card2TopRef}
              variants={butterflyVariants}
              initial="hidden"
              animate={controls2Top}
              style={{ originY: 0.5 }}
              className="relative bg-white px-4 md:px-6 pt-4 md:pt-6 pb-2 md:pb-4 rounded-xl shadow flex flex-col gap-2 border border-black/40"
            >
              <p className="text-[#1D191F] font-[400] text-sm md:text-md mb-2 md:mb-4 lg:text-lg">
                Turning lost revenue into loyal customers.
              </p>
              <div className="flex flex-col gap-1 mb-2 lg:text-lg">
                <span className="text-3xl md:text-4xl font-[400] leading-none">
                  +30%
                </span>
                <a href="#" className="text-xs md:text-sm">
                  <span className="text-blue-500">Recovered Sales</span> in
                  Pilot Markets
                </a>
              </div>
              {/* Bar Chart Mockup */}
              <div className="flex items-end space-x-1 place-self-end -mt-4 md:-mt-6">
                <div className="w-6 md:w-10 bg-gradient-to-b from-[#A78BFA] to-[#EC4899] h-6 md:h-8 rounded-t-lg shadow-lg"></div>
                <div className="w-6 md:w-10 bg-gradient-to-b from-[#A78BFA] to-[#EC4899] h-10 md:h-14 rounded-t-lg shadow-lg"></div>
                <div className="w-6 md:w-10 bg-gradient-to-b from-[#A78BFA] to-[#EC4899] h-14 md:h-20 rounded-t-lg shadow-lg"></div>
                <div className="w-6 md:w-10 bg-gradient-to-b from-[#A78BFA] to-[#EC4899] h-20 md:h-28 rounded-t-lg shadow-lg"></div>
                <div className="w-6 md:w-10 bg-gradient-to-b from-[#A78BFA] to-[#EC4899] h-28 md:h-40 rounded-t-lg shadow-lg"></div>
                <div className="w-6 md:w-10 bg-gradient-to-b from-[#A78BFA] to-[#EC4899] h-32 md:h-48 rounded-t-lg shadow-lg"></div>
              </div>
            </motion.div>
            <motion.div
              ref={card2BottomRef}
              variants={butterflyVariants}
              initial="hidden"
              animate={controls2Bottom}
              style={{ originY: 0.5 }}
              className="bg-white p-4 md:p-4 pb-12 md:pb-20 rounded-xl border border-black/40 flex flex-col justify-between"
            >
              <p className="text-[#1D191F] text-sm md:text-md mb-4 lg:text-lg">
                <span className="text-[#155DFC]">Real-time monitoring</span> of
                scan patterns and counterfeit alerts.
              </p>
            </motion.div>
          </div>

          {/* Card 3 (Dark theme) */}
          <motion.div
            ref={card3Ref}
            variants={butterflyVariants}
            initial="hidden"
            animate={controls3}
            style={{ originY: 0.5 }}
            className="bg-gray-900 p-4 md:p-6 rounded-xl shadow text-white flex flex-col gap-3 md:gap-4"
          >
            <p className="text-gray-200 text-sm md:text-md font-[400] mb-2 md:mb-4 lg:text-lg">
              Track live product scans, monitor market activity.
            </p>
            <div className="flex flex-col gap-2">
              <div className="text-3xl md:text-4xl font-[400]">45+</div>
              <a
                href="#"
                className="text-sm md:text-md font-[400] text-[#B2B2B2] lg:text-lg"
              >
                Cities With{" "}
                <span className="text-[#2F4EFF]">Verified Scans</span>
              </a>
              <p className="text-sm md:text-md font-[400] text-[#B2B2B2]">
                Real Data.{" "}
                <span className="text-[#2F4EFF]">Real Protection</span>
              </p>
            </div>
            <div className="relative p-2 mt-2 md:mt-4">
              <Image
                className="absolute top-8 md:top-14  w-8 md:w-auto"
                src="/images/map.png"
                alt="join"
                width={40}
                height={40}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
