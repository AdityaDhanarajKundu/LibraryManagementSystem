import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Stack,
  Link,
} from "@mui/material";
import {
  Search as SearchIcon,
  Book as BookIcon,
  Person as PersonIcon,
  LocalLibrary as LibraryIcon,
  TrendingUp as TrendingUpIcon,
  Login as LoginIcon,
} from "@mui/icons-material";
import Navbar from "../components/Navbar";
import BackgroundImage from "../assets/first.jpg";
import { useAuth } from "../hooks/useAuth"; // Assuming you have a custom hook for auth state
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user } = useAuth(); // Assuming the user object will be null if not logged in
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <Box
        sx={{
          backgroundImage: `url(${BackgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "#fff",
          textAlign: "center",
          p: 4,
        }}
      >
        <Typography variant="h2" fontWeight="bold" gutterBottom>
          Welcome to Nerdy Archive
        </Typography>
        <Typography variant="h6" gutterBottom>
          Your ultimate eBook library management system
        </Typography>

        {/* Conditionally render the buttons based on user authentication */}
        {user ? (
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<SearchIcon />}
            sx={{ mt: 3 }}
            onClick={() => navigate("/books")}
          >
            Explore Library
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<LoginIcon />}
            sx={{ mt: 3 }}
            onClick={() => navigate("/users/login")}
          >
            Login
          </Button>
        )}
      </Box>

      <Container maxWidth="lg" sx={{ mt: 6, mb: 6 }}>
        <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
          Features
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          mb={4}
        >
          Discover what makes Nerdy Archive the best choice for managing your
          eBook library.
        </Typography>

        <Stack spacing={4}>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={4}>
              <Card
                sx={{
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "translateY(-10px) rotate(5deg)",
                    boxShadow: "0 15px 30px rgba(0, 0, 0, 0.2)",
                    cursor: "pointer",
                  },
                  borderRadius: "16px", // Rounded corners for a modern look
                }}
              >
                <CardMedia
                  component="img"
                  alt="Library"
                  height="140"
                  image="https://images.unsplash.com/photo-1518373714866-3f1478910cc0?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                />
                <CardContent>
                  <Typography
                    variant="h5"
                    component="div"
                    sx={{ display: "flex", alignItems: "center", gap: 1 }}
                  >
                    <LibraryIcon color="primary" /> Manage Your Library
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Easily organize, borrow, and return books with our intuitive
                    interface.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card
                sx={{
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "translateY(-10px) rotate(5deg)",
                    boxShadow: "0 15px 30px rgba(0, 0, 0, 0.2)",
                    cursor: "pointer",
                  },
                  borderRadius: "16px", // Rounded corners for a modern look
                }}
              >
                <CardMedia
                  component="img"
                  alt="Trending"
                  height="140"
                  image="https://i.insider.com/6149fa5fde0e7b00194b9264?width=1300&format=jpeg&auto=webp"
                />
                <CardContent>
                  <Typography
                    variant="h5"
                    component="div"
                    sx={{ display: "flex", alignItems: "center", gap: 1 }}
                  >
                    <TrendingUpIcon color="secondary" /> Popular Reads
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Stay updated with the most popular and trending books in the
                    library.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card
                sx={{
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "translateY(-10px) rotate(5deg)",
                    boxShadow: "0 15px 30px rgba(0, 0, 0, 0.2)",
                    cursor: "pointer",
                  },
                  borderRadius: "16px", // Rounded corners for a modern look
                }}
              >
                <CardMedia
                  component="img"
                  alt="Users"
                  height="140"
                  image="https://images.unsplash.com/photo-1646217120680-735b95df956b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                />
                <CardContent>
                  <Typography
                    variant="h5"
                    component="div"
                    sx={{ display: "flex", alignItems: "center", gap: 1 }}
                  >
                    <PersonIcon color="action" /> User Management
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Seamlessly manage user accounts and their transactions.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Only show buttons if the user is logged in */}
          {user && (
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={3}
              alignItems="center"
              justifyContent="center"
              sx={{ mt: 6 }}
            >
              <Button
                variant="contained"
                color="primary"
                startIcon={<BookIcon />}
                size="large"
                onClick={() => navigate("/dashboard")}
              >
                Go to Dashboard
              </Button>
            </Stack>
          )}
        </Stack>
      </Container>

      {/* Conditionally render Get Started Section if user is logged in */}

      <Box
        sx={{
          py: 6,
          backgroundColor: "primary.main",
          color: "#fff",
          textAlign: "center",
        }}
      >
        <Container>
          <Typography variant="h4" gutterBottom>
            Start Your Journey Today
          </Typography>
          {user ? (
            <Typography variant="body2" color="black" sx={{ mt: 4 }}>
              Made by{" "}
              <Link
                href="https://github.com/AdityaDhanarajKundu"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  textDecoration: "none",
                  fontWeight: "bold",
                  fontStyle: "italic",
                  color: "black",
                  ":hover": {
                    color: "white",
                  },
                }}
              >
                Aditya Dhanaraj Kundu
              </Link>
            </Typography>
          ) : (
            <>
              <Typography variant="body1" gutterBottom>
                Join Nerdy Archive and dive into a world of unlimited knowledge
                and books.
              </Typography>
              <Button
                variant="outlined"
                color="inherit"
                size="large"
                onClick={() => navigate("/users/register")}
              >
                Get Started
              </Button>
            </>
          )}
        </Container>
      </Box>
    </>
  );
};

export default Home;
