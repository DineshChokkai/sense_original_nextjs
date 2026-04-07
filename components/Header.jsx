import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import Image from 'next/image';

const Header = forwardRef((props, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [showContactForm, setShowContactForm] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
    agree: false,
  });

  const toggleMenu = () => setIsOpen(!isOpen);

  const toggleContactForm = () => {
    setShowContactForm(!showContactForm);
    setIsOpen(false);
  };

  // Expose method to parent components
  useImperativeHandle(ref, () => ({
    openContactForm: () => {
      setShowContactForm(true);
      setIsOpen(false);
    },
  }));

  const scrollToSection = (sectionId) => {
    console.log('Scrolling to:', sectionId); // Debug log
    setIsOpen(false); // Close mobile menu first

    setTimeout(() => {
      const section = document.getElementById(sectionId);
      console.log('Found section:', section); // Debug log

      if (section) {
        const headerOffset = 120;
        const elementPosition = section.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        console.log('Scrolling to position:', offsetPosition); // Debug log

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      } else {
        console.error('Section not found with ID:', sectionId);
      }
    }, 100); // Small delay to ensure menu closes
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    if (showContactForm) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showContactForm]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!formData.firstName.trim()) {
      alert('Please enter your first name');
      return;
    }
    if (!formData.lastName.trim()) {
      alert('Please enter your last name');
      return;
    }
    if (!formData.email.trim()) {
      alert('Please enter your email');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      alert('Please enter a valid email address');
      return;
    }
    if (!formData.phone.trim()) {
      alert('Please enter your phone number');
      return;
    }
    if (!formData.message.trim()) {
      alert('Please enter a message');
      return;
    }
    if (!formData.agree) {
      alert('Please agree to be contacted');
      return;
    }

    console.log('Form submitted:', formData);
    alert('Thank you! Your message has been submitted successfully.');
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      message: '',
      agree: false,
    });
    setShowContactForm(false);
  };
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header>
        {/* Main Header Bar */}
        <div
          className={`bg-[#E6E9EE] mx-auto w-[calc(100%-44px)] rounded-[25px] border border-white shadow-md fixed top-1 left-0 right-0 z-50 transition-transform duration-300 ${
            showHeader ? 'translate-y-0' : '-translate-y-full'
          }`}
        >
          <div className="max-w-8xl mx-auto flex items-center justify-between px-4 py-3 md:py-4">
            {/* Logo */}
            <div className="flex items-center gap-2" onClick={handleScrollTop}>
              <Image
                src="/images/brandlogo.png"
                alt="Logo"
                width={32}
                height={32}
                className="h-8 w-auto object-contain cursor-pointer"
              />
            </div>

            {/* Desktop Menu */}
            <nav className="hidden md:flex items-center gap-8 text-gray-800 font-medium">
              <a href="#" className="hover:text-black transition-colors">
                Home
              </a>
              <a href="#" className="hover:text-black transition-colors">
                About Us
              </a>
              <button
                onClick={() => scrollToSection('latest-news-section')}
                className="hover:text-black transition-colors"
              >
                Blog
              </button>
            </nav>

            {/* Contact Button */}
            <div className="hidden md:block">
              <button
                onClick={toggleContactForm}
                className="bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition-all"
              >
                Contact Us
              </button>
            </div>

            {/* Hamburger Icon */}
            <button onClick={toggleMenu} className="text-2xl text-gray-700 md:hidden">
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`fixed z-40 top-0 right-0 h-full w-3/4 bg-[#E6E9EE] flex flex-col gap-6 p-6 shadow-2xl transform transition-all duration-500 ease-in-out ${
            isOpen
              ? 'translate-x-0 translate-y-0 opacity-100 rotate-0'
              : 'translate-x-full -translate-y-10 opacity-0 rotate-3'
          }`}
          style={{
            transformOrigin: 'top right',
          }}
        >
          <div className="flex justify-between items-center mb-4">
            <Image
              src="/images/herologo.png"
              alt="Logo"
              width={32}
              height={32}
              className="h-8 w-auto object-contain"
            />
            <button onClick={toggleMenu} className="text-2xl text-gray-600">
              <FaTimes />
            </button>
          </div>

          <nav className="flex flex-col gap-4">
            <a
              href="#"
              onClick={toggleMenu}
              className="text-lg text-gray-800 hover:text-black transition-colors"
            >
              Home
            </a>
            <a
              href="#"
              onClick={toggleMenu}
              className="text-lg text-gray-800 hover:text-black transition-colors"
            >
              About Us
            </a>
            <button
              onClick={() => scrollToSection('latest-news-section')}
              className="text-lg text-gray-800 hover:text-black transition-colors text-left"
            >
              Blog
            </button>
          </nav>

          <button
            onClick={toggleContactForm}
            className="mt-8 bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition-all"
          >
            Contact Us
          </button>
        </div>
      </header>

      {/* Contact Form Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] transition-opacity duration-500 ${
          showContactForm ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleContactForm}
      />

      {/* Contact Form Slide */}
      <div
        className={`fixed top-0 right-0 h-full w-full md:w-[900px] lg:w-[1100px] bg-white z-[70] shadow-2xl transform transition-all duration-700 ease-in-out ${
          showContactForm ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <button
          onClick={toggleContactForm}
          className="absolute top-6 right-6 text-3xl text-gray-600 hover:text-black transition-colors z-10"
        >
          <FaTimes />
        </button>

        <div className="h-full overflow-y-auto">
          <div className="max-w-6xl mx-auto px-6 md:px-12 py-12">
            <div className="flex flex-col items-center justify-center max-w-2xl mx-auto">
              {/* Logo */}
              <div className="mb-8">
                <Image
                  src="/images/brandlogo.png"
                  alt="Logo"
                  width={150}
                  height={40}
                  className="w-auto object-contain"
                />
              </div>

              {/* Form */}
              <div className="w-full">
                <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                  Send us a message
                </h2>
                <p className="text-gray-600 mb-8">
                  Our sales team always active to support you. Any kind of questions about our
                  product they can answer to you.
                </p>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/20 transition-all"
                    />
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/20 transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="email"
                      name="email"
                      placeholder="E-mail"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/20 transition-all"
                    />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/20 transition-all"
                    />
                  </div>

                  <textarea
                    name="message"
                    placeholder="Your Text"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/20 transition-all resize-none"
                  />

                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      name="agree"
                      id="agree"
                      checked={formData.agree}
                      onChange={handleInputChange}
                      className="mt-1 w-4 h-4 border-gray-300 rounded focus:ring-2 focus:ring-black/20"
                    />
                    <label htmlFor="agree" className="text-sm text-gray-600">
                      I agree that Sense Original may contact me at the email address or phone
                      number above.
                    </label>
                  </div>

                  <button
                    onClick={handleSubmit}
                    className="w-full bg-[#F4E85E] text-black font-medium px-6 py-3 rounded-lg hover:bg-[#e5d94d] transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

Header.displayName = 'Header';

export default Header;
