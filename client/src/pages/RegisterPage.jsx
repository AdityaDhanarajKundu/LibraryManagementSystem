import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Box, Card, CardContent } from "@mui/material";
import { styled } from "@mui/system";

const RegisterCard = styled(Card)({
  backgroundColor: "rgba(255, 255, 255, 0.95)",
  borderRadius: "10px",
  boxShadow: "0 6px 15px rgba(0, 0, 0, 0.1)",
  padding: "20px",
  maxWidth: "500px",
});

const SubmitButton = styled(Button)({
  background: "#4caf50", // Library green
  color: "#fff",
  fontWeight: "bold",
  padding: "10px 0",
  textTransform: "capitalize",
  borderRadius: "5px",
  fontSize: "16px",
  "&:hover": {
    background: "#45a049",
  },
});

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your form submission logic here
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundImage: `url(https://images.unsplash.com/photo-1507842217343-583bb7270b66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <RegisterCard>
        <CardContent>
          <Box sx={{ textAlign: "center", marginBottom: "20px" }}>
            <img
              src="https://img.icons8.com/color/96/000000/open-book.png"
              alt="Library Icon"
              style={{ width: "60px" }}
            />
          </Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              marginBottom: "15px",
              color: "#333",
              textAlign: "center",
            }}
          >
            Library Registration
          </Typography>
          <Typography
            variant="body2"
            sx={{
              marginBottom: "30px",
              color: "#555",
              textAlign: "center",
            }}
          >
            Join our library today to access a vast collection of books, track your borrow history, and more.
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Full Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{ marginBottom: "20px" }}
            />
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ marginBottom: "20px" }}
            />
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
                sx={{ marginBottom: "20px", textAlign: "center" }}
              >
                {error}
              </Typography>
            )}
            <SubmitButton fullWidth type="submit">
              Register
            </SubmitButton>
          </form>
        </CardContent>
      </RegisterCard>
    </Box>
  );
}
