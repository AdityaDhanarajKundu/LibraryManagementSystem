import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import {
  TextField,
  Button,
  Typography,
  Box,
  Card,
} from "@mui/material";
import RegisterBg from "../assets/registerbg.jpg";
import Logo from "../assets/logo.png";

export default function RegisterPage(){
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();

      const trimmedPassword = password.trim();
      const trimmedConfirmPassword = confirmPassword.trim();

      if (trimmedPassword !== trimmedConfirmPassword) {
        setError("Passwords do not match");
        return;
      }

      setError(""); // Clear any previous errors

      try {
        await api.post("/users/register", { name, email, password });
        navigate("/users/login");
      } catch (error) {
        console.error("Registration failed", error);
      }
    };

    return (
      <Box
        sx={{
          display: "flex",
          height: "100vh",
          backgroundImage: `url(${RegisterBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          fontFamily: "'Roboto', sans-serif",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Left Section with Text Content */}
        <Box
          sx={{
            width: "50%",
            color: "#fff",
            padding: "20px",
            textAlign: "left",
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              marginBottom: "20px",
              color: "white",
            }}
          >
            Start Your Reading Journey with Nerdy Archive
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontSize: "1.2rem", lineHeight: "1.8" }}
          >
            <br />
            Sign up today and enjoy unlimited access to a vast library, tailored
            to fit your reading preferences and learning goals. Let your journey
            begin with <strong>Nerdy Archive!</strong>
          </Typography>
        </Box>

        {/* Right Section with Registration Card */}
        <Card
          sx={{
            width: "400px",
            padding: "20px",
            borderRadius: "15px",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
          }}
        >
          {/* Logo */}
          <img
            src={Logo} // Replace with the actual path to the logo
            alt="Logo"
            style={{
              width: "300px",
              marginBottom: "20px",
              borderRadius: "15px",
            }}
          />

          <Typography variant="h4" gutterBottom>
            Register
          </Typography>

          <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
            {/* Name Input */}
            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{ marginBottom: "20px" }}
            />

            {/* Email Input */}
            <TextField
              fullWidth
              label="Email"
              type="email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ marginBottom: "20px" }}
            />

            {/* Password Input */}
            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ marginBottom: "20px" }}
            />

            <TextField
              fullWidth
              label="Confirm Password"
              type="password"
              variant="outlined"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              sx={{ marginBottom: "20px" }}
            />

            {error && (
              <Typography
                variant="body2"
                color="error"
                sx={{ marginBottom: "20px" }}
              >
                {error}
              </Typography>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                backgroundColor: "#4A4A4A",
                color: "#fff",
                padding: "10px",
                textTransform: "none",
                "&:hover": { backgroundColor: "#333" },
              }}
            >
              Sign Up
            </Button>
          </form>
        </Card>
      </Box>
    );
}