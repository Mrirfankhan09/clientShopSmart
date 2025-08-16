import React from "react";
import { X } from "lucide-react";

const CartItem = ({cart,removeItem}) => {
  // console.log(cart.image[0].url,'in cart')
  const handleClick = () => {
    removeItem(cart._id);
  }
  return (
    <div className="flex items-center gap-6 bg-white rounded-lg shadow p-4 mb-4">
      <img
        src={cart.image[0].url}
        alt="Product"
        className="w-20 h-20 object-contain rounded"
      />
      <div className="flex-1">
        <h4 className="font-semibold text-lg mb-1">{cart.name}</h4>
        <div className="text-blue-600 font-bold mb-1">₹{cart.price}</div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Qty:{cart.quantity}</span>
          {/* <input
            type="number"
            min="1"
            value={1}
            className="w-16 px-2 py-1 border rounded"
            readOnly
          /> */}
        </div>
      </div>
      <button className="text-gray-400 hover:text-red-500 transition">
        <X className="w-6 h-6" onClick={handleClick}/>
      </button>
    </div>
  );
};

export default CartItem;