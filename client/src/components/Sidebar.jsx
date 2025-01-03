import {Link} from "react-router-dom";
import{Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import DashboardIcon from '@mui/icons-material/Dashboard';
import BookIcon from '@mui/icons-material/Book';
import PersonIcon from '@mui/icons-material/Person';

export default function Sidebar() {
    return (
      <Box
        component="aside"
        sx={{
          width: "160px", // Increased width to accommodate long words
          backgroundColor: "#2c85af",
          position: "fixed", // Fix the sidebar
          top: 0,
          left: 0,
          height: "100vh",
          boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
          padding: "20px",
          marginTop: "64px",
        }}
      >
        <List>
          {/* Dashboard Link */}
          <ListItem disablePadding sx={{ marginBottom: "10px" }}>
            <ListItemButton
              component={Link}
              to="/dashboard"
              sx={{ borderRadius: "8px" }}
            >
              <ListItemIcon>
                <DashboardIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Dashboard" sx={{ color: "white" }} />
            </ListItemButton>
          </ListItem>

          {/* Books Link */}
          <ListItem disablePadding sx={{ marginBottom: "10px" }}>
            <ListItemButton
              component={Link}
              to="/books"
              sx={{ borderRadius: "8px" }}
            >
              <ListItemIcon>
                <BookIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Books" sx={{ color: "white" }} />
            </ListItemButton>
          </ListItem>

          {/* Profile Link */}
          <ListItem disablePadding sx={{ marginBottom: "10px" }}>
            <ListItemButton
              component={Link}
              to="/profile"
              sx={{ borderRadius: "8px" }}
            >
              <ListItemIcon>
                <PersonIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Profile" sx={{ color: "white" }} />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    );
}