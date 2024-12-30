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
                  }}
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
                  }}
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
                  }}
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