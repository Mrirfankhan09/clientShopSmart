import React from "react";
import CartItem from "../components/shared/CartItem";
import axios from "axios";
import { useState, useEffect } from "react";

const Cart = ({ cart, removeItem }) => {
  const [amount, setAmount] = useState(0);
  const [user, setUser] = useState(null);
  const [address, setAddress] = useState([]);

  console.log(cart, 'cart in Cart component');

  const getme = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/users/profile", {
        withCredentials: true
      })
      console.log(response.data, 'User data fetched successfully');
      setUser(response.data.user);

    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }



  const handleCheckout = async () => {
    try {
      if (!address?.length) {
        alert("Please add/select a shipping address.");
        return;
      }

      const addressId = address[0]?._id;
      if (!addressId) {
        alert("Invalid address selected.");
        return;
      }

      const paymentMethod = "razorpay";

      // Create order
      const { data } = await axios.post(
        "http://localhost:8000/api/orders/createorder",
        { addressId, paymentMethod },
        { withCredentials: true }
      );

      const options = {
        key: data.key,
        amount: data.amount,
        currency: data.currency,
        name: "ShopSmart",
        description: "Order Payment",
        order_id: data.razorpayOrderId,
        handler: async function (response) {
          const verifyRes = await axios.post(
            "http://localhost:8000/api/orders/verify",
            {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              orderId: data.orderId,
            },
            { withCredentials: true }
          );

          if (verifyRes.data.success) {
            alert("Payment successful!");
          } else {
            alert("Payment verification failed.");
          }
        },
        prefill: {
          name: user?.name,
          email: user?.email,
        },
        theme: { color: "#3399cc" },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.error(error);
      alert("Checkout failed");
    }
  };

  const fetchAddresses = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/address", {
        withCredentials: true
      });
      console.log(response.data, 'Addresses fetched successfully');
      setAddress(response.data.data);
    } catch (error) {
      console.error('Error fetching addresses:', error);
    }
  };


  useEffect(() => {
    getme();
    fetchAddresses();
  }, []);





  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-8 mt-10">
      <h2 className="text-2xl font-bold mb-6">Your Cart</h2>
      {/* Cart Items */}
      <div>
        {

          cart.cartItems && cart.cartItems.length > 0 ? (cart.cartItems.map((item) => (
            <CartItem key={item._id} cart={item} removeItem={removeItem} />
          ))) : (
            <div className="text-center text-gray-500 text-lg py-10">
              Your cart is empty.
            </div>
          )
        }
      </div>
      {/* Cart Summary */}
      <div className="border-t pt-6 mt-6 flex flex-col items-end">
        <div className="text-lg font-semibold mb-2">Total: <span className="text-blue-700">₹{cart.totalPrice}</span></div>
        <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold text-lg transition" onClick={handleCheckout}>
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;