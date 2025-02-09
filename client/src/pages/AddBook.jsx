import { useState } from "react";
import { UploadFile, AddPhotoAlternate } from "@mui/icons-material";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  MenuItem,
  InputLabel,
  Select,
  FormControl,
  Alert,
  CircularProgress,
} from "@mui/material";
import {useAuth} from "../hooks/useAuth";
import { Navigate, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BackgroundImage from "../assets/addbook.jpg";
import api from "../services/api";

export default function AddBook(){
    const{user} = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
      title: "",
      author: "",
      genre: "",
      quantity: 1,
      status: "available",
    });

    const [file, setFile] = useState(null);
    const [thumbnail, setThumbnail] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    if(!user || user.role !== "admin"){
        return <Navigate to="/users/login" />;
    }

    const handleInputChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
      setFile(e.target.files[0]);
    };

    const handleThumbnailChange = (e) => {
      setThumbnail(e.target.files[0]);
    };

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setError(null);
        setSuccess(null);

        if (!formData.title || !formData.author) {
          setError("Title and Author are required.");
          return;
        }

        const bookData = new FormData();
        bookData.append("title", formData.title);
        bookData.append("author", formData.author);
        bookData.append("genre", formData.genre);
        bookData.append("description", formData.description); // Add description here
        bookData.append("quantity", formData.quantity);
        bookData.append("status", formData.status);
        if (file) bookData.append("file", file);
        if (thumbnail) bookData.append("thumbnail", thumbnail);

        setLoading(true);
        try {
          const response = await api.post("/books", bookData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          setSuccess(response.data.message);
          setFormData({
            title: "",
            author: "",
            genre: "",
            description: "", // Reset description
            quantity: 1,
            status: "available",
          });
          setFile(null);
          setThumbnail(null);
          setTimeout(() => navigate("/books"), 1500);
        } catch (error) {
          setError(error.response?.data?.message || "Failed to add book.");
        } finally {
          setLoading(false);
        }
    };

    return (
      <>
        {/* Navbar */}
        <Navbar />

        {/* Background */}
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
            pt: 8, // Add padding to offset the fixed Navbar
            pb: 8, // Add padding to offset the fixed Footer
          }}
        >
          <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>
            <Box
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                p: 4,
                borderRadius: 2,
                boxShadow: 3,
              }}
            >
              <Typography variant="h4" align="center" gutterBottom>
                Add New Book
              </Typography>

              {error && <Alert severity="error">{error}</Alert>}
              {success && <Alert severity="success">{success}</Alert>}

              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  {/* Title */}
                  <Grid item xs={12}>
                    <TextField
                      label="Title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      fullWidth
                      required
                    />
                  </Grid>

                  {/* Author */}
                  <Grid item xs={12}>
                    <TextField
                      label="Author"
                      name="author"
                      value={formData.author}
                      onChange={handleInputChange}
                      fullWidth
                      required
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      label="Description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      fullWidth
                      multiline
                      rows={3}
                    />
                  </Grid>

                  {/* Genre */}
                  <Grid item xs={12}>
                    <TextField
                      label="Genre"
                      name="genre"
                      value={formData.genre}
                      onChange={handleInputChange}
                      fullWidth
                    />
                  </Grid>

                  {/* Quantity */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Quantity"
                      name="quantity"
                      type="number"
                      value={formData.quantity}
                      onChange={handleInputChange}
                      fullWidth
                    />
                  </Grid>

                  {/* Status */}
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel>Status</InputLabel>
                      <Select
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                      >
                        <MenuItem value="available">Available</MenuItem>
                        <MenuItem value="borrowed">Borrowed</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  {/* Upload Book File */}
                  <Grid item xs={12}>
                    <Button
                      variant="outlined"
                      component="label"
                      fullWidth
                      startIcon={<UploadFile />}
                    >
                      Upload Book File (PDF)
                      <input
                        type="file"
                        hidden
                        accept="application/pdf"
                        onChange={handleFileChange}
                      />
                    </Button>
                    {file && (
                      <Typography variant="body2">File: {file.name}</Typography>
                    )}
                  </Grid>

                  {/* Upload Thumbnail */}
                  <Grid item xs={12}>
                    <Button
                      variant="outlined"
                      component="label"
                      fullWidth
                      startIcon={<AddPhotoAlternate />}
                    >
                      Upload Thumbnail (Image)
                      <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={handleThumbnailChange}
                      />
                    </Button>
                    {thumbnail && (
                      <Typography variant="body2">
                        Thumbnail: {thumbnail.name}
                      </Typography>
                    )}
                  </Grid>

                  {/* Submit Button */}
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                      disabled={loading}
                    >
                      {loading ? (
                        <CircularProgress size={24} sx={{ color: "white" }} />
                      ) : (
                        "Add Book"
                      )}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Box>
          </Container>
        </Box>

        {/* Footer */}
        <Footer />
      </>
    );
}