import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const businesses = [
  'D-Kampung Coffee', 'AIU Tailoring Shop', 'Maximus Fashion Wear', 'Bundle Fashions', 'Nasi Kandar SMA Amin', 
  'Anasgandee Barber Shop', 'Jusi Jus', 'D\'Sanjung Cafeteria', 'Bingo Appliance Repair', 'Po-Stitch', 'World of IT',
  'Car Rental and Taxi Service', 'Osaka Vision', 'Discounted Ticket Booking', 'Sahel Printing Services', 'Hadramawt Restaurant', 
  'ISell Stuffs', 'AIU AfriMart', 'Alive Shop', 'E-Pro Tech', 'Phone Service Repair', 'AIU Photography', 'DoorBite Express', 
  'Ayat Perfume', 'Paper Reverse', 'Eco Glow', 'Mehendi Melody', 'Eclipse Hair Studio'
];

export default function Home() {
  const [selected, setSelected] = useState(null);

  const handleAppointmentBooking = async (business, type) => {
    const appointment = {
      name: 'John Doe', // replace with actual user input later
      date: '2025-07-29', // replace with actual date later
      business,
      type
    };

    try {
      const response = await axios.post("http://localhost:5000/api/appointment", appointment);
      alert(response.data.message);
    } catch (error) {
      console.error("Error booking appointment:", error);
    }
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

      <p className="text-center text-lg mb-6 text-[#002F6C]">Explore, connect and trade with the campus community!</p>

    <motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1 }}
  className="mx-4 mb-8 rounded-xl overflow-hidden shadow-xl"
>
  <iframe
    src="https://drive.google.com/file/d/1BlZ7ij0TXCVbYajCugGecDZmf6vC0zkw/preview"
    title="UniMarket Promo Video"
    allow="autoplay"
    className="w-full h-[300px] md:h-[500px] rounded-xl"
  ></iframe>
</motion.div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 mb-8"
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: {
            transition: { staggerChildren: 0.1 }
          }
        }}
      >
        {businesses.map((biz) => (
          <motion.div
            key={biz}
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 8px #005EB8" }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div 
              className={`cursor-pointer p-4 bg-white shadow-lg rounded-lg text-center ${selected === biz ? 'ring-4 ring-[#005EB8]' : ''}`}
              onClick={() => setSelected(biz)}
            >
              <h3 className="text-lg font-semibold text-[#003366]">{biz}</h3>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="flex flex-col md:flex-row justify-center gap-4 mb-8 px-4">
        <button
          onClick={() => handleAppointmentBooking(selected, "seller")}
          className="bg-[#005EB8] text-white px-4 py-2 rounded shadow hover:bg-[#003366] disabled:opacity-50"
          disabled={!selected}
        >
          Book with Seller
        </button>
        <button
          onClick={() => handleAppointmentBooking(selected, "counsellor")}
          className="bg-[#FFB6C1] text-[#003366] px-4 py-2 rounded shadow hover:bg-pink-300 disabled:opacity-50"
          disabled={!selected}
        >
          Book with Counsellor
        </button>
      </div>
    </div>
  );
}
