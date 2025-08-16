import React from "react";
import { Star, ShoppingCart } from "lucide-react";
import RatingStars from "./RatingStars";

const Product = ({ product, CartFn }) => {
  // console.log(CartFn)
  // const handleclick = ()=>{
  //   console.log("Hello cart",product._id)
  //   CartFn(product._id)
  // }
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col items-center">
      <img
        src={product.images[0].url}
        alt="Product Name"
        className="w-40 h-40 object-contain mb-4"
      />
      <h3 className="text-lg font-semibold mb-1 text-center">{product.name}</h3>
      <div className="flex items-center mb-2">
        <span className="text-blue-600 font-bold text-xl mr-2">
          ₹{product.price}
        </span>
        <div className="flex items-center">
          <RatingStars />
        </div>
      </div>
      <button
        className="mt-2 flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold transition"
        onClick={() => { CartFn(product._id, 1) }}>
        <ShoppingCart className="w-5 h-5" />
        Add to cart
      </button>
    </div>
  );
};

export default Product;