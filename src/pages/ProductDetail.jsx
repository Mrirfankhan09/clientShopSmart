import React from "react";
import RatingStars from "./RatingStars";

const ProductDetail = () => {
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-8 flex flex-col md:flex-row gap-8">
      {/* Product Image */}
      <div className="flex-1 flex items-center justify-center">
        <img
          src="https://via.placeholder.com/320"
          alt="Product Name"
          className="w-80 h-80 object-contain rounded"
        />
      </div>
      {/* Product Info */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h2 className="text-3xl font-bold mb-2">Product Name</h2>
          <div className="flex items-center gap-3 mb-4">
            <RatingStars rating={4.5} />
            <span className="text-sm text-gray-500">(120 reviews)</span>
          </div>
          <div className="text-2xl font-bold text-blue-700 mb-4">₹999</div>
          <p className="text-gray-700 mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Pellentesque ac eros nec urna dictum cursus.
          </p>
          <div className="mb-6">
            <span className="font-semibold">Brand:</span> Generic
          </div>
          <div className="mb-6">
            <span className="font-semibold">Category:</span> Electronics
          </div>
          <div className="mb-6">
            <span className="font-semibold">Stock:</span> In Stock
          </div>
        </div>
        <button className="mt-4 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold text-lg transition">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;