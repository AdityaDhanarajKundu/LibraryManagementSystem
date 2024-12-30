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
      sx={{ backgroundColor: "#f4f4f4", zIndex: 2, top: 0 }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo Section with Image */}
        {user ? (
          <Box
            component={Link}
            to="/dashboard"
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
        ) : (
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
        )}

        {/* Navigation Links */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            component={Link}
            to="/"
            sx={{
              color: "#333333",
              textTransform: "none",
              textDecoration: "none",
              fontWeight: "medium",
              ":hover": { color: "#000000" },
            }}
          >
            Home
          </Button>
          {user ? (
            <Button
              component={Link}
              to="/books"
              sx={{
                color: "#333333",
                textTransform: "none",
                textDecoration: "none",
                fontWeight: "medium",
                ":hover": { color: "#000000" },
              }}
            >
              Books
            </Button>
          ) : (
            <Button
              component={Link}
              onClick={() => alert("Please login to access books")}
              sx={{
                color: "#333333",
                textTransform: "none",
                textDecoration: "none",
                fontWeight: "medium",
                ":hover": { color: "#000000" },
              }}
            >
              Books
            </Button>
          )}
          {user && user.role === "admin" && (
            <Button
              component={Link}
              to="/add-book"
              sx={{
                color: "#333333",
                textTransform: "none",
                textDecoration: "none",
                fontWeight: "medium",
                ":hover": { color: "#000000" },
              }}
            >
              Add Book
            </Button>
          )}
          {user ? (
            <Button
              component={Link}
              to="/profile"
              sx={{
                color: "#333333",
                textTransform: "none",
                textDecoration: "none",
                fontWeight: "medium",
                ":hover": { color: "#000000" },
              }}
            >
              Profile
            </Button>
          ) : (
            <Button
              component={Link}
              onClick={() => alert("Please login to access profile")}
              sx={{
                color: "#333333",
                textTransform: "none",
                textDecoration: "none",
                fontWeight: "medium",
                ":hover": { color: "#000000" },
              }}
            >
              Profile
            </Button>
          )}
          <Button
            component={Link}
            to="/about-us"
            sx={{
              color: "#333333",
              textTransform: "none",
              textDecoration: "none",
              fontWeight: "medium",
              ":hover": { color: "#000000" },
            }}
          >
            About Us
          </Button>
        </Box>

        {/* Logout Button */}
        {user && (
          <Button
            onClick={handleLogout}
            sx={{
              color: "#ffffff", // White text for good contrast
              backgroundColor: "#e53935", // Vibrant red
              textTransform: "none",
              borderRadius: 2,
              px: 2,
              ":hover": { backgroundColor: "#b71c1c" }, // Darker red on hover
            }}
          >
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
