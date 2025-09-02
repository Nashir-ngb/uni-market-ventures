import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Remove trailing slash if it exists
  const baseURL = (process.env.REACT_APP_API_BASE_URL || "").replace(/\/+$/, "");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const url = `${baseURL}/api/user/login`;

      console.log("Logging in at:", url);

      const res = await axios.post(url, { email, password });

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
        navigate("/buyer-dashboard"); // or "/" if you don’t have buyer dashboard
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
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>

        {/* Register link */}
        <p className="mt-4 text-center text-sm">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
}
