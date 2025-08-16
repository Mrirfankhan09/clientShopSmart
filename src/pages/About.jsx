// src/pages/About.jsx
import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-8">
        <h1 className="text-3xl font-bold mb-4 text-indigo-700">About ShopSmart</h1>

        <p className="text-gray-700 mb-4">
          ShopSmart is your one-stop online destination for premium quality products at unbeatable prices. We are passionate about providing a seamless shopping experience for customers across India.
        </p>

        <p className="text-gray-700 mb-4">
          Whether you're looking for the latest electronics, trendy fashion, or everyday essentials, we carefully curate our collections to offer both quality and affordability. Our goal is not just to sell, but to serve — ensuring satisfaction from cart to doorstep.
        </p>

        <h2 className="text-xl font-semibold text-indigo-600 mt-6 mb-2">Our Mission</h2>
        <p className="text-gray-700 mb-4">
          To make online shopping effortless, reliable, and affordable for everyone. We strive to build long-term relationships with our customers by being transparent, responsive, and customer-first.
        </p>

        <h2 className="text-xl font-semibold text-indigo-600 mt-6 mb-2">Why Choose Us?</h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>✅ Carefully selected high-quality products</li>
          <li>🚚 Fast and reliable shipping</li>
          <li>💸 Great prices and frequent deals</li>
          <li>📞 Friendly customer support</li>
          <li>🔒 Secure payment options</li>
        </ul>

        <div className="mt-8 text-sm text-gray-500 border-t pt-4">
          © {new Date().getFullYear()} ShopSmart. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default About;
