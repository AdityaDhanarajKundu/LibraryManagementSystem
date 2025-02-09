import { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Alert,
  Container,
  TextField,
  InputAdornment,
  Button,
} from "@mui/material";
import { Person, Email, AdminPanelSettings, Group, Search } from "@mui/icons-material";
import GavelIcon from "@mui/icons-material/Gavel";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../services/api";
import BackgroundImage from "../assets/homebg.jpg";

export default function UsersDb() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("/users");
        setUsers(response.data);
        setFilteredUsers(response.data);
      } catch (error) {
        setError(
          error.response?.data?.message ||
            "Failed to fetch users. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Handle search input change
  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term) ||
        user.id.toString().includes(term)
    );
    setFilteredUsers(filtered);
  };

  // Handle Promote/Revoke Action
  const handleRoleChange = async (userId, action) => {
    console.log(userId, action);
    try {
      await api.put("/users/make-admin", { userId, action });
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId
            ? { ...user, role: action === "promote" ? "admin" : "user" }
            : user
        )
      );

      // Update the filtered users if search term is active
      setFilteredUsers((prevFilteredUsers) =>
        prevFilteredUsers.map((user) =>
          user.id === userId
            ? { ...user, role: action === "promote" ? "admin" : "user" }
            : user
        )
      );

      alert(
        `User role updated to ${
          action === "promote" ? "admin" : "user"
        } successfully.`
      );
    } catch (error) {
      setError(error.response?.data?.message || "Failed to update role.");
    }
  };

  return (
    <>
      <Navbar />
      <Box
        sx={{
          backgroundImage: `url(${BackgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          pt: 8,
          pb: 8,
        }}
      >
        <Container maxWidth="lg" sx={{ mt: 5, mb: 5 }}>
          <Card>
            <CardContent>
              <Typography
                variant="h4"
                align="center"
                gutterBottom
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                }}
              >
                <Group /> Users Database
              </Typography>

              <TextField
                label="Search by Name, Email, or ID"
                variant="outlined"
                fullWidth
                margin="normal"
                value={searchTerm}
                onChange={handleSearch}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />

              {error && <Alert severity="error">{error}</Alert>}

              {loading ? (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "200px",
                  }}
                >
                  <CircularProgress />
                </Box>
              ) : (
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          <Typography variant="h6">UserId</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h6">
                            <Person /> Name
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h6">
                            <Email /> Email
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h6">
                            <AdminPanelSettings /> Role
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h6">
                            <GavelIcon /> Action
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>{user.id}</TableCell>
                          <TableCell>{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{user.role}</TableCell>
                          <TableCell>
                            {user.role !== "admin" && (
                              <Button
                                variant="contained"
                                color="success"
                                onClick={() =>
                                  handleRoleChange(user.id, "promote")
                                }
                                sx={{
                                  backgroundColor: "green", // Custom background color
                                  color: "white", // White text color
                                  "&:hover": {
                                    backgroundColor: "darkgreen", // Darker green on hover
                                  },
                                  padding: "8px 16px", // Custom padding for the button
                                  textTransform: "none", // To disable text transformation to uppercase
                                  boxShadow: 2, // Add some shadow effect for a 3D look
                                }}
                              >
                                Promote to Admin
                              </Button>
                            )}
                            {user.role === "admin" && (
                              <Button
                                variant="contained"
                                color="error"
                                onClick={() =>
                                  handleRoleChange(user.id, "revoke")
                                }
                                sx={{
                                  backgroundColor: "red", // Custom background color
                                  color: "white", // White text color
                                  "&:hover": {
                                    backgroundColor: "darkred", // Darker red on hover
                                  },
                                  padding: "8px 16px", // Custom padding for the button
                                  textTransform: "none", // To disable text transformation to uppercase
                                  boxShadow: 2, // Add some shadow effect for a 3D look
                                }}
                              >
                                Revoke Admin
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </CardContent>
          </Card>
        </Container>
      </Box>

      <Footer />
    </>
  );
}
