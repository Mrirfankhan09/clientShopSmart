import React from "react";

const Checkout = () => {
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-8 mt-10">
      <h2 className="text-2xl font-bold mb-6">Checkout</h2>
      <div className="grid md:grid-cols-2 gap-8">
        {/* Address Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Shipping Address</h3>
          <form className="flex flex-col gap-4">
            <input className="border rounded px-4 py-2" placeholder="Full Name" />
            <input className="border rounded px-4 py-2" placeholder="Phone" />
            <input className="border rounded px-4 py-2" placeholder="Street Address" />
            <input className="border rounded px-4 py-2" placeholder="City" />
            <input className="border rounded px-4 py-2" placeholder="State" />
            <input className="border rounded px-4 py-2" placeholder="ZIP Code" />
            <input className="border rounded px-4 py-2" placeholder="Country" />
          </form>
        </div>
        {/* Order Summary & Payment */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
          <div className="bg-gray-50 rounded p-4 mb-4">
            <div className="flex justify-between mb-2">
              <span>Items (2)</span>
              <span>₹1998</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>₹1998</span>
            </div>
          </div>
          <h3 className="text-lg font-semibold mb-2">Payment Method</h3>
          <select className="border rounded px-4 py-2 w-full mb-4">
            <option>Credit/Debit Card</option>
            <option>UPI</option>
            <option>Cash on Delivery</option>
          </select>
          <button className="w-full px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold text-lg transition">
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;