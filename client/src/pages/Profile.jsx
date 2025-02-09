import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  Avatar,
  Box,
} from "@mui/material";
import { Email, Person, AccountCircle, Edit } from "@mui/icons-material";
import api from "../services/api";
import BackgroundImage from "../assets/profile.jpg";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Profile() {
  const navigate = useNavigate();  
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get("/users/getUser");
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  if (!user) {
    return (
      <Container sx={{ textAlign: "center", marginTop: "100px" }}>
        <Typography variant="h6">Loading profile...</Typography>
      </Container>
    );
  }

  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Background Section */}
      <Box
        sx={{
          backgroundImage: `url(${BackgroundImage})`, // Replace with your image URL
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: "0px", // To account for the navbar height
          paddingBottom: "50px", // To ensure the footer doesn't overlap
        }}
      >
        <Container maxWidth="sm" sx={{ marginTop: "0px" }}>
          <Card
            sx={{
              padding: "20px",
              backgroundColor: "rgba(255, 255, 0, 0.8)", // Yellow transparent
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
              borderRadius: "15px",
            }}
          >
            <Grid
              container
              spacing={2}
              alignItems="center"
              justifyContent="center"
            >
              <Grid item>
                <Avatar sx={{ bgcolor: "#3f51b5", width: 70, height: 70 }}>
                  <AccountCircle sx={{ fontSize: 50 }} />
                </Avatar>
              </Grid>
            </Grid>
            <CardContent>
              <Typography variant="h5" align="center" gutterBottom>
                {user.name}
              </Typography>
              <Typography
                variant="body1"
                color="textSecondary"
                align="center"
                gutterBottom
              >
                Role: {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
              </Typography>
              <Grid container spacing={1} sx={{ marginTop: 3 }}>
                <Grid item xs={2}>
                  <Person sx={{ color: "primary.main" }} />
                </Grid>
                <Grid item xs={10}>
                  <Typography variant="body1">
                    <strong style={{ color: "primary.main" }}>Name:</strong>{" "}
                    {user.name}
                  </Typography>
                </Grid>

                <Grid item xs={2}>
                  <Email sx={{ color: "primary.main" }} />
                </Grid>
                <Grid item xs={10}>
                  <Typography variant="body1">
                    <strong style={{ color: "primary.main" }}>Email:</strong>{" "}
                    {user.email}
                  </Typography>
                </Grid>
              </Grid>
              <Button
                variant="contained"
                color="primary"
                startIcon={<Edit />}
                fullWidth
                sx={{ marginTop: "20px" }}
                onClick={() => navigate("/update-profile")} // Placeholder
              >
                Edit Profile
              </Button>
            </CardContent>
          </Card>
        </Container>
      </Box>

      {/* Footer */}
      <Footer />
    </>
  );
}