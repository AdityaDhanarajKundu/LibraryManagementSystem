import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Logo from "../assets/logo.png";
import Background from "../assets/forgot.jpg";
import { motion } from "framer-motion";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/users/forgot-password", { email });
      setMessage(response.data.message);
      navigate("/users/reset-password");
    } catch (error) {
      setMessage("Error: Unable to process request.");
    }
  };

  return (
    <div
      className="flex justify-center items-center h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${Background})` }}
    >
      {/* Card Container with animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-8 rounded-2xl shadow-lg backdrop-blur-lg bg-white/10 border border-white/20 text-center"
      >
        {/* Logo */}
        <img src={Logo} alt="Logo" className="mx-auto mb-4 w-24 h-24" />
        <h2 className="text-2xl font-bold text-white mb-6">Forgot Password</h2>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 text-gray-900"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full p-3 rounded-lg bg-gradient-to-r from-gray-700 to-gray-900 text-white text-lg font-semibold shadow-md hover:opacity-90 transition"
          >
            Proceed
          </motion.button>
        </form>

        {/* Message */}
        {message && (
          <p className={`mt-4 text-lg ${message.startsWith("Error") ? "text-red-400" : "text-green-400"}`}>
            {message}
          </p>
        )}
      </motion.div>
    </div>
  );
}
