import { useEffect, useRef, useState } from 'react';

/**
 * ParallaxSection - A reusable wrapper component that adds parallax effects to any section
 * Features:
 * - Scroll-triggered animations
 * - Content parallax (different speeds for different elements)
 * - Fade-in/scale animations
 */
export const ParallaxSection = ({
  children,
  className = '',
  parallaxIntensity = 0.5,
  enableFade = true,
  enableScale = true,
  enableSlide = true,
}) => {
  const sectionRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const section = sectionRef.current;
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      let progress = 0;

      // Calculate smooth progress from 0 to 1
      if (rect.top > windowHeight) {
        progress = 0;
      } else if (rect.bottom < 0) {
        progress = 1;
      } else {
        // Smooth transition as element moves through viewport
        progress = (windowHeight - rect.top) / (windowHeight + rect.height);
        progress = Math.max(0, Math.min(1, progress));
      }

      setScrollProgress(progress);

      // Apply parallax transform to direct child elements with data-parallax attribute
      const parallaxElements = section.querySelectorAll('[data-parallax]');
      parallaxElements.forEach((element) => {
        const speed = parseFloat(element.getAttribute('data-parallax')) || parallaxIntensity;
        const offset = (1 - progress) * speed * 50;
        element.style.transform = `translateY(${offset}px)`;
        element.style.willChange = 'transform';
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    return () => window.removeEventListener('scroll', handleScroll);
  }, [parallaxIntensity]);

  // Calculate combined transforms
  const getTransforms = () => {
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
    const easedProgress = easeOutCubic(scrollProgress);

    let transforms = [];

    if (enableFade) {
      transforms.push(`opacity: ${Math.min(1, easedProgress * 1.5)}`);
    }

    if (enableScale) {
      const scale = 0.95 + easedProgress * 0.05;
      transforms.push(`scale: ${scale}`);
    }

    if (enableSlide) {
      const slideDistance = (1 - easedProgress) * 30;
      transforms.push(`translateY: ${slideDistance}px`);
    }

    return {
      opacity: enableFade ? Math.min(1, easedProgress * 1.5) : 1,
      transform: `
        scale(${enableScale ? 0.95 + easedProgress * 0.05 : 1})
        translateY(${enableSlide ? (1 - easedProgress) * 30 : 0}px)
      `,
    };
  };

  const styles = getTransforms();

  return (
    <div
      ref={sectionRef}
      className={className}
      style={{
        opacity: styles.opacity,
        transform: styles.transform,
        transition: 'none',
      }}
    >
      {children}
    </div>
  );
};

export default ParallaxSection;
