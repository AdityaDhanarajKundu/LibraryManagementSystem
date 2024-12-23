import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import {
  TextField,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
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
    const [role, setRole] = useState("user"); // Default role is "user"
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            await api.post("/users/register", {name, email, password, role});
            navigate("/users/login");
        }catch(error){
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
            sx={{ fontWeight: "bold", marginBottom: "20px", color: "white", marginLeft: "20px"}}
          >
            The best offer for your business
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontSize: "1.2rem", lineHeight: "1.8" }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Temporibus,
            expedita justo veniam atque, magni tempora mollitia dolorum
            consequatur nulla, neque debitis eos reprehenderit quasi ab ipsum
            nisi dolorem modi. Quos?
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

            {/* Role Radio Buttons */}
            <Typography variant="body1" sx={{ marginBottom: "10px" }}>
              Select Role:
            </Typography>
            <RadioGroup
              row
              value={role}
              onChange={(e) => setRole(e.target.value)}
              sx={{ marginBottom: "20px", justifyContent: "center" }}
            >
              <FormControlLabel value="user" control={<Radio />} label="User" />
              <FormControlLabel
                value="admin"
                control={<Radio />}
                label="Admin"
              />
            </RadioGroup>

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