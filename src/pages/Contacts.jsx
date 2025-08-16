// src/pages/Contact.jsx
import React from "react";

const Contacts = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold text-indigo-700 mb-6">Contact Us</h1>

        <p className="text-gray-600 mb-6">
          Have questions, feedback, or need help? We're here for you.
          Fill out the form below and our support team will get back to you within 24 hours.
        </p>

        <form className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Your Name"
              className="mt-1 w-full border rounded-md px-4 py-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              className="mt-1 w-full border rounded-md px-4 py-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              id="message"
              rows="5"
              placeholder="Write your message..."
              className="mt-1 w-full border rounded-md px-4 py-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition"
          >
            Send Message
          </button>
        </form>

        {/* Optional contact details */}
        <div className="mt-10 text-sm text-gray-600">
          <p><strong>Email:</strong> support@irfanshop.com</p>
          <p><strong>Phone:</strong> +91 98765 43210</p>
          <p><strong>Address:</strong> Jaipur, Rajasthan, India</p>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
