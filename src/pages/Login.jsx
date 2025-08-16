import React from "react";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form className="bg-white shadow rounded-lg p-8 w-full max-w-md flex flex-col gap-6">
        <h2 className="text-2xl font-bold mb-2 text-center">Login</h2>
        <input
          type="email"
          className="border rounded px-4 py-2"
          placeholder="Email"
          required
        />
        <input
          type="password"
          className="border rounded px-4 py-2"
          placeholder="Password"
          required
        />
        <button
          type="submit"
          className="w-full px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold text-lg transition"
        >
          Login
        </button>
        <div className="text-sm text-center">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Register
          </a>
        </div>
      </form>
    </div>
  );
};

export default Login;