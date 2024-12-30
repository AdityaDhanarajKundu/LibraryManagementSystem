import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import BackgroundImage from "../assets/homebg.jpg";
import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  Avatar,
} from "@mui/material";
import { People, Book, SwapHoriz } from "@mui/icons-material";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import InventoryIcon from "@mui/icons-material/Inventory";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Dashboard() {
  const [stats, setStats] = useState({ users: 0, books: 0, transactions: 0 });
  const [activities, setActivities] = useState([]);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [statsResponse, activitiesResponse, userDataResponse] =
          await Promise.all([
            api.get("/dashboard"),
            api.get("/recent-activities/"),
            api.get("/users/getUser"),
          ]);

        setStats(statsResponse.data);
        setActivities(activitiesResponse.data.activities);
        setUserData(userDataResponse.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        marginTop={"70px"}
        marginLeft={"200px"}
      >
        <CircularProgress />
      </Box>
    );
  }

  const statsData = [
    {
      title: "Total Users",
      value: stats.users,
      icon: <People fontSize="large" />,
      bgColor: "rgba(63, 81, 181, 0.1)",
    },
    {
      title: "Total Books",
      value: stats.books,
      icon: <Book fontSize="large" />,
      bgColor: "rgba(76, 175, 80, 0.1)",
    },
    {
      title: "Total Transactions",
      value: stats.transactions,
      icon: <SwapHoriz fontSize="large" />,
      bgColor: "rgba(255, 152, 0, 0.1)",
    },
  ];

  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100vh"
      marginTop={"70px"}
      marginLeft={"200px"}
    >
      <Navbar />
      <Box display="flex" flex={1}>
        <Sidebar sx={{ zIndex: 1 }} />
        <Box
          component="main"
          flex={1}
          p={4}
          sx={{
            backgroundImage: `url(${BackgroundImage})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Welcome Message */}
          <Box mb={4} sx={{ zIndex: 2 }}>
            <Typography variant="h4" color="white" mb={1}>
              Welcome, {userData?.name || "User"}!
            </Typography>
            <Typography variant="body1" color="white">
              Here’s what’s happening in your library today.
            </Typography>
          </Box>

          {/* Quick Stats */}
          <Grid container spacing={3} mb={4}>
            {statsData.map((stat, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  style={{
                    backgroundColor: `${stat.bgColor.replace("0.1", "0.6")}`,
                    boxShadow: "0 8px 15px rgba(0, 0, 0, 0.2)",
                    borderRadius: "15px",
                    transition: "all 0.3s ease-in-out",
                    "&:hover": {
                      boxShadow: "0 12px 25px rgba(0, 0, 0, 0.3)",
                      transform: "scale(1.05)",
                    },
                  }}
                >
                  <CardContent>
                    <Box display="flex" alignItems="center">
                      <Avatar
                        sx={{
                          backgroundColor: "white",
                          color: stat.bgColor.includes("primary")
                            ? "primary.main"
                            : stat.bgColor.includes("success")
                            ? "success.main"
                            : "warning.main",
                          mr: 2,
                        }}
                      >
                        {React.cloneElement(stat.icon, {
                          style: { fontSize: "30px" },
                        })}
                      </Avatar>
                      <Box>
                        <Typography variant="h6" gutterBottom color="white">
                          {stat.title}
                        </Typography>
                        <Typography
                          variant="h4"
                          fontWeight="bold"
                          color="white"
                        >
                          {stat.value}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Recent Activities */}
          <Box
            mb={4}
            p={3}
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              borderRadius: "10px",
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
              position: "relative",
              zIndex: 2,
            }}
          >
            <Typography variant="h6" mb={2}>
              Recent Activities
            </Typography>
            <ul style={{ listStyleType: "none", padding: 0 }}>
              {activities.length > 0 ? (
                activities.map((activity, index) => (
                  <li
                    key={index}
                    style={{ marginBottom: "10px", color: "#555" }}
                  >
                    {activity.icon} {activity.message}
                  </li>
                ))
              ) : (
                <Typography variant="body2" color="textSecondary">
                  Not Available
                </Typography>
              )}
            </ul>
          </Box>

          {/* Quick Actions */}
          <Grid container spacing={3} mb={14}>
            <Grid item xs={12} sm={4}>
              <Card
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  borderRadius: "15px",
                  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
                  textAlign: "center",
                  p: 3,
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              >
                <Box display={"flex"} flexDirection={"row"}>
                  <LibraryBooksIcon
                    color="error"
                    sx={{ marginRight: "10px", marginLeft: "50px" }}
                  />
                  <Typography variant="h6" mb={2}>
                    Borrow a Book
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    borderRadius: "50px",
                    padding: "12px 25px",
                    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.15)",
                    "&:hover": {
                      boxShadow: "0 6px 18px rgba(0, 0, 0, 0.2)",
                    },
                  }}
                  onClick={() => navigate("/books")}
                >
                  Browse Books
                </Button>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  borderRadius: "15px",
                  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
                  textAlign: "center",
                  p: 3,
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              >
                <Box display={"flex"} flexDirection={"row"}>
                  <InventoryIcon
                    color="error"
                    sx={{ marginRight: "10px", marginLeft: "50px" }}
                  />
                  <Typography variant="h6" mb={2}>
                    Transactions
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    borderRadius: "50px",
                    padding: "12px 25px",
                    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.15)",
                    "&:hover": {
                      boxShadow: "0 6px 18px rgba(0, 0, 0, 0.2)",
                    },
                  }}
                  onClick={() => {
                    if (userData?.role === "admin") {
                      navigate("/transactions");
                    } else {
                      navigate(`/transactions/${userData?.id}`);
                    }
                  }}
                >
                  View Transactions
                </Button>
              </Card>
            </Grid>

            {userData?.role === "admin" && (
              <Grid item xs={12} sm={4}>
                <Card
                  sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    borderRadius: "15px",
                    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
                    textAlign: "center",
                    p: 3,
                    transition: "all 0.3s ease-in-out",
                    "&:hover": {
                      transform: "scale(1.05)",
                    },
                  }}
                >
                  <Box display={"flex"} flexDirection={"row"}>
                    <VerifiedUserIcon
                      color="error"
                      sx={{ marginRight: "10px", marginLeft: "48px" }}
                    />
                    <Typography variant="h6" mb={2}>
                      Users Database
                    </Typography>
                  </Box>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{
                      borderRadius: "50px",
                      padding: "12px 25px",
                      boxShadow: "0 5px 15px rgba(0, 0, 0, 0.15)",
                      "&:hover": {
                        boxShadow: "0 6px 18px rgba(0, 0, 0, 0.2)",
                      },
                    }}
                    onClick={() => navigate("/users")}
                  >
                    Manage Users
                  </Button>
                </Card>
              </Grid>
            )}

            <Grid item xs={12} sm={4}>
              <Card
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  borderRadius: "15px",
                  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
                  textAlign: "center",
                  p: 3,
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              >
                <Box display={"flex"} flexDirection={"row"}>
                  <ManageAccountsIcon
                    color="error"
                    sx={{ marginRight: "10px", marginLeft: "50px" }}
                  />
                  <Typography variant="h6" mb={2}>
                    Update Profile
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    borderRadius: "50px",
                    padding: "12px 25px",
                    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.15)",
                    "&:hover": {
                      boxShadow: "0 6px 18px rgba(0, 0, 0, 0.2)",
                    },
                  }}
                  onClick={() => navigate("/update-profile")}
                >
                  Edit Profile
                </Button>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Footer sx={{ position: "relative", zIndex: 3 }} />
    </Box>
  );
}
