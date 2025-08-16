import React from "react";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 py-8 mt-12">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-lg font-bold tracking-tight">
          ShopSmart &copy; {new Date().getFullYear()}
        </div>
        <div className="flex gap-6 text-sm">
          <a href="/about" className="hover:text-blue-400 transition">About Us</a>
          <a href="/contact" className="hover:text-blue-400 transition">Contact</a>
          <a href="/privacy" className="hover:text-blue-400 transition">Privacy Policy</a>
          <a href="/terms" className="hover:text-blue-400 transition">Terms of Service</a>
        </div>
        <div className="text-xs text-gray-400">
          Made with <span className="text-red-500">&hearts;</span> by ShopSmart Team
        </div>
      </div>
    </footer>
  );
};

export default Footer;