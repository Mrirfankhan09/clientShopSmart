import React from "react";
import { useLocation } from "react-router-dom";
import Product from "../components/shared/Product";

// Dummy product data
const products = [
  { id: 1, name: "Phone", category: "Electronics", price: 1200 },
  { id: 2, name: "T-shirt", category: "Clothing", price: 500 },
  { id: 3, name: "Book", category: "Books", price: 300 },
  { id: 4, name: "Lamp", category: "Home", price: 800 },
  { id: 5, name: "Laptop", category: "Electronics", price: 2500 },
  { id: 6, name: "Jeans", category: "Clothing", price: 900 },
];

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchPage = () => {
  const query = useQuery().get("query") || "";

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">
          Search Results for "{query}"
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Product key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-4 text-center text-gray-500">
              No products found.
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default SearchPage