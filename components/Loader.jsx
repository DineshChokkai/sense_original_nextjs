import React, { useEffect } from 'react';
import Image from 'next/image';
import imageSrc from '../assets/ai_small_logo.png';
const Loader = ({
  size = 'w-20 h-20',
  borderWidth = 'border-[6px]',
  speed = 'animate-spin',
  imageSize = 'w-8 h-8',
}) => {
  const animationId = React.useId().replace(/:/g, '');

  const keyframes = `
    @keyframes rotation${animationId} {
      70% {
        box-shadow: 0px 0px 10px 50px rgba(91, 137, 244, 0.4);
      }
      90% {
        box-shadow: 0px 0px 10px 50px rgba(91, 137, 244, 0.08);
      }
      100% {
        opacity: 0.5;
        transform: rotate(360deg);
      }
    }
  `;

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = keyframes;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, [keyframes]);

  const animationStyle = {
    animation: `rotation${animationId} 1.2s infinite cubic-bezier(0.785, 0.135, 0.15, 0.86)`,
    backgroundImage: 'linear-gradient(107.8deg, #74A0FF 3.37%, #3E6DEE 95.93%)',
    backgroundClip: 'border-box',
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#5b89f4]/20 border border-[#5b89f4]/20 flex items-center justify-center">
      <div className="relative">
        {/* Spinning Ring */}
        <div
          className={`${size} ${borderWidth} rounded-full border-solid`}
          style={{
            ...animationStyle,
            border: '5px solid transparent',
          }}
        />

        {/* Centered Image */}
        <Image
          src={imageSrc}
          alt="Loader Center"
          width={48}
          height={48}
          className={` w-12 h-12 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${imageSize}`}
        />
      </div>
    </div>
  );
};

export default Loader;
