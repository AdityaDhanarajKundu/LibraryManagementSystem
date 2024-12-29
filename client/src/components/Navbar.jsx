import { AppBar, Toolbar, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import NavLogo from "../assets/navlogo.png";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/users/login");
  };

  return (
    <AppBar
      position="fixed"
      sx={{ backgroundColor: "#4A4A4A", zIndex: 2, top: 0 }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo Section with Image */}
        <Box
          component={Link}
          to="/"
          sx={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
          }}
        >
          <img
            src={NavLogo}
            alt="eLibrary Logo"
            style={{ width: "180px", marginRight: "10px" }}
          />
        </Box>

        {/* Navigation Links */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            component={Link}
            to="/"
            sx={{
              color: "#ffffff",
              textTransform: "none",
              textDecoration: "none",
              fontWeight: "medium",
            }}
          >
            Home
          </Button>
          <Button
            component={Link}
            to="/books"
            sx={{
              color: "#ffffff",
              textTransform: "none",
              textDecoration: "none",
              fontWeight: "medium",
            }}
          >
            Books
          </Button>
          {user && user.role === "admin" && (
            <Button
              component={Link}
              to="/add-book"
              sx={{
                color: "#ffffff",
                textTransform: "none",
                textDecoration: "none",
                fontWeight: "medium",
              }}
            >
              Add Book
            </Button>
          )}
          <Button
            component={Link}
            to="/profile"
            sx={{
              color: "#ffffff",
              textTransform: "none",
              textDecoration: "none",
              fontWeight: "medium",
            }}
          >
            Profile
          </Button>
          <Button
            component={Link}
            to="/profile"
            sx={{
              color: "#ffffff",
              textTransform: "none",
              textDecoration: "none",
              fontWeight: "medium",
            }}
          >
            About Us
          </Button>
        </Box>

        {/* Logout Button */}
        <Button
          onClick={handleLogout}
          sx={{
            color: "#ffffff",
            backgroundColor: "red",
            textTransform: "none",
            borderRadius: 2,
            px: 2,
            ":hover": { backgroundColor: "darkred" },
          }}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}
