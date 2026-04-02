import React, { useState } from "react";
import { FaInstagram, FaFacebookF, FaLinkedin } from "react-icons/fa";
import Image from "next/image";
import BrandLogo from "../public/images/herologo.png";
import { FaXTwitter } from "react-icons/fa6";

import Client1 from "../public/images/iim.png";
import Client2 from "../public/images/apiary.png";
import Client3 from "../public/images/icreate.png";
import Client4 from "../public/images/techentry.webp";
import Client5 from "../public/images/msme.webp";

const Footer = ({ onOpenContactForm }) => {
  const [email, setEmail] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async () => {
    if (!email) return;

    try {
      await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });

      setIsModalOpen(true);
      setEmail("");
    } catch (err) {
      console.error("Error submitting email:", err);
    }
  };

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#101828] text-gray-300 py-16 px-6 md:px-16 relative">
      {/* -------- TOP HEADING WITH LOGOS -------- */}
      <div className="max-w-8xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left Heading */}
        <div className="text-center md:text-left">
          <p className="text-blue-400 text-sm mb-2">
            Be Originals, Buy Original Verify by Sense Original
          </p>

          <h2 className="text-4xl md:text-5xl font-semibold text-white flex items-center gap-2 justify-center md:justify-start">
            Connect with us <span className="text-2xl">↗</span>
          </h2>
        </div>

        {/* ---- FIXED RESPONSIVE CLIENT LOGO SECTION ---- */}
      <div className="
  w-full lg:w-auto bg-white rounded-xl px-4 py-4 lg:px-10 lg:py-6 
  flex flex-wrap lg:flex-nowrap items-center justify-center 
  gap-6 lg:gap-12 shadow-lg
">
  <Image src={Client1} alt="Client" width={160} height={50} className="w-24 sm:w-28 md:w-32 lg:w-40 max-w-full object-contain" />
  <Image src={Client2} alt="Client" width={200} height={60} className="w-28 sm:w-32 md:w-40 lg:w-52 max-w-full object-contain" />
  <Image src={Client3} alt="Client" width={160} height={50} className="w-24 sm:w-28 md:w-32 lg:w-30 max-w-full object-contain" />
  <Image src={Client4} alt="Client" width={160} height={50} className="w-24 sm:w-28 md:w-32 lg:w-40 max-w-full object-contain" />
  <Image src={Client5} alt="Client" width={160} height={50} className="w-24 sm:w-28 md:w-32 lg:w-30 max-w-full object-contain" />
</div>


      </div>

      {/* ---------- REST OF FOOTER ---------- */}
      <div className="border-t border-gray-700 mt-12 pt-10 flex flex-col md:flex-row md:justify-between gap-10">
        
        {/* Left Logo */}
        <div className="flex flex-col items-start">
          <Image
            src={BrandLogo}
            alt="Sense Original Logo"
            width={160}
            height={40}
            className="w-40 mb-4 cursor-pointer"
            onClick={handleScrollTop}
          />
        </div>

        {/* Product */}
        <div className="flex flex-col gap-2">
          <h4 className="text-lg font-medium text-gray-300 mb-2">Product</h4>
          <a href="#" onClick={handleScrollTop} className="hover:text-white transition">
            Home
          </a>
          <a href="#" className="hover:text-white transition">
            About Us
          </a>
          <a href="#latest-news-section" className="hover:text-white transition cursor-pointer">
            Blog
          </a>
        </div>

        {/* Company */}
        <div className="flex flex-col gap-2">
          <h4 className="text-lg font-medium text-gray-300 mb-2">Company</h4>
          <a href="#" className="hover:text-white transition">
            About
          </a>
          <a href="#" onClick={onOpenContactForm} className="hover:text-white transition cursor-pointer">
            Contact
          </a>
          <a href="#" className="hover:text-white transition">
            Privacy Policy
          </a>
        </div>

        {/* Contact */}
        <div className="flex flex-col gap-2">
          <h4 className="text-lg font-medium text-gray-300 mb-2">Contact us</h4>
          <p className="text-sm">admin@senseoriginal.com</p>
          <a href="tel:+919876543210" className="text-sm hover:text-white transition cursor-pointer">
            +91 98383 43222
          </a>
          <a href="tel:+919123456789" className="text-sm hover:text-white transition cursor-pointer">
            +91 98673 33283
          </a>
          <p className="text-sm w-60">
            Start-up and Incubation Cell, Pranveer Singh Institute of Technology, Kanpur
          </p>
        </div>

        {/* Stay in Touch */}
        <div className="flex flex-col gap-3 w-full md:w-64">
          <h4 className="text-lg font-medium text-gray-300 mb-2">Stay in Touch</h4>

          <input
            type="email"
            placeholder="Enter your Email"
            className="w-full bg-transparent border-b border-gray-500 text-gray-300 py-2 focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          />

          <div className="flex items-center gap-4 mt-3 text-white text-xl">
            <a href="https://www.instagram.com/sense_original/?hl=en"><FaInstagram className="hover:text-pink-400" /></a>
            <a href="https://x.com/Senseoriginal_"><FaXTwitter className="hover:text-gray-400" /></a>
            <a href="https://www.facebook.com/people/Sense-Original/61552099147568/"><FaLinkedin className="hover:text-blue-700" /></a>
            <a href="https://www.linkedin.com/company/senseoriginal-technologies-pvt-ltd/"><FaFacebookF className="hover:text-blue-500" /></a>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <div className="bg-white text-center rounded-xl shadow-lg p-8 w-[90%] md:w-[400px]">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Success!</h3>
            <p className="text-gray-600 mb-6">
              Your email has been successfully submitted.
            </p>
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
