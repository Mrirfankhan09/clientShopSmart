import React, { useState, useEffect } from "react";
import axios from 'axios'

const Profile = () => {
  const [stage, setStage] = useState("default");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState({});
  const [fullname, setFullname] = useState('');
  const [otp, setOtp] = useState("");
  const [showOtpPrompt, setShowOtpPrompt] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({
    fullName: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: ""
  });
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const maxAddresses = 3;
  console.log(addresses, 'addresses in profile');



  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'https://ecommerce-backend-2-79ub.onrender.com/api/users/login',
        { email, password },
        { withCredentials: true }
      );
      setUser(response.data.user);
      setStage("profile");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:8000/api/users/register',
        { email, password, name: fullname }
      );
      if (response.status === 201) {
        setShowOtpPrompt(true);
      }
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/users/verify-otp', {
        email,
        otp
      });
      if (response.data.success) {
        setStage("login");
        setShowOtpPrompt(false);
      }
    } catch (error) {
      alert("Invalid OTP");
    }
  };

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:8000/api/users/logout", {
        withCredentials: true,
      });
      setUser({});
      setAddresses([]);
      setStage("default");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleAddressChange = (index, field, value) => {
    const updated = [...addresses];
    updated[index][field] = value;
    setAddresses(updated);
  };

  const handleAddNew = () => {
    if (addresses.length >= maxAddresses) {
      alert("You can only add up to 3 addresses.");
      return;
    }
    setIsAddingNew(true);
  };

  const handleNewAddressChange = (field, value) => {
    setNewAddress(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const saveNewAddress = async () => {
    if (!newAddress.fullName || !newAddress.phone || !newAddress.street ||
      !newAddress.city || !newAddress.state || !newAddress.country) {
      alert("Please fill all required fields.");
      return;
    }
    const response = await axios.post(
      "http://localhost:8000/api/address",
      { address: newAddress },
      { withCredentials: true }
    );
    if (response.status !== 200) {
      alert("Failed to save address");
      return;
    }
    console.log(response.data, 'New address saved successfully');


    setAddresses(prev => [...prev, newAddress]);
    setNewAddress({
      fullName: "",
      phone: "",
      street: "",
      city: "",
      state: "",
      zip: "",
      country: ""
    });
    setIsAddingNew(false);
  };

  const deleteAddress = async (index) => {
    const addressId = addresses[index]._id;
    console.log(addressId, 'address id to delete');
    try {
      await axios.delete(`http://localhost:8000/api/address/${addressId}`, {
        withCredentials: true,
      });
      setAddresses(prev => prev.filter((_, i) => i !== index));
      if (selectedAddressIndex === index) {
        setSelectedAddressIndex(null);
      } else if (selectedAddressIndex > index) {
        setSelectedAddressIndex(prev => prev - 1);
      }
      alert("Address deleted successfully!");
    } catch (error) {
      alert("Failed to delete address");
    }
  };

  const handleSaveAddresses = async () => {
    try {
      await axios.post(
        "http://localhost:8000/api/address",
        { addresses },
        { withCredentials: true }
      );
      alert("Addresses saved successfully!");
    } catch (err) {
      alert("Failed to save addresses");
    }
  };
  const fetchAddresses = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/address", {
        withCredentials: true
      });
      // console.log(response, 'Fetched addresses');
      setAddresses(response.data.data || []);

    } catch (err) {
      console.error("Failed to fetch addresses:", err);
      alert("Failed to fetch addresses");
    }
  }

  // ...existing code...
  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/users/getme", {
          withCredentials: true,
        });
        if (res.data.user) {
          setUser(res.data.user);
          setStage("profile");
          if (res.data.user.addresses?.length) {
            setAddresses(res.data.user.addresses);
          }
        }
      } catch (err) {
        console.log("Not logged in");
      }
    };
    checkLoggedIn();

  }, []); // Fetch addresses when stage changes to profile
  useEffect(() => {
    if (stage === "profile") {
      fetchAddresses();
    }
  }, [stage]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-xl bg-white p-8 rounded-2xl shadow-lg">
        {stage === "default" && (
          <div className="text-center space-y-6">
            <h2 className="text-3xl font-bold text-gray-800">Welcome</h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setStage("login")}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold transition"
              >
                Login
              </button>
              <button
                onClick={() => setStage("register")}
                className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-full font-semibold transition"
              >
                Register
              </button>
            </div>
          </div>
        )}

        {stage === "login" && (
          <div>
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 border rounded-lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 border rounded-lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="submit"
                className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Login
              </button>
            </form>
          </div>
        )}

        {stage === "register" && (
          <div>
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Register</h2>
            <form onSubmit={handleRegister} className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full px-4 py-2 border rounded-lg"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 border rounded-lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 border rounded-lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="submit"
                className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Register
              </button>
            </form>
          </div>
        )}

        {stage === "profile" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">Profile</h2>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Logout
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Name</label>
                <p className="mt-1 text-gray-900">{user.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Email</label>
                <p className="mt-1 text-gray-900">{user.email}</p>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Addresses</h3>
              {addresses?.map((address, index) => (
                <div
                  key={index}
                  className="mb-4 p-4 border rounded-lg"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">Address {index + 1}</h4>
                    <button
                      onClick={() => deleteAddress(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Full Name"
                      className="p-2 border rounded"
                      value={address.fullName}
                      onChange={(e) => handleAddressChange(index, "fullName", e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Phone"
                      className="p-2 border rounded"
                      value={address.phone}
                      onChange={(e) => handleAddressChange(index, "phone", e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Street"
                      className="p-2 border rounded"
                      value={address.street}
                      onChange={(e) => handleAddressChange(index, "street", e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="City"
                      className="p-2 border rounded"
                      value={address.city}
                      onChange={(e) => handleAddressChange(index, "city", e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="State"
                      className="p-2 border rounded"
                      value={address.state}
                      onChange={(e) => handleAddressChange(index, "state", e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="ZIP Code"
                      className="p-2 border rounded"
                      value={address.zip}
                      onChange={(e) => handleAddressChange(index, "zip", e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Country"
                      className="p-2 border rounded col-span-2"
                      value={address.country}
                      onChange={(e) => handleAddressChange(index, "country", e.target.value)}
                    />
                  </div>
                </div>
              ))}

              {isAddingNew && (
                <div className="mb-4 p-4 border border-dashed rounded-lg">
                  <h4 className="font-medium mb-2">New Address</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Full Name"
                      className="p-2 border rounded"
                      value={newAddress.fullName}
                      onChange={(e) => handleNewAddressChange("fullName", e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Phone"
                      className="p-2 border rounded"
                      value={newAddress.phone}
                      onChange={(e) => handleNewAddressChange("phone", e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Street"
                      className="p-2 border rounded"
                      value={newAddress.street}
                      onChange={(e) => handleNewAddressChange("street", e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="City"
                      className="p-2 border rounded"
                      value={newAddress.city}
                      onChange={(e) => handleNewAddressChange("city", e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="State"
                      className="p-2 border rounded"
                      value={newAddress.state}
                      onChange={(e) => handleNewAddressChange("state", e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="ZIP Code"
                      className="p-2 border rounded"
                      value={newAddress.zip}
                      onChange={(e) => handleNewAddressChange("zip", e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Country"
                      className="p-2 border rounded col-span-2"
                      value={newAddress.country}
                      onChange={(e) => handleNewAddressChange("country", e.target.value)}
                    />
                  </div>
                  <button
                    onClick={saveNewAddress}
                    className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Save Address
                  </button>
                </div>
              )}

              <div className="flex gap-4 mt-4">
                {!isAddingNew && addresses.length < maxAddresses && (
                  <button
                    onClick={handleAddNew}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Add New Address
                  </button>
                )}
                <button
                  onClick={handleSaveAddresses}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Save All Addresses
                </button>
              </div>
            </div>
          </div>
        )}

        {showOtpPrompt && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
              <h3 className="text-xl font-bold mb-4">Enter OTP</h3>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg mb-4"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <button
                onClick={handleVerifyOtp}
                className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Verify OTP
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Profile;