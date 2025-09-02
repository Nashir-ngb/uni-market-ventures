import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { X } from "lucide-react";

const businesses = [
  {
    name: 'D-Kampung Coffee',
    poster: '/posters/dkampung.jpg',
    description: 'A cozy coffee shop serving the best local brews and snacks.',
    contact: 'coffee@dkampung.com | +60 123 456 789'
  },
  {
    name: 'AIU Tailoring Shop',
    poster: '/posters/tailor.jpg',
    description: 'Expert tailoring and alterations for all your clothing needs.',
    contact: 'tailor@aiu.com | +60 987 654 321'
  },
  {
    name: 'Maximus Fashion Wear',
    poster: '/posters/maximus.jpg',
    description: 'Trendy fashion for students at affordable prices.',
    contact: 'maximus@fashion.com | IG: @maximuswear'
  }
  // Add more businesses with poster, description, and contact
];

export default function Home() {
  const [selected, setSelected] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % businesses.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleSellerBooking = async () => {
    if (!selected) return;

    const appointment = {
      name: 'John Doe',
      date: '2025-07-29',
      business: selected.name,
      type: 'seller'
    };

    try {
      const response = await axios.post("http://localhost:5000/api/appointment", appointment);
      alert(response.data.message);
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("Failed to book appointment. Please try again.");
    }
  };

  const emailCounsellor = () => {
    const counsellorEmail = "fazlia.azhari@aiu.edu.my";
    const subject = encodeURIComponent("Appointment Request with Counsellor");
    const body = encodeURIComponent(
      "Dear Counsellor,\n\nI would like to request an appointment.\n\nThank you."
    );
    window.location.href = `mailto:${counsellorEmail}?subject=${subject}&body=${body}`;
  };

  const openModal = (biz) => {
    setSelected(biz);
    setIsModalOpen(true);
    setCurrentSlide(businesses.findIndex((b) => b.name === biz.name));
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#66B3FF] to-[#F7A9A8]">
      <motion.h1
        className="text-3xl md:text-5xl font-bold text-center mt-8 mb-4 text-[#003366]"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Welcome to UniMarket Ventures
      </motion.h1>

      <p className="text-center text-lg mb-6 text-[#002F6C]">
        Explore, connect and trade with the campus community!
      </p>

      {/* Slideshow */}
      <div className="relative w-full max-w-4xl mx-auto mb-8">
        <div className="overflow-hidden rounded-2xl shadow-xl">
          {businesses.map((biz, index) => (
            <motion.div
              key={biz.name}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
              onClick={() => openModal(biz)}
            >
              <img
                src={biz.poster}
                alt={biz.name}
                className={`w-full h-80 object-cover cursor-pointer ${selected?.name === biz.name ? 'ring-4 ring-yellow-400' : ''}`}
              />
              {selected?.name === biz.name && (
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                  <h2 className="text-white text-2xl font-bold">{biz.name}</h2>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Arrows */}
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + businesses.length) % businesses.length)}
          className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/70 p-2 rounded-full shadow hover:bg-white"
        >
          ◀
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % businesses.length)}
          className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/70 p-2 rounded-full shadow hover:bg-white"
        >
          ▶
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 w-full flex justify-center space-x-2">
          {businesses.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-3 h-3 rounded-full ${idx === currentSlide ? 'bg-white' : 'bg-gray-400'}`}
            />
          ))}
        </div>
      </div>

      {/* Grid Listing */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 mb-8"
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.1 } }
        }}
      >
        {businesses.map((biz) => (
          <motion.div
            key={biz.name}
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 8px #005EB8" }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div
              className={`cursor-pointer p-4 bg-white shadow-lg rounded-lg text-center ${selected?.name === biz.name ? 'ring-4 ring-[#005EB8]' : ''}`}
              onClick={() => openModal(biz)}
            >
              <img src={biz.poster} alt={biz.name} className="w-full h-40 object-cover rounded mb-2" />
              <h3 className="text-lg font-semibold text-[#003366]">{biz.name}</h3>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Modal */}
      {isModalOpen && selected && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full relative p-6">
            <button onClick={closeModal} className="absolute top-3 right-3 text-gray-500 hover:text-black">
              <X size={24} />
            </button>
            <img src={selected.poster} alt={selected.name} className="w-full h-64 object-cover rounded-lg mb-4" />
            <h2 className="text-2xl font-bold text-[#003366] mb-2">{selected.name}</h2>
            <p className="text-gray-700 mb-4">{selected.description}</p>
            <p className="text-sm text-gray-600 mb-6"><strong>Contact:</strong> {selected.contact}</p>
            <button
              onClick={handleSellerBooking}
              className="bg-[#005EB8] text-white px-4 py-2 rounded shadow hover:bg-[#003366]"
            >
              Book with Seller
            </button>
          </div>
        </div>
      )}

      {/* Email Counsellor */}
      <div className="flex justify-center mb-8 px-4">
        <button
          onClick={emailCounsellor}
          className="bg-[#FFB6C1] text-[#003366] px-4 py-2 rounded shadow hover:bg-pink-300"
        >
          Email Counsellor
        </button>
      </div>
    </div>
  );
}
