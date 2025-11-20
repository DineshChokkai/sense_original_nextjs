import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import VideoThumbnail from "../public/images/howtoscan.png";

const HowToScan = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scale, setScale] = useState(0.5);
  const [opacity, setOpacity] = useState(0);
  const containerRef = useRef(null);

  // Handle scroll-based parallax effect (desktop only)
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    
    if (isMobile) {
      // For mobile, just set full scale and opacity
      setScale(1);
      setOpacity(1);
      return;
    }

    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate the center of the element and viewport
      const elementCenter = rect.top + rect.height / 2;
      const viewportCenter = windowHeight / 2;
      
      // Calculate distance from center (0 = perfect center)
      const distanceFromCenter = Math.abs(elementCenter - viewportCenter);
      const maxDistance = windowHeight / 2 + rect.height / 2;
      
      // Progress from 0 (far) to 1 (center)
      const centerProgress = Math.max(0, 1 - distanceFromCenter / maxDistance);

      // Scale from 0.5 to 1 based on center proximity
      const newScale = 0.5 + centerProgress * 0.5;
      setScale(newScale);

      // Opacity reaches 1 only at center
      setOpacity(centerProgress);
    };

    handleScroll(); // Initial call
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <>
      {/* Main Content with Parallax */}
      <div
        ref={containerRef}
        className="flex justify-center items-center py-8 md:py-20 px-4 bg-[#E6E9EE] md:min-h-screen"
      >
        <div
          className="max-w-[1700px] w-full bg-white rounded-[28px] shadow-2xl overflow-hidden relative transition-all duration-100 ease-out"
          style={{
            transform: `scale(${scale})`,
            opacity: opacity,
          }}
        >
          {/* Thumbnail / Header Section */}
          <div className="relative w-full">
            <Image
              src={VideoThumbnail}
              alt="How to Scan"
              width={1700}
              height={900}
              className="w-full h-auto object-cover rounded-[28px]"
            />

            {/* Play Button */}
            <button
              onClick={() => setIsOpen(true)}
              className="absolute inset-0 flex justify-center items-center bg-black/30 hover:bg-black/50 transition rounded-[28px] group"
              aria-label="Play video"
            >
              <div className="bg-white rounded-full p-6 md:p-8 shadow-2xl group-hover:scale-110 transition-transform duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="black"
                  viewBox="0 0 24 24"
                  className="w-12 h-12 md:w-16 md:h-16"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex justify-center items-center z-[9999] animate-fadeIn">
          <div className="relative bg-black rounded-2xl w-[90%] md:w-[80%] lg:w-[60%] aspect-video shadow-2xl animate-scaleIn">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
              aria-label="Close video"
            >
              <svg
                className="w-10 h-10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Video Frame */}
            <iframe
              className="w-full h-full rounded-2xl"
              // src="https://www.youtube.com/embed/5TeVNJC37kA"
              src="https://www.youtube.com/embed/8B46cZpx6CE"
              title="How to Scan Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-scaleIn {
          animation: scaleIn 0.4s ease-out;
        }
      `}</style>
    </>
  );
};

export default HowToScan;