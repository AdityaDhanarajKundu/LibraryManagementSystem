import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Logo from "../assets/logo.png";
import BookSide from "../assets/bookSide.jpg";
import Background from "../assets/login.jpg";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({ email, password });
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const handleForgotPassword = () => {
    alert("Redirecting to forgot password page...");
    navigate("/users/forgot-password");
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
      {/* Card Container */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{
          display: "flex",
          width: "90%",
          maxWidth: "900px",
          borderRadius: "15px",
          overflow: "hidden",
          background: "rgba(255, 255, 255, 0.9)",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
        }}
      >
        {/* Left Section with Animated Image */}
        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: 1.05 }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
          style={{
            flex: 1,
            backgroundImage: `url(${BookSide})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></motion.div>

        {/* Right Section with Login Form */}
        <div
          style={{
            flex: 1,
            padding: "50px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <motion.img
            src={Logo}
            alt="Logo"
            style={{ marginBottom: "20px", width: "150px" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />
          <h1 style={{ fontSize: "28px", fontWeight: "bold", color: "#333" }}>Welcome Back</h1>
          <form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: "400px" }}>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #ccc", fontSize: "16px", marginBottom: "15px" }}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #ccc", fontSize: "16px", marginBottom: "15px" }}
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              style={{ width: "100%", padding: "12px", background: "linear-gradient(135deg, #6a11cb, #2575fc)", color: "#fff", border: "none", borderRadius: "8px", fontSize: "18px", cursor: "pointer" }}
            >
              Login
            </motion.button>
          </form>
          <motion.button
            onClick={handleForgotPassword}
            whileHover={{ scale: 1.05 }}
            style={{ marginTop: "15px", background: "none", border: "none", color: "#6a11cb", cursor: "pointer", textDecoration: "underline", fontSize: "14px" }}
          >
            Forgot password?
          </motion.button>
          <p style={{ marginTop: "20px", fontSize: "14px", color: "#666" }}>
            Don't have an account? <a href="/users/register" style={{ color: "#6a11cb", textDecoration: "underline" }}>Register here</a>
          </p>
        </div>
      </motion.div>
    </div>
  );
}