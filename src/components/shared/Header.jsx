import React, { useState, useRef } from 'react';
import { Search, ShoppingCart, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Header = () => {
  const [keyword, setKeyword] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const navigate = useNavigate();
  const inputRef = useRef();

  const handleSearch = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/shop?query=${keyword}`);
      setKeyword("");
      setShowDropdown(false);
    }
  };

  // Fetch suggestions from backend as user types
  const handleInputChange = async (e) => {
    const value = e.target.value;
    setKeyword(value);
    if (value.trim()) {
      try {
        // You should create this endpoint in your backend for efficient search
        const res = await axios.get(
          `http://localhost:8000/api/products/suggestions?query=${value}`
        );
        console.log(res.data.suggestions, 'suggestions');
        setFilteredSuggestions(res.data.suggestions || []);
        setShowDropdown((res.data.suggestions || []).length > 0);
      } catch (error) {
        setFilteredSuggestions([]);
        setShowDropdown(false);
      }
    } else {
      setShowDropdown(false);
      setFilteredSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setKeyword(suggestion);
    setShowDropdown(false);
    navigate(`/shop?query=${suggestion}`);
  };

  const handleBlur = () => {
    setTimeout(() => setShowDropdown(false), 100);
  };

  return (
    <header className="flex justify-between items-center px-8 py-4 bg-white shadow-md">
      {/* Left: Logo & Nav */}
      <div className="flex items-center gap-8">
        <a href="/" className="text-2xl font-extrabold text-blue-700 tracking-tight">ShopSmart</a>
        <nav>
          <ul className="flex gap-6 text-lg font-medium">
            <li><Link to="/" className="hover:text-blue-600 transition">Home</Link></li>
            <li><Link to="/products" className="hover:text-blue-600 transition">Shop</Link></li>
            <li><Link to="/about" className="hover:text-blue-600 transition">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-blue-600 transition">Contact</Link></li>
          </ul>
        </nav>
      </div>

      {/* Center: Search Bar */}
      <form
        className="relative flex items-center bg-gray-100 rounded-full shadow px-5 py-2 w-full max-w-lg mx-8"
        onSubmit={handleSearch}
        autoComplete="off"
      >
        <Search className="w-6 h-6 text-gray-500 mr-3" />
        <input
          type="text"
          placeholder="Search for products..."
          aria-label="Search for products"
          className="flex-1 bg-transparent outline-none px-2 py-1 text-lg"
          onChange={handleInputChange}
          value={keyword}
          onFocus={() => setShowDropdown(filteredSuggestions.length > 0)}
          onBlur={handleBlur}
          ref={inputRef}
        />
        <button
          type="submit"
          className="ml-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold transition-colors duration-200 shadow"
        >
          Search
        </button>
        {/* Dropdown */}
        {showDropdown && (
          <ul className="absolute left-0 top-full mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
            {filteredSuggestions.map((suggestion, idx) => (
              <li
                key={idx}
                className="px-4 py-2 cursor-pointer hover:bg-blue-50"
                onMouseDown={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </form>

      {/* Right: Cart & Profile */}
      <div className="flex items-center gap-6">
        <Link to="/cart" className="relative group">
          <ShoppingCart className="w-7 h-7 text-gray-700 group-hover:text-blue-600 transition" />
        </Link>
        <Link to="/profile" className="group">
          <User className="w-7 h-7 text-gray-700 group-hover:text-blue-600 transition" />
        </Link>
      </div>
    </header>
  );
};

export default Header;