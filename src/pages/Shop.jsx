import React, { useEffect, useState } from "react";
import ProductCard from "../components/shared/Product";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Shop = ({ getCart }) => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query") || "";

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  console.log(query, 'query in shop page')
  console.log(getCart, 'getCart in shop page')

  // Fetch all products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("https://ecommerce-backend-2-79ub.onrender.com/api/products");
        setProducts(res.data.products || []);
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    };
    fetchProducts();
  }, []);
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

  // Filter products by search query
  useEffect(() => {
    if (query.trim()) {
      setFilteredProducts(
        products.filter(product =>
          product.name.toLowerCase().includes(query.toLowerCase())
        )
      );
      setCurrentPage(1);
    } else {
      setFilteredProducts(products);
    }
  }, [query, products]);

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-800">Shop All Products</h1>
          <p className="text-gray-500 mt-1">Browse our full product collection</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentProducts.length > 0 ? (
            currentProducts.map(product => (
              <ProductCard key={product.id} product={product} CartFn={CartFn} />
            ))
          ) : (
            <div className="col-span-4 text-center text-gray-500 text-lg py-10">
              No products found.
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center mt-10 gap-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded-md border ${currentPage === i + 1
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-gray-700 hover:bg-indigo-100"
                  }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;