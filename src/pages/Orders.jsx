import React from "react";

const Orders = () => {
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-8 mt-10">
      <h2 className="text-2xl font-bold mb-6">My Orders</h2>
      <div className="flex flex-col gap-6">
        {/* Example Order Card */}
        <div className="border rounded-lg p-6 flex flex-col md:flex-row md:items-center gap-6 shadow-sm">
          <img
            src="https://via.placeholder.com/100"
            alt="Product"
            className="w-24 h-24 object-contain rounded"
          />
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-1">Product Name</h3>
            <div className="text-blue-600 font-bold mb-1">₹999</div>
            <div className="text-sm text-gray-500 mb-1">Order ID: #123456</div>
            <div className="text-sm text-gray-500 mb-1">Placed on: 2025-06-29</div>
            <div className="text-sm text-green-600 font-semibold">Status: Delivered</div>
          </div>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold transition">
            View Details
          </button>
        </div>
        {/* Repeat above block for more orders */}
      </div>
    </div>
  );
};

export default Orders;