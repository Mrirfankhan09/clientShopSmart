import React, { useState } from "react";
import Product from "../components/shared/Product";
import { useEffect } from "react";
import axios from 'axios'

const Home = ({ products, getCart }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPrice, setSelectedPrice] = useState("All");


  // console.log(products)
  // 🔹 Filter logic (unchanged)
  const CartFn = async (id, quantity) => {
    console.log(id, quantity, 'in cart fn')
    let response = await axios.post('https://ecommerce-backend-2-79ub.onrender.com/api/cart', {
      productId: id,
      quantity: quantity
    },
      {
        withCredentials: true
      })
    // console.log(response,'here')
    getCart()

  }


  const categories = ["All", ...Array.from(new Set(products.map(p => p.category)))]
  const priceRanges =
    [
      { label: "All", min: 0, max: Infinity },
      { label: "₹100 - ₹2350", min: 100, max: 2350 },
      { label: "₹2351 - ₹4600", min: 2351, max: 4600 },
      { label: "₹4601 - ₹6850", min: 4601, max: 6850 },
      { label: "Above ₹6851", min: 6851, max: Infinity }
    ]
  // console.log(categories)

  const filteredProducts = products.filter((product) => {
    const inCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    const priceRange = priceRanges.find((p) => p.label === selectedPrice);
    const inPrice =
      !priceRange ||
      (product.price >= priceRange.min && product.price <= priceRange.max);
    return inCategory && inPrice;
  });
  // console.log(filteredProducts)



  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-7xl mx-auto">
        {/* 🔹 Hero Banner */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8 rounded-xl text-center mb-10">
          <h1 className="text-3xl font-bold mb-2">Welcome to ShopSmart</h1>
          <p className="text-lg">Discover top products at amazing prices!</p>
        </div>

        {/* 🔹 Filter Bar */}
        <div className="flex flex-wrap gap-4 mb-8 justify-start">
          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {/* Price Filter */}
          <select
            value={selectedPrice}
            onChange={(e) => setSelectedPrice(e.target.value)}
            className="px-4 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          >
            {priceRanges.map((range) => (
              <option key={range.label} value={range.label}>
                {range.label}
              </option>
            ))}
          </select>
        </div>

        {/* 🔹 Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Product key={product.id} product={product} CartFn={CartFn} />
            ))
          ) : (
            <div className="col-span-4 text-center text-gray-500 text-lg py-10">
              No products found.
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
