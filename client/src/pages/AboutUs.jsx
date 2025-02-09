/* eslint-disable react/no-unescaped-entities */
import { Box, Typography, Container, Grid, Paper, Button } from "@mui/material";
import {
  LibraryBooks as LibraryBooksIcon,
  AccessTime as AccessTimeIcon,
  People as PeopleIcon,
} from "@mui/icons-material";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";

export default function AboutUs() {
  const { user } = useAuth();
  
  return (
    <>
      {/* Inline CSS for typewriter effect and other animations */}
      <style>
        {`
        /* Typewriter Effect */
@keyframes typing {
  from {
    clip-path: inset(0 100% 0 0);
  }
  to {
    clip-path: inset(0 0 0 0);
  }
}

@keyframes blink {
  50% {
    border-color: transparent;
  }
}

.typewriter {
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-align: center;
  border-right: 100px solid #fff; /* Cursor */
  animation: typing 4s steps(40) 1s forwards, blink 0.75s step-end infinite;
  clip-path: inset(0 100% 0 0);
}

        `}
      </style>

      <Navbar />
      
      <Box
        sx={{
          backgroundColor: "#f0f8ff",
          paddingY: 6,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "70px",
        }}
      >
        <Container maxWidth="lg">
          {/* Heading Section */}
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: 4,
              color: "#333333",
            }}
            className="typewriter" // Apply typewriter class here
          >
            About Nerdy Archive
          </Typography>
          <Typography
            variant="h5"
            sx={{
              textAlign: "center",
              color: "#555555",
              marginBottom: 4,
            }}
          >
            Revolutionizing the way you manage your eBook library
          </Typography>

          {/* Description Section */}
          <Typography
            variant="body1"
            sx={{
              color: "#555555",
              lineHeight: "1.8",
              textAlign: "center",
              marginBottom: 6,
            }}
          >
            Welcome to Nerdy Archive, where managing your eBook collection is
            as easy as a click! With our innovative and intuitive system, you
            can organize your books, track your reading habits, and even
            discover new releases. Whether you're an avid reader or managing a
            vast library, Nerdy Archive has everything you need to streamline
            your digital reading experience.
          </Typography>

          {/* Features Section */}
          <Grid container spacing={4} sx={{ marginBottom: 6 }}>
            <Grid item xs={12} sm={4}>
              <Paper
                sx={{
                  padding: 4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  boxShadow: 3,
                  textAlign: "center",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  borderRadius: "16px", // Rounded corners for a modern look
                }}
                className="card" // Hover effect for the card
              >
                <LibraryBooksIcon
                  color="primary"
                  sx={{ fontSize: 50, marginBottom: 2 }}
                />
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", marginBottom: 2 }}
                >
                  Effortless Library Management
                </Typography>
                <Typography variant="body2" sx={{ color: "#555555" }}>
                  Easily organize, borrow, and return eBooks with our
                  intuitive system. Your personal eBook library is just a
                  click away.
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Paper
                sx={{
                  padding: 4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  boxShadow: 3,
                  textAlign: "center",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  borderRadius: "16px", // Rounded corners for a modern look
                }}
                className="card" // Hover effect for the card
              >
                <AccessTimeIcon
                  color="secondary"
                  sx={{ fontSize: 50, marginBottom: 2 }}
                />
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", marginBottom: 2 }}
                >
                  Real-time Notifications & Updates
                </Typography>
                <Typography variant="body2" sx={{ color: "#555555" }}>
                  Stay up-to-date with the latest eBooks, reading progress,
                  and library updates. Get real-time notifications for your
                  reading activities and the newest additions.
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Paper
                sx={{
                  padding: 4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  boxShadow: 3,
                  textAlign: "center",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  borderRadius: "16px", // Rounded corners for a modern look
                }}
                className="card" // Hover effect for the card
              >
                <PeopleIcon
                  color="action"
                  sx={{ fontSize: 50, marginBottom: 2 }}
                />
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", marginBottom: 2 }}
                >
                  Seamless User Experience
                </Typography>
                <Typography variant="body2" sx={{ color: "#555555" }}>
                  Manage user profiles, track their reading activities, and
                  foster an inclusive community for book lovers. Nerdy Archive
                  is designed for users to have a seamless and enjoyable
                  experience.
                </Typography>
              </Paper>
            </Grid>
          </Grid>

          {/* Call to Action Section */}
          {user ? (
            <Box sx={{ textAlign: "center", marginBottom: 6 }}>
              <Typography
                variant="h6"
                sx={{ color: "#555555", marginBottom: 2 }}
              >
                Have any questions or suggestions?
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "#555555", marginBottom: 4 }}
              >
                We're always eager to hear from our users! Whether you're
                looking for support or simply want to share your thoughts,
                feel free to reach out to us. Your feedback helps us improve
                and bring you the best library management experience.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  textTransform: "none",
                  fontWeight: "bold",
                  paddingX: 4,
                  paddingY: 1.5,
                }}
                onClick={() =>
                  (window.location.href =
                    "https://mail.google.com/mail/?view=cm&fs=1&to=adityadhanarajkundu@gmail.com")
                }
                className="cta-button" // Hover effect for the button
              >
                Contact Us
              </Button>
            </Box>
          ) : (
            <Box sx={{ textAlign: "center", marginBottom: 6 }}>
              <Typography
                variant="h6"
                sx={{ color: "#555555", marginBottom: 2 }}
              >
                Ready to Explore a World of Books?
              </Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  textTransform: "none",
                  fontWeight: "bold",
                  paddingX: 4,
                  paddingY: 1.5,
                }}
                LinkComponent={Link}
                to="/users/login"
                className="cta-button" // Hover effect for the button
              >
                Get Started
              </Button>
            </Box>
          )}
        </Container>
      </Box>
      
      <Footer />
    </>
  );
}
