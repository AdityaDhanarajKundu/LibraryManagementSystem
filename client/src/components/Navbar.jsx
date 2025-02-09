import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { motion } from "framer-motion";
import NavLogo from "../assets/navlogo.png";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/"); // Redirect to Home after logout
  };

  // Navigation links
  const navLinks = [
    { path: "/", label: "Home", alwaysVisible: true },
    { path: "/books", label: "Books", alwaysVisible: false }, // Books visible only when logged in
    { path: "/about-us", label: "About Us", alwaysVisible: true },
    { path: "/profile", label: "Profile", alwaysVisible: false }, // Only for logged-in users
  ];

  return (
    <motion.nav 
      initial={{ y: -50, opacity: 0 }} 
      animate={{ y: 0, opacity: 1 }} 
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 w-full bg-gradient-to-r from-blue-300 to-blue-500 shadow-2xl z-50"
    >
      <div className="container mx-auto flex items-center justify-between py-3 px-6">
        {/* Logo */}
        <motion.div whileHover={{ scale: 1.1 }}>
          <Link to="/" className="flex items-center">
            <img src={NavLogo} alt="eLibrary Logo" className="w-40 drop-shadow-xl" />
          </Link>
        </motion.div>

        {/* Navigation Links */}
        <div className="flex-grow flex justify-center space-x-7">
          {navLinks.map((item, index) => {
            const isDisabled = !user && !item.alwaysVisible; // Disable non-essential links when logged out

            return (
              <motion.div key={index} whileHover={{ scale: isDisabled ? 1 : 1.1 }} whileTap={{ scale: isDisabled ? 1 : 0.9 }}>
                {user || item.alwaysVisible ? (
                  <Link 
                    to={isDisabled ? "#" : item.path} 
                    className={`relative text-lg font-medium px-4 py-2 rounded-lg transition duration-300 ${
                      isDisabled
                        ? "text-gray-400 cursor-not-allowed"
                        : "hover:bg-blue-300 hover:text-white hover:shadow-xl"
                    } ${
                      location.pathname === item.path && !isDisabled ? "bg-blue-500 text-white shadow-md" : "text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                ) : null}
              </motion.div>
            );
          })}
        </div>

        {/* Logout Button - Right Side */}
        {user && (
          <motion.button 
            whileHover={{ scale: 1.1 }} 
            whileTap={{ scale: 0.9 }}
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg text-lg font-semibold transition hover:bg-red-600 hover:shadow-xl"
          >
            Logout
          </motion.button>
        )}
      </div>
    </motion.nav>
  );
}
