import { useState,useEffect } from "react";
import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Avatar,
} from "@mui/material";
import { AccountCircle, Visibility, VisibilityOff } from "@mui/icons-material";
import BackgroundImage from "../assets/transac.jpg";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../services/api";

export default function UpdateProfile(){
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState({});
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    useEffect(() => {
      const fetchUserData = async () => {
        try{
          const response = await api.get("/users/getUser");
          console.log(response);
          setFormData({
            name: response.data.name,
            email: response.data.email,
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
          });
        }catch(error){
          console.error("Error fetching user data:", error);
        }
      }
      
      fetchUserData();
    },[]);

    const handleInputChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validatePasswords = () => {
      const newErrors = {};
      if (formData.newPassword && formData.newPassword.length < 6) {
        newErrors.newPassword =
          "New password must be at least 6 characters long.";
      }
      if (formData.newPassword !== formData.confirmNewPassword) {
        newErrors.confirmNewPassword = "Passwords do not match.";
      }
      return newErrors;
    };

    const handleSubmit = async (e) => {
      e.preventDefault();

      // Validate password fields
      const validationErrors = validatePasswords();
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      try {
        const { data } = await api.put("/users/update", {
          name: formData.name,
          email: formData.email,
          password: formData.newPassword, // API will hash it before saving
        });
        alert(data.message);
      } catch (error) {
        alert(error.response?.data?.message || "Error updating profile");
      }
    };

    return (
      <>
        {/* Navbar */}
        <Navbar />
        {/* Background Section */}
        <Box
          sx={{
            backgroundImage: `url(${BackgroundImage})`,
            backgroundSize: "cover",
            minHeight: "100vh",
            paddingBottom: "50px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Container maxWidth="md">
            <Card
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "20px",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
                borderRadius: "15px",
                backgroundColor: "rgba(255, 255, 255)",
              }}
            >
              {/* Profile Icon */}
              <Grid item xs={4} display="flex" justifyContent="center">
                <Avatar sx={{ bgcolor: "#3f51b5", width: 120, height: 120 }}>
                  <AccountCircle sx={{ fontSize: 80 }} />
                </Avatar>
              </Grid>
              {/* Input Fields */}
              <Grid item xs={8}>
                <CardContent>
                  <Typography variant="h5" align="center" gutterBottom>
                    Update Profile
                  </Typography>
                  <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          label="Name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          fullWidth
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          label="Email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          fullWidth
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          label="Old Password"
                          name="oldPassword"
                          type={showOldPassword ? "text" : "password"}
                          value={formData.oldPassword}
                          onChange={handleInputChange}
                          fullWidth
                          variant="outlined"
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={() =>
                                    setShowOldPassword(!showOldPassword)
                                  }
                                  edge="end"
                                >
                                  {showOldPassword ? (
                                    <VisibilityOff />
                                  ) : (
                                    <Visibility />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          label="New Password"
                          name="newPassword"
                          type={showNewPassword ? "text" : "password"}
                          value={formData.newPassword}
                          onChange={handleInputChange}
                          fullWidth
                          variant="outlined"
                          error={!!errors.newPassword}
                          helperText={errors.newPassword}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={() =>
                                    setShowNewPassword(!showNewPassword)
                                  }
                                  edge="end"
                                >
                                  {showNewPassword ? (
                                    <VisibilityOff />
                                  ) : (
                                    <Visibility />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          label="Confirm New Password"
                          name="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          fullWidth
                          variant="outlined"
                          error={!!errors.confirmPassword}
                          helperText={errors.confirmPassword}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={() =>
                                    setShowConfirmPassword(!showConfirmPassword)
                                  }
                                  edge="end"
                                >
                                  {showConfirmPassword ? (
                                    <VisibilityOff />
                                  ) : (
                                    <Visibility />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          fullWidth
                        >
                          Update Profile
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </CardContent>
              </Grid>
            </Card>
          </Container>
        </Box>
        {/* Footer */}
        <Footer />
      </>
    );
}