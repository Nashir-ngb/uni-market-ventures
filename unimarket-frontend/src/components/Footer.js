import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[#003366] text-white text-center py-3 mt-8 rounded-t-xl shadow-inner">
      <p className="text-sm">&copy; {new Date().getFullYear()} UniMarket Ventures. All rights reserved.</p>
    </footer>
  );
}
