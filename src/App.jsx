import React from "react";
import Header from "./components/shared/Header";
import Footer from "./components/shared/Footer";
import Home from "./pages/Home";
// 👈 Make sure this exists
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import Shop from "./pages/Shop";
import About from "./pages/About";
import { Contact } from "lucide-react";
import Contacts from "./pages/Contacts";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

  const getproducts = async () => {
    const respone = await axios.get('http://localhost:8000/api/products');
    // console.log(respone.data.products)
    setProducts(respone.data.products);
  }
  const getCartItems = async () => {
    const response = await axios.get('http://localhost:8000/api/cart', {
      withCredentials: true
    });
    // console.log(response.data.cart,'cart items')
    setCart(response.data.cart);
  }
  const getCart = () => {
    // cartItems.total = total;
    // cartItems.totalItems = totalItems;
    // console.log(typeof cartItems,'checking')
    getCartItems();
  }
  const removeItem = async (itemId) => {
    try {
      const response = await axios.delete(`http://localhost:8000/api/cart/${itemId}`, {
        withCredentials: true
      });
      console.log(response.data, 'Item removed successfully');
      getCartItems(); // Refresh cart items after removal
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }

  }
  useEffect(() => {
    getproducts();
    getCartItems();

  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home products={products} getCart={getCart} />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<Cart cart={cart} removeItem={removeItem} />} />
          <Route path="/products" element={<Shop products={products} getCart={getCart}/>} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contacts />} />
          <Route path="/shop" element={<Shop getproducts={products} getCart={getCart}/>} />


        </Routes>
      </main>
      <Footer />
    </div>
  );
};


export default App;
