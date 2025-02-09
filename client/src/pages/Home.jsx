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
import { Typewriter } from "react-simple-typewriter";
import { motion } from "framer-motion";
import {
  Search as SearchIcon,
  Book as BookIcon,
  Person as PersonIcon,
  LocalLibrary as LibraryIcon,
  TrendingUp as TrendingUpIcon,
  Login as LoginIcon,
} from "@mui/icons-material";
import Navbar from "../components/Navbar";
import BackgroundImage from "../assets/front.jpg";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const Home = () => {
  const { user } = useAuth();
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
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Typography variant="h2" fontWeight="bold" gutterBottom>
            <Typewriter
              words={["Welcome to Nerdy Archive", "Your Digital Library"]}
              loop={true}
              cursor
              cursorStyle="_"
              typeSpeed={80}
              deleteSpeed={50}
              delaySpeed={1500}
            />
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
        >
          <Typography variant="h6" gutterBottom>
            Your ultimate eBook library management system
          </Typography>
        </motion.div>

        {user ? (
          <motion.div whileHover={{ scale: 1.1 }}>
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
          </motion.div>
        ) : (
          <motion.div whileHover={{ scale: 1.1 }}>
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
          </motion.div>
        )}
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ mt: 6, mb: 6,pb: 6 }}>
        <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
          Features
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" mb={4}>
          Discover what makes Nerdy Archive the best choice for managing your eBook library.
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image="https://images.unsplash.com/photo-1518373714866-3f1478910cc0?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Library"
                />
                <CardContent>
                  <Typography variant="h5">
                    <LibraryIcon color="primary" /> Manage Your Library
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Easily organize, borrow, and return books with our intuitive interface.
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image="https://i.insider.com/6149fa5fde0e7b00194b9264?width=1300&format=jpeg&auto=webp"
                  alt="Trending"
                />
                <CardContent>
                  <Typography variant="h5">
                    <TrendingUpIcon color="secondary" /> Popular Reads
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Stay updated with the most popular and trending books in the library.
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image="https://images.unsplash.com/photo-1646217120680-735b95df956b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Users"
                />
                <CardContent>
                  <Typography variant="h5">
                    <PersonIcon color="action" /> User Management
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Seamlessly manage user accounts and their transactions.
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        </Grid>
      </Container>

      {/* Footer Section */}
      <Footer />
    </>
  );
};

export default Home;
