import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import frame63 from '../public/images/one.png';
import frame631 from '../public/images/two.png';
import { Phone, Play } from 'lucide-react';

const ReelsSection = ({ onOpenContact }) => {
  const textRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null);

  const videos = [
    {
      id: 1,
      url: 'https://www.youtube.com/embed/vgja3deoVBo',
      thumbnail: 'https://img.youtube.com/vi/vgja3deoVBo/maxresdefault.jpg',
    },
    {
      id: 2,
      url: 'https://www.youtube.com/embed/KFoGbGpaKIc',
      thumbnail: 'https://img.youtube.com/vi/KFoGbGpaKIc/maxresdefault.jpg',
    },
    {
      id: 3,
      url: 'https://www.youtube.com/embed/g4hy4MwZjpU',
      thumbnail: 'https://img.youtube.com/vi/g4hy4MwZjpU/maxresdefault.jpg',
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.3 },
    );

    if (textRef.current) observer.observe(textRef.current);
    return () => observer.disconnect();
  }, []);

  const handleContactClick = () => {
    if (onOpenContact) {
      onOpenContact();
    }
  };

  const handlePlayVideo = (videoId) => {
    setActiveVideo(videoId);
  };

  return (
    <div className="relative w-full bg-white mt-[30px]">
      {/* YouTube Shorts / Reels Section */}
      <div className="px-6 pt-10 md:px-16 pb-12 md:pb-16">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-black mb-8">
          How to Scan with SenseOriginal
        </h2>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[1400px] mx-auto">
          {videos.map((video) => (
            <div
              key={video.id}
              className="
    relative bg-black rounded-2xl overflow-hidden shadow-2xl 
    hover:shadow-3xl transition-all duration-300 hover:scale-105 
    group w-full max-w-[480px] mx-auto
    aspect-[9/14]       /* mobile shorter */
    sm:aspect-[9/13]    /* tablet */
    lg:aspect-[9/12]    /* laptop/desktop shorter */
  "
            >
              {activeVideo === video.id ? (
                <iframe
                  src={`${video.url}?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              ) : (
                <>
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    width={480}
                    height={854}
                    className="w-full h-full object-cover"
                  />

                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors">
                    <button
                      onClick={() => handlePlayVideo(video.id)}
                      className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-2xl"
                    >
                      <Play size={32} className="text-black ml-1" />
                    </button>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <p className="text-white text-sm font-medium">{video.title}</p>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReelsSection;
