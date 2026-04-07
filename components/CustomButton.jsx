import React from 'react';
import Image from 'next/image';

const Button = ({
  variant = 'primary',
  children,
  icon,
  showIcon = false,
  customStyles = '',
  onClick,
  disabled = false,
  shine = false,
  ...props
}) => {
  // Base styles
  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-all duration-200 cursor-pointer relative overflow-hidden active:scale-95';

  // Variant styles
  const variantStyles = {
    primary:
      'bg-linear-blue text-white py-[10px] px-4 rounded-[10px] hover:bg-linear-blue-hover active:bg-linear-blue-active',
    secondary:
      'bg-white text-linear-blue border border-linear-blue py-[10px] px-4 rounded-[10px] hover:bg-gray-50',
  };

  // Shine effect styles
  const shineStyles = shine ? 'group' : '';

  return (
    <>
      <style>{`
        .bg-linear-blue {
          background-image: linear-gradient(107.8deg, #74A0FF 3.37%, #3E6DEE 95.93%);
        }
        
        .bg-linear-blue-hover:hover {
          background-image: linear-gradient(107.8deg, #8BB4FF 3.37%, #5983FF 95.93%);
        }
        
        .bg-linear-blue-active:active {
          background-image: linear-gradient(107.8deg, #5A87FF 3.37%, #2A5AE8 95.93%);
        }

        @keyframes shine-sweep {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .shine-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.4),
            transparent
          );
          transform: translateX(-100%);
          transition: transform 0.6s ease;
        }

        .shine-overlay-secondary {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(116, 160, 255, 0.6),
            transparent
          );
          transform: translateX(-100%);
          transition: transform 0.6s ease;
        }
        
        .group:hover .shine-overlay {
          animation: shine-sweep 0.6s ease;
        }

        .group:hover .shine-overlay-secondary {
          animation: shine-sweep 0.6s ease;
        }
      `}</style>

      <button
        className={`${baseStyles} ${variantStyles[variant]} ${shineStyles} ${customStyles}`}
        onClick={onClick}
        disabled={disabled}
        {...props}
      >
        {shine && (
          <div className={variant === 'secondary' ? 'shine-overlay-secondary' : 'shine-overlay'} />
        )}

        <span className="relative z-10 flex justify-center items-center">
          {showIcon && icon && (
            <Image src={icon} alt="" width={16} height={16} className="w-4 h-4 mr-2" />
          )}
          {children}
        </span>
      </button>
    </>
  );
};

export default Button;
