import { Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion"; // For animations
import { Dashboard, Book, Person } from "@mui/icons-material";

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <motion.aside

      className={`fixed top-0 left-0 h-screen p-5 shadow-lg backdrop-blur-md bg-blue-900/80 text-white transition-all ${
        isCollapsed ? "w-20" : "w-55"
      }`}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute top-5 right-4 text-white text-xl"
      >
        {isCollapsed ? "▶" : "◀"}
      </button>

      {/* Sidebar Items (Moved slightly lower) */}
      <nav className="space-y-6 mt-16"> {/* Adjusted margin-top to 16 */}
        <SidebarItem to="/dashboard" Icon={Dashboard} label="Dashboard" isCollapsed={isCollapsed} />
        <SidebarItem to="/books" Icon={Book} label="Books" isCollapsed={isCollapsed} />
        <SidebarItem to="/profile" Icon={Person} label="Profile" isCollapsed={isCollapsed} />
      </nav>
    </motion.aside>
  );
}

function SidebarItem({ to, Icon, label, isCollapsed }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }} // Smooth hover effect
      transition={{ duration: 0.2 }}
    >
      <Link
        to={to}
        className="flex items-center space-x-4 p-3 rounded-lg transition-colors duration-300 hover:bg-blue-700"
      >
        <Icon className="text-white" fontSize="medium" />
        {!isCollapsed && <span className="text-lg">{label}</span>}
      </Link>
    </motion.div>
  );
}
