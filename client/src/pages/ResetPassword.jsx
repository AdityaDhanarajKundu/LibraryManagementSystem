import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../services/api";
import Logo from "../assets/logo.png";
import Background from "../assets/reset.jpg";

export default function ResetPassword() {
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/users/reset-password", { token, newPassword });
      setMessage(response.data.message);
      setTimeout(() => {
        navigate("/users/login");
      }, 2000);
    } catch (error) {
      setMessage("Error: Unable to reset password. Please try again.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundImage: `url(${Background})`,
        backgroundSize: "cover",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "90%",
          maxWidth: "400px",
          padding: "30px",
          borderRadius: "15px",
          background: "rgba(255, 255, 255, 0.9)",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
        }}
      >
        <motion.img
          src={Logo}
          alt="Logo"
          style={{ marginBottom: "20px", width: "100px" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
        <h2 style={{ fontSize: "24px", fontWeight: "bold", color: "#333" }}>Reset Password</h2>
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <input
            type="text"
            placeholder="Enter your reset token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "16px",
              marginBottom: "15px",
            }}
          />
          <input
            type="password"
            placeholder="Enter your new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "16px",
              marginBottom: "15px",
            }}
          />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            style={{
              width: "100%",
              padding: "12px",
              background: "linear-gradient(135deg, #6a11cb, #2575fc)",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontSize: "18px",
              cursor: "pointer",
            }}
          >
            Reset Password
          </motion.button>
        </form>
        {message && (
          <p style={{ marginTop: "20px", fontSize: "14px", color: message.startsWith("Error") ? "red" : "green" }}>
            {message}
          </p>
        )}
      </motion.div>
    </div>
  );
}