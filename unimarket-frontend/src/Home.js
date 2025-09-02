import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Phone, Instagram, MessageCircle } from "lucide-react";

const businesses = [
  {
    name: "D-Kampung Coffee",
    poster: "dkampung.jpg",
    description: "Freshly brewed coffee and snacks to keep you energized.",
    contact: {
      phone: "+60136592285",
      whatsapp: "https://wa.me/60136592285",
      instagram: "https://instagram.com/de_kampung_coffee",
    },
  },
  {
    name: "Maximus Fashion Wear",
    poster: "maximus.jpg",
    description: "Wear your confidence, Live your style",
    contact: {
      phone: "+60 19-337 1740",
      whatsapp: "https://wa.me/60193371740",
      instagram: "https://instagram.com/maximus_fashion_wear",
    },
  },
  {
    name: "AIU Tailoring Shop",
    poster: "aiutailoring.jpg",
    description: "Expert tailoring for students and staff at affordable prices.",
    contact: {
      phone: "+601128667635",
      whatsapp: "https://wa.me/601128667635",
      instagram: "https://instagram.com/aiutailoringshop",
    },
  },
  // Add more businesses with poster, description, contact
];

export default function Home() {
  const [selected, setSelected] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto rotate slideshow
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % businesses.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Booking function
  const handleAppointmentBooking = async (business, type) => {
    const appointment = {
      name: "John Doe", // replace with actual user input later
      date: "2025-07-29", // replace with actual date later
      business,
      type,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/appointment",
        appointment
      );
      alert(response.data.message);
    } catch (error) {
      console.error("Error booking appointment:", error);
    }
  };

  // Email counsellor
  const emailCounsellor = () => {
    const counsellorEmail = "fazlia.azhari@aiu.edu.my";
    const subject = encodeURIComponent("Appointment Request with Counsellor");
    const body = encodeURIComponent(
      `Dear Counsellor,\n\nI would like to request an appointment.\n\nThank you.`
    );
    window.location.href = `mailto:${counsellorEmail}?subject=${subject}&body=${body}`;
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

      {/* Promo Video */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="mx-4 mb-8 rounded-xl overflow-hidden shadow-xl"
      >
        <video 
          className="w-full h-auto"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={"unimarket-promo.mp4"} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </motion.div>

      {/* Slideshow */}
      <div className="relative w-full max-w-4xl mx-auto mb-8">
        <motion.img
          key={currentSlide}
          src={businesses[currentSlide].poster}
          alt={businesses[currentSlide].name}
          className="w-full h-[600px] object-cover rounded-xl shadow-xl cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          onClick={() => setSelected(businesses[currentSlide])}
        />
        {/* Prev */}
        <button
          onClick={() =>
            setCurrentSlide(
              (prev) => (prev - 1 + businesses.length) % businesses.length
            )
          }
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full"
        >
          ‹
        </button>
        {/* Next */}
        <button
          onClick={() =>
            setCurrentSlide((prev) => (prev + 1) % businesses.length)
          }
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full"
        >
          ›
        </button>
        {/* Dots */}
        <div className="flex justify-center gap-2 mt-2">
          {businesses.map((_, idx) => (
            <button
              key={idx}
              className={`w-3 h-3 rounded-full ${
                idx === currentSlide ? "bg-[#003366]" : "bg-gray-300"
              }`}
              onClick={() => setCurrentSlide(idx)}
            ></button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 mb-8"
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.1 } },
        }}
      >
        {businesses.map((biz) => (
          <motion.div
            key={biz.name}
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 8px #005EB8" }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div
              className="cursor-pointer p-4 bg-white shadow-lg rounded-lg text-center"
              onClick={() => setSelected(biz)}
            >
              <h3 className="text-lg font-semibold text-[#003366]">
                {biz.name}
              </h3>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full relative">
            <button
              onClick={() => setSelected(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <img
              src={selected.poster}
              alt={selected.name}
              className="w-full h-[600px] object-cover rounded-lg mb-4"
            />
            <h2 className="text-2xl font-bold text-[#003366] mb-2">
              {selected.name}
            </h2>
            <p className="text-gray-700 mb-4">{selected.description}</p>
            <div className="flex gap-4 mb-4">
              <a href={`tel:${selected.contact.phone}`} target="_blank" rel="noreferrer">
                <Phone className="text-blue-600 w-6 h-6" />
              </a>
              <a href={selected.contact.whatsapp} target="_blank" rel="noreferrer">
                <MessageCircle className="text-green-500 w-6 h-6" />
              </a>
              <a href={selected.contact.instagram} target="_blank" rel="noreferrer">
                <Instagram className="text-pink-500 w-6 h-6" />
              </a>
            </div>
            <button
              onClick={() => handleAppointmentBooking(selected.name, "seller")}
              className="bg-[#005EB8] text-white px-4 py-2 rounded shadow hover:bg-[#003366] w-full"
            >
              Book with Seller
            </button>
          </div>
        </div>
      )}

      {/* Email Counsellor */}
      <div className="flex justify-center gap-4 mb-8 px-4">
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
