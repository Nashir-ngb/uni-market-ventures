import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const baseURL = (process.env.REACT_APP_API_BASE_URL || "").replace(/\/+$/, "");
      let res;

      // Try logging in as a buyer first
      try {
        console.log("Trying buyer login at:", `${baseURL}/api/user/login`);
        res = await axios.post(`${baseURL}/api/user/login`, { email, password });
      } catch (err) {
        // If buyer login fails, try seller login
        console.log("Buyer login failed, trying seller login at:", `${baseURL}/api/seller/login`);
        res = await axios.post(`${baseURL}/api/seller/login`, { email, password });
      }

      toast.success("Login successful!");

      if (res.data?.token) {
        localStorage.setItem("token", res.data.token);
      }
      if (res.data?.role) {
        localStorage.setItem("role", res.data.role);
      }

      // Redirect based on role
      if (res.data.role === "seller") {
        navigate("/seller-dashboard");
      } else {
        navigate("/buyer-dashboard"); // you can also change this to "/" if you prefer
      }
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            required
            className="w-full border p-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-1">Password</label>
          <input
            type="password"
            required
            className="w-full border p-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Login
        </button>

        <p className="mt-4 text-center text-sm">
          Don’t have an account?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Register here
          </a>
        </p>
      </form>
    </div>
  );
}
