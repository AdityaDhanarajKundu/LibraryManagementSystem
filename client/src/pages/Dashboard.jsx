import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import BackgroundImage from "../assets/homebg.jpg";
import React,{ useState, useEffect } from "react";
import {Box, Grid, Card, CardContent, Typography, Button, CircularProgress} from "@mui/material"; 
import {People, Book, SwapHoriz} from "@mui/icons-material";
import api from "../services/api";

export default function Dashboard() {
    const [stats, setStats] = useState({ users: 0, books: 0, transactions: 0 });
    const [activities, setActivities] = useState([]);
    const [userData, setUserData] = useState(null); // Change state to store all user data
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
      const fetchDashboardData = async () =>{
        try{
          const [statsResponse, activitiesResponse, userDataResponse] =
            await Promise.all([
              api.get("/dashboard"),
              api.get("/recent-activities/"),
              api.get("/users/getUser"),
            ]);

            setStats(statsResponse.data);
            setActivities(activitiesResponse.data.activities);
            setUserData(userDataResponse.data);
        }catch(error){
          console.error("Error fetching dashboard data:", error);
        }finally{
          setLoading(false);
        }
      };

      fetchDashboardData();
    },[]);

    if(loading){
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
        <Navbar /> {/* Include Navbar */}
        <Box display="flex" flex={1}>
          <Sidebar sx={{ zIndex: 1 }} /> {/* Include Sidebar */}
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
              
            }}
          >
            {/* Welcome Message */}
            <Box mb={4}>
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
                      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                      borderRadius: "12px",
                    }}
                  >
                    <CardContent>
                      <Box display="flex" alignItems="center">
                        <Box mr={2}>
                          {React.cloneElement(stat.icon, {
                            style: { color: "white" },
                          })}
                        </Box>
                        <Box>
                          <Typography
                            variant="h6"
                            gutterBottom
                            style={{ color: "white" }}
                          >
                            {stat.title}
                          </Typography>
                          <Typography
                            variant="h4"
                            fontWeight="bold"
                            style={{ color: "white" }}
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
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
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
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <Card
                  sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    borderRadius: "10px",
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                    textAlign: "center",
                    p: 3,
                  }}
                >
                  <Typography variant="h6" mb={2}>
                    Borrow a Book
                  </Typography>
                  <Button variant="contained" color="primary">
                    Browse Books
                  </Button>
                </Card>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Card
                  sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    borderRadius: "10px",
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                    textAlign: "center",
                    p: 3,
                  }}
                >
                  <Typography variant="h6" mb={2}>
                    View Transactions
                  </Typography>
                  <Button variant="contained" color="primary">
                    Manage Transactions
                  </Button>
                </Card>
              </Grid>
              {userData?.role === "admin" && ( // Only display for admin users
                <Grid item xs={12} sm={4}>
                  <Card
                    sx={{
                      backgroundColor: "rgba(255, 255, 255, 0.9)", // Translucent white
                      borderRadius: "10px",
                      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                      textAlign: "center",
                      p: 3,
                    }}
                  >
                    <Typography variant="h6" mb={2}>
                      Authorization Management
                    </Typography>
                    <Button variant="contained" color="primary">
                      Manage Roles
                    </Button>
                  </Card>
                </Grid>
              )}

              <Grid item xs={12} sm={4}>
                <Card
                  sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    borderRadius: "10px",
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                    textAlign: "center",
                    p: 3,
                  }}
                >
                  <Typography variant="h6" mb={2}>
                    Update Profile
                  </Typography>
                  <Button variant="contained" color="primary">
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