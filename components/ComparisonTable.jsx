import { Check, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function ComparisonTable() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef(null);

  const features = [
    {
      name: 'Clone-Proof',
      qrCode: false,
      barcode: false,
      hologram: false,
      senseOriginal: true,
    },
    {
      name: 'Tamper-Proof',
      qrCode: false,
      barcode: false,
      hologram: true,
      senseOriginal: true,
    },
    {
      name: 'Real-Time Verification',
      qrCode: false,
      barcode: false,
      hologram: false,
      senseOriginal: true,
    },
    {
      name: 'Data Analytics',
      qrCode: false,
      barcode: false,
      hologram: false,
      senseOriginal: true,
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const sectionTop = rect.top;
        const windowHeight = window.innerHeight;

        if (sectionTop < windowHeight && sectionTop > -rect.height) {
          const progress = (windowHeight - sectionTop) / (windowHeight + rect.height);
          setScrollY(progress);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      ref={sectionRef}
      className="w-full bg-[#E6E9EE] py-12 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header Section with Parallax */}
        <div
          className={`text-center mb-8 lg:mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
          }`}
          data-parallax="0.3"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-semibold text-[#101828] mb-3 leading-tight lg:leading-[40px] px-2">
            Barcodes Can Be Copied. We Can&apos;t.
          </h2>
          <p className="text-sm sm:text-base text-[#364153] leading-6 tracking-[-0.31px] px-4">
            Traditional authentication methods are vulnerable. See how SenseOriginal stands apart.
          </p>
        </div>

        {/* Comparison Table with enhanced parallax */}
        <div
          className={`bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
          style={{
            transform: `translateY(${isVisible ? scrollY * 20 - 10 : 0}px)`,
            filter: `brightness(${0.95 + scrollY * 0.1})`,
          }}
          data-parallax="0.5"
        >
          {/* Desktop Table */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#F9FAFB] border-b border-[#E5E7EB]">
                  <th className="text-left py-6 px-6 text-sm text-[#4A5565] font-normal leading-5 tracking-[-0.15px]">
                    Feature
                  </th>
                  <th className="text-center py-6 px-4 text-sm text-[#364153] font-normal leading-5 tracking-[-0.15px]">
                    QR Code
                  </th>
                  <th className="text-center py-6 px-4 text-sm text-[#364153] font-normal leading-5 tracking-[-0.15px]">
                    Barcode
                  </th>
                  <th className="text-center py-6 px-4 text-sm text-[#364153] font-normal leading-5 tracking-[-0.15px]">
                    Hologram
                  </th>
                  <th className="text-center py-6 px-4">
                    <div
                      className="inline-flex items-center justify-center bg-gradient-to-b from-[#3E4046] to-[#131314] text-white px-6 py-3 rounded-[36px] border border-[#333333] text-sm font-semibold leading-5 tracking-[-0.15px] transition-transform duration-300 hover:scale-105"
                      style={{ boxShadow: 'inset 0px 2px 4px 0px rgba(255, 255, 255, 0.1)' }}
                    >
                      SenseOriginal NFC
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {features.map((feature, index) => (
                  <tr
                    key={index}
                    className={`border-b border-[#F3F4F6] last:border-b-0 hover:bg-gray-50 transition-all duration-500 ${
                      isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                    }`}
                    style={{
                      transitionDelay: `${(index + 1) * 150}ms`,
                    }}
                  >
                    <td className="py-6 px-6 text-base text-[#101828] leading-6 tracking-[-0.31px] font-medium">
                      {feature.name}
                    </td>
                    <td className="py-6 px-4 text-center">
                      {feature.qrCode ? (
                        <div className="flex justify-center transform hover:scale-125 transition-transform duration-300">
                          <Check className="w-6 h-6 text-green-500" strokeWidth={2.5} />
                        </div>
                      ) : (
                        <div className="flex justify-center transform hover:scale-125 transition-transform duration-300">
                          <X className="w-6 h-6 text-red-500" strokeWidth={2.5} />
                        </div>
                      )}
                    </td>
                    <td className="py-6 px-4 text-center">
                      {feature.barcode ? (
                        <div className="flex justify-center transform hover:scale-125 transition-transform duration-300">
                          <Check className="w-6 h-6 text-green-500" strokeWidth={2.5} />
                        </div>
                      ) : (
                        <div className="flex justify-center transform hover:scale-125 transition-transform duration-300">
                          <X className="w-6 h-6 text-red-500" strokeWidth={2.5} />
                        </div>
                      )}
                    </td>
                    <td className="py-6 px-4 text-center">
                      {feature.hologram ? (
                        <div className="flex justify-center transform hover:scale-125 transition-transform duration-300">
                          <Check className="w-6 h-6 text-green-500" strokeWidth={2.5} />
                        </div>
                      ) : (
                        <div className="flex justify-center transform hover:scale-125 transition-transform duration-300">
                          <X className="w-6 h-6 text-red-500" strokeWidth={2.5} />
                        </div>
                      )}
                    </td>
                    <td className="py-6 px-4 text-center">
                      {feature.senseOriginal ? (
                        <div className="flex justify-center transform hover:scale-125 transition-transform duration-300">
                          <Check className="w-6 h-6 text-green-500" strokeWidth={2.5} />
                        </div>
                      ) : (
                        <div className="flex justify-center transform hover:scale-125 transition-transform duration-300">
                          <X className="w-6 h-6 text-red-500" strokeWidth={2.5} />
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Tablet View (md to lg) */}
          <div className="hidden md:block lg:hidden overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="bg-[#F9FAFB] border-b border-[#E5E7EB]">
                  <th className="text-left py-5 px-4 text-xs text-[#4A5565] font-normal leading-5">
                    Feature
                  </th>
                  <th className="text-center py-5 px-3 text-xs text-[#364153] font-normal leading-5">
                    QR Code
                  </th>
                  <th className="text-center py-5 px-3 text-xs text-[#364153] font-normal leading-5">
                    Barcode
                  </th>
                  <th className="text-center py-5 px-3 text-xs text-[#364153] font-normal leading-5">
                    Hologram
                  </th>
                  <th className="text-center py-5 px-3">
                    <div
                      className="inline-flex items-center justify-center bg-gradient-to-b from-[#3E4046] to-[#131314] text-white px-4 py-2 rounded-[36px] border border-[#333333] text-xs font-semibold"
                      style={{ boxShadow: 'inset 0px 2px 4px 0px rgba(255, 255, 255, 0.1)' }}
                    >
                      SenseOriginal NFC
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {features.map((feature, index) => (
                  <tr
                    key={index}
                    className={`border-b border-[#F3F4F6] last:border-b-0 transition-all duration-500 ${
                      isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                    }`}
                    style={{
                      transitionDelay: `${(index + 1) * 150}ms`,
                    }}
                  >
                    <td className="py-4 px-4 text-sm text-[#101828] leading-6 font-medium">
                      {feature.name}
                    </td>
                    <td className="py-4 px-3 text-center">
                      {feature.qrCode ? (
                        <Check className="w-5 h-5 text-green-500 mx-auto" strokeWidth={2.5} />
                      ) : (
                        <X className="w-5 h-5 text-red-500 mx-auto" strokeWidth={2.5} />
                      )}
                    </td>
                    <td className="py-4 px-3 text-center">
                      {feature.barcode ? (
                        <Check className="w-5 h-5 text-green-500 mx-auto" strokeWidth={2.5} />
                      ) : (
                        <X className="w-5 h-5 text-red-500 mx-auto" strokeWidth={2.5} />
                      )}
                    </td>
                    <td className="py-4 px-3 text-center">
                      {feature.hologram ? (
                        <Check className="w-5 h-5 text-green-500 mx-auto" strokeWidth={2.5} />
                      ) : (
                        <X className="w-5 h-5 text-red-500 mx-auto" strokeWidth={2.5} />
                      )}
                    </td>
                    <td className="py-4 px-3 text-center">
                      {feature.senseOriginal ? (
                        <Check className="w-5 h-5 text-green-500 mx-auto" strokeWidth={2.5} />
                      ) : (
                        <X className="w-5 h-5 text-red-500 mx-auto" strokeWidth={2.5} />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile View - Card Style */}
          <div className="md:hidden">
            {/* SenseOriginal Badge */}
            <div className="bg-[#F9FAFB] border-b border-[#E5E7EB] p-4 text-center">
              <div
                className="inline-flex items-center justify-center bg-gradient-to-b from-[#3E4046] to-[#131314] text-white px-5 py-2.5 rounded-[36px] border border-[#333333] text-xs font-semibold mb-3"
                style={{ boxShadow: 'inset 0px 2px 4px 0px rgba(255, 255, 255, 0.1)' }}
              >
                SenseOriginal NFC
              </div>
            </div>

            {/* Features List */}
            <div className="divide-y divide-[#F3F4F6]">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`p-4 transition-all duration-500 ${
                    isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                  }`}
                  style={{
                    transitionDelay: `${(index + 1) * 150}ms`,
                  }}
                >
                  <div className="text-sm text-[#101828] font-semibold mb-4">{feature.name}</div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg">
                      <span className="text-xs text-[#364153]">QR Code</span>
                      {feature.qrCode ? (
                        <Check className="w-5 h-5 text-green-500" strokeWidth={2.5} />
                      ) : (
                        <X className="w-5 h-5 text-red-500" strokeWidth={2.5} />
                      )}
                    </div>

                    <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg">
                      <span className="text-xs text-[#364153]">Barcode</span>
                      {feature.barcode ? (
                        <Check className="w-5 h-5 text-green-500" strokeWidth={2.5} />
                      ) : (
                        <X className="w-5 h-5 text-red-500" strokeWidth={2.5} />
                      )}
                    </div>

                    <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg">
                      <span className="text-xs text-[#364153]">Hologram</span>
                      {feature.hologram ? (
                        <Check className="w-5 h-5 text-green-500" strokeWidth={2.5} />
                      ) : (
                        <X className="w-5 h-5 text-red-500" strokeWidth={2.5} />
                      )}
                    </div>

                    <div className="flex items-center justify-between py-2 px-3 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200">
                      <span className="text-xs text-[#101828] font-medium">SenseOriginal NFC</span>
                      {feature.senseOriginal ? (
                        <Check className="w-5 h-5 text-green-600" strokeWidth={2.5} />
                      ) : (
                        <X className="w-5 h-5 text-red-500" strokeWidth={2.5} />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
